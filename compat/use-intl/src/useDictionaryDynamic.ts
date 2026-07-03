'use client';

import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useContext } from 'react';
import {
  IntlayerClientContext,
  useDictionaryDynamic as useDictionaryDynamicBase,
} from 'react-intlayer';
import { createDictionaryTranslator } from './shared/namespaceTranslator';
import type {
  ScopedTranslateFunction,
  TranslateFunction,
} from './shared/translateFunctionTypes';

/**
 * Overload set for {@link useDictionaryDynamic}: without a prefix the
 * translator is typed against the dictionary's dot-paths; with a prefix the
 * keys are relative dot-paths under that scope.
 */
type UseDictionaryDynamic = {
  <T extends Dictionary, K extends DictionaryKeys>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K
  ): TranslateFunction<K>;
  <T extends Dictionary, K extends DictionaryKeys, Prefix extends string>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    namespacePrefix: Prefix
  ): ScopedTranslateFunction<K, Prefix>;
};

/**
 * Dynamic dictionary-accepting variant of `useTranslations`.
 *
 * Counterpart to {@link useDictionary} for dictionaries imported lazily per
 * locale. Used internally by the build-time optimization.
 */
export const useDictionaryDynamic = (<
  const T extends Dictionary,
  const K extends DictionaryKeys,
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
}) as UseDictionaryDynamic;
