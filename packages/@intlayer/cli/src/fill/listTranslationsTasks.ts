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
import { getFilterTranslationsOnlyDictionary } from '@intlayer/core';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  Dictionary,
  IntlayerConfig,
  LocalDictionaryId,
  Locale,
} from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import { listMissingTranslationsWithConfig } from '../test';

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

  const { missingTranslations } =
    listMissingTranslationsWithConfig(configuration);

  const maxKeyLength = Math.max(
    ...dictionariesToProcess.map((dictionary) => dictionary.key.length)
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
    const dictionaryFilled = targetUnmergedDictionary.filled ?? false;

    if (dictionaryFilled === true) {
      continue;
    }

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
      outputLocalesList =
        missingTranslations
          .find(
            (missingTranslation) => missingTranslation.key === dictionaryKey
          )
          ?.locales.filter((locale) => outputLocales.includes(locale)) ?? [];
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
