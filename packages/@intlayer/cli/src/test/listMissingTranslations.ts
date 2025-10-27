import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config';
import { getMissingLocalesContent } from '@intlayer/core';
import type { ContentNode, Dictionary, Locale } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

export const listMissingTranslations = (
  dictionariesRecord?: Record<string, Dictionary[]>,
  configurationOptions?: GetConfigurationOptions
) => {
  const configuration = getConfiguration(configurationOptions);
  const unmergedDictionariesRecord =
    dictionariesRecord ?? getUnmergedDictionaries(configuration);

  const missingTranslations: {
    key: string;
    filePath?: string;
    locales: Locale[];
  }[] = [];

  const { locales, requiredLocales } = configuration.internationalization;

  for (const dictionaries of Object.values(unmergedDictionariesRecord)) {
    for (const dictionary of dictionaries as unknown as Dictionary[]) {
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

  const missingLocalesSet = new Set(
    missingTranslations.flatMap((t) => t.locales)
  );
  const missingLocales = Array.from(missingLocalesSet);

  const missingRequiredLocales = missingLocales.filter((locale) =>
    (requiredLocales ?? locales).includes(locale)
  );

  return { missingTranslations, missingLocales, missingRequiredLocales };
};
