import { internationalization } from '@intlayer/config/built';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the build-time routing mode is known and is not a prefix-based
 * mode (neither 'prefix-all' nor 'prefix-no-default').
 */
const TREE_SHAKE_PREFIX_MODES =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'prefix-all' &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'prefix-no-default';

/**
 * True when the build-time routing mode is known and is NOT 'search-params'.
 */
const TREE_SHAKE_SEARCH_PARAMS =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'search-params';

import type {
  DeclaredLocales,
  LocalesValues,
  PathWithoutLocale,
} from '@intlayer/types/module_augmentation';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';

/**
 * Removes the locale segment from the given URL or pathname if present.
 * Also removes locale from search parameters if present.
 *
 * This function get the locales from the configuration if not provided.
 *
 * Example:
 *
 * ```ts
 * getPathWithoutLocale('/en/dashboard') // Returns '/dashboard'
 * getPathWithoutLocale('/fr/dashboard') // Returns '/dashboard'
 * getPathWithoutLocale('/dashboard') // Returns '/dashboard'
 * getPathWithoutLocale('dashboard') // Returns 'dashboard'
 * getPathWithoutLocale('/dashboard?locale=fr') // Returns '/dashboard'
 * getPathWithoutLocale('https://example.com/en/dashboard') // Returns 'https://example.com/dashboard'
 * getPathWithoutLocale('https://example.com/fr/dashboard') // Returns 'https://example.com/dashboard'
 * getPathWithoutLocale('https://example.com/dashboard') // Returns 'https://example.com/dashboard'
 * getPathWithoutLocale('https://example.com/dashboard?locale=fr') // Returns 'https://example.com/dashboard'
 * ```
 *
 * @param inputUrl - The complete URL string or pathname to process.
 * @param locales - Optional array of supported locales. Defaults to `localesDefault`.
 * @returns The URL string or pathname without the locale segment or locale search parameter.
 */
/**
 * The return type is narrowed to a template-literal type when both `inputUrl`
 * and `locales` are string literals known at compile time. Absolute URLs fall
 * back to `string`.
 */
export const getPathWithoutLocale = <
  const T extends string,
  const L extends LocalesValues = DeclaredLocales,
>(
  inputUrl: T,
  locales: L[] = internationalization?.locales as L[]
): PathWithoutLocale<T, L> => {
  // Determine if the original URL is absolute (includes protocol)
  const isAbsoluteUrl = checkIsURLAbsolute(inputUrl);

  let fixedInputUrl = inputUrl;

  if (inputUrl?.endsWith('/')) {
    fixedInputUrl = inputUrl.slice(0, -1);
  }

  // Initialize a URL object if the URL is absolute
  // For relative URLs, use a dummy base to leverage the URL API
  const url = isAbsoluteUrl
    ? new URL(fixedInputUrl)
    : new URL(fixedInputUrl, 'http://example.com');

  const pathname = url.pathname;

  // Ensure the pathname starts with '/'
  if (!pathname.startsWith('/')) {
    // If not, return the URL as is
    url.pathname = `/${pathname}`;
  }

  // Only strip locale path prefix in prefix-based routing modes
  if (!TREE_SHAKE_PREFIX_MODES) {
    // Split the pathname to extract the first segment
    const pathSegments = pathname.split('/');
    const firstSegment = pathSegments[1]; // The segment after the first '/'

    // Check if the first segment is a supported locale
    if (locales?.includes(firstSegment as L)) {
      // Remove the locale segment from the pathname
      pathSegments.splice(1, 1); // Remove the first segment

      // Reconstruct the pathname
      const newPathname = pathSegments.join('/') ?? '/';
      url.pathname = newPathname;
    }
  }

  // Only strip locale from search parameters in search-params routing mode
  if (!TREE_SHAKE_SEARCH_PARAMS) {
    const searchParams = new URLSearchParams(url.search);
    if (searchParams.has('locale')) {
      searchParams.delete('locale');
      url.search = searchParams.toString();
    }
  }

  if (isAbsoluteUrl) {
    return url.toString() as PathWithoutLocale<T, L>;
  }

  return url.toString().replace('http://example.com', '') as PathWithoutLocale<
    T,
    L
  >;
};
