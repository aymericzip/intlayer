import { basename } from 'node:path';
import type { AIConfig } from '@intlayer/ai';
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
  getMultilingualDictionary,
  getPerLocaleDictionary,
  insertContentInDictionary,
} from '@intlayer/core';
import type { Dictionary, IntlayerConfig, Locale } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import type { AIClient } from '../utils/setupAI';
import { deepMergeContent } from './deepMergeContent';
import { getFilterMissingContentPerLocale } from './getFilterMissingContentPerLocale';
import type { TranslationTask } from './listTranslationsTasks';
import { mergeChunks } from './mergeChunks';

type TranslateDictionaryResult = TranslationTask & {
  dictionaryOutput: Dictionary | null;
};

type TranslateDictionaryOptions = {
  mode: 'complete' | 'review';
  aiOptions?: AIOptions;
  fillMetadata?: boolean;
  onHandle?: ReturnType<typeof import('@intlayer/chokidar').getGlobalLimiter>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  getAbortError?: () => Error | null;
  aiClient?: AIClient;
  aiConfig?: AIConfig;
};

const hasMissingMetadata = (dictionary: Dictionary) =>
  !dictionary.description || !dictionary.title || !dictionary.tags;

const CHUNK_SIZE = 7000; // GPT-5 Mini safe input size
const GROUP_MAX_RETRY = 2;
const MAX_RETRY = 3;
const RETRY_DELAY = 1000 * 10; // 10 seconds

const MAX_FOLLOWING_ERRORS = 10; // 10 errors in a row, hard exit the process
let followingErrors = 0;

