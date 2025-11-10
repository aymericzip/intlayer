import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';
import { getMultilingualUrls } from './getMultilingualUrls';

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
 *  getLocalizedUrl('/about', 'fr', ['en', 'fr'], 'en', 'prefix-no-default');
 *  // Returns '/fr/about' for the French locale
 *  // Returns '/about' for the English locale (default)
 *
 *  // prefix-all mode
 *  getLocalizedUrl('/about', 'en', ['en', 'fr'], 'en', 'prefix-all');
 *  // Returns '/en/about' for the English locale
 *  // Returns '/fr/about' for the French locale
 *
 *  // search-params mode
 *  getLocalizedUrl('/about', 'fr', ['en', 'fr'], 'en', 'search-params');
 *  // Returns '/about?locale=fr' for the French locale
 *
 *  // no-prefix mode
 *  getLocalizedUrl('/about', 'fr', ['en', 'fr'], 'en', 'no-prefix');
 *  // Returns '/about' for any locale
 * ```
 *
 * @param url - The original URL string to be processed.
 * @param currentLocale - The current locale.
 * @param locales - Optional array of supported locales. Defaults to configured locales.
 * @param defaultLocale - The default locale. Defaults to configured default locale.
 * @param mode - URL routing mode for locale handling. Defaults to configured mode.
 * @returns The localized URL for the current locale.
 */
export const getLocalizedUrl = (
  url: string,
  currentLocale: LocalesValues,
  locales: LocalesValues[] | undefined = configuration?.internationalization
    ?.locales,
  defaultLocale: LocalesValues | undefined = configuration?.internationalization
    ?.defaultLocale,
  mode:
    | 'prefix-no-default'
    | 'prefix-all'
    | 'no-prefix'
    | 'search-params'
    | undefined = configuration?.routing?.mode
): string => {
  // Get all multilingual URLs
  const urlWithoutLocale = getMultilingualUrls(
    url,
    locales,
    defaultLocale,
    mode
  );

  return (
    urlWithoutLocale[
      currentLocale as unknown as keyof typeof urlWithoutLocale
    ] ?? url
  );
};
