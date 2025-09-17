import { Locales } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { ContentNode, getMissingLocalesContent } from '@intlayer/core';
import unmergedDictionariesRecord from '@intlayer/unmerged-dictionaries-entry';

export const listMissingTranslations = () => {
  const missingTranslations: {
    key: keyof typeof unmergedDictionariesRecord;
    filePath?: string;
    locales: Locales[];
  }[] = [];

  for (const dictionaries of Object.values(unmergedDictionariesRecord)) {
    for (const dictionary of dictionaries) {
      const missingLocales = getMissingLocalesContent(
        dictionary as unknown as ContentNode,
        configuration.internationalization.locales,
        {
          dictionaryKey: dictionary.key,
          keyPath: [],
          plugins: [],
        }
      );

      if (missingLocales.length > 0) {
        missingTranslations.push({
          key: dictionary.key,
          filePath: dictionary.filePath,
          locales: missingLocales,
        });
      }
    }
  }

  return missingTranslations;
};
