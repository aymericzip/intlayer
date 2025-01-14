import { getIntlayerAPI } from '@intlayer/api';
// @ts-ignore @intlayer/backend not build yet
import { type DictionaryAPI } from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';
// @ts-ignore @intlayer/design-system not build yet

/**
 * Fetch distant dictionary
 */
export const fetchDistantDictionary = async (
  dictionaryKey: string
): Promise<DictionaryAPI> => {
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
