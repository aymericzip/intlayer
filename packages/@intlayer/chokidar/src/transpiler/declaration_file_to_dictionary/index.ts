import { getConfiguration } from '@intlayer/config';
import { buildI18nDictionary } from './i18n_dictionary/index';
import { buildIntlayerDictionary } from './intlayer_dictionary/index';

const {
  content: { dictionaryOutput },
} = getConfiguration();

export const buildDictionary = async (
  contentDeclarationsPaths: string | string[]
): Promise<string[]> => {
  if (dictionaryOutput.includes('i18next')) {
    await buildI18nDictionary(contentDeclarationsPaths);
  }

  if (dictionaryOutput.includes('intlayer')) {
    return await buildIntlayerDictionary(contentDeclarationsPaths);
  }

  return [];
};
