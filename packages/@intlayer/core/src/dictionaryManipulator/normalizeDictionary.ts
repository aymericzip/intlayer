import type { Dictionary, IntlayerConfig, Locales } from '@intlayer/types';
import { getPerLocaleDictionary } from '../deepTransformPlugins';
import { t } from '../transpiler/translation';
import { orderDictionaries } from './orderDictionaries';

export const normalizeDictionary = (
  dictionary: Dictionary,
  configuration: IntlayerConfig
): Dictionary => {
  const { locales } = configuration.internationalization;

  const parsedDictionary = JSON.parse(JSON.stringify(dictionary));

  // If the dictionary is a per-locale dictionary, transform it to a partial multilingual dictionary
  if (dictionary.locale) {
    return {
      ...dictionary,
      locale: undefined,
      content: t({
        // @ts-ignore Type instantiation is excessively deep and possibly infinite.
        [dictionary.locale]: getPerLocaleDictionary(
          dictionary.content,
          dictionary.locale
        ),
      }),
    };
  }

  const perLocaleContent = locales.reduce(
    (acc, locale) => {
      const perLocaleDictionary = getPerLocaleDictionary(
        parsedDictionary,
        locale
      );

      acc[locale] = perLocaleDictionary.content;
      return acc;
    },
    {} as Record<Locales, Dictionary['content']>
  );

  return {
    ...dictionary,
    content: t(perLocaleContent),
  };
};

export const normalizeDictionaries = (
  dictionaries: Dictionary[],
  configuration: IntlayerConfig
): Dictionary[] => {
  const orderedDictionaries = orderDictionaries(dictionaries, configuration);

  const structuredDictionaries = orderedDictionaries.map((dictionary) =>
    normalizeDictionary(dictionary, configuration)
  );

  return structuredDictionaries;
};
