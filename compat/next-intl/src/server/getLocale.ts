import type { getLocale as _getLocale } from 'next-intl/server';
import { getLocale as getLocaleIntlayer } from 'next-intlayer/server';

/**
 * Drop-in for next-intl's `getLocale()` server function.
 */
export const getLocale: typeof _getLocale = async (): Promise<string> =>
  (await getLocaleIntlayer()) as string;