export const translateDictionary = async (
  task: TranslationTask,
  configuration: IntlayerConfig,
  options?: TranslateDictionaryOptions
): Promise<TranslateDictionaryResult> => {
  const appLogger = getAppLogger(configuration);
  const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

  const { mode, aiOptions, fillMetadata, aiClient, aiConfig } = {
    mode: 'complete',
    fillMetadata: true,
    ...options,
  } as const;

  const notifySuccess = () => {
    followingErrors = 0;
    options?.onSuccess?.();
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

        const runAudit = async () => {
          if (aiClient && aiConfig) {
            const result = await aiClient.auditDictionaryMetadata({
              fileContent: JSON.stringify(defaultLocaleDictionary),
              aiConfig,
            });

            return {
              data: result,
            };
          }

          return await intlayerAPI.ai.auditContentDeclarationMetadata({
            fileContent: JSON.stringify(defaultLocaleDictionary),
            aiOptions,
          });
        };

        const metadataResult = options?.onHandle
          ? await options.onHandle(runAudit)
          : await runAudit();

        metadata = metadataResult.data?.fileContent;
      }

      const translatedContentResults = await Promise.all(
        task.targetLocales.map(async (targetLocale) => {
          /**
           * In complete mode, for large dictionaries, we want to filter all content that is already translated
           *
           * targetLocale: fr
           *
           * { test1: t({ ar: 'Hello', en: 'Hello', fr: 'Bonjour' } }) -> {}
           * { test2: t({ ar: 'Hello', en: 'Hello' }) } -> { test2: t({ ar: 'Hello', en: 'Hello' }) }
           *
           */
          // Reset to base dictionary for each locale to ensure we filter from the original
          let dictionaryToProcess = structuredClone(baseUnmergedDictionary);

          let targetLocaleDictionary: Dictionary;

          if (typeof baseUnmergedDictionary.locale === 'string') {
            // For per-locale files, the content is already in simple JSON format (not translation nodes)
            // The base dictionary is already the source locale content

            // Load the existing target locale dictionary
            const targetLocaleFilePath =
              baseUnmergedDictionary.filePath?.replace(
                new RegExp(`/${task.sourceLocale}/`, 'g'),
                `/${targetLocale}/`
              );

            // Find the target locale dictionary in unmerged dictionaries
            const targetUnmergedDictionary = targetLocaleFilePath
              ? unmergedDictionariesRecord[task.dictionaryKey]?.find(
                  (dict) =>
                    dict.filePath === targetLocaleFilePath &&
                    dict.locale === targetLocale
                )
              : undefined;

            targetLocaleDictionary = targetUnmergedDictionary ?? {
              key: baseUnmergedDictionary.key,
              content: {},
              filePath: targetLocaleFilePath,
              locale: targetLocale,
            };

            // In complete mode, filter out already translated content
            if (mode === 'complete') {
              dictionaryToProcess = getFilterMissingContentPerLocale(
                dictionaryToProcess,
                targetUnmergedDictionary
              );
            }
          } else {
            // For multilingual dictionaries
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

            targetLocaleDictionary = getPerLocaleDictionary(
              baseUnmergedDictionary,
              targetLocale
            );
          }

          const localePreset = colon(
            [
              colorize('[', ANSIColors.GREY_DARK),
              formatLocale(targetLocale),
              colorize(']', ANSIColors.GREY_DARK),
            ].join(''),
            { colSize: 18 }
          );

          const createChunkPreset = (
            chunkIndex: number,
            totalChunks: number
          ) => {
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

          const isContentStructured =
            (typeof dictionaryToProcess.content === 'object' &&
              dictionaryToProcess.content !== null) ||
            Array.isArray(dictionaryToProcess.content);

          const contentToProcess = isContentStructured
            ? dictionaryToProcess.content
            : {
                __INTLAYER_ROOT_PRIMITIVE_CONTENT__:
                  dictionaryToProcess.content,
              };

          const chunkedJsonContent: JsonChunk[] = chunkJSON(
            contentToProcess as unknown as Record<string, any>,
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
              isContentStructured
                ? targetLocaleDictionary.content
                : {
                    __INTLAYER_ROOT_PRIMITIVE_CONTENT__:
                      targetLocaleDictionary.content,
                  },
              chunkContent
            ) as unknown as JSON;

            const executeTranslation = async () => {
              return await retryManager(
                async () => {
                  let translationResult: any;

                  if (aiClient && aiConfig) {
                    translationResult = await aiClient.translateJSON({
                      entryFileContent: chunkContent as unknown as JSON,
                      presetOutputContent,
                      dictionaryDescription:
                        dictionaryToProcess.description ??
                        metadata?.description ??
                        '',
                      entryLocale: task.sourceLocale,
                      outputLocale: targetLocale,
                      mode,
                      aiConfig,
                    });
                  } else {
                    translationResult = await intlayerAPI.ai
                      .translateJSON({
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
                      })
                      .then((result) => result.data);
                  }

                  if (!translationResult?.fileContent) {
                    throw new Error('No content result');
                  }

                  const { isIdentic } = verifyIdenticObjectFormat(
                    translationResult.fileContent,
                    chunkContent
                  );

                  if (!isIdentic) {
                    throw new Error(
                      'Translation result does not match expected format'
                    );
                  }

                  notifySuccess();
                  return translationResult.fileContent;
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
                      `${task.dictionaryPreset}${localePreset}${chunkPreset} ${colorize('Error filling:', ANSIColors.RED)} ${colorize(typeof error === 'string' ? error : JSON.stringify(error), ANSIColors.GREY_DARK)} - Attempt ${colorizeNumber(attempt + 1)} of ${colorizeNumber(maxRetry)}`,
                      {
                        level: 'error',
                      }
                    );

                    followingErrors += 1;

                    if (followingErrors >= MAX_FOLLOWING_ERRORS) {
                      appLogger(`There is something wrong.`, {
                        level: 'error',
                      });
                      process.exit(1); // 1 for error
                    }
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
            .sort((chunkA, chunkB) => chunkA.chunk.index - chunkB.chunk.index)
            .forEach(({ result }) => {
              chunkResult.push(result);
            });

          // Merge partial JSON objects produced from each chunk into a single object
          const mergedContent = mergeChunks(chunkResult);

          const merged = {
            ...dictionaryToProcess,
            content: mergedContent,
          };

          // For per-locale files, merge the newly translated content with existing target content
          let finalContent = merged.content;

          if (!isContentStructured) {
            finalContent = (finalContent as any)
              ?.__INTLAYER_ROOT_PRIMITIVE_CONTENT__;
          }

          if (typeof baseUnmergedDictionary.locale === 'string') {
            // Deep merge: existing content + newly translated content
            finalContent = deepMergeContent(
              targetLocaleDictionary.content ?? {},
              finalContent
            );
          }

          return [targetLocale, finalContent] as const;
        })
      );

      const translatedContent: Partial<Record<Locale, Dictionary['content']>> =
        Object.fromEntries(translatedContentResults);

      const baseDictionary = baseUnmergedDictionary.locale
        ? {
            ...baseUnmergedDictionary,
            key: baseUnmergedDictionary.key!,
            content: {},
          }
        : baseUnmergedDictionary;

      let dictionaryOutput: Dictionary = {
        ...getMultilingualDictionary(baseDictionary),
        locale: undefined, // Ensure the dictionary is multilingual
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

      if (
        baseUnmergedDictionary.locale &&
        (baseUnmergedDictionary.fill === true ||
          baseUnmergedDictionary.fill === undefined) &&
        baseUnmergedDictionary.location === 'local'
      ) {
        const dictionaryFilePath = baseUnmergedDictionary
          .filePath!.split('.')
          .slice(0, -1);

        const contentIndex = dictionaryFilePath[dictionaryFilePath.length - 1];

        return JSON.parse(
          JSON.stringify({
            ...task,
            dictionaryOutput: {
              ...dictionaryOutput,
              fill: undefined,
              filled: true,
            },
          }).replaceAll(
            new RegExp(`\\.${contentIndex}\\.[a-zA-Z0-9]+`, 'g'),
            `.filled.${contentIndex}.json`
          )
        );
      }

      return {
        ...task,
        dictionaryOutput,
      };
    },
    {
      maxRetry: GROUP_MAX_RETRY,
      delay: RETRY_DELAY,
      onError: ({ error, attempt, maxRetry }) =>
        appLogger(
          `${task.dictionaryPreset} ${colorize('Error:', ANSIColors.RED)} ${colorize(typeof error === 'string' ? error : JSON.stringify(error), ANSIColors.GREY_DARK)} - Attempt ${colorizeNumber(attempt + 1)} of ${colorizeNumber(maxRetry)}`,
          {
            level: 'error',
          }
        ),
      onMaxTryReached: ({ error }) =>
        appLogger(
          `${task.dictionaryPreset} ${colorize('Maximum number of retries reached:', ANSIColors.RED)} ${colorize(typeof error === 'string' ? error : JSON.stringify(error), ANSIColors.GREY_DARK)}`,
          {
            level: 'error',
          }
        ),
    }
  )();

  return result as TranslateDictionaryResult;
};
