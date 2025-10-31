import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config';
import { getMissingLocalesContentFromDictionary } from '@intlayer/core';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary, Locale } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

export const listMissingTranslations = (
  configurationOptions?: GetConfigurationOptions
) => {
  const configuration = getConfiguration(configurationOptions);
  const unmergedDictionariesRecord = getUnmergedDictionaries(configuration);
  const mergedDictionaries = getDictionaries(configuration);

  const missingTranslations: {
    key: string;
    filePath?: string;
    id?: string;
    locales: Locale[];
  }[] = [];

  const { locales, requiredLocales } = configuration.internationalization;

  const dictionariesKeys = Object.keys(unmergedDictionariesRecord);

  for (const dictionaryKey of dictionariesKeys) {
    const dictionaries: Dictionary[] =
      unmergedDictionariesRecord[dictionaryKey];

    const multilingualDictionary: Dictionary[] = dictionaries.filter(
      (dictionary) => !dictionary.locale
    );

    // 2 - Test all by merging all dictionaries to ensure no per-locale dictionary is missing
    for (const dictionary of multilingualDictionary) {
      const missingLocales = getMissingLocalesContentFromDictionary(
        dictionary,
        locales
      );

      if (missingLocales.length > 0) {
        missingTranslations.push({
          key: dictionaryKey,
          id: dictionary.id,
          filePath: dictionary.filePath,
          locales: missingLocales,
        });
      }
    }

    const perLocaleDictionary: Dictionary[] = dictionaries.filter(
      (dictionary) => dictionary.locale
    );

    if (perLocaleDictionary.length === 0) {
      continue;
    }

    const mergedDictionary = mergedDictionaries[dictionaryKey];

    const missingLocales = getMissingLocalesContentFromDictionary(
      mergedDictionary,
      locales
    );

    if (missingLocales.length > 0) {
      missingTranslations.push({
        key: dictionaryKey,
        locales: missingLocales,
      });
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
