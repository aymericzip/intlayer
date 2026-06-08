'use client';

import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useMemo } from 'react';
import type { UseTranslationOptions } from 'react-i18next';
import { useI18n, useLocale } from 'react-intlayer';

/**
 * Drop-in for react-i18next's `useTranslation`.
 * Backed by `useI18n` from `react-intlayer`.
 *
 * The returned `t()` is typed against the intlayer dictionary for namespace N:
 * keys are autocompleted and dot-paths are validated at compile time.
 *
 * @example
 * ```tsx
 * const { t } = useTranslation('about');
 * t('counter.label'); // ✓ typed; compile error if key doesn't exist
 * ```
 */
export const useTranslation = <N extends DictionaryKeys>(
  ns?: N | N[],
  options?: UseTranslationOptions<string>
) => {
  const namespace = (
    Array.isArray(ns) ? (ns[0] ?? 'translation') : (ns ?? 'translation')
  ) as N;

  const baseT = useI18n(namespace);
  const { locale, setLocale, availableLocales } = useLocale();

  const i18n = useMemo(
    () => ({
      language: locale as string,
      languages: (availableLocales ?? []) as string[],
      changeLanguage: async (lng: string) => {
        setLocale(lng as LocalesValues);
      },
      isInitialized: true,
    }),
    [locale, availableLocales, setLocale]
  );

  const prefix = options?.keyPrefix;

  /**
   * @param key - A valid dot-notation path within the namespace N dictionary.
   * @param params - Optional interpolation values for `{{var}}` placeholders.
   */
  const t = <P extends ValidDotPathsFor<N>>(
    key: P,
    params?: Record<string, unknown>
  ): string => {
    const lookupKey = prefix ? `${prefix}.${String(key)}` : String(key);
    const raw = (baseT as unknown as (k: string) => unknown)(lookupKey);
    const str = String(raw ?? lookupKey);
    if (!params) return str;
    return str.replace(/\{\{(\w+)\}\}/g, (_, k) =>
      params[k] != null ? String(params[k]) : `{{${k}}}`
    );
  };

  return { t, i18n, ready: true };
};
