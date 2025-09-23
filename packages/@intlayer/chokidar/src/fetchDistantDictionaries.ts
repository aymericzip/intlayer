import { getIntlayerAPIProxy } from '@intlayer/api';
// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getAppLogger, getConfiguration, x } from '@intlayer/config';
import { DictionariesStatus } from './loadDictionaries';
import { parallelize } from './utils/parallelize';

type FetchDistantDictionariesOptions = {
  dictionaryKeys: string[];
  newDictionariesPath?: string;
  logPrefix?: string;
};

/**
 * Fetch distant dictionaries and update the logger with their statuses.
 */
export const fetchDistantDictionaries = async (
  options: FetchDistantDictionariesOptions,
  onStatusUpdate?: (status: DictionariesStatus[]) => void
): Promise<DictionaryAPI[]> => {
  const config = getConfiguration();
  const appLogger = getAppLogger(config);
  try {
    const intlayerAPI = getIntlayerAPIProxy(undefined, config);

    const distantDictionariesKeys = options.dictionaryKeys;
    // Process dictionaries in parallel with a concurrency limit
    const processDictionary = async (
      dictionaryKey: string
    ): Promise<DictionaryAPI | undefined> => {
      onStatusUpdate?.([
        {
          dictionaryKey,
          type: 'remote',
          status: 'fetching',
        },
      ]);

      try {
        // Fetch the dictionary
        const getDictionaryResult =
          await intlayerAPI.dictionary.getDictionary(dictionaryKey);

        const distantDictionary = getDictionaryResult.data;

        if (!distantDictionary) {
          throw new Error(`Dictionary ${dictionaryKey} not found on remote`);
        }

        onStatusUpdate?.([
          { dictionaryKey, type: 'remote', status: 'fetched' },
        ]);

        return distantDictionary;
      } catch (error) {
        onStatusUpdate?.([
          {
            dictionaryKey,
            type: 'remote',
            status: 'error',
            error: `Error fetching dictionary ${dictionaryKey}: ${error}`,
          },
        ]);
        return undefined;
      }
    };

    const result = await parallelize(
      distantDictionariesKeys,
      async (dictionaryKey) => await processDictionary(dictionaryKey)
    );

    // Remove undefined values
    const filteredResult = result.filter(
      (dict: DictionaryAPI | undefined): dict is DictionaryAPI =>
        dict !== undefined
    );

    return filteredResult;
  } catch (error) {
    appLogger(`${x} Failed to fetch distant dictionaries`, { level: 'error' });
    return [];
  }
};
