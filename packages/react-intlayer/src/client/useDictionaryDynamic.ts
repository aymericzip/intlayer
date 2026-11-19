'use client';

import {
  getPreloadedDictionary,
  getQualifiedDynamicChunks,
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
  type QualifiedDynamicLoaderMap,
  resolveDictionaryArgument,
  resolveQualifiedDynamicContent,
} from '@intlayer/core/dictionaryManipulator';
import { resolveInterpreterLocale } from '@intlayer/core/interpreter';
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
 * The dictionary entry is either a plain dynamic loader map
 * (`locale → loader`) or a qualified one (`locale → qualifierId → loader`,
 * tagged with the qualifier dimension). For qualified maps, only the chunk(s)
 * the selector targets are loaded; the resolution mirrors static mode.
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

  const { locale: selectorLocale, selector } =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? parseDictionarySelector<LocalesValues>(
          // Layers the provider's ambient variant under the call-site argument
          // before the chunk walk, so only the targeted chunk is loaded.
          resolveDictionaryArgument({
            localeOrSelector,
            contextLocale: currentLocale,
            contextVariant,
            dictionaryKey: String(key),
          })
        )
      : {
          locale: localeOrSelector as LocalesValues | undefined,
          selector: undefined,
        };

  const localeTarget =
    selectorLocale ?? currentLocale ?? resolveInterpreterLocale();

  if (
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    isQualifiedDynamicLoaderMap(dictionaryPromise)
  ) {
    registerDynamicLocaleWarmer(
      String(key),
      createDynamicLocaleWarmer((locale) =>
        getQualifiedDynamicChunks(
          dictionaryPromise,
          String(key),
          locale,
          selector
        )
      )
    );

    return resolveQualifiedDynamicContent({
      loaderMap: dictionaryPromise,
      key: String(key),
      locale: localeTarget,
      selector,
      loadChunk: (cacheKey, promise) =>
        readDynamicChunk(cacheKey, promise, String(localeTarget)),
      transform: (dictionary) => getDictionary(dictionary, localeTarget),
    });
  }

  const plainLoaders = dictionaryPromise as StrictModeLocaleMap<
    () => Promise<T>
  >;
  const getPlainLoader = (locale: string) =>
    plainLoaders[locale as keyof typeof plainLoaders];

  // Registered before the preloaded shortcut, so a switch warms it too.
  registerDynamicLocaleWarmer(
    String(key),
    createDynamicLocaleWarmer((locale) => {
      const loader = getPlainLoader(locale);
      return loader ? [{ cacheKey: `${String(key)}.${locale}`, loader }] : [];
    })
  );

  // A build-tool plugin may have started this locale's chunk while the entry
  // point itself was evaluating, in which case the content is already here and
  // reading it must not go through the suspender — see `getPreloadedDictionary`.
  const preloadedDictionary = getPreloadedDictionary(
    dictionaryPromise,
    localeTarget
  );
  if (preloadedDictionary) {
    return getDictionary(preloadedDictionary as T, localeTarget);
  }

  const dictionary = readDynamicChunk<T>(
    `${String(key)}.${localeTarget}`,
    getPlainLoader(String(localeTarget))?.() as Promise<T>,
    String(localeTarget)
  );

  return getDictionary(dictionary, localeTarget);
};
