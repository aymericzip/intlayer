// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { getAuthAPI } from '../getIntlayerAPI/auth';
import { getDictionaryAPI } from '../getIntlayerAPI/dictionary';

/**
 * Fetch distant dictionary
 */
export const fetchDistantDictionary = async (
  dictionaryKey: string,
  intlayerConfig: IntlayerConfig = configuration
): Promise<DictionaryAPI | undefined> => {
  try {
    const { clientId, clientSecret } = intlayerConfig?.editor;

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const dictionaryAPI = getDictionaryAPI(undefined, intlayerConfig);
    const authAPI = getAuthAPI(undefined, intlayerConfig);

    const oAuth2TokenResult = await authAPI.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

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

    return distantDictionary;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
