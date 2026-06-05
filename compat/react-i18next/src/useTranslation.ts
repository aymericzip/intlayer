'use client';

import { useMemo } from 'react';
import type { useTranslation as _useTranslation } from 'react-i18next';
import { useI18n, useLocale } from 'react-intlayer';

const _useTranslationImpl = (ns?: any, options?: any) => {
  const namespace = Array.isArray(ns)
    ? (ns[0] ?? 'translation')
    : (ns ?? 'translation');
  const baseT = useI18n(namespace as any);
  const { locale, setLocale, availableLocales } = useLocale();

  const t = useMemo(() => {
    const prefix = options?.keyPrefix;
    if (prefix) {
      return (key: string, params?: any) =>
        (baseT as any)(`${prefix}.${key}`, params);
    }
    return (key: string, params?: any) => (baseT as any)(key, params);
  }, [baseT, options?.keyPrefix]);

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

  return { t, i18n, ready: true } as any;
};

/**
 * Drop-in for react-i18next's `useTranslation`.
 * Backed by `useI18n` from `react-intlayer`.
 */
export const useTranslation =
  _useTranslationImpl as unknown as typeof _useTranslation;
