import { type AIOptions, getIntlayerAPIProxy } from '@intlayer/api';
import {
  assembleJSON,
  chunkJSON,
  extractErrorMessage,
  formatLocale,
  type JsonChunk,
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
  getFilterMissingTranslationsContent,
  getFilterTranslationsOnlyContent,
  getLocalizedContent,
} from '@intlayer/core';
import type { TranslationTask } from './listTranslationsTasks';

export const translateDictionary = async (
  task: TranslationTask,
  dictionariesRecord: Record<string, Dictionary>,
  maxLocaleLength: number,
  mode: 'complete' | 'review',
  configuration: IntlayerConfig,
  aiOptions?: AIOptions
) => {
  const appLogger = getAppLogger(configuration);
  const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

  let dictionaryToProcess: Dictionary = dictionariesRecord[task.dictionaryKey];

  /**
   * In complete mode, for large dictionaries, we want to filter all content that is already translated
   */
  if (mode === 'complete') {
    dictionaryToProcess = getFilterMissingTranslationsContent(
      dictionaryToProcess as unknown as ContentNode,
      task.targetLocale,
      { dictionaryKey: task.dictionaryKey, keyPath: [] }
    );
  }

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

  /**
   * Extract the content of the default locale as entry
   */
  const sourceLocaleContent = getFilterTranslationsOnlyContent(
    dictionaryToProcess as unknown as ContentNode,
    task.sourceLocale,
    { dictionaryKey: task.dictionaryKey, keyPath: [] }
  );

  /**
   * Extract the content of the target locale as preset
   */
  const presetOutputContent = getLocalizedContent(
    dictionaryToProcess as unknown as ContentNode,
    task.targetLocale,
    { dictionaryKey: task.dictionaryKey, keyPath: [] }
  );

  const chunkedJsonContent: JsonChunk[] = chunkJSON(
    sourceLocaleContent.content,
    1000
  );

  try {
    const translationsResults: JsonChunk[] = [];

    for (const chunk of chunkedJsonContent) {
      const translationResult = await intlayerAPI.ai.translateJSON({
        entryFileContent: chunk as unknown as JSON,
        presetOutputContent: presetOutputContent.content,
        dictionaryDescription: dictionaryToProcess.description ?? '',
        entryLocale: task.sourceLocale,
        outputLocale: task.targetLocale,
        mode,
        aiOptions,
      });

      if (typeof translationResult.data?.fileContent !== 'string') {
        appLogger(`${task.dictionaryPreset}${localePreset} No content result`, {
          level: 'error',
        });
        return { key: task.dictionaryKey, result: null } as const;
      }

      const parsedTranslationResult = JSON.parse(
        translationResult.data.fileContent!
      ) as Partial<Dictionary['content']>;

      translationsResults.push(parsedTranslationResult as JsonChunk);
    }

    const reconciliateChunks = assembleJSON(translationsResults as JsonChunk[]);

    const processedPerLocaleDictionary = processPerLocaleDictionary({
      ...dictionaryToProcess,
      content: reconciliateChunks,
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
