import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { buildI18nDictionary } from './i18next_dictionary/index';
import { buildIntlayerDictionary } from './intlayer_dictionary/index';

export const buildDictionary = async (
  dictionaries: Dictionary[],
  configuration = getConfiguration()
): Promise<string[]> => {
  const { dictionaryOutput } = configuration.content;

  if (dictionaryOutput.includes('i18next')) {
    await buildI18nDictionary(dictionaries, configuration);
  }

  if (dictionaryOutput.includes('intlayer')) {
    return await buildIntlayerDictionary(dictionaries, configuration);
  }

  return [];
};
