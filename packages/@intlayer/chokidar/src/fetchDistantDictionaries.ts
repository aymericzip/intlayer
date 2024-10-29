// @ts-ignore: during build @intlayer/backend not build yes
import { Dictionary } from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config';
// @ts-ignore: during build @intlayer/design-system not build yes
import { intlayerAPI } from '@intlayer/design-system/libs';

type FetchDictionariesOptions = {
  dictionaries?: string[];
  logPrefix?: string;
};

/**
 * Get distant dictionaries and return the dictionary list
 */
export const fetchDistantDictionaries = async (
  options?: FetchDictionariesOptions
): Promise<Dictionary[]> => {
  const {
    editor: { clientId, clientSecret, backendURL },
  } = getConfiguration();
  const logPrefix = options?.logPrefix ?? '';
  if (!clientId || !clientSecret) {
    throw new Error(
      `${logPrefix}Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.`
    );
  }

  try {
    const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

    const filters = options?.dictionaries ? { ids: options?.dictionaries } : {};

    const getDictionariesResult = await intlayerAPI.dictionary.getDictionaries(
      filters,
      { headers: { Authorization: `Bearer ${oAuth2AccessToken}` } }
    );

    if (!getDictionariesResult.data) {
      throw new Error(`${logPrefix}No distant dictionaries found`);
    }

    const distantDictionaries = getDictionariesResult.data;

    return distantDictionaries;
  } catch (_err) {
    console.error(
      `${logPrefix}Cannot fetch distant dictionaries at ${backendURL}`
    );
  }

  return [];
};
