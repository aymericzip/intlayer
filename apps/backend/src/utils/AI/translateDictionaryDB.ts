import type { AIConfig } from '@intlayer/ai';
import {
  chunkJSON,
  type JSONObject,
  reconstructFromSingleChunk,
  reduceObjectFormat,
  verifyIdenticObjectFormat,
} from '@intlayer/chokidar';
import type { Locale } from '@intlayer/types';
import { logger } from '@logger';
import { translateJSON } from './translateJSON';

const CHUNK_SIZE = 3000;
const MAX_RETRY = 3;
const RETRY_DELAY = 2000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const retry = async <T>(
  fn: () => Promise<T>,
  retries = MAX_RETRY
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await sleep(RETRY_DELAY);
    return retry(fn, retries - 1);
  }
};

export type TranslateDictionaryDBOptions = {
  content: JSONObject | JSONArray;
  sourceLocale: Locale;
  targetLocales: Locale[];
  aiConfig: AIConfig;
  mode?: 'complete' | 'review';
  dictionaryDescription?: string;
  applicationContext?: string;
};

export const translateDictionaryDB = async ({
  content,
  sourceLocale,
  targetLocales,
  aiConfig,
  mode = 'complete',
  dictionaryDescription,
  applicationContext,
}: TranslateDictionaryDBOptions): Promise<
  Record<Locale, JSONObject | JSONArray>
> => {
  const chunks = chunkJSON(content, CHUNK_SIZE);
  const results: Record<Locale, JSONObject | JSONArray> = {} as any;

  for (const targetLocale of targetLocales) {
    logger.info(`Translating to ${targetLocale}... (${chunks.length} chunks)`);

    const chunkResults: any[] = [];

    // Process chunks sequentially to avoid rate limits per dictionary
    // (Optimization: could be parallelized with rate limiting)
    for (const chunk of chunks) {
      const chunkContent = reconstructFromSingleChunk(chunk);
      // Helper: if chunkContent is string/number/null, wrap it?
      // chunkJSON guarantees root is object/array.

      const presetOutputContent = reduceObjectFormat(
        chunkContent as any, // In a real scenario, we might want to pass existing translation here
        chunkContent as any
      );

      const translatedChunk = await retry(async () => {
        const result = await translateJSON({
          entryFileContent: chunkContent as any,
          presetOutputContent: presetOutputContent as any,
          entryLocale: sourceLocale,
          outputLocale: targetLocale,
          mode,
          aiConfig,
          dictionaryDescription,
          applicationContext,
          tags: [], // Tags handling could be added if needed
        });

        if (!result?.fileContent) {
          throw new Error('No content returned from AI');
        }

        const verification = verifyIdenticObjectFormat(
          result.fileContent,
          chunkContent
        );

        if (!verification.isIdentic) {
          throw new Error(`Format verification failed: ${verification.error}`);
        }

        return result.fileContent;
      });

      chunkResults.push(translatedChunk);
    }

    results[targetLocale] = mergeChunks(chunkResults);
  }

  return results;
};
