'use client';

import {
  type DynamicLoaderMap,
  getDynamicChunks,
  type QualifiedDynamicLoaderMap,
  resolveDictionaryRead,
  resolveDynamicContent,
} from '@intlayer/core/dictionaryManipulator';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useContext } from 'react';
import { getDictionary } from '../getDictionary';
import { IntlayerClientContext } from './IntlayerProvider';
// `useLoadDynamic` is a suspender cache, not a React hook — aliased to a
// non-hook name so it can be invoked in loops / conditionally (e.g. when a
// collection loads several chunks at once).
import {
  hasDynamicEntry,
  useLoadDynamic as loadDynamicChunk,
} from './useLoadDynamic';
import {
  createDynamicLocaleWarmer,
  registerDynamicLocaleWarmer,
  warmDynamicLocale,
} from './warmDynamicLocale';

/**
 * Reads a chunk; on a cache miss, first starts every rendered dictionary's
 * load for that locale so a locale switch costs one round trip, not one per
 * dictionary.
 */
const readDynamicChunk = <T>(
  cacheKey: string,
  promise: Promise<T>,
  locale: string
): T => {
  if (!hasDynamicEntry(cacheKey)) warmDynamicLocale(locale);

  return loadDynamicChunk<T>(cacheKey, promise);
};

/**
 * Client-side hook that lazily loads a dictionary and returns its content.
 *
 * The locale, selector, chunk selection and transform are resolved by the
 * shared `resolveDictionaryRead` / `resolveDynamicContent`, so this hook only
 * contributes the provider context and the Suspense cache.
 *
 * If the locale is not provided (directly or through the selector), the client
 * context locale is used.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = DeclaredLocales,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: A
) => {
  const { locale: currentLocale, variant: contextVariant } =
    useContext(IntlayerClientContext) ?? {};

  const dictionaryKey = String(key);
  const loaderMap = dictionaryPromise as DynamicLoaderMap;

  const { locale, selector } = resolveDictionaryRead({
    localeOrSelector,
    contextLocale: currentLocale,
    contextVariant,
    dictionaryKey,
  });

  registerDynamicLocaleWarmer(
    dictionaryKey,
    createDynamicLocaleWarmer((warmedLocale) =>
      getDynamicChunks(
        loaderMap,
        dictionaryKey,
        warmedLocale as LocalesValues,
        selector
      )
    )
  );

  return resolveDynamicContent({
    loaderMap,
    key: dictionaryKey,
    locale,
    selector,
    loadChunk: (cacheKey, promise) =>
      readDynamicChunk(cacheKey, promise, String(locale)),
    transform: (dictionary, argument) => getDictionary(dictionary, argument),
  });
};
