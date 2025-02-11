import { fetchDistantDictionary } from '@intlayer/api';
import type { LocalesValues } from '@intlayer/config/client';
import type { DictionaryKeys } from '../types';
import type { Plugins } from './getContent';
import { getDictionary } from './getDictionary';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * This hook will prerender the locale dictionary and fetch simultaneously the distant dictionaries to hydrate it.
 *
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const getIntlayerAsync = async <
  T extends DictionaryKeys,
  L extends LocalesValues,
>(
  key: T,
  locale?: L,
  plugins?: Plugins[]
) => {
  const jsonDistantDictionary = await fetchDistantDictionary(key as string);

  if (jsonDistantDictionary) {
    return getDictionary(jsonDistantDictionary, locale, plugins);
  }

  return null;
};
