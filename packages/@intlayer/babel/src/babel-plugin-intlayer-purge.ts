import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { PluginObject, PluginPass } from '@babel/core';
import { transformSync } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import * as ANSIColors from '@intlayer/config/colors';
import {
  colorize,
  colorizeKey,
  colorizeNumber,
  getAppLogger,
} from '@intlayer/config/logger';
import type { NestedFieldReferences } from '@intlayer/core/dictionaryManipulator';
import { formatPath } from '@intlayer/engine/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import {
  buildNestedRenameMapFromContent,
  getNestedRenameEntryAtPath,
} from './babel-plugin-intlayer-field-rename';
import {
  type CompatCallerConfig,
  createPruneContext,
  makeUsageAnalyzerBabelPlugin,
  type NestedRenameMap,
  type PruneContext,
  preserveNestedDictionaryFields,
} from './babel-plugin-intlayer-usage-analyzer';
import { extractScriptBlocks } from './extractScriptBlocks';
import {
  BABEL_PARSER_OPTIONS,
  getUsageCheckRegex,
  SOURCE_FILE_REGEX,
} from './transformers';

// ── Plugin options ────────────────────────────────────────────────────────────

/**
 * Pre-resolved options accepted by {@link intlayerPurgeBabelPlugin}.
 *
 * All values are resolved at babel.config.js load time (via
 * {@link getPurgePluginOptions}) so the plugin itself does not need to read
 * the configuration file on every file transform.
 */
export type PurgePluginOptions = {
  /**
   * Absolute path to the project root.  Used as the cache key for the shared
   * {@link PruneContext} so two Babel transform pipelines for different
   * workspaces in the same process do not share state.
   */
  baseDir: string;

  /**
   * When `true`, remove unused content fields from compiled dictionary JSON
   * files.  Mirrors `build.purge` in `intlayer.config.ts`.
   */
  purge: boolean;

  /**
   * When `true`, rename content fields to short alphabetic aliases
   * (`title` → `a`, etc.) and strip top-level metadata from compiled
   * dictionaries.  Mirrors `build.minify` in `intlayer.config.ts`.
   */
  minify: boolean;

  /**
   * Build optimisation toggle.  `undefined` means "auto" (active for
   * production builds).  When explicitly `false`, the plugin is a no-op.
   * Mirrors `build.optimize`.
   */
  optimize: boolean | undefined;

  /**
   * When `true` the plugin still purges and minifies, but skips field renaming
   * so the `keyPath` reported to the visual editor keeps matching the unmerged
   * dictionaries it edits.  Mirrors `editor.enabled`.
   */
  editorEnabled: boolean;

  /**
   * Absolute path to the compiled static dictionaries directory
   * (`.intlayer/dictionaries/` by default).
   */
  dictionariesDir: string;

  /**
   * Absolute path to the compiled per-locale dynamic dictionaries directory
   * (`.intlayer/dynamic_dictionaries/` by default).
   */
  dynamicDictionariesDir: string;

  /**
   * Pre-built list of component source file paths to analyse for field-usage.
   * Populated by {@link getPurgePluginOptions} from the intlayer config's
   * `content` glob patterns.
   */
  componentFilesList: string[];

  /**
   * Dictionaries referenced through `nest()`, mapped to the top-level fields
   * those references read (`'all'` when the whole dictionary is nested).
   *
   * Those fields are resolved at runtime by `getNesting` using their original
   * names, so they must survive purging and must never be renamed.
   */
  nestedDictionaryReferences?: Map<string, NestedFieldReferences>;

  /**
   * Per-dictionary import-mode overrides, keyed by dictionary `key`.
   * Dictionaries with mode `'fetch'` are excluded from field renaming because
   * their JSON is served from a remote API using the original field names.
   */
  dictionaryKeyToImportModeMap: Record<
    string,
    'static' | 'dynamic' | 'fetch' | undefined
  >;

  /**
   * Compat-adapter namespace caller configurations.
   *
   * When set, the usage analyser recognises these additional translation
   * function patterns and maps them to dictionary field usage.  Each compat
   * adapter package (e.g. `@intlayer/react-i18next`) provides its own caller
   * list; they are NOT hardcoded here so that `@intlayer/babel` stays
   * framework-agnostic.
   *
   * Defaults to `[]` (no compat callers) when omitted.
   */
  compatCallers?: CompatCallerConfig[];

  /**
   * Logging configuration used to report what the pipeline purged and
   * minified, so a Babel- or SWC-driven build prints the same summary as the
   * Vite one.  Mirrors `log` in `intlayer.config.ts`; omit to fall back to the
   * logger defaults.
   */
  logConfig?: Pick<IntlayerConfig, 'log'>;
};

