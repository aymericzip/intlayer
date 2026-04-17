import { join } from 'node:path';
import type { PruneContext } from '@intlayer/babel';
import { formatPath, runOnce } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import {
  colorize,
  colorizeKey,
  colorizeNumber,
  getAppLogger,
} from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { PluginOption } from 'vite';

// Dictionary JSON types

/**
 * A compiled intlayer translation node – used in static dictionaries where
 * all locales are bundled in a single file.
 *
 * Structure:
 *   { nodeType: "translation", translation: { en: { field1, field2 }, fr: {…} } }
 */
type TranslationNode = {
  nodeType: 'translation';
  translation: Record<string, unknown>;
};

/**
 * Compiled intlayer dictionary as stored in a `.json` file.
 *
 * Two content shapes are supported (see `pruneStaticDictionaryContent` and
 * `pruneDynamicDictionaryContent`).
 */
type CompiledDictionaryJson = {
  key: string;
  content: TranslationNode | Record<string, unknown>;
  locale?: string; // present in per-locale dynamic dictionary files
  localIds?: string[];
  [extraKey: string]: unknown;
};

// Type guards

const isTranslationNode = (value: unknown): value is TranslationNode =>
  typeof value === 'object' &&
  value !== null &&
  (value as Record<string, unknown>).nodeType === 'translation' &&
  typeof (value as Record<string, unknown>).translation === 'object';

const isPlainRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// Pruning logic

/**
 * Result of a prune attempt.
 *
 * `wasRecognised` is `false` when the content structure did not match any
 * known shape – the caller should log a warning and skip the file entirely.
 */
type PruneResult = {
  prunedDictionary: CompiledDictionaryJson;
  wasRecognised: boolean;
};

/**
 * Prune a **static** dictionary JSON (all locales in one file).
 *
 * Shape A – the whole `content` is a single translation node:
 *   { nodeType: "translation", translation: { en: { f1, f2 }, fr: { f1, f2 } } }
 *   → prune the field objects inside each locale.
 *
 * Shape B – `content` is a plain record of fields, each being a translated node:
 *   { field1: { nodeType: "translation", … }, field2: { … } }
 *   → prune the top-level keys of `content` directly.
 *
 * Returns `{ wasRecognised: false }` when neither shape matches.
 */
const pruneStaticDictionaryContent = (
  dictionary: CompiledDictionaryJson,
  usedFieldNames: Set<string>
): PruneResult => {
  const { content } = dictionary;

  // Shape A
  if (isTranslationNode(content)) {
    const firstLocaleValue = Object.values(content.translation)[0];
    const localeValuesAreRecords = isPlainRecord(firstLocaleValue);

    if (localeValuesAreRecords) {
      const prunedTranslationByLocale: Record<string, unknown> = {};

      for (const [localeName, localeContent] of Object.entries(
        content.translation
      )) {
        if (!isPlainRecord(localeContent)) {
          // Locale value is not a record (e.g. a primitive) – keep as-is
          prunedTranslationByLocale[localeName] = localeContent;
          continue;
        }

        const prunedLocaleFields: Record<string, unknown> = {};
        for (const [fieldName, fieldValue] of Object.entries(localeContent)) {
          if (usedFieldNames.has(fieldName)) {
            prunedLocaleFields[fieldName] = fieldValue;
          }
        }
        prunedTranslationByLocale[localeName] = prunedLocaleFields;
      }

      return {
        prunedDictionary: {
          ...dictionary,
          content: { ...content, translation: prunedTranslationByLocale },
        },
        wasRecognised: true,
      };
    }
  }

  // Shape B
  if (isPlainRecord(content) && !isTranslationNode(content)) {
    const prunedContentFields: Record<string, unknown> = {};

    for (const [fieldName, fieldValue] of Object.entries(content)) {
      if (usedFieldNames.has(fieldName)) {
        prunedContentFields[fieldName] = fieldValue;
      }
    }

    return {
      prunedDictionary: {
        ...dictionary,
        content: prunedContentFields as CompiledDictionaryJson['content'],
      },
      wasRecognised: true,
    };
  }

  return { prunedDictionary: dictionary, wasRecognised: false };
};

/**
 * Prune a **dynamic / per-locale** dictionary JSON (one file per locale).
 *
 * Structure:
 *   { key, content: { field1: value, field2: value }, locale: "en" }
 *
 * The `content` here is already the flat, locale-specific record, so we
 * prune its top-level keys directly.
 */
