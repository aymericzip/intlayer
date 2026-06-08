import type { AIConfig } from '@intlayer/ai';
import {
  chunkJSON,
  type JSONObject,
  mergeChunks,
  reconstructFromSingleChunk,
  reduceObjectFormat,
  verifyIdenticObjectFormat,
} from '@intlayer/chokidar/utils';
import type { Locale } from '@intlayer/types/allLocales';
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

export class AbortError extends Error {
  constructor() {
    super('Aborted');
    this.name = 'AbortError';
  }
}

export type TranslateDictionaryDBOptions = {
  content: JSONObject | JSONArray;
  sourceLocale: Locale;
  targetLocales: Locale[];
  aiConfig: AIConfig;
  mode?: 'complete' | 'review';
  dictionaryDescription?: string;
  applicationContext?: string;
  /** Called between chunks. Return true to abort the translation. */
  shouldStop?: () => Promise<boolean> | boolean;
  /** Called just before each chunk starts translating. */
  onChunkStart?: (params: {
    locale: Locale;
    chunkIndex: number;
    totalChunks: number;
  }) => Promise<void> | void;
};

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONArray extends Array<JSONValue> {}

export const translateDictionaryDB = async ({
  content,
  sourceLocale,
  targetLocales,
  aiConfig,
  mode = 'complete',
  dictionaryDescription,
  applicationContext,
  shouldStop,
  onChunkStart,
}: TranslateDictionaryDBOptions): Promise<
  Record<Locale, JSONObject | JSONArray>
> => {
  const chunks = chunkJSON(content, CHUNK_SIZE);
  const results: Record<Locale, JSONObject | JSONArray> = {} as Record<
    Locale,
    JSONObject | JSONArray
  >;

  for (const targetLocale of targetLocales) {
    logger.info(`Translating to ${targetLocale}... (${chunks.length} chunks)`);

    const chunkResults: any[] = [];

    // Process chunks sequentially to avoid rate limits per dictionary
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const chunk = chunks[chunkIndex];

      // Notify caller of chunk start (for progress reporting)
      if (onChunkStart) {
        await onChunkStart({
          locale: targetLocale,
          chunkIndex,
          totalChunks: chunks.length,
        });
      }

      // Check for pause / cancel between every chunk
      if (shouldStop && (await shouldStop())) {
        throw new AbortError();
      }

      const chunkContent = reconstructFromSingleChunk(chunk);
      // Helper: if chunkContent is string/number/null, wrap it?
      // chunkJSON guarantees root is object/array.

      const presetOutputContent = reduceObjectFormat(
        chunkContent, // In a real scenario, we might want to pass existing translation here
        chunkContent
      ) as any;

      const translatedChunk = await retry(async () => {
        const result = await translateJSON({
          entryFileContent: chunkContent,
          presetOutputContent,
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
