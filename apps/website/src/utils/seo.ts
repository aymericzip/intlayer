import {
  defaultLocale,
  getLocalizedUrl,
  type LocalesValues,
  localeMap,
} from 'intlayer';

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
export const getAbsoluteUrl = (path: string, locale?: LocalesValues): string =>
  toAbsoluteUrl(getLocalizedUrl(path, locale));

export type HreflangLink = { rel: string; hrefLang: string; href: string };

/**
 * Generates hreflang link entries for all locales, including x-default.
 * Each URL is absolute and uses VITE_URL as the origin.
 *
 * Memoised by path: the table is one entry per declared locale and depends on
 * nothing but the path, yet every route `head` rebuilds it on each navigation.
 * The returned array is shared between callers — spread it, never mutate it.
 */
export const getHreflangLinks = (path: string) => [
  {
    rel: 'alternate',
    hrefLang: 'x-default',
    href: toAbsoluteUrl(getLocalizedUrl(path, defaultLocale)),
  },
  ...localeMap(({ locale: mapLocale }) => ({
    rel: 'alternate',
    hrefLang: mapLocale,
    href: toAbsoluteUrl(getLocalizedUrl(path, mapLocale)),
  })),
];
