import type { Locale } from '@intlayer/types/allLocales';
import { getLocalizedUrl, localeMap } from 'intlayer';

const baseUrl = (import.meta.env.VITE_URL ?? '').replace(/\/$/, '');

/**
 * Converts any path to an absolute URL rooted at VITE_URL.
 * If the path is already absolute (e.g. from @intlayer/docs URL_PREFIX which
 * hardcodes "https://intlayer.org/…"), its origin is replaced with baseUrl so
 * the correct deployment domain is always used.
 */
const toAbsoluteUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) {
    return path.replace(/^https?:\/\/[^/]+/, baseUrl);
  }
  return `${baseUrl}${path}`;
};

/**
 * Returns an absolute localized URL using VITE_URL as the origin.
 * Handles paths that are already absolute (e.g. from @intlayer/docs URL_PREFIX).
 */
export const getAbsoluteUrl = (path: string, locale?: Locale): string =>
  toAbsoluteUrl(getLocalizedUrl(path, locale));

/**
 * Generates hreflang link entries for all locales, including x-default.
 * Each URL is absolute and uses VITE_URL as the origin.
 */
export const getHreflangLinks = (
  path: string
): Array<{ rel: string; hrefLang: string; href: string }> => [
  { rel: 'alternate', hrefLang: 'x-default', href: toAbsoluteUrl(path) },
  ...localeMap(({ locale: mapLocale }) => ({
    rel: 'alternate',
    hrefLang: mapLocale,
    href: toAbsoluteUrl(getLocalizedUrl(path, mapLocale)),
  })),
];