const pruneDynamicDictionaryContent = (
  dictionary: CompiledDictionaryJson,
  usedFieldNames: Set<string>
): PruneResult => {
  const { content } = dictionary;

  if (!isPlainRecord(content)) {
    return { prunedDictionary: dictionary, wasRecognised: false };
  }

  const prunedContentFields: Record<string, unknown> = {};
  for (const [fieldName, fieldValue] of Object.entries(content)) {
    if (usedFieldNames.has(fieldName)) {
      prunedContentFields[fieldName] = fieldValue;
    }
  }

  return {
    prunedDictionary: {
      ...dictionary,
      content: prunedContentFields as CompiledDictionaryJson['content'],
    },
    wasRecognised: true,
  };
};

/**
 * Returns the Vite plugin that removes unused content fields from compiled
 * dictionary JSON files during a production build.
 *
 * Targets:
 *   - `<dictionariesDir>/**\/*.json`          – static all-locale dictionaries
 *   - `<dynamicDictionariesDir>/**\/*.json`   – per-locale dynamic dictionaries
 *   - `<fetchDictionariesDir>/**\/*.json`     – per-locale fetch dictionaries
 *
 * Decision table for each dictionary JSON:
 *
 *   | condition                                      | action          |
 *   |------------------------------------------------|-----------------|
 *   | key in `dictionariesWithEdgeCases`             | skip (warn once)|
 *   | JSON parse error / missing key field           | skip + warn     |
 *   | unrecognised content structure                 | skip + warn     |
 *   | analysis incomplete + key not in usage map     | skip + warn     |
 *   | usage = 'all' (spread / untracked variable)   | skip prune      |
 *   | usage = Set<string>                            | prune fields    |
 *
 * Pruned dictionaries are returned as compact JSON (minification is handled
 * separately by `intlayerMinifyPlugin`).
 *
 * @param intlayerConfig - Resolved intlayer configuration.
 * @param pruneContext   - Shared state produced by the usage analyser that
 *                         runs inside `intlayerOptimizePlugin`.
 */
