import type { getLocale as _getLocale } from 'next-intl/server';
import { getLocale as getLocaleIntlayer } from 'next-intlayer/server';
import { getCachedRequestLocale } from './requestLocaleCache';

/**
 * Drop-in for next-intl's `getLocale()` server function.
 *
 * Resolution order mirrors next-intl's per-request model:
 *
 * 1. The locale forwarded through `setRequestLocale(locale)` (the `[locale]`
 *    route segment) — the source of truth for URL-driven routing. This is what
 *    keeps server-rendered content and the locale switcher in sync with the URL
 *    instead of a stale cookie.
 * 2. Otherwise Intlayer's own resolution (cookie / header / Accept-Language),
 *    for apps that drive the locale from storage rather than the route.
 */
export const getLocale: typeof _getLocale = async (): Promise<string> => {
  const requestLocale = getCachedRequestLocale();
  if (requestLocale) return requestLocale as string;

  return (await getLocaleIntlayer()) as string;
};
