import { getDictionaryAPI, getOAuthAPI } from '@intlayer/api';
// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import {
  ANSIColors,
  colorize,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
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
    const { clientId, clientSecret } = config.editor;
    const authAPI = getOAuthAPI(config);
    const dictionaryAPI = getDictionaryAPI(undefined, config);

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const oAuth2TokenResult = await authAPI.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

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
        const getDictionaryResult = await dictionaryAPI.getDictionary(
          dictionaryKey,
          undefined,
          {
            ...(oAuth2AccessToken && {
              headers: {
                Authorization: `Bearer ${oAuth2AccessToken}`,
              },
            }),
          }
        );

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
    appLogger(
      `${colorize('✗', ANSIColors.RED)} Failed to fetch distant dictionaries`,
      { level: 'error' }
    );
    return [];
  }
};
