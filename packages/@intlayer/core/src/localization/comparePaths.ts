import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';
import { getPathWithoutLocale } from './getPathWithoutLocale';

/**
 * Normalizes a URL or pathname into a canonical, locale-agnostic pathname so
 * that two paths pointing to the same page compare equal — useful for
 * highlighting the active navigation link.
 *
 * The normalization:
 * - strips the locale segment (reusing {@link getPathWithoutLocale})
 * - strips the protocol/host so absolute and relative inputs compare equally
 * - drops the query string and hash
 * - ensures a single leading slash
 * - removes any trailing slash (except for the root path)
 * - falls back to `'/'` for empty values
 *
 * Example:
 *
 * ```ts
 * normalizePath('/ru/path')                    // '/path'
 * normalizePath('/ru/path/')                   // '/path'
 * normalizePath('ru/path')                     // '/path'
 * normalizePath('/ru/')                        // '/'
 * normalizePath('/ru')                         // '/'
 * normalizePath('')                            // '/'
 * normalizePath('https://example.com/ru/path') // '/path'
 * ```
 *
 * @param inputUrl - The URL string or pathname to normalize.
 * @param locales - Optional array of supported locales. Defaults to the
 *   configured locales.
 * @returns The normalized, locale-agnostic pathname.
 */
export const normalizePath = <const L extends LocalesValues = DeclaredLocales>(
  inputUrl: string,
  locales?: L[]
): string => {
  const withoutLocale = getPathWithoutLocale(inputUrl || '/', locales);

  // Reuse the URL API to isolate the pathname from any host/query/hash.
  const url = checkIsURLAbsolute(withoutLocale)
    ? new URL(withoutLocale)
    : new URL(withoutLocale, 'http://example.com');

  const { pathname } = url;

  // Remove a trailing slash, keeping the root path intact.
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname || '/';
};

/**
 * Compares two URLs or pathnames for equality, ignoring locale segment,
 * protocol/host, query string, hash and trailing slashes.
 *
 * Both inputs are normalized through {@link normalizePath} before comparison,
 * making this ideal for matching the current pathname against a navigation
 * link's `href`.
 *
 * Example:
 *
 * ```ts
 * comparePaths('/ru/path', '/path')   // true
 * comparePaths('/ru/path/', '/path')  // true
 * comparePaths('/ru/path', '/path/')  // true
 * comparePaths('/ru/', '/')           // true
 * comparePaths('/ru', '/')            // true
 * comparePaths('ru/path', '/path')    // true
 * comparePaths('', '/')               // true
 * comparePaths('/ru', '')             // true
 * comparePaths('/ru/path', '/other')  // false
 * ```
 *
 * @param pathname - The first URL string or pathname to compare.
 * @param href - The second URL string or pathname to compare.
 * @param locales - Optional array of supported locales. Defaults to the
 *   configured locales.
 * @returns `true` when both inputs resolve to the same locale-agnostic path.
 */
export const comparePaths = <const L extends LocalesValues = DeclaredLocales>(
  pathname: string,
  href: string,
  locales?: L[]
): boolean => normalizePath(pathname, locales) === normalizePath(href, locales);
