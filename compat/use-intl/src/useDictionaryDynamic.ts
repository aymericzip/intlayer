'use client';

import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useContext } from 'react';
import {
  IntlayerClientContext,
  useDictionaryDynamic as useDictionaryDynamicBase,
} from 'react-intlayer';
import { createDictionaryTranslator } from './shared/namespaceTranslator';

/**
 * Dynamic dictionary-accepting variant of `useTranslations`.
 *
 * Counterpart to {@link useDictionary} for dictionaries imported lazily per
 * locale. Used internally by the build-time optimization.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends string,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  namespacePrefix?: string
) => {
  const { locale } = useContext(IntlayerClientContext) ?? {};
  const content = useDictionaryDynamicBase<T, K>(dictionaryPromise, key);

  return createDictionaryTranslator(
    locale as LocalesValues,
    content,
    namespacePrefix
  );
};
