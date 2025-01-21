// @ts-ignore @intlayer/backend is not build yet
import { type DictionaryAPI } from '@intlayer/backend';
import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { getIntlayerAPI } from '../getIntlayerAPI/index';

/**
 * Fetch distant dictionary
 */
export const fetchDistantDictionary = async (
  dictionaryKey: string,
  intlayerConfig?: IntlayerConfig
): Promise<DictionaryAPI | undefined> => {
  try {
    const config = intlayerConfig ?? getConfiguration();
    const { clientId, clientSecret } = config.editor;

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const intlayerAPI = getIntlayerAPI(undefined, config);

    const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

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

    return distantDictionary;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
