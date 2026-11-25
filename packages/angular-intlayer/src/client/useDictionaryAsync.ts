'use client';

import { computed, inject } from '@angular/core';
import { loadDynamicDictionary } from '@intlayer/core/dictionaryManipulator';
import { resolveInterpreterLocale } from '@intlayer/core/interpreter';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { INTLAYER_TOKEN, type IntlayerProvider } from './installIntlayer';
import { useDictionary } from './useDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryAsync = async <const T extends Dictionary>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: LocalesValues
) => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);

  const localeTarget = computed(
    () => locale ?? intlayer?.locale() ?? resolveInterpreterLocale()
  );

  const dictionary = (await loadDynamicDictionary(
    dictionaryPromise,
    localeTarget()
  )) as T;

  return useDictionary(dictionary, localeTarget() as any);
};
