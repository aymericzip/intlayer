// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { getIntlayerAPIProxy } from '../proxy';

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

    const api = getIntlayerAPIProxy(undefined, intlayerConfig);

    // Fetch the dictionary
    const getDictionaryResult =
      await api.dictionary.getDictionary(dictionaryKey);

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
