import { type AIOptions, getIntlayerAPIProxy } from '@intlayer/api';
import {
  extractErrorMessage,
  formatLocale,
  processPerLocaleDictionary,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  getAppLogger,
  type IntlayerConfig,
} from '@intlayer/config';
import {
  type ContentNode,
  type Dictionary,
  getFilterTranslationsOnlyContent,
  getLocalizedContent,
} from '@intlayer/core';
import type { TranslationTask } from './listTranslationsTasks';

export const translateJson = async (
  task: TranslationTask,
  dictionariesRecord: Record<string, Dictionary>,
  maxLocaleLength: number,
  mode: 'complete' | 'review',
  configuration: IntlayerConfig,
  aiOptions?: AIOptions
) => {
  const appLogger = getAppLogger(configuration);
  const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

  const mainDictionaryToProcess: Dictionary =
    dictionariesRecord[task.dictionaryKey];

  const localePreset = colon(
    [
      colorize('[', ANSIColors.GREY_DARK),
      formatLocale(task.targetLocale),
      colorize(']', ANSIColors.GREY_DARK),
    ].join(''),
    { colSize: maxLocaleLength }
  );

  appLogger(
    `${task.dictionaryPreset}${localePreset} Preparing translation for dictionary from ${formatLocale(task.sourceLocale)} to ${formatLocale(task.targetLocale)}`,
    {
      level: 'info',
    }
  );

  const sourceLocaleContent = getFilterTranslationsOnlyContent(
    mainDictionaryToProcess as unknown as ContentNode,
    task.sourceLocale,
    { dictionaryKey: task.dictionaryKey, keyPath: [] }
  );

  const presetOutputContent = getLocalizedContent(
    mainDictionaryToProcess as unknown as ContentNode,
    task.targetLocale,
    { dictionaryKey: task.dictionaryKey, keyPath: [] }
  );

  try {
    const translationResult = await intlayerAPI.ai.translateJSON({
      entryFileContent: sourceLocaleContent.content,
      presetOutputContent: presetOutputContent.content,
      dictionaryDescription: mainDictionaryToProcess.description ?? '',
      entryLocale: task.sourceLocale,
      outputLocale: task.targetLocale,
      mode,
      aiOptions,
    });

    if (!translationResult.data?.fileContent) {
      appLogger(`${task.dictionaryPreset}${localePreset} No content result`, {
        level: 'error',
      });
      return { key: task.dictionaryKey, result: null } as const;
    }

    const processedPerLocaleDictionary = processPerLocaleDictionary({
      ...mainDictionaryToProcess,
      content: translationResult.data?.fileContent,
      locale: task.targetLocale,
    });

    return {
      key: task.dictionaryKey,
      result: processedPerLocaleDictionary,
    } as const;
  } catch (error) {
    const errorMessage = extractErrorMessage(error);

    appLogger(
      `${task.dictionaryPreset}${localePreset} ${colorize('Error filling:', ANSIColors.RED)} ${colorize(errorMessage, ANSIColors.GREY_DARK)}`,
      {
        level: 'error',
      }
    );
    return { key: task.dictionaryKey, result: null } as const;
  }
};
