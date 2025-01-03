import type { Dictionary } from '@intlayer/core';
import { createI18nextDictionaries } from './convertContentDeclarationInto18nDictionaries';
import {
  writeDictionary,
  type DictionariesDeclaration,
} from './writeDictionary';

/**
 * This function transpile content declaration to i18n dictionaries
 */
export const buildI18nDictionary = async (
  contentDeclarations: Dictionary[]
) => {
  // Create dictionaries for each nested content and format them
  const dictionariesDeclaration: DictionariesDeclaration =
    contentDeclarations.reduce((acc, dictionary) => {
      const { key, content } = dictionary;
      const i18Content = createI18nextDictionaries(content);

      return {
        ...acc,
        [key]: i18Content,
      };
    }, {});

  // Write the dictionaries to the file system
  const dictionariesPaths: string[] = await writeDictionary(
    dictionariesDeclaration
  );

  return dictionariesPaths;
};
