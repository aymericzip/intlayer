import type { getLocale as _getLocale } from 'next-intl/server';
import { getLocale as getLocaleIntlayer } from 'next-intlayer/server';

const _getLocaleImpl = async (): Promise<string> =>
  (await getLocaleIntlayer()) as string;

/**
 * Drop-in for next-intl's `getLocale()` server function.
 */
export const getLocale = _getLocaleImpl as unknown as typeof _getLocale;
