import { internationalization } from '@intlayer/config/built';
import {
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
  type QualifiedDynamicLoaderMap,
  resolveQualifiedDynamicContent,
} from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import type {
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
 * The dictionary entry is either a plain dynamic loader map
 * (`locale → loader`) or a qualified one (`locale → …qualifier → loader`,
 * tagged with the qualifier dimensions). For qualified maps, only the chunk(s)
 * the selector targets are loaded.
 *
 * If the locale is not provided (directly or through the selector), the client
 * context locale is used.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = LocalesValues,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: A
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext) ?? {};

  const { locale: selectorLocale, selector } =
    process.env['INTLAYER_DICTIONARY_SELECTOR'] !== 'false'
      ? parseDictionarySelector<LocalesValues>(localeOrSelector)
      : {
          locale: localeOrSelector as LocalesValues | undefined,
          selector: undefined,
        };

  const localeTarget =
    selectorLocale ?? currentLocale ?? internationalization.defaultLocale;

  if (
    process.env['INTLAYER_DICTIONARY_SELECTOR'] !== 'false' &&
    isQualifiedDynamicLoaderMap(dictionaryPromise)
  ) {
    return resolveQualifiedDynamicContent({
      loaderMap: dictionaryPromise,
      key: String(key),
      locale: localeTarget,
      selector,
      loadChunk: (cacheKey, promise) => loadDynamicChunk(cacheKey, promise),
      transform: (dictionary) => getDictionary(dictionary, localeTarget),
    });
  }

  const plainLoaders = dictionaryPromise as StrictModeLocaleMap<
    () => Promise<T>
  >;

  const dictionary = loadDynamicChunk<T>(
    `${String(key)}.${localeTarget}`,
    plainLoaders[localeTarget as keyof typeof plainLoaders]?.() as Promise<T>
  );

  return getDictionary(dictionary, localeTarget);
};
