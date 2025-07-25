// @ts-ignore @intlayer/backend is not build yet
import { type DictionaryAPI } from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import { type IntlayerConfig } from '@intlayer/config/client';
import { getDictionaryAPI } from '../getIntlayerAPI/dictionary';
import { getOAuthAPI } from '../getIntlayerAPI/oAuth';

/**
 * Fetch distant dictionary
 */
export const fetchDistantDictionaries = async (
  intlayerConfig: IntlayerConfig = configuration
): Promise<DictionaryAPI[] | null | undefined> => {
  try {
    const { clientId, clientSecret } = intlayerConfig?.editor;

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const dictionaryAPI = getDictionaryAPI(undefined, intlayerConfig);
    const authAPI = getOAuthAPI(intlayerConfig);
    const oAuth2AccessToken = await authAPI.getOAuth2AccessToken();

    // Fetch the dictionary
    const getDictionaryResult = await dictionaryAPI.getDictionaries(undefined, {
      ...(oAuth2AccessToken && {
        headers: {
          Authorization: `Bearer ${oAuth2AccessToken}`,
        },
      }),
    });

    const distantDictionaries = getDictionaryResult.data;

    return distantDictionaries;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
