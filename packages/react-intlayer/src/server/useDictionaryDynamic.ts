import {
  type DynamicLoaderMap,
  type QualifiedDynamicLoaderMap,
  resolveDictionaryRead,
  resolveDynamicContent,
} from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
  ProviderVariant,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { getDictionary } from '../getDictionary';
import {
  IntlayerServerContext,
  IntlayerServerVariantContext,
} from './IntlayerServerProvider';
import { getServerContext } from './serverContext';
// `useLoadDynamic` wraps `react.use`, which may be called in loops /
// conditionally — aliased to a non-hook name so a collection can load several
// chunks at once.
import { useLoadDynamic as loadDynamicChunk } from './useLoadDynamic';

/**
 * Server-side hook that lazily loads a dictionary and returns its content.
 *
 * The locale, selector, chunk selection and transform are resolved by the
 * shared `resolveDictionaryRead` / `resolveDynamicContent`, so this hook only
 * contributes the request context and `react.use`.
 *
 * If the locale is not provided (directly or through the selector), the server
 * context locale is used.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  fallbackLocale?: DeclaredLocales
) => {
  const dictionaryKey = String(key);

  const { locale, selector } = resolveDictionaryRead({
    localeOrSelector,
    contextLocale:
      getServerContext<LocalesValues>(IntlayerServerContext) ?? fallbackLocale,
    contextVariant: getServerContext<ProviderVariant>(
      IntlayerServerVariantContext
    ),
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
