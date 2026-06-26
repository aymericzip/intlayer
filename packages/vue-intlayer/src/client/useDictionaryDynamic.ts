import { internationalization } from '@intlayer/config/built';
import {
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
  type QualifiedDynamicLoaderMap,
  resolveQualifiedDynamicContentAsync,
} from '@intlayer/core/dictionaryManipulator';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { inject, type MaybeRefOrGetter, toValue } from 'vue';
import { getDictionary } from '../getDictionary';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';
import { useDictionaryAsync } from './useDictionaryAsync';

/**
 * Lazily loads a dictionary (plain or qualified) and returns its content.
 *
 * For a qualified loader map (collection / variant, possibly
 * combined), only the chunk(s) the selector targets are awaited and resolved.
 * For a plain loader map, the locale chunk is awaited and made reactive.
 *
 * If the locale is not provided (directly or through the selector), it will use
 * the locale from the client context.
 */
export const useDictionaryDynamic = async <
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = LocalesValues,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: MaybeRefOrGetter<A | null | undefined>
) => {
  if (
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    isQualifiedDynamicLoaderMap(dictionaryPromise)
  ) {
    const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

    const argValue =
      localeOrSelector !== undefined ? toValue(localeOrSelector) : undefined;
    const { locale: selectorLocale, selector } =
      parseDictionarySelector<LocalesValues>(argValue ?? undefined);

    const localeTarget = (selectorLocale ??
      intlayer?.locale?.value ??
      internationalization.defaultLocale) as LocalesValues;

    return resolveQualifiedDynamicContentAsync({
      loaderMap: dictionaryPromise,
      key: String(key),
      locale: localeTarget,
      selector,
      transform: (dictionary) => getDictionary(dictionary, localeTarget),
    });
  }

  return useDictionaryAsync(
    dictionaryPromise as StrictModeLocaleMap<() => Promise<T>>,
    localeOrSelector as MaybeRefOrGetter<LocalesValues> | undefined
  );
};
