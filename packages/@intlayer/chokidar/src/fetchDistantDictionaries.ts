import { getIntlayerAPI } from '@intlayer/api';
// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { appLogger, getConfiguration } from '@intlayer/config';
import pLimit from 'p-limit';
import { logger } from './log';

type FetchDistantDictionariesOptions = {
  dictionaryKeys: string[];
  newDictionariesPath?: string;
  logPrefix?: string;
};

/**
 * Fetch distant dictionaries and update the logger with their statuses.
 */
export const fetchDistantDictionaries = async (
  options: FetchDistantDictionariesOptions
): Promise<DictionaryAPI[]> => {
  try {
    const config = getConfiguration();
    const { clientId, clientSecret } = config.editor;
    const intlayerAPI = getIntlayerAPI(undefined, config);

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

    const distantDictionariesKeys = options.dictionaryKeys;

    // Process dictionaries in parallel with a concurrency limit
    const limit = pLimit(5); // Limit the number of concurrent requests

    const processDictionary = async (
      dictionaryKey: string
    ): Promise<DictionaryAPI | undefined> => {
      logger.updateStatus([
        {
          dictionaryKey,
          type: 'distant',
          status: { status: 'fetching' },
        },
      ]);

      try {
        // Fetch the dictionary
        const getDictionaryResult = await intlayerAPI.dictionary.getDictionary(
          dictionaryKey,
          undefined,
          {
            headers: { Authorization: `Bearer ${oAuth2AccessToken}` },
          }
        );

        const distantDictionary = getDictionaryResult.data;

        if (!distantDictionary) {
          throw new Error(`Dictionary ${dictionaryKey} not found on remote`);
        }

        logger.updateStatus([
          { dictionaryKey, type: 'distant', status: { status: 'imported' } },
        ]);

        return distantDictionary;
      } catch (error) {
        logger.updateStatus([
          {
            dictionaryKey,
            type: 'distant',
            status: {
              status: 'error',
              error: error as Error,
              errorMessage: `${options?.logPrefix ?? ''}Error fetching dictionary ${dictionaryKey}: ${error}`,
            },
          },
        ]);
        return undefined;
      }
    };

    const fetchPromises = distantDictionariesKeys.map((dictionaryKey) =>
      limit(async () => await processDictionary(dictionaryKey))
    );

    const result = await Promise.all(fetchPromises);

    // Output any error messages
    const statuses = logger.getStatuses();
    for (const statusObj of statuses) {
      const currentState = statusObj.state.find((s) => s.type === 'distant');
      if (currentState && currentState.errorMessage) {
        appLogger(currentState.errorMessage, { level: 'error' });
      }
    }

    // Remove undefined values
    const filteredResult = result.filter(
      (dict): dict is DictionaryAPI => dict !== undefined
    );

    return filteredResult;
  } catch (error) {
    appLogger(error, { level: 'error' });
    return [];
  }
};
