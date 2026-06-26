'use client';

import { computed, inject, signal } from '@angular/core';
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
import { getDictionary } from '../getDictionary';
import { INTLAYER_TOKEN, type IntlayerProvider } from './installIntlayer';
import { useDictionary } from './useDictionary';
import { useLoadDynamic } from './useLoadDynamic';

/**
 * Lazily loads a dictionary (plain or qualified) and returns its reactive
 * content.
 *
 * For a qualified loader map (collection / variant, possibly
 * combined), only the chunk(s) the selector targets are loaded. For a plain
 * loader map, the locale chunk is loaded.
 *
 * If the locale is not provided (directly or through the selector), it will use
 * the locale from the client context.
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
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);

  if (
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    isQualifiedDynamicLoaderMap(dictionaryPromise)
  ) {
    const { locale: selectorLocale, selector } =
      parseDictionarySelector<LocalesValues>(localeOrSelector);

    const localeTarget =
      selectorLocale ??
      intlayer?.locale() ??
      internationalization.defaultLocale;

    const container = signal<unknown>(undefined);

    resolveQualifiedDynamicContentAsync({
      loaderMap: dictionaryPromise,
      key: String(key),
      locale: localeTarget,
      selector,
      transform: (dictionary) => getDictionary(dictionary, localeTarget),
    }).then((resolved) => container.set(resolved));

    return computed(() => container() as any);
  }

  const locale =
    typeof localeOrSelector === 'string'
      ? (localeOrSelector as LocalesValues)
      : undefined;

  const localeTarget = computed(
    () => locale ?? intlayer?.locale() ?? internationalization.defaultLocale
  );

  const dictionary = useLoadDynamic<T>(
    `${String(key)}.${localeTarget()}`,
    (dictionaryPromise as any)[localeTarget()]?.()
  ) as T;

  return useDictionary(dictionary, localeTarget() as any);
};
