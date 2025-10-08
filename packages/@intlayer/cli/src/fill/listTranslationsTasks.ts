import { formatLocale } from '@intlayer/chokidar';
import type { Logger } from '@intlayer/config';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeKey,
  colorizePath,
  type Locales,
} from '@intlayer/config';
import configuration from '@intlayer/config/built';
import {
  type ContentNode,
  type Dictionary,
  getFilterTranslationsOnlyContent,
  getMissingLocalesContent,
} from '@intlayer/core';
import { relative } from 'path';

export type TranslationTask = {
  dictionaryKey: string;
  sourceLocale: Locales;
  targetLocale: Locales;
  dictionaryPreset: string;
};

export const listTranslationsTasks = (
  targetUnmergedDictionaries: Dictionary[],
  dictionariesRecord: Record<string, Dictionary>,
  outputLocales: Locales[],
  mode: 'complete' | 'review',
  baseLocale: Locales,
  maxKeyLength: number,
  appLogger: Logger
) => {
  const translationTasks: TranslationTask[] = [];

  for (const targetUnmergedDictionary of targetUnmergedDictionaries) {
    const dictionaryPreset = colon(
      [
        colorize('  - [', ANSIColors.GREY_DARK),
        colorizeKey(targetUnmergedDictionary.key),
        colorize(']', ANSIColors.GREY_DARK),
      ].join(''),
      { colSize: maxKeyLength + 6 }
    );

    const dictionaryKey = targetUnmergedDictionary.key;
    const mainDictionaryToProcess: Dictionary =
      dictionariesRecord[dictionaryKey];

    const sourceLocale: Locales =
      (targetUnmergedDictionary.locale as Locales) ?? baseLocale;

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

    const relativePath = relative(
      configuration.content.baseDir,
      targetUnmergedDictionary.filePath
    );

    appLogger(
      `${dictionaryPreset} Processing content declaration: ${colorizePath(relativePath)}`,
      {
        level: 'info',
      }
    );

    const sourceLocaleContent = getFilterTranslationsOnlyContent(
      mainDictionaryToProcess as unknown as ContentNode,
      sourceLocale,
      { dictionaryKey, keyPath: [] }
    );

    if (Object.keys(sourceLocaleContent).length === 0) {
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
    let outputLocalesList: Locales[] = outputLocales;

    if (mode === 'complete') {
      const missingLocales = getMissingLocalesContent(
        mainDictionaryToProcess as unknown as ContentNode,
        outputLocales,
        {
          dictionaryKey: mainDictionaryToProcess.key,
          keyPath: [],
          plugins: [],
        }
      );

      outputLocalesList = missingLocales;
    }

    if (outputLocalesList.length === 0) {
      appLogger(
        `${dictionaryPreset} No locales to fill - Skipping dictionary`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    for (const targetLocale of outputLocalesList) {
      translationTasks.push({
        dictionaryKey,
        sourceLocale,
        targetLocale,
        dictionaryPreset,
      });
    }
  }

  return translationTasks;
};
