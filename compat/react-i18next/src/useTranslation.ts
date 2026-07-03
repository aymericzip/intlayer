'use client';

import type { ScopedTFunction, TypedTFunction } from '@intlayer/i18next';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useMemo } from 'react';
import type { UseTranslationOptions } from 'react-i18next';
import { useLocale } from 'react-intlayer';
import {
  createTranslationApi,
  type TypedTranslationResult,
} from './createTranslationApi';

/**
 * Overload set for {@link useTranslation}: with a `keyPrefix` option the
 * returned `t()` accepts relative dot-paths under the prefix; otherwise keys
 * are the dictionary's full dot-paths. Return types are resolved from the
 * content at the key's path.
 */
type UseTranslation = {
  <N extends DictionaryKeys, Prefix extends string>(
    ns: N | N[],
    options: UseTranslationOptions<Prefix> & { keyPrefix: Prefix }
  ): TypedTranslationResult<ScopedTFunction<N, Prefix>>;
  <N extends DictionaryKeys>(
    ns?: N | N[],
    options?: UseTranslationOptions<undefined>
  ): TypedTranslationResult<TypedTFunction<N>>;
};

/**
 * Drop-in for react-i18next's `useTranslation`.
 *
 * Translation lookup goes through the shared i18next-dialect resolver:
 * namespace prefixes (`ns:key`), the `ns` option, plural suffixes
 * (`key_one`/`key_other` via `Intl.PluralRules`), context suffixes
 * (`key_male`), `$t()` nesting, `defaultValue` and `{{var}}` interpolation
 * are all supported.
 *
 * The returned `t()` is typed against the intlayer dictionary for namespace N:
 * keys are autocompleted, dot-paths are validated at compile time, and the
 * return type is resolved from the content at the key's path (with
 * `returnObjects: true` the raw content subtree type is returned).
 *
 * @example
 * ```tsx
 * const { t } = useTranslation('about');
 * t('counter.label'); // ✓ typed key and return value
 * t('items', { count: 3 }); // plural suffix resolution
 * ```
 */
const useTranslationImplementation = (
  ns?: string | string[],
  options?: UseTranslationOptions<string>
) => {
  const namespace = Array.isArray(ns)
    ? (ns[0] ?? 'translation')
    : (ns ?? 'translation');

  const { locale, setLocale, availableLocales } = useLocale();

  const keyPrefix = options?.keyPrefix;

  const { translate, i18n } = useMemo(
    () =>
      createTranslationApi({
        locale: locale as LocalesValues,
        setLocale: setLocale as (newLocale: LocalesValues) => void,
        availableLocales: (availableLocales ?? []) as LocalesValues[],
        namespace,
        keyPrefix,
      }),
    [locale, setLocale, availableLocales, namespace, keyPrefix]
  );

  return { t: translate, i18n, ready: true };
};

export const useTranslation = useTranslationImplementation as UseTranslation;

/**
 * Loosely-typed view of {@link useTranslation} used by render-prop and HOC
 * wrappers (`Translation`, `withTranslation`, `Trans`) that forward `t` to
 * consumer-typed surfaces.
 */
export const useTranslationLoose = useTranslationImplementation as (
  ns?: string | string[],
  options?: UseTranslationOptions<string>
) => TypedTranslationResult;
