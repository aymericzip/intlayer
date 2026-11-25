import {
  type DynamicLoaderMap,
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
import { useContext } from 'preact/hooks';
import { getDictionary } from '../getDictionary';
import { IntlayerClientContext } from './IntlayerProvider';
// `useLoadDynamic` is a suspender cache, not a hook — aliased to a non-hook
// name so it can be invoked in loops / conditionally (collection chunks).
import { useLoadDynamic as loadDynamicChunk } from './useLoadDynamic';

/**
 * Preact hook that lazily loads a dictionary and returns its content.
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

  const { locale, selector } = resolveDictionaryRead({
    localeOrSelector,
    contextLocale: currentLocale,
    contextVariant,
    dictionaryKey,
  });

  return resolveDynamicContent({
    loaderMap: dictionaryPromise as DynamicLoaderMap,
    key: dictionaryKey,
    locale,
    selector,
    loadChunk: (cacheKey, promise) => loadDynamicChunk(cacheKey, promise),
    transform: (dictionary, argument) => getDictionary(dictionary, argument),
  });
};
