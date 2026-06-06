import type { Locale } from '@intlayer/types/allLocales';
import { getLocalizedUrl, localeMap } from 'intlayer';

const baseUrl = (import.meta.env.VITE_URL ?? '').replace(/\/$/, '');

/**
 * Returns an absolute localized URL by prepending VITE_URL to getLocalizedUrl().
 * In Next.js this is handled by `metadataBase`, but TanStack Start needs it explicitly.
 */
export const getAbsoluteUrl = (path: string, locale?: Locale): string =>
  `${baseUrl}${getLocalizedUrl(path, locale)}`;

/**
 * Generates hreflang link entries for all locales, including x-default.
 * Each URL is absolute.
 */
export const getHreflangLinks = (
  path: string
): Array<{ rel: string; hrefLang: string; href: string }> => [
  { rel: 'alternate', hrefLang: 'x-default', href: `${baseUrl}${path}` },
  ...localeMap(({ locale: mapLocale }) => ({
    rel: 'alternate',
    hrefLang: mapLocale,
    href: `${baseUrl}${getLocalizedUrl(path, mapLocale)}`,
  })),
];
