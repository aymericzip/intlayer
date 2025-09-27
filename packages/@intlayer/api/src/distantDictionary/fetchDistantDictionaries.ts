// @ts-ignore @intlayer/backend is not build yet
import { type DictionaryAPI } from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import { type IntlayerConfig } from '@intlayer/config/client';
import { getIntlayerAPIProxy } from '../proxy';

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

    const api = getIntlayerAPIProxy(undefined, intlayerConfig);

    // Fetch the dictionary list
    const getDictionaryResult = await api.dictionary.getDictionaries();

    const distantDictionaries = getDictionaryResult.data;

    return distantDictionaries;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
