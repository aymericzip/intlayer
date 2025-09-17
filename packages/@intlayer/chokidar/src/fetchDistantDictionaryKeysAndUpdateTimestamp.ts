import { getIntlayerAPI } from '@intlayer/api';
import { getConfiguration, type IntlayerConfig } from '@intlayer/config';

export const fetchDistantDictionaryKeysAndUpdateTimestamp = async (
  configuration: IntlayerConfig = getConfiguration()
): Promise<Record<string, number>> => {
  const { clientId, clientSecret } = configuration.editor;

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
    );
  }

  const intlayerAPI = getIntlayerAPI(undefined, configuration);

  const oAuth2TokenResult = await intlayerAPI.oAuth.getOAuth2AccessToken();

  const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

  // Get the list of dictionary keys
  const getDictionariesKeysResult =
    await intlayerAPI.dictionary.getDictionariesUpdateTimestamp({
      ...(oAuth2AccessToken && {
        headers: {
          Authorization: `Bearer ${oAuth2AccessToken}`,
        },
      }),
    });

  if (!getDictionariesKeysResult.data) {
    throw new Error('No distant dictionaries found');
  }

  const distantDictionariesUpdateTimeStamp: Record<string, number> =
    getDictionariesKeysResult.data;

  // Apply any filtering if needed
  return distantDictionariesUpdateTimeStamp;
};
