import { basename } from 'node:path';
import { type AIOptions, getIntlayerAPIProxy } from '@intlayer/api';
import {
  chunkJSON,
  formatLocale,
  type JsonChunk,
  reconstructFromSingleChunk,
  reduceObjectFormat,
  verifyIdenticObjectFormat,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeNumber,
  colorizePath,
  getAppLogger,
  retryManager,
} from '@intlayer/config';
import {
  getFilterMissingTranslationsDictionary,
  getPerLocaleDictionary,
  insertContentInDictionary,
  mergeDictionaries,
} from '@intlayer/core';
import type { Dictionary, IntlayerConfig, Locale } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import type { TranslationTask } from './listTranslationsTasks';

type TranslateDictionaryResult = TranslationTask & {
  dictionaryOutput: Dictionary | null;
};

type TranslateDictionaryOptions = {
  mode: 'complete' | 'review';
  aiOptions?: AIOptions;
  fillMetadata?: boolean;
  onHandle?: ReturnType<typeof import('@intlayer/chokidar').getGlobalLimiter>;
};

const hasMissingMetadata = (dictionary: Dictionary) =>
  !dictionary.description || !dictionary.title || !dictionary.tags;

const CHUNK_SIZE = 7000; // GPT-5 Mini safe input size
const GLOBAL_MAX_RETRY = 2;
const MAX_RETRY = 3;
const RETRY_DELAY = 1000 * 10; // 10 seconds

