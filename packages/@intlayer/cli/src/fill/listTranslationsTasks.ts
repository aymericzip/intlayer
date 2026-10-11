import { basename } from 'node:path';
import * as ANSIColors from '@intlayer/config/colors';
import {
  colon,
  colorize,
  colorizeKey,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import { getFilterTranslationsOnlyDictionary } from '@intlayer/core/plugins';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import { formatLocale, type Recursive } from '@intlayer/engine/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { listMissingTranslationsWithConfig } from '../test';
import {
  getStaleSourceContent,
  type PreviousDictionaries,
} from './sourceChanges';

export type TranslationTask = {
  dictionaryKey: string;
  dictionaryLocalId: LocalDictionaryId;
  sourceLocale: Locale;
  targetLocales: Locale[];
  dictionaryPreset: string;
  dictionaryFilePath: string;
  /** Per target locale, source values changed since the git ref. */
  changedSourceContent: Partial<Record<Locale, Recursive>>;
};

export const listTranslationsTasks = (
  localIds: LocalDictionaryId[],
  outputLocales: Locale[],
  mode: 'complete' | 'review',
  baseLocale: Locale,
  configuration: IntlayerConfig,
  previousDictionaries: PreviousDictionaries = {}
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
    const mainDictionaryToProcess: Dictionary | undefined =
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
     * Source values edited since the git ref, with a translation that was not
     * updated. Only the base locale is a source of truth: other per-locale
     * files are fill outputs.
     */
    const changedSourceContent: Partial<Record<Locale, Recursive>> = {};

    if (sourceLocale === baseLocale) {
      for (const locale of outputLocales) {
        if (locale === sourceLocale) continue;

        const changedContent = getStaleSourceContent(
          previousDictionaries[dictionaryLocalId],
          targetUnmergedDictionary,
          sourceLocale,
          locale
        );

        if (changedContent !== undefined) {
          changedSourceContent[locale] = changedContent;
        }
      }
    }

    /**
     * In 'complete' mode, filter only the locales with missing translations
     * or with source values changed since the git ref
     *
     * Skip the dictionary if there are no locales to translate
     */
    let outputLocalesList: Locale[] = outputLocales as Locale[];

    if (mode === 'complete') {
      const missingLocales =
        missingTranslations.find(
          (missingTranslation) => missingTranslation.key === dictionaryKey
        )?.locales ?? [];

      outputLocalesList = outputLocales.filter(
        (locale) =>
          missingLocales.includes(locale) ||
          Object.hasOwn(changedSourceContent, locale)
      );
    }

    if (outputLocalesList.length === 0) {
      appLogger(
        `${dictionaryPreset} ${colorize('No locales to fill, Skipping', ANSIColors.GREY_DARK)} ${colorizePath(basename(targetUnmergedDictionary.filePath))}`,
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
      changedSourceContent,
    });
  }

  // Return the list of tasks to execute
  return translationTasks;
};
