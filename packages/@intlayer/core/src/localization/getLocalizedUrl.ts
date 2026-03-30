import configuration from '@intlayer/config/built';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the build-time routing mode is known and is NOT 'no-prefix'.
 */
const TREE_SHAKE_NO_PREFIX =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'no-prefix';

/**
 * True when the build-time routing mode is known and is NOT 'search-params'.
 */
const TREE_SHAKE_SEARCH_PARAMS =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'search-params';

import type { Locale } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';
import { getPathWithoutLocale } from './getPathWithoutLocale';
import {
  getPrefix,
  type RoutingOptions,
  resolveRoutingConfig,
} from './getPrefix';
import {
  getCanonicalPath,
  getLocalizedPath,
  getRewriteRules,
} from './rewriteUtils';

export type { RoutingOptions };

/**
 * Generate URL by prefixing the given URL with the referenced locale or adding search parameters
 * based on the routing mode. Handles both absolute and relative URLs appropriately.
 *
 * This function gets the locales, default locale, and routing mode from the configuration if not provided.
 *
 * Example:
 *
 * ```ts
 *  // prefix-no-default mode
 *  getLocalizedUrl('/about', 'fr', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'prefix-no-default' });
 *  // Returns '/fr/about' for the French locale
 *  // Returns '/about' for the English locale (default)
 *
 *  // prefix-all mode
 *  getLocalizedUrl('/about', 'en', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'prefix-all' });
 *  // Returns '/en/about' for the English locale
 *  // Returns '/fr/about' for the French locale
 *
 *  // search-params mode
 *  getLocalizedUrl('/about', 'fr', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'search-params' });
 *  // Returns '/about?locale=fr' for the French locale
 *
 *  // no-prefix mode
 *  getLocalizedUrl('/about', 'fr', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'no-prefix' });
 *  // Returns '/about' for any locale
 * ```
 *
 * @param url - The original URL string to be processed.
 * @param currentLocale - The current locale.
 * @param options - Configuration options
 * @param options.locales - Optional array of supported locales. Defaults to configured locales.
 * @param options.defaultLocale - The default locale. Defaults to configured default locale.
 * @param options.mode - URL routing mode for locale handling. Defaults to configured mode.
 * @returns The localized URL for the current locale.
 */
export const getLocalizedUrl = (
  url: string,
  currentLocale: LocalesValues = configuration?.internationalization
    ?.defaultLocale,
  options: RoutingOptions = {}
): string => {
  const { defaultLocale, mode, locales, rewrite } =
    resolveRoutingConfig(options);

  const urlWithoutLocale = getPathWithoutLocale(url, locales);
  const rewriteRules = getRewriteRules(rewrite, 'url');

  if (!TREE_SHAKE_NO_PREFIX && mode === 'no-prefix') {
    return getLocalizedPath(
      getCanonicalPath(urlWithoutLocale, undefined, rewriteRules),
      currentLocale as Locale,
      rewriteRules
    ).path;
  }

  const isAbsoluteUrl = checkIsURLAbsolute(urlWithoutLocale);
  const parsedUrl = isAbsoluteUrl
    ? new URL(urlWithoutLocale)
    : new URL(urlWithoutLocale, 'http://example.com');

  const translatedPathname = getLocalizedPath(
    getCanonicalPath(parsedUrl.pathname, undefined, rewriteRules),
    currentLocale as Locale,
    rewriteRules
  ).path;

  const baseUrl = isAbsoluteUrl
    ? `${parsedUrl.protocol}//${parsedUrl.host}`
    : '';

  if (!TREE_SHAKE_SEARCH_PARAMS && mode === 'search-params') {
    const searchParams = new URLSearchParams(parsedUrl.search);

    searchParams.set('locale', currentLocale.toString());

    const queryParams = searchParams.toString();
    const path = queryParams
      ? `${translatedPathname}?${queryParams}`
      : translatedPathname;

    return `${baseUrl}${path}${parsedUrl.hash}`;
  }

  const { prefix } = getPrefix(currentLocale, { defaultLocale, mode, locales });

  let localizedPath = `/${prefix}${translatedPathname}`.replace(/\/+/g, '/');

  if (localizedPath.length > 1 && localizedPath.endsWith('/')) {
    localizedPath = localizedPath.slice(0, -1);
  }

  return `${baseUrl}${localizedPath}${parsedUrl.search}${parsedUrl.hash}`;
};