/** Application logger used to report the pipeline's progress. */
type PurgeLogger = ReturnType<typeof getAppLogger>;

// ── Shared module-level state ─────────────────────────────────────────────────

/**
 * Cache of built {@link PruneContext} objects, keyed by the project's
 * `baseDir`.  Each context is built exactly once per Node.js process:
 * {@link runIntlayerPurgePipeline} registers the context before running so every
 * subsequent transform is a no-op cache hit.
 */
const _pruneContextCache = new Map<string, PruneContext>();

/**
 * Returns the shared {@link PruneContext} for the given base directory, or
 * `null` if {@link intlayerPurgeBabelPlugin} has not yet been initialised for
 * that directory.
 *
 * Used by {@link intlayerMinifyBabelPlugin} to read the rename map without
 * creating a circular dependency.
 */
export const getSharedPruneContext = (baseDir: string): PruneContext | null =>
  _pruneContextCache.get(baseDir) ?? null;

// ── Dictionary JSON types ─────────────────────────────────────────────────────

type TranslationNode = {
  nodeType: 'translation';
  translation: Record<string, unknown>;
};

type CompiledDictionaryJson = {
  key: string;
  content: TranslationNode | Record<string, unknown>;
  locale?: string;
  [extraKey: string]: unknown;
};

// ── Type guards ───────────────────────────────────────────────────────────────

const isTranslationNode = (value: unknown): value is TranslationNode =>
  typeof value === 'object' &&
  value !== null &&
  (value as Record<string, unknown>).nodeType === 'translation' &&
  typeof (value as Record<string, unknown>).translation === 'object';

const isPlainRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// ── Prune helpers (mirrors intlayerPrunePlugin) ───────────────────────────────

type PruneResult = {
  prunedDictionary: CompiledDictionaryJson;
  wasRecognised: boolean;
};

/** Returns a copy of `record` keeping only the keys listed in `usedFieldNames`. */
const filterRecordByUsedFields = (
  record: Record<string, unknown>,
  usedFieldNames: Set<string>
): Record<string, unknown> => {
  const filteredRecord: Record<string, unknown> = {};
  for (const [fieldName, fieldValue] of Object.entries(record)) {
    if (usedFieldNames.has(fieldName)) {
      filteredRecord[fieldName] = fieldValue;
    }
  }
  return filteredRecord;
};

/**
 * Removes unused fields from a **static** dictionary (all locales in one
 * file). Supports shape A (translation node at the root) and shape B (flat
 * record of translation nodes per field).
 */
const pruneStaticDictionaryContent = (
  dictionary: CompiledDictionaryJson,
  usedFieldNames: Set<string>
): PruneResult => {
  const { content } = dictionary;

  // Shape A: { nodeType: "translation", translation: { en: { f1, f2 } } }
  if (isTranslationNode(content)) {
    const firstLocaleValue = Object.values(content.translation)[0];
    if (isPlainRecord(firstLocaleValue)) {
      const prunedTranslation: Record<string, unknown> = {};
      for (const [locale, localeContent] of Object.entries(
        content.translation
      )) {
        prunedTranslation[locale] = isPlainRecord(localeContent)
          ? filterRecordByUsedFields(localeContent, usedFieldNames)
          : localeContent;
      }
      return {
        prunedDictionary: {
          ...dictionary,
          content: { ...content, translation: prunedTranslation },
        },
        wasRecognised: true,
      };
    }
  }

  // Shape B: { field1: { nodeType: "translation", … }, field2: { … } }
  if (isPlainRecord(content) && !isTranslationNode(content)) {
    return {
      prunedDictionary: {
        ...dictionary,
        content: filterRecordByUsedFields(content, usedFieldNames),
      },
      wasRecognised: true,
    };
  }

  return { prunedDictionary: dictionary, wasRecognised: false };
};

