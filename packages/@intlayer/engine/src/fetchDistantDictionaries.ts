import { createIntlayerCMS } from '@intlayer/api';
import { dictionaryEndpoint } from '@intlayer/api/dictionary';
// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getAppLogger, x } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { retryManager } from '@intlayer/config/utils';
import type { DictionariesStatus } from './loadDictionaries';
import { chunkArray } from './utils/chunkArray';
import { parallelize } from './utils/parallelize';

/**
 * Number of dictionaries requested per HTTP call. Must stay under the batch
 * limit enforced by the backend (`MAX_DICTIONARY_KEYS_PER_REQUEST`).
 */
const DEFAULT_DICTIONARIES_PER_REQUEST = 3;

/** Number of batch requests kept in flight at the same time. */
const DEFAULT_PARALLEL_REQUESTS = 5;

/** Number of retries performed on a failing batch request. */
const DEFAULT_MAX_RETRY = 2;

/** Delay between two attempts of a failing batch request, in milliseconds. */
const DEFAULT_RETRY_DELAY = 250;

/** HTTP statuses worth another attempt despite being client errors. */
const RETRYABLE_CLIENT_ERROR_STATUSES = new Set([408, 425, 429]);

/**
 * A request is worth retrying when it failed for a reason another attempt could
 * fix: a network error (no status at all) or a server-side / throttling status.
 * Replaying a `404` or a `401` only multiplies the noise.
 */
const isRetryableError = (error: unknown): boolean => {
  const status = (error as { status?: number })?.status;

  if (typeof status !== 'number') return true;

  if (status >= 500) return true;

  return RETRYABLE_CLIENT_ERROR_STATUSES.has(status);
};

/**
 * A backend that predates the batch endpoint routes `/dictionary/by-keys` to
 * its `/dictionary/:dictionaryKey` handler, which answers `404` - either as an
 * unknown dictionary or as an unknown route. Both mean the same thing here:
 * this backend cannot serve batches, so fall back to one request per key.
 */
const isBatchEndpointUnsupported = (error: unknown): boolean =>
  (error as { status?: number })?.status === 404;

type FetchDistantDictionariesOptions = {
  dictionaryKeys: string[];
  newDictionariesPath?: string;
  logPrefix?: string;
  /**
   * Number of dictionaries fetched by a single request.
   * @default 3
   */
  dictionariesPerRequest?: number;
  /**
   * Number of requests kept in flight at the same time.
   * @default 5
   */
  parallelRequests?: number;
  /**
   * Number of retries performed when a batch request fails.
   * @default 2
   */
  maxRetry?: number;
  /**
   * Delay between two attempts of a failing batch request, in milliseconds.
   * @default 250
   */
  retryDelay?: number;
};

/**
 * Fetch distant dictionaries and update the logger with their statuses.
 *
 * Keys are grouped into batches fetched by a single request each, and those
 * requests are kept in flight together — by default 5 concurrent requests of 3
 * dictionaries, so 15 dictionaries travel at any given time. A slot is refilled
 * as soon as its request settles, so no batch waits for the whole wave.
 * Failing requests are retried before their keys are reported as errors.
 */
