import type { LocalesValues } from '@intlayer/config/client';
import { type Dictionary } from '@intlayer/core';
import { getDictionary } from '../getDictionary';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, function that transforms a dictionary and returns the content
 *
 * If the locale is not provided, it will use the locale from the server context
 *
 * @example
 * // With a dictionary object
 * const dictionary = {
 *   en: { title: 'Hello' },
 *   fr: { title: 'Bonjour' }
 * };
 *
 * // Transform the dictionary for the current locale
 * const localizedDictionary = useDictionary(dictionary);
 */
export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
) => {
  const localeTarget =
    locale ?? getServerContext<LocalesValues>(IntlayerServerContext);

  return getDictionary<T, LocalesValues>(dictionary, localeTarget);
};
