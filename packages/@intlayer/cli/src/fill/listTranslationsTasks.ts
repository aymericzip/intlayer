import { relative } from 'node:path';
import { formatLocale } from '@intlayer/chokidar';
import type { Logger } from '@intlayer/config';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeKey,
  colorizePath,
} from '@intlayer/config';
import configuration from '@intlayer/config/built';
import {
  getFilterTranslationsOnlyContent,
  getMissingLocalesContent,
} from '@intlayer/core';
import type { ContentNode, Dictionary, LocalesValues } from '@intlayer/types';

export type TranslationTask = {
  dictionaryKey: string;
  sourceLocale: LocalesValues;
  targetLocale: LocalesValues;
  dictionaryPreset: string;
};

export const listTranslationsTasks = (
  targetUnmergedDictionaries: Dictionary[],
  dictionariesRecord: Record<string, Dictionary>,
  outputLocales: LocalesValues[],
  mode: 'complete' | 'review',
  baseLocale: LocalesValues,
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

    const sourceLocale: LocalesValues =
      targetUnmergedDictionary.locale ?? baseLocale;

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
      configuration?.content?.baseDir ?? process.cwd(),
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
    let outputLocalesList: LocalesValues[] = outputLocales;

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