/**
 * Removes unused fields from a **dynamic / per-locale** dictionary file
 * (one JSON per locale, flat `content` record).
 */
const pruneDynamicDictionaryContent = (
  dictionary: CompiledDictionaryJson,
  usedFieldNames: Set<string>
): PruneResult => {
  const { content } = dictionary;
  if (!isPlainRecord(content)) {
    return { prunedDictionary: dictionary, wasRecognised: false };
  }
  return {
    prunedDictionary: {
      ...dictionary,
      content: filterRecordByUsedFields(content, usedFieldNames),
    },
    wasRecognised: true,
  };
};

// ── Minify helpers (mirrors intlayerMinifyPlugin) ─────────────────────────────

/**
 * Recursively renames user-defined content fields using `renameMap`.
 * Translation nodes, arrays, and primitives follow the same traversal rules
 * as in the Vite-based minify plugin.
 */
const renameContentRecursively = (
  value: unknown,
  renameMap: NestedRenameMap
): unknown => {
  if (Array.isArray(value)) {
    return (value as unknown[]).map((element) =>
      renameContentRecursively(element, renameMap)
    );
  }
  if (!value || typeof value !== 'object') return value;

  const record = value as Record<string, unknown>;

  // Translation node: recurse into each locale value with the same map.
  if (
    typeof record.nodeType === 'string' &&
    record.translation &&
    typeof record.translation === 'object' &&
    !Array.isArray(record.translation)
  ) {
    const renamedTranslation: Record<string, unknown> = {};
    for (const [locale, localeValue] of Object.entries(
      record.translation as Record<string, unknown>
    )) {
      renamedTranslation[locale] = renameContentRecursively(
        localeValue,
        renameMap
      );
    }
    return { ...record, translation: renamedTranslation };
  }

  // User-defined record: rename keys and recurse into values.
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(record)) {
    const renameEntry = renameMap.get(key);
    if (renameEntry) {
      result[renameEntry.shortName] = renameContentRecursively(
        val,
        renameEntry.children
      );
    } else {
      result[key] = val;
    }
  }
  return result;
};

/**
 * Applies a {@link NestedRenameMap} to a parsed dictionary object, renaming
 * only the keys inside `content` while leaving top-level metadata untouched.
 */
const applyFieldRenameToDict = (
  dict: Record<string, unknown>,
  renameMap: NestedRenameMap
): Record<string, unknown> => {
  const content = dict.content;
  if (!content || typeof content !== 'object' || Array.isArray(content))
    return dict;
  return {
    ...dict,
    content: renameContentRecursively(content, renameMap),
  };
};

// ── Synchronous source-file analysis ─────────────────────────────────────────

/**
 * Runs the usage-analyser Babel plugin synchronously on a single code block,
 * accumulating results into `pruneContext`.
 */
const analyzeCodeBlockSync = (
  code: string,
  sourceFilePath: string,
  pruneContext: PruneContext,
  compatCallers?: CompatCallerConfig[]
): void => {
  try {
    transformSync(code, {
      filename: sourceFilePath,
      plugins: [makeUsageAnalyzerBabelPlugin(pruneContext, { compatCallers })],
      parserOpts: BABEL_PARSER_OPTIONS,
      ast: false,
      code: false,
    });
  } catch {
    pruneContext.hasUnparsableSourceFiles = true;
  }
};