export const intlayerPrune = (
  intlayerConfig: IntlayerConfig,
  pruneContext: PruneContext
): PluginOption[] => {
  const logger = getAppLogger(intlayerConfig);

  const { optimize, purge } = intlayerConfig.build;
  const editorEnabled = intlayerConfig.editor.enabled;

  const {
    dictionariesDir,
    dynamicDictionariesDir,
    fetchDictionariesDir,
    baseDir,
  } = intlayerConfig.system;

  /**
   * Tracks dictionary keys whose "pruned fields" log has already been emitted
   * during this build session.  Using an in-memory Set (instead of `runOnce`
   * file locks) avoids race conditions when client and SSR environments run
   * transforms concurrently — JavaScript's single-threaded event loop ensures
   * the `.has` / `.add` pair is always atomic.
   */
  const loggedPrunedDictionaryKeys = new Set<string>();

  /**
   * Accumulated statistics for the build summary.
   */
  const prunedFieldsCountPerDictionary = new Map<string, number>();

  const isDictionaryJsonFile = (absoluteFilePath: string): boolean =>
    absoluteFilePath.endsWith('.json') &&
    (absoluteFilePath.startsWith(dictionariesDir) ||
      absoluteFilePath.startsWith(dynamicDictionariesDir) ||
      absoluteFilePath.startsWith(fetchDictionariesDir));

  const isDynamicOrFetchDictionaryFile = (absoluteFilePath: string): boolean =>
    absoluteFilePath.startsWith(dynamicDictionariesDir) ||
    absoluteFilePath.startsWith(fetchDictionariesDir);

  const isPruneEnabled = (
    _config: unknown,
    env: { command: string }
  ): boolean => {
    const isBuildCommand = env.command === 'build';
    const isOptimizeActive =
      (optimize === undefined && isBuildCommand) || optimize === true;

    if (!isBuildCommand) return false;
    if (!isOptimizeActive) return false;
    if (!purge) return false;

    if (editorEnabled) {
      runOnce(
        join(
          baseDir,
          '.intlayer',
          'cache',
          'intlayer-purge-editor-warning.lock'
        ),
        () =>
          logger([
            'Dictionary purge is',
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
      join(baseDir, '.intlayer', 'cache', 'intlayer-purge-plugin-enabled.lock'),
      () => logger(['Dictionary purge', colorize('enabled', ANSIColors.GREEN)]),
      { cacheTimeoutMs: 1000 * 10 }
    );

    return true;
  };

  const prunePlugin: PluginOption = {
    name: 'vite-intlayer-dictionary-prune',
    // 'pre' so we receive raw JSON before Vite's built-in JSON → ESM conversion
    enforce: 'pre',
    apply: isPruneEnabled,

    transform: (rawJsonCode, moduleId) => {
      const absoluteFilePath = moduleId.split('?', 1)[0];

      if (!isDictionaryJsonFile(absoluteFilePath)) return null;

      // Parse JSON
      let parsedDictionary: CompiledDictionaryJson;
      try {
        parsedDictionary = JSON.parse(rawJsonCode) as CompiledDictionaryJson;
      } catch {
        // Malformed JSON – leave it for Vite to report the error
        return null;
      }

      const { key: dictionaryKey } = parsedDictionary;

      if (!dictionaryKey) {
        logger(
          [
            `Dictionary file`,
            formatPath(absoluteFilePath),
            `is missing a "key" field. Skipping prune for this file.`,
          ],
          { level: 'warn' }
        );
        return null;
      }

      // Skip keys already marked as edge cases─
      if (pruneContext.dictionariesWithEdgeCases.has(dictionaryKey)) {
        return null;
      }

      const fieldUsage =
        pruneContext.dictionaryKeyToFieldUsageMap.get(dictionaryKey);

      // No usage entry in the map─
      if (!fieldUsage) {
        if (pruneContext.hasUnparsableSourceFiles) {
          // At least one source file failed to parse; the unparsable file might
          // reference this key, so we cannot safely prune it.
          pruneContext.dictionariesWithEdgeCases.add(dictionaryKey);
          logger(
            [
              `Skipping prune for dictionary`,
              colorizeKey(dictionaryKey),
              `: analysis is incomplete due to earlier source-file parse failures.`,
            ],
            { level: 'warn' }
          );
          return null;
        }

        // Analysis was complete but this key was never referenced in any source
        // file – the dictionary is either unused or loaded dynamically by key.
        // Leave the content unchanged (the minify plugin will compact it).
        return null;
      }

      // Usage is 'all': at least one call-site consumes all fields─
      if (fieldUsage === 'all') {
        return null; // nothing to prune
      }

      // Prune
      const isDynamicOrFetch = isDynamicOrFetchDictionaryFile(absoluteFilePath);

      const { prunedDictionary, wasRecognised } = isDynamicOrFetch
        ? pruneDynamicDictionaryContent(parsedDictionary, fieldUsage)
        : pruneStaticDictionaryContent(parsedDictionary, fieldUsage);

      if (!wasRecognised) {
        pruneContext.dictionariesWithEdgeCases.add(dictionaryKey);
        logger(
          [
            `Unrecognised content structure in dictionary`,
            colorizeKey(dictionaryKey),
            `(file:`,
            `${formatPath(absoluteFilePath)}).`,
            `Skipping prune for this dictionary.`,
          ],
          { level: 'warn' }
        );
        return null;
      }

      // Log pruned fields
      const originalContent = parsedDictionary.content;
      let originalFieldNames: string[];

      if (isTranslationNode(originalContent)) {
        // Shape A – fields live inside each locale object
        const firstLocaleValue = Object.values(originalContent.translation)[0];
        originalFieldNames = isPlainRecord(firstLocaleValue)
          ? Object.keys(firstLocaleValue)
          : [];
      } else if (isPlainRecord(originalContent)) {
        // Shape B / dynamic – flat content record
        originalFieldNames = Object.keys(originalContent);
      } else {
        originalFieldNames = [];
      }

      const removedFieldNames = originalFieldNames.filter(
        (fieldName) => !fieldUsage.has(fieldName)
      );

      if (removedFieldNames.length > 0) {
        prunedFieldsCountPerDictionary.set(
          dictionaryKey,
          removedFieldNames.length
        );

        if (!loggedPrunedDictionaryKeys.has(dictionaryKey)) {
          loggedPrunedDictionaryKeys.add(dictionaryKey);
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

      return { code: JSON.stringify(prunedDictionary), map: null };
    },

    /**
     * Log a summary of all fields removed during this build.
     */
    buildEnd: () => {
      runOnce(
        join(baseDir, '.intlayer', 'cache', 'intlayer-prune-summary.lock'),
        () => {
          const totalPrunedFieldsCount = [
            ...prunedFieldsCountPerDictionary.values(),
          ].reduce((a, b) => a + b, 0);
          const totalPrunedDictionariesCount =
            prunedFieldsCountPerDictionary.size;

          if (totalPrunedFieldsCount > 0) {
            logger([
              `Pruned`,
              colorizeNumber(totalPrunedFieldsCount),
              `unused field${totalPrunedFieldsCount === 1 ? '' : 's'} across`,
              colorizeNumber(totalPrunedDictionariesCount),
              `dictionar${totalPrunedDictionariesCount === 1 ? 'y' : 'ies'}.`,
            ]);
          }
        },
        { cacheTimeoutMs: 1000 * 5 }
      );
    },
  };

  return [prunePlugin];
};
