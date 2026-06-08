import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { getLocalizedUrl } from './getLocalizedUrl';
import { type RoutingOptions, resolveRoutingConfig } from './getPrefix';

/**
 * Generates multilingual URLs by prefixing the given URL with each supported locale
 * or adding search parameters based on the routing mode.
 * Handles both absolute and relative URLs appropriately.
 *
 * This function gets the locales, default locale, and routing mode from the configuration if not provided.
 *
 * Example:
 *
 * ```ts
 *  // prefix-no-default mode
 *  getMultilingualUrls('/dashboard', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'prefix-no-default' })
 *     // Returns { en: '/dashboard', fr: '/fr/dashboard' }
 *
 *  // prefix-all mode
 *  getMultilingualUrls('/dashboard', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'prefix-all' })
 *     // Returns { en: '/en/dashboard', fr: '/fr/dashboard' }
 *
 *  // search-params mode
 *  getMultilingualUrls('/dashboard', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'search-params' })
 *     // Returns { en: '/dashboard?locale=en', fr: '/dashboard?locale=fr' }
 *
 *  // no-prefix mode
 *  getMultilingualUrls('/dashboard', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'no-prefix' })
 *     // Returns { en: '/dashboard', fr: '/dashboard' }
 * ```
 *
 * @param url - The original URL string to be processed.
 * @param options - Configuration options
 * @param options.locales - Optional array of supported locales. Defaults to configured locales.
 * @param options.defaultLocale - The default locale. Defaults to configured default locale.
 * @param options.mode - URL routing mode for locale handling. Defaults to configured mode.
 * @returns An object mapping each locale to its corresponding multilingual URL.
 */
export const getMultilingualUrls = (
  url: string,
  options: RoutingOptions = {}
): StrictModeLocaleMap<string> => {
  const resolved = resolveRoutingConfig(options);

  return Object.fromEntries(
    (resolved.locales ?? []).map((locale) => [
      locale,
      getLocalizedUrl(url, locale, resolved),
    ])
  ) as StrictModeLocaleMap<string>;
};
