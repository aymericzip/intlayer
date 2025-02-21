import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { buildI18nDictionary } from './i18next_dictionary/index';
import { buildIntlayerDictionary } from './intlayer_dictionary/index';

const {
  content: { dictionaryOutput },
} = getConfiguration();

export const buildDictionary = async (
  dictionaries: Dictionary[]
): Promise<string[]> => {
  if (dictionaryOutput.includes('i18next')) {
    await buildI18nDictionary(dictionaries);
  }

  if (dictionaryOutput.includes('intlayer')) {
    return await buildIntlayerDictionary(dictionaries);
  }

  return [];
};
