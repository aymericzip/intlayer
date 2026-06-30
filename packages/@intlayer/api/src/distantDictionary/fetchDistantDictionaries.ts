import type { DictionaryAPI } from '@intlayer/backend';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createIntlayerCMS } from '../cms/createIntlayerCMS';
import { dictionaryEndpoint } from '../getIntlayerAPI/dictionary';

/**
 * Fetch distant dictionary
 */
export const fetchDistantDictionaries = async (
  intlayerConfig: IntlayerConfig
): Promise<DictionaryAPI[] | null | undefined> => {
  try {
    const { clientId, clientSecret } = intlayerConfig.editor;

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://app.intlayer.org/project.'
      );
    }

    const dictionary = dictionaryEndpoint(createIntlayerCMS(intlayerConfig));

    // Fetch the dictionary list
    const getDictionaryResult = await dictionary.getDictionaries();

    const distantDictionaries = getDictionaryResult.data;

    return distantDictionaries;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
