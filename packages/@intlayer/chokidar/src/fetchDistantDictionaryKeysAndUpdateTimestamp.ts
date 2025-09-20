import { getIntlayerAPIProxy } from '@intlayer/api';
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

  const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

  // Get the list of dictionary keys
  const getDictionariesKeysResult =
    await intlayerAPI.dictionary.getDictionariesUpdateTimestamp();

  if (!getDictionariesKeysResult.data) {
    throw new Error('No distant dictionaries found');
  }

  const distantDictionariesUpdateTimeStamp: Record<string, number> =
    getDictionariesKeysResult.data;

  // Apply any filtering if needed
  return distantDictionariesUpdateTimeStamp;
};
