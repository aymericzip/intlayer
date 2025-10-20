'use client';

import { computed, inject } from '@angular/core';
import configuration from '@intlayer/config/built';
import type {
  Dictionary,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types';
import { INTLAYER_TOKEN, type IntlayerProvider } from './installIntlayer';
import { useDictionary } from './useDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryAsync = async <T extends Dictionary>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: LocalesValues
) => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);

  const localeTarget = computed(
    () =>
      locale ??
      intlayer?.locale() ??
      configuration?.internationalization.defaultLocale
  );

  const dictionary = await dictionaryPromise[localeTarget()]?.();

  return useDictionary(dictionary, localeTarget() as any);
};
