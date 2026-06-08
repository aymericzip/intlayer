'use client';

import type { useLocale as _useLocale } from 'next-intl';
import { useLocale as useLocaleIntlayer } from 'next-intlayer';

const _useLocaleImpl = (): string => {
  const { locale } = useLocaleIntlayer();
  return locale as string;
};

/**
 * Drop-in for next-intl's `useLocale`.
 */
export const useLocale = _useLocaleImpl as unknown as typeof _useLocale;
