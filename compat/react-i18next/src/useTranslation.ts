'use client';

import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';
import { useMemo } from 'react';
import type { UseTranslationOptions } from 'react-i18next';
import { useLocale } from 'react-intlayer';
import { createTranslationApi } from './createTranslationApi';

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
 * keys are autocompleted and dot-paths are validated at compile time.
 *
 * @example
 * ```tsx
 * const { t } = useTranslation('about');
 * t('counter.label'); // ✓ typed; compile error if key doesn't exist
 * t('items', { count: 3 }); // plural suffix resolution
 * ```
 */
export const useTranslation = <N extends DictionaryKeys>(
  ns?: N | N[],
  options?: UseTranslationOptions<string>
) => {
  const namespace = (
    Array.isArray(ns) ? (ns[0] ?? 'translation') : (ns ?? 'translation')
  ) as N;

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

  /** Typed facade over the untyped runtime translate function. */
  const t = translate as <P extends ValidDotPathsFor<N>>(
    key: P | P[],
    optionsOrDefaultValue?: TOptions | string,
    extraOptions?: TOptions
  ) => string;

  return { t, i18n, ready: true };
};
