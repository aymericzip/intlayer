'use client';

import { useLocale as useLocaleIntlayer } from 'react-intlayer';
import type { useLocale as _useLocale } from 'use-intl';

/**
 * Drop-in for use-intl's `useLocale`.
 *
 * Returns the active locale string from Intlayer's client context.
 */
export const useLocale: typeof _useLocale = () => {
  const { locale } = useLocaleIntlayer();
  return locale as ReturnType<typeof _useLocale>;
};
