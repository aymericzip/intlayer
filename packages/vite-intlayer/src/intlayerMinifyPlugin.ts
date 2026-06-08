import { join } from 'node:path';
import type { NestedRenameMap, PruneContext } from '@intlayer/babel';
import { formatPath, runOnce } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { PluginOption } from 'vite';

// Field-rename helper

/**
 * Recursively renames user-defined keys in a compiled intlayer content value
 * using the provided `NestedRenameMap`.
 *
 * Traversal rules (mirrors `buildNestedRenameMapFromContent`):
 *  - Arrays → each element is recursed into with the same rename map.
 *    This mirrors the array pass-through in the source-code rename walk,
 *    where numeric indices (e.g. [0]) are transparent.
 *  - Object with `nodeType: 'translation'` → intlayer translation node.
 *    Keys at this level (`nodeType`, `translation`) are NOT renamed.
 *    Recurse into each per-locale value with the same rename map.
 *  - Object without `nodeType` → user-defined record.
 *    Rename its keys using the current rename map level, then recurse into
 *    each value with that entry's `children` map.
 *  - Primitives → returned as-is.
 */
const renameContentRecursively = (
  value: unknown,
  renameMap: NestedRenameMap
): unknown => {
  // Arrays: each element is renamed with the same map (indices are transparent).
  if (Array.isArray(value)) {
    return (value as unknown[]).map((element) =>
      renameContentRecursively(element, renameMap)
    );
  }

  if (!value || typeof value !== 'object') return value;

  const record = value as Record<string, unknown>;

  // Translation node: recurse into each locale with the same rename map
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

  // User-defined record: rename keys and recurse into values
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(record)) {
    const renameEntry = renameMap.get(key);
    if (renameEntry) {
      result[renameEntry.shortName] = renameContentRecursively(
        val,
        renameEntry.children
      );
    } else {
      result[key] = val; // key not in map – keep as-is (e.g. already-pruned)
    }
  }
  return result;
};

/**
 * Applies the nested field rename map to a parsed dictionary object and
 * returns the renamed copy.  The top-level dict keys (`key`, `locale`, etc.)
 * are never touched; only keys inside `content` are renamed.
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

// Plugin

/**
 * Returns the Vite plugin that minifies compiled dictionary JSON files by
 * removing all unnecessary whitespace and optionally renaming content field
 * names to short alphabetic aliases (a, b, c, …).
 *
 * Targets:
 *   - `<dictionariesDir>/**\/*.json`          – static all-locale dictionaries
 *   - `<dynamicDictionariesDir>/**\/*.json`   – per-locale dynamic dictionaries
 *   - `<fetchDictionariesDir>/**\/*.json`     – per-locale fetch dictionaries
 *
 * The plugin is deliberately independent of the prune plugin: it can run
 * on its own when only `build.minify` is enabled.  When both `purge` and
 * `minify` are active, the prune plugin runs first (it uses `enforce: 'pre'`
 * and is registered before this one); this plugin then receives the already-
 * pruned JSON, renames its field keys, and compacts it.
 *
 * Files listed in `pruneContext.dictionariesWithEdgeCases` are skipped:
 * those dictionaries encountered a structural issue during the prune phase
 * and should be left completely untouched to avoid shipping broken data.
 *
 * Field renaming (property mangling) is applied only for dictionaries that
 * have a known, finite field usage set in `pruneContext.dictionaryKeyToFieldRenameMap`.
 * The corresponding rename is also applied to source-file property accesses by
 * the babel rename pass inside `intlayerOptimize`.  Internal intlayer fields
 * such as `nodeType` are never renamed.
 *
 * @param intlayerConfig - Resolved intlayer configuration.
 * @param pruneContext   - Optional shared state from the prune plugin.  When
 *                         provided, dictionaries flagged as edge-cases are
 *                         skipped and field renames are applied.  Pass `null`
 *                         if the prune plugin is not active.
 */
