import { logConfigDetails } from '@intlayer/chokidar/cli';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { getMissingLocalesContentFromDictionary } from '@intlayer/core/plugins';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

export const listMissingTranslationsWithConfig = (
  configuration: IntlayerConfig
) => {
  const unmergedDictionariesRecord = getUnmergedDictionaries(configuration);
  const mergedDictionaries = getDictionaries(configuration);

  const missingTranslations: {
    key: string;
    filePath?: string;
    id?: string;
    locales: Locale[];
  }[] = [];

  const { locales, requiredLocales } = configuration.internationalization;

  // Use the union of keys from both unmerged and merged dictionaries so that
  // dictionaries compiled only as merged (no per-locale split) are still checked.
  const dictionariesKeys = new Set([
    ...Object.keys(unmergedDictionariesRecord),
    ...Object.keys(mergedDictionaries),
  ]);

  for (const dictionaryKey of dictionariesKeys) {
    const dictionaries: Dictionary[] =
      unmergedDictionariesRecord[dictionaryKey] ?? [];

    const multilingualDictionary: Dictionary[] = dictionaries.filter(
      (dictionary) => !dictionary.locale
    );

    // Test all by merging all dictionaries to ensure no per-locale dictionary is missing
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

    // If there are no unmerged dictionaries for this key, fall back to the
    // merged dictionary directly (covers the case where the dict was compiled
    // as merged-only and unmerged_dictionaries.cjs is empty for this key).
    if (dictionaries.length === 0) {
      const mergedDictionary = mergedDictionaries[dictionaryKey];

      if (mergedDictionary) {
        const missingLocales = getMissingLocalesContentFromDictionary(
          mergedDictionary,
          locales
        );

        if (missingLocales.length > 0) {
          missingTranslations.push({
            key: dictionaryKey,
            id: mergedDictionary.id,
            filePath: mergedDictionary.filePath,
            locales: missingLocales,
          });
        }
      }

      continue;
    }

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
    missingTranslations.flatMap(
      (missingTranslation) => missingTranslation.locales
    )
  );
  const missingLocales = Array.from(missingLocalesSet);

  const missingRequiredLocales = missingLocales.filter((locale) =>
    (requiredLocales ?? locales).includes(locale)
  );

  return { missingTranslations, missingLocales, missingRequiredLocales };
};

export const listMissingTranslations = (
  configurationOptions?: GetConfigurationOptions
) => {
  const configuration = getConfiguration(configurationOptions);
  logConfigDetails(configurationOptions);

  return listMissingTranslationsWithConfig(configuration);
};