export const fetchDistantDictionaries = async (
  options: FetchDistantDictionariesOptions,
  onStatusUpdate?: (status: DictionariesStatus[]) => void
): Promise<DictionaryAPI[]> => {
  const config = getConfiguration();
  const appLogger = getAppLogger(config);
  try {
    const dictionary = dictionaryEndpoint(createIntlayerCMS(config));

    const {
      dictionariesPerRequest = DEFAULT_DICTIONARIES_PER_REQUEST,
      parallelRequests = DEFAULT_PARALLEL_REQUESTS,
      maxRetry = DEFAULT_MAX_RETRY,
      retryDelay = DEFAULT_RETRY_DELAY,
    } = options;

    // A same key can be listed twice when several qualified dictionaries share
    // it - one request per key is enough to retrieve all of its siblings.
    const distantDictionariesKeys = [...new Set(options.dictionaryKeys)];

    if (distantDictionariesKeys.length === 0) return [];

    const batches = chunkArray(distantDictionariesKeys, dictionariesPerRequest);

    // Flipped once for the whole run as soon as a backend proves unable to
    // serve batches, so the remaining batches skip the doomed request.
    let isBatchEndpointSupported = true;
    let hasLoggedBatchFallback = false;

    /**
     * Fetch each key of a batch with its own request. Used against backends
     * without the batch endpoint. A key missing on the remote only discards
     * itself, never its neighbours.
     */
    const requestDictionariesOneByOne = async (
      batchKeys: string[]
    ): Promise<DictionaryAPI[]> => {
      const results = await parallelize(
        batchKeys,
        async (dictionaryKey) => {
          try {
            const getDictionaryResult =
              await dictionary.getDictionary(dictionaryKey);

            return getDictionaryResult.data;
          } catch (_error) {
            return undefined;
          }
        },
        batchKeys.length
      );

      return results.filter(
        (distantDictionary): distantDictionary is DictionaryAPI =>
          distantDictionary !== undefined
      );
    };

    /**
     * Request one batch of dictionaries, retrying the whole request when it
     * fails for a transient reason - a batch carries several dictionaries, so
     * a network hiccup would otherwise discard all of them at once.
     */
    const requestBatch = retryManager(
      async (batchKeys: string[]): Promise<DictionaryAPI[]> => {
        if (isBatchEndpointSupported) {
          try {
            const getDictionariesResult =
              await dictionary.getDictionariesByKeys(batchKeys);

            return getDictionariesResult.data ?? [];
          } catch (error) {
            if (!isBatchEndpointUnsupported(error)) throw error;

            isBatchEndpointSupported = false;

            if (!hasLoggedBatchFallback) {
              hasLoggedBatchFallback = true;
              appLogger(
                'This backend does not provide the batch dictionary endpoint - falling back to one request per dictionary.',
                { level: 'warn' }
              );
            }
          }
        }

        return await requestDictionariesOneByOne(batchKeys);
      },
      {
        maxRetry,
        delay: retryDelay,
        shouldRetry: isRetryableError,
        onError: ({ error, attempt }) =>
          appLogger(
            `Retrying distant dictionaries request (attempt ${attempt + 1}/${maxRetry}): ${error}`,
            { level: 'warn' }
          ),
      }
    );

    /**
     * Fetch one batch of dictionaries within a single request, and report the
     * resulting status of every key it contains.
     */
    const processBatch = async (
      batchKeys: string[]
    ): Promise<DictionaryAPI[]> => {
      onStatusUpdate?.(
        batchKeys.map((dictionaryKey) => ({
          dictionaryKey,
          type: 'remote',
          status: 'fetching',
        }))
      );

      try {
        const distantDictionaries = await requestBatch(batchKeys);

        const fetchedKeys = new Set(
          distantDictionaries.map(
            (distantDictionary: DictionaryAPI) => distantDictionary.key
          )
        );

        onStatusUpdate?.(
          batchKeys.map(
            (dictionaryKey): DictionariesStatus =>
              fetchedKeys.has(dictionaryKey)
                ? {
                    dictionaryKey,
                    type: 'remote',
                    status: 'fetched',
                  }
                : {
                    dictionaryKey,
                    type: 'remote',
                    status: 'error',
                    error: `Dictionary ${dictionaryKey} not found on remote`,
                  }
          )
        );

        return distantDictionaries;
      } catch (error) {
        onStatusUpdate?.(
          batchKeys.map((dictionaryKey) => ({
            dictionaryKey,
            type: 'remote',
            status: 'error',
            error: `Error fetching dictionary ${dictionaryKey}: ${error}`,
          }))
        );
        return [];
      }
    };

    const batchResults = await parallelize(
      batches,
      processBatch,
      parallelRequests
    );

    return batchResults.flat();
  } catch (_error) {
    appLogger(`${x} Failed to fetch distant dictionaries`, { level: 'error' });
    return [];
  }
};
