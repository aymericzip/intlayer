/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import type { Locales } from '@intlayer/config/client';
import dictionaries from '@intlayer/dictionaries-entry';
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import type { Content } from './processDictionary/contentDictionary';
import { processNode } from './processDictionary/index';

export type StringFallback<T> = T extends never ? string : T; // If no keys are found, return string to disable error, and accept any string as dictionary key
export type DictionaryKeys = StringFallback<
  keyof IntlayerDictionaryTypesConnector
>;

export type UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => IntlayerDictionaryTypesConnector[T];

export const useIntlayerBase: UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => {
  const dictionary: Content = dictionaries[id];

  return processNode(dictionary, locale) as IntlayerDictionaryTypesConnector[T];
};