/**
 * Reads a source file from disk and runs the usage-analyser synchronously.
 * SFC files (Vue / Svelte) are handled by extracting script blocks first.
 */
const analyzeSourceFileSync = (
  sourceFilePath: string,
  pruneContext: PruneContext,
  compatCallers?: CompatCallerConfig[]
): void => {
  let code: string;
  try {
    code = readFileSync(sourceFilePath, 'utf-8');
  } catch {
    return;
  }

  const usageCheckRegex = getUsageCheckRegex(compatCallers);

  if (!usageCheckRegex.test(code)) return;

  const scriptBlocks = extractScriptBlocks(sourceFilePath, code);
  for (const block of scriptBlocks) {
    if (!usageCheckRegex.test(block.content)) continue;
    analyzeCodeBlockSync(
      block.content,
      sourceFilePath,
      pruneContext,
      compatCallers
    );
  }
};

// ── Build rename maps ─────────────────────────────────────────────────────────

/**
 * Reads compiled dictionary JSON files to build the nested field-rename maps,
 * mirroring the Phase 4 logic in the Vite `intlayerOptimize` plugin's
 * `buildStart` hook.  Results are stored in
 * `pruneContext.dictionaryKeyToFieldRenameMap`.
 */
const buildRenameMapsSynchronously = (
  dictionariesDir: string,
  dynamicDictionariesDir: string,
  dictionaryKeyToImportModeMap: PurgePluginOptions['dictionaryKeyToImportModeMap'],
  pruneContext: PruneContext,
  logger: PurgeLogger
): void => {
  let partiallyMinifiedDictionariesCount = 0;

  for (const [
    dictionaryKey,
    fieldUsage,
  ] of pruneContext.dictionaryKeyToFieldUsageMap) {
    if (fieldUsage === 'all') continue;
    if (dictionaryKeyToImportModeMap[dictionaryKey] === 'fetch') continue;
    if (pruneContext.dictionariesSkippingFieldRename.has(dictionaryKey))
      continue;

    let dictionaryContent: unknown = null;

    const staticJsonPath = join(dictionariesDir, `${dictionaryKey}.json`);
    if (existsSync(staticJsonPath)) {
      try {
        const raw = readFileSync(staticJsonPath, 'utf-8');
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        dictionaryContent = parsed.content;
      } catch {
        // Fall through to dynamic dict.
      }
    }

    if (!dictionaryContent) {
      const dynamicDirPath = join(dynamicDictionariesDir, dictionaryKey);
      if (existsSync(dynamicDirPath)) {
        try {
          const localeFiles = readdirSync(dynamicDirPath);
          const firstJsonFile = localeFiles.find((file) =>
            file.endsWith('.json')
          );
          if (firstJsonFile) {
            const raw = readFileSync(
              join(dynamicDirPath, firstJsonFile),
              'utf-8'
            );
            const parsed = JSON.parse(raw) as Record<string, unknown>;
            dictionaryContent = parsed.content;
          }
        } catch {
          // Dictionary not readable – skip rename for this key.
        }
      }
    }

    if (!dictionaryContent) continue;

    const nestedRenameMap = buildNestedRenameMapFromContent(dictionaryContent);

    // Preserve children of opaque values to avoid breaking child components.
    const opaqueFieldMap =
      pruneContext.dictionaryKeysWithOpaqueFields.get(dictionaryKey);
    if (opaqueFieldMap) {
      const dangerousOccurrences = [...opaqueFieldMap.values()].filter(
        (occurrence) =>
          (getNestedRenameEntryAtPath(nestedRenameMap, occurrence.fieldPath)
            ?.children.size ?? 0) > 0
      );

      if (dangerousOccurrences.length > 0) {
        partiallyMinifiedDictionariesCount += 1;

        logger(
          [
            `Dictionary`,
            colorizeKey(dictionaryKey),
            `partially minified.`,
            ...dangerousOccurrences.flatMap((occurrence) => [
              `\n    Opaque field:`,
              colorize(`'${occurrence.fieldPath.join('.')}'`, ANSIColors.BLUE),
              `(nested keys preserved for stability).`,
              ...occurrence.locations.map(
                (location) => `\n      at ${formatPath(location)}`
              ),
            ]),
          ],
          { level: 'warn', isVerbose: true }
        );

        for (const occurrence of dangerousOccurrences) {
          const renameEntry = getNestedRenameEntryAtPath(
            nestedRenameMap,
            occurrence.fieldPath
          );
          if (renameEntry) {
            renameEntry.children = new Map();
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

  if (partiallyMinifiedDictionariesCount > 0) {
    logger([
      `Partially minified`,
      colorizeNumber(partiallyMinifiedDictionariesCount),
      `dictionar${partiallyMinifiedDictionariesCount === 1 ? 'y' : 'ies'}`,
      `(preserved nested keys for opaque fields).`,
    ]);
  }
};

// ── Dictionary file writing ───────────────────────────────────────────────────

/**
 * Names of the top-level content fields of a compiled dictionary, whatever
 * shape its `content` uses.  Used to report which fields the purge removed.
 */
const readContentFieldNames = (
  content: CompiledDictionaryJson['content']
): string[] => {
  // Shape A – fields live inside each locale object.
  if (isTranslationNode(content)) {
    const firstLocaleValue = Object.values(content.translation)[0];
    return isPlainRecord(firstLocaleValue) ? Object.keys(firstLocaleValue) : [];
  }

  // Shape B / dynamic – flat content record.
  if (isPlainRecord(content)) return Object.keys(content);

  return [];
};

/**
 * Running totals of the purge, reported once the whole pipeline is done.
 */
type PurgeStats = {
  /** Dictionary key → number of fields removed from it. */
  prunedFieldsCountPerDictionary: Map<string, number>;
  /**
   * Dictionary keys whose "pruned fields" line has already been printed.  A
   * key spans several files (one static, one per locale), and they all remove
   * the same fields.
   */
  loggedPrunedDictionaryKeys: Set<string>;
  /**
   * Dictionary keys whose "analysis is incomplete" warning has already been
   * printed, deduplicated the same way.
   */
  loggedIncompleteAnalysisKeys: Set<string>;
};

/**
 * Reads a compiled dictionary JSON file, applies the purge and/or minify
 * transformations, and writes it back in-place when something changed.
 *
 * `dictionaryKind` selects the prune strategy and the minified output shape:
 * static dictionaries keep `{ key, content }`, dynamic per-locale
 * dictionaries additionally keep `locale`.
 */
const processDictionaryFile = (
  filePath: string,
  dictionaryKind: 'static' | 'dynamic',
  pruneContext: PruneContext,
  shouldPurge: boolean,
  shouldMinify: boolean,
  logger: PurgeLogger,
  stats: PurgeStats
): void => {
  let parsedDict: CompiledDictionaryJson;
  try {
    parsedDict = JSON.parse(
      readFileSync(filePath, 'utf-8')
    ) as CompiledDictionaryJson;
  } catch {
    return; // Unreadable or invalid JSON – leave file unchanged.
  }

  const { key: dictionaryKey } = parsedDict;

  if (!dictionaryKey) {
    logger(
      [
        `Dictionary file`,
        formatPath(filePath),
        `is missing a "key" field. Skipping prune for this file.`,
      ],
      { level: 'warn' }
    );
    return;
  }

  if (pruneContext.dictionariesWithEdgeCases.has(dictionaryKey)) return;

  let modified = false;

  if (shouldPurge) {
    const fieldUsage =
      pruneContext.dictionaryKeyToFieldUsageMap.get(dictionaryKey);
    if (fieldUsage && fieldUsage !== 'all') {
      const pruneDictionaryContent =
        dictionaryKind === 'static'
          ? pruneStaticDictionaryContent
          : pruneDynamicDictionaryContent;
      const originalFieldNames = readContentFieldNames(parsedDict.content);
      const { prunedDictionary, wasRecognised } = pruneDictionaryContent(
        parsedDict,
        fieldUsage
      );
      if (!wasRecognised) {
        pruneContext.dictionariesWithEdgeCases.add(dictionaryKey);
        logger(
          [
            `Unrecognised content structure in dictionary`,
            colorizeKey(dictionaryKey),
            `(file:`,
            `${formatPath(filePath)}).`,
            `Skipping prune for this dictionary.`,
          ],
          { level: 'warn' }
        );
        return;
      }

      const removedFieldNames = originalFieldNames.filter(
        (fieldName) => !fieldUsage.has(fieldName)
      );

      if (removedFieldNames.length > 0) {
        stats.prunedFieldsCountPerDictionary.set(
          dictionaryKey,
          removedFieldNames.length
        );

        if (!stats.loggedPrunedDictionaryKeys.has(dictionaryKey)) {
          stats.loggedPrunedDictionaryKeys.add(dictionaryKey);
          logger(
            [
              `Pruned`,
              colorizeNumber(removedFieldNames.length),
              `unused field${removedFieldNames.length === 1 ? '' : 's'} from`,
              `${colorizeKey(dictionaryKey)}:`,
              removedFieldNames
                .map((fieldName) => colorize(fieldName, ANSIColors.GREY_LIGHT))
                .join(', '),
            ],
            { isVerbose: true }
          );
        }
      }

      parsedDict = prunedDictionary;
      modified = true;
    } else if (
      !fieldUsage &&
      pruneContext.hasUnparsableSourceFiles &&
      !stats.loggedIncompleteAnalysisKeys.has(dictionaryKey)
    ) {
      // An unparsable source file might be the one referencing this key, so its
      // usage set cannot be trusted to be empty.
      stats.loggedIncompleteAnalysisKeys.add(dictionaryKey);
      logger(
        [
          `Skipping prune for dictionary`,
          colorizeKey(dictionaryKey),
          `: analysis is incomplete due to earlier source-file parse failures.`,
        ],
        { level: 'warn' }
      );
    }
  }

  if (shouldMinify) {
    const fieldRenameMap =
      pruneContext.dictionaryKeyToFieldRenameMap.get(dictionaryKey);
    if (fieldRenameMap && fieldRenameMap.size > 0) {
      parsedDict = applyFieldRenameToDict(
        parsedDict as Record<string, unknown>,
        fieldRenameMap
      ) as CompiledDictionaryJson;
      modified = true;
    }
  }

  if (!modified) return;

  const outputDict = shouldMinify
    ? dictionaryKind === 'static'
      ? { key: parsedDict.key, content: parsedDict.content }
      : {
          key: parsedDict.key,
          content: parsedDict.content,
          locale: parsedDict.locale,
        }
    : parsedDict;

  try {
    writeFileSync(filePath, JSON.stringify(outputDict), 'utf-8');
  } catch {
    // Write failure – leave file unchanged.
  }
};

const processAllDictionaryFiles = (
  dictionariesDir: string,
  dynamicDictionariesDir: string,
  pruneContext: PruneContext,
  shouldPurge: boolean,
  shouldMinify: boolean,
  logger: PurgeLogger
): void => {
  const stats: PurgeStats = {
    prunedFieldsCountPerDictionary: new Map(),
    loggedPrunedDictionaryKeys: new Set(),
    loggedIncompleteAnalysisKeys: new Set(),
  };

  if (existsSync(dictionariesDir)) {
    for (const entry of readdirSync(dictionariesDir)) {
      if (!entry.endsWith('.json')) continue;
      processDictionaryFile(
        join(dictionariesDir, entry),
        'static',
        pruneContext,
        shouldPurge,
        shouldMinify,
        logger,
        stats
      );
    }
  }

  if (existsSync(dynamicDictionariesDir)) {
    for (const keyDir of readdirSync(dynamicDictionariesDir)) {
      const keyDirPath = join(dynamicDictionariesDir, keyDir);
      try {
        for (const localeFile of readdirSync(keyDirPath)) {
          if (!localeFile.endsWith('.json')) continue;
          processDictionaryFile(
            join(keyDirPath, localeFile),
            'dynamic',
            pruneContext,
            shouldPurge,
            shouldMinify,
            logger,
            stats
          );
        }
      } catch {
        // Unreadable key directory – skip.
      }
    }
  }

  const totalPrunedFieldsCount = [
    ...stats.prunedFieldsCountPerDictionary.values(),
  ].reduce((total, count) => total + count, 0);
  const totalPrunedDictionariesCount =
    stats.prunedFieldsCountPerDictionary.size;

  if (totalPrunedFieldsCount > 0) {
    logger([
      `Pruned`,
      colorizeNumber(totalPrunedFieldsCount),
      `unused field${totalPrunedFieldsCount === 1 ? '' : 's'} across`,
      colorizeNumber(totalPrunedDictionariesCount),
      `dictionar${totalPrunedDictionariesCount === 1 ? 'y' : 'ies'}.`,
    ]);
  }
};

// ── Reporting helpers ─────────────────────────────────────────────────────────

/**
 * Explains the one step the visual editor stands down: renaming the content
 * fields would break the `keyPath` the editor resolves its edits with. Purge
 * and the rest of the minification still run.
 */
const logFieldRenameDisabledByEditor = (logger: PurgeLogger): void =>
  logger([
    'Dictionary field renaming is',
    colorize('disabled', ANSIColors.GREY_DARK),
    'because',
    colorize('editor.enabled', ANSIColors.BLUE),
    'is',
    colorize('true', ANSIColors.GREY_DARK),
    colorize('— the editor needs complete keys', ANSIColors.GREY),
  ]);

/**
 * Reports the dictionaries whose consumption could not be tracked statically,
 * with the source files responsible — those keep their full content.
 */
const logUntrackedBindings = (
  logger: PurgeLogger,
  pruneContext: PruneContext
): void => {
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
};

// ── Main initialisation ───────────────────────────────────────────────────────

/**
 * Runs the full purge/minify pipeline for the given options, using a
 * module-level cache so the work happens at most once per process per
 * unique `baseDir`.
 *
 * Exported so bundler integrations that do not go through Babel can drive the
 * same pipeline. The Next.js integration is the main consumer: its SWC plugin
 * runs as a per-file Wasm transform with no filesystem access, so the analysis
 * and the dictionary rewrite happen here, in Node, and only the resulting
 * field-rename tables (see {@link serializeFieldRenameMap}) are forwarded to
 * the plugin.
 *
 * **This performs file I/O**: it reads every source file listed in
 * `componentFilesList` and overwrites the compiled dictionary JSON files
 * in-place. Call it at most once per build, after the dictionaries have been
 * built.
 */
export const runIntlayerPurgePipeline = (
  options: PurgePluginOptions
): PruneContext => {
  const {
    baseDir,
    purge,
    minify,
    optimize,
    editorEnabled,
    dictionariesDir,
    dynamicDictionariesDir,
    componentFilesList,
    dictionaryKeyToImportModeMap,
    nestedDictionaryReferences,
    compatCallers,
    logConfig,
  } = options;

  const cachedContext = _pruneContextCache.get(baseDir);
  if (cachedContext) return cachedContext;

  const pruneContext = createPruneContext();
  _pruneContextCache.set(baseDir, pruneContext);

  const logger = getAppLogger(logConfig);

  const shouldPurge = Boolean(purge);
  const shouldMinify = Boolean(minify);

  // Field renaming rewrites the content keys the interpreter walks, so the
  // `keyPath` reported to the visual editor would no longer resolve against
  // the unmerged dictionaries it edits. Purging is keyPath-neutral: a purged
  // field is one no source file reads, so it is never rendered either.
  const isFieldRenameEnabled = shouldMinify && !editorEnabled;

  if (editorEnabled && minify) {
    logFieldRenameDisabledByEditor(logger);
  }

  if ((!shouldPurge && !shouldMinify) || optimize === false)
    return pruneContext;

  // Phase 1: Synchronously analyse all component source files.
  for (const sourceFilePath of componentFilesList) {
    if (!SOURCE_FILE_REGEX.test(sourceFilePath)) continue;
    analyzeSourceFileSync(sourceFilePath, pruneContext, compatCallers);
  }

  // Phase 1.5: Keep `nest()` targets resolvable — must run before the rename
  // maps are built so nest targets are excluded from field renaming.
  if (nestedDictionaryReferences) {
    preserveNestedDictionaryFields(pruneContext, nestedDictionaryReferences);
  }

  // Phase 1.6: Warn about the dictionaries the analysis could not follow.
  logUntrackedBindings(logger, pruneContext);

  // Phase 2: Build field-rename maps (minify only, editor disabled only).
  if (isFieldRenameEnabled) {
    buildRenameMapsSynchronously(
      dictionariesDir,
      dynamicDictionariesDir,
      dictionaryKeyToImportModeMap,
      pruneContext,
      logger
    );
  }

  // Phase 3: Write pruned / minified dictionary JSON files to disk.
  processAllDictionaryFiles(
    dictionariesDir,
    dynamicDictionariesDir,
    pruneContext,
    shouldPurge,
    shouldMinify,
    logger
  );

  return pruneContext;
};

// ── Babel plugin ──────────────────────────────────────────────────────────────

/**
 * Babel plugin that analyses all project source files and rewrites compiled
 * dictionary JSON files in-place to remove unused content fields
 * (`build.purge`) and/or rename them to short alphabetic aliases
 * (`build.minify`).
 *
 * All option values must be pre-resolved via {@link getPurgePluginOptions}
 * before being passed here — the plugin does not load the intlayer
 * configuration itself.
 *
 * This plugin performs **file I/O as a side effect**: on the very first Babel
 * transform in a given Node.js process it synchronously scans the component
 * files listed in `options.componentFilesList`, builds field-usage data, and
 * writes the processed dictionaries to disk.  Subsequent transforms are
 * no-ops.
 *
 * Source-code field renames (rewriting `content.title` → `content.a`) are
 * handled by the companion {@link intlayerMinifyBabelPlugin}.
 *
 * @example
 * ```js
 * // babel.config.js
 * const {
 *   intlayerPurgeBabelPlugin,
 *   intlayerMinifyBabelPlugin,
 *   intlayerOptimizeBabelPlugin,
 *   getPurgePluginOptions,
 *   getMinifyPluginOptions,
 *   getOptimizePluginOptions,
 * } = require("@intlayer/babel");
 *
 * module.exports = {
 *   presets: ["next/babel"],
 *   plugins: [
 *     [intlayerPurgeBabelPlugin,    getPurgePluginOptions()],
 *     [intlayerMinifyBabelPlugin,   getMinifyPluginOptions()],
 *     [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
 *   ],
 * };
 * ```
 *
 * @remarks
 * - Intended for **production builds** only.  Dictionary JSON files are
 *   overwritten in-place; running `intlayer build` afterwards restores the
 *   originals.
 * - The plugin is a no-op when `optimize` is `false`.
 * - When `editorEnabled` is `true`, purge and minify still run but field
 *   renaming is skipped, so the `keyPath` the visual editor receives keeps
 *   matching the unmerged dictionaries it edits.
 */
export const intlayerPurgeBabelPlugin = (_babel: {
  types: typeof BabelTypes;
}): PluginObject => ({
  name: 'intlayer-purge',

  pre(this: PluginPass) {
    runIntlayerPurgePipeline(this.opts as PurgePluginOptions);
  },

  visitor: {
    // No AST transforms: all work is done as a side effect in pre().
  },
});
