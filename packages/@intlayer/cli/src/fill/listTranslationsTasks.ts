import { basename } from 'node:path';
import { formatLocale } from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeKey,
  colorizePath,
  getAppLogger,
} from '@intlayer/config';
import {
  getFilterTranslationsOnlyDictionary,
  getMissingLocalesContentFromDictionary,
} from '@intlayer/core';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  Dictionary,
  IntlayerConfig,
  LocalDictionaryId,
  Locale,
} from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

export type TranslationTask = {
  dictionaryKey: string;
  dictionaryLocalId: LocalDictionaryId;
  sourceLocale: Locale;
  targetLocales: Locale[];
  dictionaryPreset: string;
  dictionaryFilePath: string;
};

export const listTranslationsTasks = (
  localIds: LocalDictionaryId[],
  outputLocales: Locale[],
  mode: 'complete' | 'review',
  baseLocale: Locale,
  configuration: IntlayerConfig
): TranslationTask[] => {
  const appLogger = getAppLogger(configuration);

  const mergedDictionariesRecord = getDictionaries(configuration);
  const unmergedDictionariesRecord = getUnmergedDictionaries(configuration);

  const allFlatDictionaries = Object.values(unmergedDictionariesRecord).flat();
  const dictionariesToProcess = allFlatDictionaries.filter((dictionary) =>
    localIds.includes(dictionary.localId!)
  );

  const maxKeyLength = Math.max(
    ...dictionariesToProcess.map((dict) => dict.key.length)
  );

  const translationTasks: TranslationTask[] = [];

  for (const targetUnmergedDictionary of dictionariesToProcess) {
    const dictionaryPreset = colon(
      [
        ' - ',
        colorize('[', ANSIColors.GREY_DARK),
        colorizeKey(targetUnmergedDictionary.key),
        colorize(']', ANSIColors.GREY_DARK),
      ].join(''),
      { colSize: maxKeyLength + 6 }
    );

    const dictionaryKey = targetUnmergedDictionary.key;
    const dictionaryLocalId = targetUnmergedDictionary.localId!;
    const mainDictionaryToProcess: Dictionary =
      mergedDictionariesRecord[dictionaryKey];
    const dictionaryFill =
      targetUnmergedDictionary.fill ?? configuration.dictionary?.fill ?? false;

    if (dictionaryFill === false) continue;

    const sourceLocale: Locale = (targetUnmergedDictionary.locale ??
      baseLocale) as Locale;

    if (!mainDictionaryToProcess) {
      appLogger(
        `${dictionaryPreset} Dictionary not found in dictionariesRecord. Skipping.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    if (!targetUnmergedDictionary.filePath) {
      appLogger(`${dictionaryPreset} Dictionary has no file path. Skipping.`, {
        level: 'warn',
      });
      continue;
    }

    const sourceLocaleContent = getFilterTranslationsOnlyDictionary(
      mainDictionaryToProcess,
      sourceLocale
    );

    if (
      Object.keys(sourceLocaleContent as Record<string, unknown>).length === 0
    ) {
      appLogger(
        `${dictionaryPreset} No content found for dictionary in source locale ${formatLocale(sourceLocale)}. Skipping translation for this dictionary.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    /**
     * In 'complete' mode, filter only the missing locales to translate
     *
     * Skip the dictionary if there are no missing locales to translate
     */
    let outputLocalesList: Locale[] = outputLocales as Locale[];

    if (mode === 'complete') {
      const isEmptyDictionary =
        typeof targetUnmergedDictionary.content === 'object' &&
        Object.keys(targetUnmergedDictionary.content).length === 0;

      const isPerLocale = Boolean(targetUnmergedDictionary.locale);

      if (isPerLocale) {
        const dictionaryLocale = targetUnmergedDictionary.locale as Locale;

        if (isEmptyDictionary) {
          // Empty per-locale dictionary: only include its own locale if requested
          outputLocalesList = outputLocales.includes(dictionaryLocale)
            ? [dictionaryLocale]
            : [];
        } else {
          // Non-empty per-locale dictionary: include only if its locale is missing
          const missingLocales = getMissingLocalesContentFromDictionary(
            targetUnmergedDictionary,
            outputLocales
          );

          outputLocalesList = missingLocales.includes(dictionaryLocale)
            ? [dictionaryLocale]
            : [];
        }
      } else {
        // Not per-locale: use all missing locales (or all requested if empty)
        if (isEmptyDictionary) {
          outputLocalesList = outputLocales as Locale[];
        } else {
          const missingLocales = getMissingLocalesContentFromDictionary(
            targetUnmergedDictionary,
            outputLocales
          );
          outputLocalesList = missingLocales as Locale[];
        }
      }
    }

    if (outputLocalesList.length === 0) {
      appLogger(
        `${dictionaryPreset} No locales to fill, Skipping ${colorizePath(basename(targetUnmergedDictionary.filePath))}`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    translationTasks.push({
      dictionaryKey,
      dictionaryLocalId,
      sourceLocale,
      targetLocales: outputLocalesList,
      dictionaryPreset,
      dictionaryFilePath: targetUnmergedDictionary.filePath,
    });
  }

  // Return the list of tasks to execute

  return translationTasks;
};
