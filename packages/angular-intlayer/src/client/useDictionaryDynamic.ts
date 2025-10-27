'use client';

import { computed, inject } from '@angular/core';
import configuration from '@intlayer/config/built';
import type {
  Dictionary,
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types';
import { INTLAYER_TOKEN, type IntlayerProvider } from './installIntlayer';
import { useDictionary } from './useDictionary';
import { useLoadDynamic } from './useLoadDynamic';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryDynamic = <
  T extends Dictionary,
  K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  locale?: LocalesValues
) => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);

  const localeTarget = computed(
    () =>
      locale ??
      intlayer?.locale() ??
      configuration?.internationalization.defaultLocale
  );

  const dictionary = useLoadDynamic<T>(
    `${String(key)}.${localeTarget()}`,
    dictionaryPromise[localeTarget()]?.()
  ) as T;

  return useDictionary(dictionary, localeTarget() as any);
};
