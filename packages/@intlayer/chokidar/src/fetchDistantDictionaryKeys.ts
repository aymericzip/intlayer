import { getIntlayerAPI } from '@intlayer/api';
import { getConfiguration, type IntlayerConfig } from '@intlayer/config';

export const fetchDistantDictionaryKeys = async (
  configuration: IntlayerConfig = getConfiguration()
): Promise<string[]> => {
  const { clientId, clientSecret } = configuration.editor;

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
    );
  }

  const intlayerAPI = getIntlayerAPI(undefined, configuration);

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
