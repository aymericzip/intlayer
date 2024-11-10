import { getConfiguration } from '@intlayer/config';
// @ts-ignore @intlayer/design-system not build yet
import { intlayerAPI } from '@intlayer/design-system/libs';

export const fetchDistantDictionaryKeys = async (): Promise<string[]> => {
  const {
    editor: { clientId, clientSecret },
  } = getConfiguration();

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
    );
  }

  const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

  const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

  // Get the list of dictionary keys
  const getDictionariesKeysResult =
    await intlayerAPI.dictionary.getDictionariesKeys({
      headers: { Authorization: `Bearer ${oAuth2AccessToken}` },
    });

  if (!getDictionariesKeysResult.data) {
    throw new Error('No distant dictionaries found');
  }

  const distantDictionariesKeys: string[] = getDictionariesKeysResult.data;

  // Apply any filtering if needed
  return distantDictionariesKeys;
};