export const translateDictionary = async (
  task: TranslationTask,
  configuration: IntlayerConfig,
  options?: TranslateDictionaryOptions
): Promise<TranslateDictionaryResult> => {
  const appLogger = getAppLogger(configuration);
  const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

  const { mode, aiOptions, fillMetadata } = {
    mode: 'complete',
    fillMetadata: true,
    ...options,
  };

  const result = await retryManager(
    async () => {
      const unmergedDictionariesRecord = getUnmergedDictionaries(configuration);

      const baseUnmergedDictionary: Dictionary | undefined =
        unmergedDictionariesRecord[task.dictionaryKey].find(
          (dict) => dict.localId === task.dictionaryLocalId
        );

      if (!baseUnmergedDictionary) {
        appLogger(
          `${task.dictionaryPreset}Dictionary not found in unmergedDictionariesRecord. Skipping.`,
          {
            level: 'warn',
          }
        );
        return { ...task, dictionaryOutput: null };
      }

      let metadata:
        | Pick<Dictionary, 'description' | 'title' | 'tags'>
        | undefined;

      if (
        fillMetadata &&
        (hasMissingMetadata(baseUnmergedDictionary) || mode === 'review')
      ) {
        const defaultLocaleDictionary = getPerLocaleDictionary(
          baseUnmergedDictionary,
          configuration.internationalization.defaultLocale
        );

        appLogger(
          `${task.dictionaryPreset} Filling missing metadata for ${colorizePath(basename(baseUnmergedDictionary.filePath!))}`,
          {
            level: 'info',
          }
        );

        const runAudit = async () =>
          await intlayerAPI.ai.auditContentDeclarationMetadata({
            fileContent: JSON.stringify(defaultLocaleDictionary),
            aiOptions,
          });

        const metadataResult = options?.onHandle
          ? await options.onHandle(runAudit)
          : await runAudit();

        metadata = metadataResult.data?.fileContent;
      }

      let dictionaryToProcess = baseUnmergedDictionary;

      const translatedContent: Partial<Record<Locale, Dictionary['content']>> =
        {};

      for await (const targetLocale of task.targetLocales) {
        /**
         * In complete mode, for large dictionaries, we want to filter all content that is already translated
         *
         * targetLocale: fr
         *
         * { test1: t({ ar: 'Hello', en: 'Hello', fr: 'Bonjour' } }) -> {}
         * { test2: t({ ar: 'Hello', en: 'Hello' }) } -> { test2: t({ ar: 'Hello', en: 'Hello' }) }
         *
         */
        if (mode === 'complete') {
          // Remove all nodes that don't have any content to translate
          dictionaryToProcess = getFilterMissingTranslationsDictionary(
            dictionaryToProcess,
            targetLocale
          );
        }

        dictionaryToProcess = getPerLocaleDictionary(
          dictionaryToProcess,
          task.sourceLocale
        );

        const targetLocaleDictionary = getPerLocaleDictionary(
          baseUnmergedDictionary,
          targetLocale
        );

        const localePreset = colon(
          [
            colorize('[', ANSIColors.GREY_DARK),
            formatLocale(targetLocale),
            colorize(']', ANSIColors.GREY_DARK),
          ].join(''),
          { colSize: 10 }
        );

        const createChunkPreset = (chunkIndex: number, totalChunks: number) => {
          if (totalChunks <= 1) return '';
          return colon(
            [
              colorize('[', ANSIColors.GREY_DARK),
              colorizeNumber(chunkIndex + 1),
              colorize(`/${totalChunks}`, ANSIColors.GREY_DARK),
              colorize(']', ANSIColors.GREY_DARK),
            ].join(''),
            { colSize: 5 }
          );
        };

        appLogger(
          `${task.dictionaryPreset}${localePreset} Preparing ${colorizePath(basename(targetLocaleDictionary.filePath!))}`,
          {
            level: 'info',
          }
        );

        const chunkedJsonContent: JsonChunk[] = chunkJSON(
          dictionaryToProcess.content,
          CHUNK_SIZE
        );

        const nbOfChunks = chunkedJsonContent.length;

        if (nbOfChunks > 1) {
          appLogger(
            `${task.dictionaryPreset}${localePreset} Split into ${colorizeNumber(nbOfChunks)} chunks for translation`,
            {
              level: 'info',
            }
          );
        }

        const chunkResult: JsonChunk[] = [];

        // Process chunks in parallel (globally throttled) to allow concurrent translation
        const chunkPromises = chunkedJsonContent.map((chunk) => {
          const chunkPreset = createChunkPreset(chunk.index, chunk.total);

          if (nbOfChunks > 1) {
            appLogger(
              `${task.dictionaryPreset}${localePreset}${chunkPreset} Translating chunk`,
              {
                level: 'info',
              }
            );
          }

          // Reconstruct partial JSON content from this chunk's patches
          const chunkContent = reconstructFromSingleChunk(chunk);
          const presetOutputContent = reduceObjectFormat(
            targetLocaleDictionary.content,
            chunkContent
          );

          const executeTranslation = async () => {
            return await retryManager(
              async () => {
                const translationResult = await intlayerAPI.ai.translateJSON({
                  entryFileContent: chunkContent as unknown as JSON,
                  presetOutputContent,
                  dictionaryDescription:
                    dictionaryToProcess.description ??
                    metadata?.description ??
                    '',
                  entryLocale: task.sourceLocale,
                  outputLocale: targetLocale,
                  mode,
                  aiOptions,
                });

                if (!translationResult.data?.fileContent) {
                  throw new Error('No content result');
                }

                const { isIdentic } = verifyIdenticObjectFormat(
                  translationResult.data.fileContent,
                  chunkContent
                );
                if (!isIdentic) {
                  throw new Error(
                    'Translation result does not match expected format'
                  );
                }

                return translationResult.data.fileContent;
              },
              {
                maxRetry: MAX_RETRY,
                delay: RETRY_DELAY,
                onError: ({ error, attempt, maxRetry }) => {
                  const chunkPreset = createChunkPreset(
                    chunk.index,
                    chunk.total
                  );
                  appLogger(
                    `${task.dictionaryPreset}${localePreset}${chunkPreset} ${colorize('Error filling:', ANSIColors.RED)} ${colorize(error, ANSIColors.GREY_DARK)} - Attempt ${colorizeNumber(attempt + 1)} of ${colorizeNumber(maxRetry)}`,
                    {
                      level: 'error',
                    }
                  );
                },
              }
            )();
          };

          const wrapped = options?.onHandle
            ? options.onHandle(executeTranslation) // queued in global limiter
            : executeTranslation(); // no global limiter

          return wrapped.then((result) => ({ chunk, result }));
        });

        // Wait for all chunks for this locale in parallel (still capped by global limiter)
        const chunkResults = await Promise.all(chunkPromises);

        // Maintain order
        chunkResults
          .sort((a, b) => a.chunk.index - b.chunk.index)
          .forEach(({ result }) => {
            chunkResult.push(result);
          });

        // Merge partial JSON objects produced from each chunk into a single object
        const merged = mergeDictionaries(
          chunkResult.map((chunk) => ({
            ...dictionaryToProcess,
            content: chunk,
          }))
        );

        translatedContent[targetLocale] =
          merged.content as Dictionary['content'];
      }

      let dictionaryOutput: Dictionary = {
        ...baseUnmergedDictionary,
        ...metadata,
      };

      for (const targetLocale of task.targetLocales) {
        if (translatedContent[targetLocale]) {
          dictionaryOutput = insertContentInDictionary(
            dictionaryOutput,
            translatedContent[targetLocale],
            targetLocale
          );
        }
      }

      appLogger(
        `${task.dictionaryPreset} ${colorize('Translation completed successfully', ANSIColors.GREEN)} for ${colorizePath(basename(dictionaryOutput.filePath!))}`,
        {
          level: 'info',
        }
      );

      return {
        ...task,
        dictionaryOutput,
      };
    },
    {
      maxRetry: GLOBAL_MAX_RETRY,
      delay: RETRY_DELAY,
      onError: ({ error, attempt, maxRetry }) => {
        appLogger(
          `${task.dictionaryPreset} ${colorize('Error fill command:', ANSIColors.RED)} ${colorize(error, ANSIColors.GREY_DARK)} - Attempt ${colorizeNumber(attempt + 1)} of ${colorizeNumber(maxRetry)}`,
          {
            level: 'error',
          }
        );
      },
      onMaxTryReached: ({ error }) => {
        appLogger(
          `${task.dictionaryPreset} ${colorize('Maximum number of retries reached:', ANSIColors.RED)} ${colorize(error, ANSIColors.GREY_DARK)}`,
          {
            level: 'error',
          }
        );
      },
    }
  )();

  return result as TranslateDictionaryResult;
};
