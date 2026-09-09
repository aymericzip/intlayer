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
export const toAbsoluteUrl = (path: string): string => {
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

/**
 * Generates an absolute URL for the Open Graph image route (/api/og)
 * with the specified title and optional description.
 * If no title is provided, it returns the default Open Graph image route (/api/og).
 */
export const getOgImageUrl = (title?: string, description?: string): string => {
  const params = new URLSearchParams();
  if (title) {
    params.set('title', title);
  }
  if (description) {
    params.set('description', description);
  }
  const query = params.toString();
  return toAbsoluteUrl(query ? `/api/og?${query}` : '/api/og');
};

const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  'en-GB': 'en_GB',
  fr: 'fr_FR',
  ru: 'ru_RU',
  ja: 'ja_JP',
  ko: 'ko_KR',
  zh: 'zh_CN',
  es: 'es_ES',
  de: 'de_DE',
  ar: 'ar_AR',
  it: 'it_IT',
  pt: 'pt_PT',
  hi: 'hi_IN',
  tr: 'tr_TR',
  pl: 'pl_PL',
  id: 'id_ID',
  vi: 'vi_VN',
  uk: 'uk_UA',
};

/**
 * Maps a locale string (e.g. 'en', 'fr', 'en-GB') to the strict Open Graph
 * language_TERRITORY format required by scrapers (e.g. 'en_US', 'fr_FR', 'en_GB').
 */
export const getOgLocale = (locale?: LocalesValues | string): string => {
  if (!locale) return 'en_US';
  if (OG_LOCALE_MAP[locale]) return OG_LOCALE_MAP[locale];
  if (locale.includes('_')) return locale;
  if (locale.includes('-')) {
    const [lang, country] = locale.split('-');
    return `${lang.toLowerCase()}_${country.toUpperCase()}`;
  }
  return `${locale.toLowerCase()}_${locale.toUpperCase()}`;
};
