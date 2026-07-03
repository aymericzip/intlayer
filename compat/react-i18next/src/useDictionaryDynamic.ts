'use client';

import type { ScopedTFunction, TypedTFunction } from '@intlayer/i18next';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useMemo } from 'react';
import type { UseTranslationOptions } from 'react-i18next';
import {
  useDictionaryDynamic as useDictionaryDynamicBase,
  useLocale,
} from 'react-intlayer';
import {
  createTranslationApi,
  type TypedTranslationResult,
} from './createTranslationApi';

/**
 * Overload set for {@link useDictionaryDynamic}: without a key prefix the
 * returned `t()` is typed against the dictionary's dot-paths; with a prefix
 * (string or `keyPrefix` option) the keys are relative dot-paths under it.
 */
type UseDictionaryDynamic = {
  <T extends Dictionary, K extends DictionaryKeys>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    options?: UseTranslationOptions<undefined>
  ): TypedTranslationResult<TypedTFunction<K>>;
  <T extends Dictionary, K extends DictionaryKeys, Prefix extends string>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    keyPrefix: Prefix | (UseTranslationOptions<Prefix> & { keyPrefix: Prefix }),
    options?: UseTranslationOptions<Prefix>
  ): TypedTranslationResult<ScopedTFunction<K, Prefix>>;
};

/**
 * Dynamic dictionary-accepting variant of `useTranslation`.
 *
 * Counterpart to {@link useDictionary} for dictionaries imported lazily per
 * locale. For a nested namespace (`useTranslation('about.counter')`), the
 * plugin passes the key prefix (`'counter'`) as the third argument.
 */
export const useDictionaryDynamic = (<
  const T extends Dictionary,
  const K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  keyPrefix?: string | UseTranslationOptions<string>,
  options?: UseTranslationOptions<string>
) => {
  const content = useDictionaryDynamicBase<T, K>(dictionaryPromise, key);
  const { locale, setLocale, availableLocales } = useLocale();

  const resolvedOptions = typeof keyPrefix === 'object' ? keyPrefix : options;
  const prefix =
    resolvedOptions?.keyPrefix ??
    (typeof keyPrefix === 'string' ? keyPrefix : undefined);

  const { translate, i18n } = useMemo(
    () =>
      createTranslationApi({
        locale: locale as LocalesValues,
        setLocale: setLocale as (newLocale: LocalesValues) => void,
        availableLocales: (availableLocales ?? []) as LocalesValues[],
        namespace: key,
        keyPrefix: prefix,
        dictionaryContent: content,
      }),
    [locale, setLocale, availableLocales, key, prefix, content]
  );

  return { t: translate, i18n, ready: true };
}) as UseDictionaryDynamic;
