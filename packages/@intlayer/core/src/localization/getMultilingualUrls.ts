import { DefaultValues } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import type { LocalesValues, StrictModeLocaleMap } from '@intlayer/types';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';
import { getPathWithoutLocale } from './getPathWithoutLocale';

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
 *  getMultilingualUrls('/dashboard', ['en', 'fr'], 'en', 'prefix-no-default')
 *     // Returns { en: '/dashboard', fr: '/fr/dashboard' }
 *
 *  // prefix-all mode
 *  getMultilingualUrls('/dashboard', ['en', 'fr'], 'en', 'prefix-all')
 *     // Returns { en: '/en/dashboard', fr: '/fr/dashboard' }
 *
 *  // search-params mode
 *  getMultilingualUrls('/dashboard', ['en', 'fr'], 'en', 'search-params')
 *     // Returns { en: '/dashboard?locale=en', fr: '/dashboard?locale=fr' }
 *
 *  // no-prefix mode
 *  getMultilingualUrls('/dashboard', ['en', 'fr'], 'en', 'no-prefix')
 *     // Returns { en: '/dashboard', fr: '/dashboard' }
 * ```
 *
 * @param url - The original URL string to be processed.
 * @param locales - Optional array of supported locales. Defaults to configured locales.
 * @param defaultLocale - The default locale. Defaults to configured default locale.
 * @param mode - URL routing mode for locale handling. Defaults to configured mode.
 * @returns An object mapping each locale to its corresponding multilingual URL.
 */
export const getMultilingualUrls = (
  url: string,
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
): StrictModeLocaleMap<string> => {
  // Remove any existing locale segment from the URL
  const urlWithoutLocale = getPathWithoutLocale(url, locales);

  // Determine if the original URL is absolute (includes protocol)
  const isAbsoluteUrl = checkIsURLAbsolute(urlWithoutLocale);

  // Initialize a URL object if the URL is absolute
  // For relative URLs, use a dummy base to leverage the URL API
  const parsedUrl = isAbsoluteUrl
    ? new URL(urlWithoutLocale)
    : new URL(urlWithoutLocale, 'http://example.com');

  // Extract the pathname from the parsed URL
  let pathname = parsedUrl.pathname;

  // Ensure the pathname starts with a '/'
  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`;
  }

  // Prepare the base URL (protocol + host) if it's absolute
  const baseUrl = isAbsoluteUrl
    ? `${parsedUrl.protocol}//${parsedUrl.host}`
    : '';

  // Default mode to 'prefix-no-default' if not provided
  const routingMode = mode ?? DefaultValues.Routing.ROUTING_MODE;

  // Generate multilingual URLs by iterating over each locale
  const multilingualUrls = (locales ?? []).reduce<StrictModeLocaleMap<string>>(
    (acc, locale) => {
      // Determine if the current locale is the default locale
      const isDefaultLocale = locale?.toString() === defaultLocale?.toString();

      let localizedUrl: string;

      if (routingMode === 'search-params') {
        // Use search parameters for locale handling
        const searchParams = new URLSearchParams(parsedUrl.search);
        searchParams.set('locale', locale.toString());

        const queryString = searchParams.toString();
        const pathWithQuery = queryString
          ? `${pathname}?${queryString}`
          : pathname;

        localizedUrl = isAbsoluteUrl
          ? `${baseUrl}${pathWithQuery}${parsedUrl.hash}`
          : `${pathWithQuery}${parsedUrl.hash}`;
      } else if (routingMode === 'no-prefix') {
        // No locale prefixing
        localizedUrl = isAbsoluteUrl
          ? `${baseUrl}${pathname}${parsedUrl.search}${parsedUrl.hash}`
          : `${pathname}${parsedUrl.search}${parsedUrl.hash}`;
      } else {
        // Handle prefix-based modes (prefix-all or prefix-no-default)
        const shouldPrefix =
          routingMode === 'prefix-all' ||
          (routingMode === 'prefix-no-default' && !isDefaultLocale);

        // Construct the new pathname with or without the locale prefix
        let localizedPath = shouldPrefix ? `/${locale}${pathname}` : pathname;

        if (localizedPath.length > 1 && localizedPath.endsWith('/')) {
          localizedPath = localizedPath.slice(0, -1);
        }

        // Combine with the base URL if the original URL was absolute
        localizedUrl = isAbsoluteUrl
          ? `${baseUrl}${localizedPath}${parsedUrl.search}${parsedUrl.hash}`
          : `${localizedPath}${parsedUrl.search}${parsedUrl.hash}`;
      }

      // Assign the constructed URL to the corresponding locale key
      acc[locale as unknown as keyof typeof acc] = localizedUrl;

      return acc;
    },
    {} as StrictModeLocaleMap<string>
  );

  return multilingualUrls;
};
