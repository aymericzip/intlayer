import { getConfiguration, Locales } from '@intlayer/config/client';
import { getMultilingualUrls } from './getMultilingualUrls';

// Destructure necessary configurations
const { internationalization, middleware } = getConfiguration();
const { locales: localesDefault, defaultLocale: defaultLocaleDefault } =
  internationalization;
const { prefixDefault: prefixDefaultDefault } = middleware;

/**
 * Generate URL by prefixing the given URL with the referenced locale.
 * Handles both absolute and relative URLs appropriately.
 *
 * This function get the locales, default locale, and prefix default from the configuration if not provided.
 *
 * Example:
 *
 * ```ts
 *  getCurrentUrl('/about', currentLocale, ['en', 'fr'], 'en', false);
 *  // Returns '/fr/about' for the French locale
 *  // Returns '/about' for the default locale
 *  // Returns '/about' for the Italian locale
 *
 *  getCurrentUrl('https://example.com/about', currentLocale, ['en', 'fr'], 'en', false);
 *  // Returns 'https://example.com/fr/about' for the French locale
 *  // Returns 'https://example.com/about' for the default locale
 *  // Returns 'https://example.com/about' for the Italian locale
 * ```
 *
 * @param url - The original URL string to be prefixed with locales.
 * @param currentLocale - The current locale.
 * @param locales - Optional array of supported locales. Defaults to `localesDefault`.
 * @param defaultLocale - The default locale. Defaults to `defaultLocaleDefault`.
 * @param prefixDefault - Whether to prefix the default locale. Defaults to `prefixDefaultDefault`.
 * @returns An object mapping each locale to its corresponding multilingual URL.
 */
export const getLocalizedUrl = (
  url: string,
  currentLocale: Locales,
  locales: Locales[] = localesDefault,
  defaultLocale: Locales = defaultLocaleDefault,
  prefixDefault: boolean = prefixDefaultDefault
): string => {
  // Remove any existing locale segment from the URL
  const urlWithoutLocale = getMultilingualUrls(
    url,
    locales,
    defaultLocale,
    prefixDefault
  );

  return urlWithoutLocale[
    currentLocale as unknown as keyof typeof urlWithoutLocale
  ];
};