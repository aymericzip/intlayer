import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  analyzeFieldUsageInFile,
  buildNestedRenameMapFromContent,
  INTLAYER_USAGE_REGEX,
  optimizeSourceFile,
  type PruneContext,
  renameFieldsInSourceFile,
  SOURCE_FILE_REGEX,
} from '@intlayer/babel';
import {
  buildComponentFilesList,
  formatPath,
  runOnce,
} from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { IMPORT_MODE } from '@intlayer/config/defaultValues';
import { colorize, colorizeKey, getAppLogger } from '@intlayer/config/logger';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { PluginOption } from 'vite';
import { intlayerVueAsyncPlugin } from './intlayerVueAsyncPlugin';

// Plugin

/**
 * Returns the Vite plugins responsible for the build optimisation step.
 *
 * Contains three internal plugins:
 *
 * 1. Vue async plugin – handles Vue SFC async script blocks.
 * 2. Usage analyser (`vite-intlayer-usage-analyzer`) – pre-scans every
 *    component source file during `buildStart` to build the field-usage map
 *    in `pruneContext`. This runs before any `transform` calls so the
 *    downstream prune plugin always has complete data.
 * 3. Babel transform (`vite-intlayer-babel-transform`) – rewrites
 *    `useIntlayer('key')` / `getIntlayer('key')` calls into
 *    `useDictionary(_hash)` / `getDictionary(_hash)` and injects the
 *    corresponding JSON (or dynamic `.mjs`) imports. Also applies field-name
 *    renaming when `build.minify` is enabled.
 *
 * @param intlayerConfig - Resolved intlayer configuration.
 * @param pruneContext   - Shared mutable state written here and read by the
 *                         prune and minify plugins. Pass `null` to skip
 *                         analysis (e.g. when both `purge` and `minify` are
 *                         disabled).
 */
