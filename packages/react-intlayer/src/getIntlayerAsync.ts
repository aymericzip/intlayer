'use client';

import type { Locales } from '@intlayer/config/client';
import { DeclarationContent } from 'intlayer';
import { fetchDistantDictionary } from './distantDictionary/fetchDistantDictionary';
import { getDictionary } from './getDictionary';
import { DictionaryKeys, DataFromDictionaryKey } from './getIntlayer';

export type GetIntlayerAsync = <
  T extends DictionaryKeys,
  L extends Locales,
  R extends boolean = true,
>(
  key: T,
  locale?: L,
  isRenderEditor?: R
) => Promise<DataFromDictionaryKey<T, L, R> | null>;

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * This hook will prerender the locale dictionary and fetch simultaneously the distant dictionaries to hydrate it.
 *
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const getIntlayerAsync: GetIntlayerAsync = async <
  T extends DictionaryKeys,
  L extends Locales,
  R extends boolean = true,
>(
  key: T,
  locale?: L,
  isRenderEditor = true as R
) => {
  const jsonDistantDictionary = await fetchDistantDictionary(key);

  if (jsonDistantDictionary) {
    return getDictionary(
      jsonDistantDictionary as unknown as DeclarationContent,
      locale,
      isRenderEditor
    ) as DataFromDictionaryKey<T, L, R>;
  }

  return null;
};
