import type { Locales } from '@intlayer/config/client';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import type { Dictionary } from '@intlayer/core';
import dictionaries from '@intlayer/dictionaries-entry';
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { processDictionary } from './processDictionary/index';

export type StringFallback<T> = T extends never ? string : T; // If no keys are found, return string to disable error, and accept any string as dictionary key
export type DictionaryKeys = StringFallback<
  keyof IntlayerDictionaryTypesConnector
>;

export type UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => IntlayerDictionaryTypesConnector[T];

/**
 * Hook that picking one dictionary by its id and return the content.
 */
export const useIntlayerBase: UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => {
  const dictionary: Dictionary = dictionaries[id];

  return processDictionary(
    dictionary,
    id,
    dictionary.filePath,
    [],
    locale
  ) as IntlayerDictionaryTypesConnector[T];
};