export const intlayerMinify = (
  intlayerConfig: IntlayerConfig,
  pruneContext: PruneContext | null
): PluginOption[] => {
  const logger = getAppLogger(intlayerConfig);

  const { optimize, minify } = intlayerConfig.build;
  const editorEnabled = intlayerConfig.editor.enabled;

  const { dictionariesDir, dynamicDictionariesDir, baseDir } =
    intlayerConfig.system;

  // Fetch-mode dictionaries are served from a remote API at runtime using their
  // original field names.  Minifying them (renaming fields) would create a
  // mismatch between the server response and the renamed client-side accesses.
  const isDictionaryJsonFile = (absoluteFilePath: string): boolean =>
    absoluteFilePath.endsWith('.json') &&
    (absoluteFilePath.startsWith(dictionariesDir) ||
      absoluteFilePath.startsWith(dynamicDictionariesDir));

  const isMinifyEnabled = (
    _config: unknown,
    env: { command: string }
  ): boolean => {
    const isBuildCommand = env.command === 'build';
    const isOptimizeActive =
      (optimize === undefined && isBuildCommand) || optimize === true;

    if (!isOptimizeActive) return false;
    if (!minify) return false;
    if (!isBuildCommand) return false;

    if (editorEnabled) {
      runOnce(
        join(
          baseDir,
          '.intlayer',
          'cache',
          'intlayer-minify-editor-warning.lock'
        ),
        () =>
          logger([
            'Dictionary minification is',
            colorize('disabled', ANSIColors.GREY_DARK),
            'because',
            colorize('editor.enabled', ANSIColors.BLUE),
            'is',
            colorize('true', ANSIColors.GREY_DARK),
            '— the editor requires full dictionary content.',
          ]),
        { cacheTimeoutMs: 1000 * 10 }
      );
      return false;
    }

    runOnce(
      join(
        baseDir,
        '.intlayer',
        'cache',
        'intlayer-minify-plugin-enabled.lock'
      ),
      () =>
        logger([
          'Dictionary minification',
          colorize('enabled', ANSIColors.GREEN),
        ]),
      { cacheTimeoutMs: 1000 * 10 }
    );

    return true;
  };

  const minifyPlugin: PluginOption = {
    name: 'vite-intlayer-dictionary-minify',
    // 'pre' so we receive raw JSON before Vite's built-in JSON → ESM
    // conversion.  Declaration order in the plugin array ensures this runs
    // after the prune plugin (which is also 'pre' but registered earlier).
    enforce: 'pre',
    apply: isMinifyEnabled,

    transform: (rawJsonCode, moduleId) => {
      const absoluteFilePath = moduleId.split('?', 1)[0];

      if (!isDictionaryJsonFile(absoluteFilePath)) return null;

      // Parse JSON
      let parsedDict: Record<string, unknown>;
      try {
        parsedDict = JSON.parse(rawJsonCode) as Record<string, unknown>;
      } catch (parseError) {
        logger(
          [
            `Could not parse`,
            formatPath(absoluteFilePath),
            `as JSON. Skipping minification for this file.`,
            parseError instanceof Error
              ? `(${parseError.message})`
              : String(parseError),
          ],
          { level: 'warn' }
        );
        return null;
      }

      const dictionaryKey =
        typeof parsedDict.key === 'string' ? parsedDict.key : undefined;

      // Skip edge-case dictionaries
      if (
        pruneContext &&
        dictionaryKey &&
        pruneContext.dictionariesWithEdgeCases.has(dictionaryKey)
      ) {
        return null; // structural issue flagged during prune – leave untouched
      }

      // Apply field rename (property mangling)
      if (pruneContext && dictionaryKey) {
        const fieldRenameMap =
          pruneContext.dictionaryKeyToFieldRenameMap.get(dictionaryKey);
        if (fieldRenameMap && fieldRenameMap.size > 0) {
          parsedDict = applyFieldRenameToDict(parsedDict, fieldRenameMap);
        }
      }

      // Strip all top-level metadata – ship only key + content
      return {
        code: JSON.stringify({
          key: parsedDict.key,
          content: parsedDict.content,
        }),
        map: null,
      };
    },
  };

  return [minifyPlugin];
};
