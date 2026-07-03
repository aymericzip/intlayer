import { Showcase_Root } from '@intlayer/design-system/routes';
import { getLocalizedUrl, type LocalesValues, localeMap } from 'intlayer';

/**
 * Origin used to build absolute URLs. Prefers the deployment-provided
 * `VITE_SITE_URL`, falling back to the canonical showcase domain so the output
 * is never a relative URL (Google rejects relative `hreflang` / canonical URLs).
 */
const baseUrl = (import.meta.env?.VITE_SITE_URL ?? Showcase_Root).replace(
  /\/$/,
  ''
);

/**
 * Converts any path (or already-absolute URL) to an absolute URL rooted at
 * {@link baseUrl}. When the input is already absolute, its origin is swapped for
 * {@link baseUrl} so the correct deployment domain is always used.
 *
 * @param path - Relative path (e.g. `/es/submit`) or absolute URL.
 * @returns Absolute URL string.
 */
const toAbsoluteUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) {
    return path.replace(/^https?:\/\/[^/]+/, baseUrl);
  }
  return `${baseUrl}${path}`;
};

/**
 * Returns an absolute localized URL for the given path and locale.
 *
 * @param path - Path to localize (e.g. `/submit`).
 * @param locale - Target locale. Defaults to the configured default locale.
 * @returns Absolute, localized URL string.
 */
export const getAbsoluteUrl = (path: string, locale?: LocalesValues): string =>
  toAbsoluteUrl(getLocalizedUrl(path, locale));

/**
 * Generates `hreflang` alternate link entries for every locale, plus
 * `x-default`. Every `href` is an absolute URL rooted at {@link baseUrl}.
 *
 * @param path - Path to generate alternates for (e.g. `/submit`).
 * @returns Array of `<link rel="alternate">` descriptors.
 */
export const getHreflangLinks = (
  path: string
): Array<{ rel: string; hrefLang: string; href: string }> => [
  { rel: 'alternate', hrefLang: 'x-default', href: toAbsoluteUrl(path) },
  ...localeMap(({ locale }) => ({
    rel: 'alternate',
    hrefLang: locale,
    href: toAbsoluteUrl(getLocalizedUrl(path, locale)),
  })),
];