export const intlayerOptimize = async (
  intlayerConfig: IntlayerConfig,
  pruneContext: PruneContext | null
): Promise<PluginOption[]> => {
  try {
    const logger = getAppLogger(intlayerConfig);

    const { optimize, purge, minify } = intlayerConfig.build;
    const editorEnabled = intlayerConfig.editor.enabled;

    const importMode =
      intlayerConfig.build.importMode ?? intlayerConfig.dictionary?.importMode;

    const {
      dictionariesDir,
      dynamicDictionariesDir,
      unmergedDictionariesDir,
      fetchDictionariesDir,
      mainDir,
      baseDir,
    } = intlayerConfig.system;

    const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');
    const unmergedDictionariesEntryPath = join(
      mainDir,
      'unmerged_dictionaries.mjs'
    );
    const dynamicDictionariesEntryPath = join(
      mainDir,
      'dynamic_dictionaries.mjs'
    );

    const componentFilesList = buildComponentFilesList(intlayerConfig);

    const transformableFilesList = [
      ...componentFilesList,
      dictionariesEntryPath,
      unmergedDictionariesEntryPath,
    ];

    const dictionaries = getDictionaries(intlayerConfig);

    const dictionaryKeyToImportModeMap: Record<
      string,
      'static' | 'dynamic' | 'fetch'
    > = {};
    (Object.values(dictionaries) as Dictionary[]).forEach((dictionary) => {
      dictionaryKeyToImportModeMap[dictionary.key] =
        dictionary.importMode ?? importMode ?? IMPORT_MODE;
    });

    const isBuildOptimizeEnabled = (
      _config: unknown,
      env: { command: string }
    ) => {
      const isBuildCommand = env.command === 'build';
      return (optimize === undefined && isBuildCommand) || optimize === true;
    };

    const isAnalysisEnabled = (_config: unknown, env: { command: string }) =>
      !editorEnabled &&
      (!!purge || !!minify) &&
      isBuildOptimizeEnabled(_config, env);

    return [
      intlayerVueAsyncPlugin(intlayerConfig, transformableFilesList),

      // Plugin 1: Usage analyser
      {
        name: 'vite-intlayer-usage-analyzer',
        enforce: 'pre',
        apply: isAnalysisEnabled,

        buildStart: async () => {
          if (!pruneContext) return;

          // Phase 1: Babel-based field-usage analysis for all component files
          await Promise.all(
            componentFilesList.map(async (sourceFilePath) => {
              if (!SOURCE_FILE_REGEX.test(sourceFilePath)) return;

              let sourceCode: string;
              try {
                sourceCode = await readFile(sourceFilePath, 'utf-8');
              } catch {
                return; // unreadable file – skip silently
              }

              if (!INTLAYER_USAGE_REGEX.test(sourceCode)) return;

              // For Vue/Svelte SFCs, the usage analyzer expects the raw script
              // content. `analyzeFieldUsageInFile` handles block extraction
              // internally via `extractScriptBlocks`.
              try {
                await analyzeFieldUsageInFile(
                  sourceFilePath,
                  sourceCode,
                  pruneContext
                );
              } catch (parseError) {
                pruneContext.hasUnparsableSourceFiles = true;
                logger(
                  [
                    `Could not parse`,
                    formatPath(sourceFilePath),
                    `for field-usage analysis.`,
                    'Dictionaries whose usage cannot be confirmed will not be pruned.',
                    parseError instanceof Error
                      ? `(${parseError.message})`
                      : String(parseError),
                  ],
                  { level: 'warn' }
                );
              }
            })
          );

          // Phase 2: Framework-specific analysis for Vue / Svelte SFC bindings
          // that Babel scope analysis cannot resolve (`.value` indirection in
          // Vue, `$` prefix in Svelte).
          if (pruneContext.pendingFrameworkAnalysis.size > 0) {
            const vuePending = new Map<
              string,
              { variableName: string; dictionaryKey: string }[]
            >();
            const sveltePending = new Map<
              string,
              { variableName: string; dictionaryKey: string }[]
            >();

            for (const [
              filePath,
              entries,
            ] of pruneContext.pendingFrameworkAnalysis) {
              if (filePath.endsWith('.vue')) {
                vuePending.set(filePath, entries);
              } else if (filePath.endsWith('.svelte')) {
                sveltePending.set(filePath, entries);
              }
            }

            /** Merge framework-extracted field usage into pruneContext. */
            const mergeFrameworkResult = (
              dictionaryKey: string,
              fields: Set<string> | undefined
            ): void => {
              if (fields && fields.size > 0) {
                // The Babel rename plugin cannot update source-code property
                // accesses for SFC indirect patterns → suppress field renaming.
                pruneContext.dictionariesSkippingFieldRename.add(dictionaryKey);

                const existing =
                  pruneContext.dictionaryKeyToFieldUsageMap.get(dictionaryKey);
                if (existing === 'all') return;

                const merged =
                  existing instanceof Set
                    ? new Set([...existing, ...fields])
                    : new Set(fields);
                pruneContext.dictionaryKeyToFieldUsageMap.set(
                  dictionaryKey,
                  merged
                );
              } else {
                pruneContext.dictionaryKeyToFieldUsageMap.set(
                  dictionaryKey,
                  'all'
                );
              }
            };

            // Vue files
            if (vuePending.size > 0) {
              let extractVueIntlayerFieldUsage:
                | ((
                    code: string,
                    vars: { variableName: string; dictionaryKey: string }[]
                  ) => Map<string, Set<string>>)
                | null = null;

              try {
                const vueCompiler = await import('@intlayer/vue-compiler');
                extractVueIntlayerFieldUsage =
                  vueCompiler.extractVueIntlayerFieldUsage;
              } catch {
                // @intlayer/vue-compiler not installed – fall back to 'all'
              }

              for (const [filePath, entries] of vuePending) {
                if (!extractVueIntlayerFieldUsage) {
                  for (const { dictionaryKey } of entries) {
                    mergeFrameworkResult(dictionaryKey, undefined);
                  }
                  continue;
                }

                let fileCode: string;
                try {
                  fileCode = await readFile(filePath, 'utf-8');
                } catch {
                  for (const { dictionaryKey } of entries) {
                    mergeFrameworkResult(dictionaryKey, undefined);
                  }
                  continue;
                }

                const result = extractVueIntlayerFieldUsage(fileCode, entries);
                for (const { dictionaryKey } of entries) {
                  mergeFrameworkResult(
                    dictionaryKey,
                    result.get(dictionaryKey)
                  );
                }
              }
            }

            // Svelte files
            if (sveltePending.size > 0) {
              let extractSvelteIntlayerFieldUsage:
                | ((
                    code: string,
                    vars: { variableName: string; dictionaryKey: string }[]
                  ) => Map<string, Set<string>>)
                | null = null;

              try {
                const svelteCompiler = await import(
                  '@intlayer/svelte-compiler'
                );
                extractSvelteIntlayerFieldUsage =
                  svelteCompiler.extractSvelteIntlayerFieldUsage;
              } catch {
                // @intlayer/svelte-compiler not installed – fall back to 'all'
              }

              for (const [filePath, entries] of sveltePending) {
                if (!extractSvelteIntlayerFieldUsage) {
                  for (const { dictionaryKey } of entries) {
                    mergeFrameworkResult(dictionaryKey, undefined);
                  }
                  continue;
                }

                let fileCode: string;
                try {
                  fileCode = await readFile(filePath, 'utf-8');
                } catch {
                  for (const { dictionaryKey } of entries) {
                    mergeFrameworkResult(dictionaryKey, undefined);
                  }
                  continue;
                }

                const result = extractSvelteIntlayerFieldUsage(
                  fileCode,
                  entries
                );
                for (const { dictionaryKey } of entries) {
                  mergeFrameworkResult(
                    dictionaryKey,
                    result.get(dictionaryKey)
                  );
                }
              }
            }
          }

          // Phase 3: Warn about untracked bindings (plain variable assignments)
          for (const [
            dictionaryKey,
            sourceFilePaths,
          ] of pruneContext.dictionaryKeysWithUntrackedBindings) {
            logger(
              [
                `Dictionary`,
                colorizeKey(dictionaryKey),
                `cannot be purged or minified.`,
                `\n    Reason: the result of`,
                `${colorize(`useIntlayer(`, ANSIColors.GREY_LIGHT)}${colorizeKey(
                  `'${dictionaryKey}'`
                )}${colorize(`)`, ANSIColors.GREY_LIGHT)}`,
                `is assigned to a plain variable in:`,
                ...sourceFilePaths.map(
                  (filePath) => `\n      - ${formatPath(filePath)}`
                ),
              ],
              { level: 'warn' }
            );
          }

          // Phase 4: Build field-rename map for minification
          // Reads each compiled dictionary JSON to discover the full nested
          // user-defined field structure, then builds a NestedRenameMap that
          // assigns short alphabetic aliases at every level.
          if (minify) {
            for (const [
              dictionaryKey,
              fieldUsage,
            ] of pruneContext.dictionaryKeyToFieldUsageMap) {
              if (fieldUsage === 'all') continue;

              // Fetch-mode dictionaries are served from a remote API using
              // original field names – renaming would break the client/server
              // contract.
              if (dictionaryKeyToImportModeMap[dictionaryKey] === 'fetch')
                continue;

              // SFC indirect access: skip field rename for these dictionaries
              // to avoid a JSON ↔ source mismatch at runtime.
              if (
                pruneContext.dictionariesSkippingFieldRename.has(dictionaryKey)
              )
                continue;

              // Read dictionary content (static JSON first, then dynamic per-locale)
              let dictionaryContent: unknown = null;

              const staticJsonPath = join(
                dictionariesDir,
                `${dictionaryKey}.json`
              );
              try {
                const raw = await readFile(staticJsonPath, 'utf-8');
                const parsed = JSON.parse(raw) as Record<string, unknown>;
                dictionaryContent = parsed.content;
              } catch {
                try {
                  const dynamicDir = join(
                    dynamicDictionariesDir,
                    dictionaryKey
                  );
                  const localeFiles = await readdir(dynamicDir);
                  const firstJsonFile = localeFiles.find((f) =>
                    f.endsWith('.json')
                  );
                  if (firstJsonFile) {
                    const raw = await readFile(
                      join(dynamicDir, firstJsonFile),
                      'utf-8'
                    );
                    const parsed = JSON.parse(raw) as Record<string, unknown>;
                    dictionaryContent = parsed.content;
                  }
                } catch {
                  // Dictionary file not readable – skip rename for this key
                }
              }

              if (!dictionaryContent) continue;

              // Build the rename map from ALL user-defined fields in the
              // dictionary — not just the ones statically consumed by source
              // files.  Using the full set ensures that:
              //   1. Every field in the compiled JSON is renamed (even if
              //      pruned-out fields still appear when purge is disabled).
              //   2. The short-name assignment is stable: the alphabetical
              //      order of all fields determines each short name, so adding
              //      or removing a consumer never changes names for others.
              //   3. There is no source ↔ JSON mismatch: both sides use the
              //      identical map regardless of which subset is consumed.
              const nestedRenameMap =
                buildNestedRenameMapFromContent(dictionaryContent);

              // Skip dictionaries whose opaque fields have nested user-defined
              // structure – renaming those sub-keys would silently break child
              // components that consume the field value as-is.
              const opaqueFieldMap =
                pruneContext.dictionaryKeysWithOpaqueTopLevelFields.get(
                  dictionaryKey
                );

              if (opaqueFieldMap) {
                const dangerousEntries = [...opaqueFieldMap.entries()].filter(
                  ([fieldName]) =>
                    (nestedRenameMap.get(fieldName)?.children.size ?? 0) > 0
                );

                if (dangerousEntries.length > 0) {
                  logger(
                    [
                      `Dictionary`,
                      colorizeKey(dictionaryKey),
                      `partially minified.`,
                      ...dangerousEntries.flatMap(([fieldName, locations]) => [
                        `\n    Opaque field:`,
                        colorize(`'${fieldName}'`, ANSIColors.BLUE),
                        `(nested keys preserved for stability).`,
                        ...locations.map(
                          (loc) => `\n      at ${formatPath(loc)}`
                        ),
                      ]),
                    ],
                    { level: 'warn' }
                  );

                  // Disable renaming for the children of opaque fields to prevent
                  // breaking components that receive the field as a prop.
                  for (const [fieldName] of dangerousEntries) {
                    const entry = nestedRenameMap.get(fieldName);
                    if (entry) {
                      entry.children = new Map();
                    }
                  }
                }
              }

              if (nestedRenameMap.size > 0) {
                pruneContext.dictionaryKeyToFieldRenameMap.set(
                  dictionaryKey,
                  nestedRenameMap
                );
              }
            }
          }
        },
      },

      // Plugin 2: Babel transform
      {
        name: 'vite-intlayer-babel-transform',
        enforce: 'post', // Run after framework transformations (e.g. Vue SFC)
        apply: (_config, env) => {
          const isBuildCommand = env.command === 'build';
          const isEnabled =
            (optimize === undefined && isBuildCommand) || optimize === true;

          if (!isBuildCommand || !isEnabled) return false;

          runOnce(
            join(
              baseDir,
              '.intlayer',
              'cache',
              'intlayer-optimize-plugin-enabled.lock'
            ),
            () =>
              logger([
                `Build optimization ${colorize('enabled', ANSIColors.GREEN)}`,
                colorize('(import mode:', ANSIColors.GREY_DARK),
                colorize(importMode ?? IMPORT_MODE, ANSIColors.BLUE),
                colorize(')', ANSIColors.GREY_DARK),
              ]),
            { cacheTimeoutMs: 1000 * 10 }
          );

          return true;
        },

        transform: async (sourceCode, moduleId) => {
          // Strip query parameters added by Vue/Svelte loaders
          // e.g. "HelloWorld.vue?vue&type=script&setup=true&lang.ts" → "HelloWorld.vue"
          const sourceFilePath = moduleId.split('?', 1)[0];

          if (!SOURCE_FILE_REGEX.test(sourceFilePath)) return null;
          if (!transformableFilesList.includes(sourceFilePath)) return null;

          const isDictionaryEntryFile = [
            dictionariesEntryPath,
            unmergedDictionariesEntryPath,
          ].includes(sourceFilePath);

          const isUsingIntlayer = INTLAYER_USAGE_REGEX.test(sourceCode);
          if (!isUsingIntlayer && !isDictionaryEntryFile) return null;

          // Step 1: Field rename (must run before the optimize pass, which
          // replaces useIntlayer → useDictionary and erases the dictionary key)
          let codeToOptimize = sourceCode;

          if (pruneContext && isUsingIntlayer) {
            const renamedCode = await renameFieldsInSourceFile(
              sourceFilePath,
              sourceCode,
              pruneContext
            );
            if (renamedCode) {
              codeToOptimize = renamedCode;
            }
          }

          // Step 2: Optimize (useIntlayer('key') → useDictionary(_hash))
          const transformResult = await optimizeSourceFile(
            codeToOptimize,
            sourceFilePath,
            {
              optimize,
              dictionariesDir,
              dictionariesEntryPath,
              unmergedDictionariesEntryPath,
              unmergedDictionariesDir,
              dynamicDictionariesDir,
              dynamicDictionariesEntryPath,
              fetchDictionariesDir,
              fetchDictionariesEntryPath: join(
                mainDir,
                'fetch_dictionaries.mjs'
              ),
              importMode,
              filesList: transformableFilesList,
              replaceDictionaryEntry: true,
              dictionaryModeMap: dictionaryKeyToImportModeMap,
            }
          );

          if (!transformResult) return null;

          return {
            code: transformResult.code,
            map: transformResult.map as any,
          };
        },
      },
    ];
  } catch (pluginInitError) {
    console.warn(
      '[vite-intlayer] Failed to initialise optimization plugin:',
      pluginInitError
    );
    return [];
  }
};
