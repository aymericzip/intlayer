'use client';

import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { useMemo } from 'react';
import type { UseTranslationOptions } from 'react-i18next';
import {
  useDictionaryDynamic as useDictionaryDynamicBase,
  useLocale,
} from 'react-intlayer';

/**
 * Dynamic dictionary-accepting variant of `useTranslation`.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends string,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  options?: UseTranslationOptions<string>
) => {
  const content = useDictionaryDynamicBase<T, any>(
    dictionaryPromise,
    key as any
  );
  const { locale, setLocale, availableLocales } = useLocale();

  const i18n = useMemo(
    () => ({
      language: locale as string,
      languages: (availableLocales ?? []) as string[],
      changeLanguage: async (lng: string) => {
        setLocale(lng as any);
      },
      isInitialized: true,
    }),
    [locale, availableLocales, setLocale]
  );

  const prefix = options?.keyPrefix;

  const t = <P extends ValidDotPathsFor<any>>(
    lookup: P,
    params?: Record<string, unknown>
  ): string => {
    const lookupKey = prefix ? `${prefix}.${String(lookup)}` : String(lookup);
    const parts = lookupKey.split('.');
    let current: any = content;

    for (const part of parts) {
      if (current == null) break;
      current = current[part];
    }

    const str = String(current ?? lookupKey);

    if (!params) return str;

    return str.replace(/\{\{(\w+)\}\}/g, (_, k) =>
      params[k] != null ? String(params[k]) : `{{${k}}}`
    );
  };

  return { t, i18n, ready: true };
};
