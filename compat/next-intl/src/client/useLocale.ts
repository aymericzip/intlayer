'use client';

import type { useLocale as _useLocale } from 'next-intl';
import { useLocale as useLocaleIntlayer } from 'next-intlayer';

/**
 * Drop-in for next-intl's `useLocale`.
 */
export const useLocale: typeof _useLocale = (): string => {
  const { locale } = useLocaleIntlayer();
  return locale as string;
};
