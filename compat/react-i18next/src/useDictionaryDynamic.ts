'use client';

import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';
import { useMemo } from 'react';
import type { UseTranslationOptions } from 'react-i18next';
import {
  useDictionaryDynamic as useDictionaryDynamicBase,
  useLocale,
} from 'react-intlayer';
import { createTranslationApi } from './createTranslationApi';

/**
 * Dynamic dictionary-accepting variant of `useTranslation`.
 *
 * Counterpart to {@link useDictionary} for dictionaries imported lazily per
 * locale. For a nested namespace (`useTranslation('about.counter')`), the
 * plugin passes the key prefix (`'counter'`) as the third argument.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends string,
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

  /** Typed facade over the untyped runtime translate function. */
  const t = translate as <P extends ValidDotPathsFor<K>>(
    key: P | P[],
    optionsOrDefaultValue?: TOptions | string,
    extraOptions?: TOptions
  ) => string;

  return { t, i18n, ready: true };
};
