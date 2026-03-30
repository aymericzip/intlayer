import {
  i18nextToIntlayerFormatter,
  icuToIntlayerFormatter,
  intlayerToI18nextFormatter,
  intlayerToICUFormatter,
  intlayerToVueI18nFormatter,
  vueI18nToIntlayerFormatter,
} from '@intlayer/core/messageFormat';
import type { Dictionary } from '@intlayer/types/dictionary';

export const formatDictionary = (dictionary: Dictionary): Dictionary => {
  if (dictionary.format === 'icu') {
    return {
      ...dictionary,
      format: 'intlayer',
      content: icuToIntlayerFormatter(dictionary.content),
    };
  }

  if (dictionary.format === 'i18next') {
    return {
      ...dictionary,
      format: 'intlayer',
      content: i18nextToIntlayerFormatter(dictionary.content),
    };
  }

  if (dictionary.format === 'vue-i18n') {
    return {
      ...dictionary,
      format: 'intlayer',
      content: vueI18nToIntlayerFormatter(dictionary.content),
    };
  }

  return dictionary;
};

export const formatDictionaries = async (
  dictionaries: Dictionary[]
): Promise<Dictionary[]> => Promise.all(dictionaries.map(formatDictionary));

export const formatDictionaryOutput = (
  dictionary: Dictionary,
  format: Dictionary['format']
) => {
  if (format === 'icu') {
    return {
      ...dictionary,
      format: 'icu',
      content: intlayerToICUFormatter(dictionary.content),
    };
  }

  if (format === 'i18next') {
    return {
      ...dictionary,
      format: 'i18next',
      content: intlayerToI18nextFormatter(dictionary.content),
    };
  }

  if (format === 'vue-i18n') {
    return {
      ...dictionary,
      format: 'vue-i18n',
      content: intlayerToVueI18nFormatter(dictionary.content),
    };
  }

  return dictionary;
};

export const formatDictionariesOutput = (
  dictionaries: Dictionary[],
  format: Dictionary['format']
) =>
  dictionaries.map((dictionary) => formatDictionaryOutput(dictionary, format));
