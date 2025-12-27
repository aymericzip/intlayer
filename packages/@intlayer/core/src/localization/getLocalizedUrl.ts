import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
import type { LocalesValues, RoutingConfig } from '@intlayer/types';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';
import { getPathWithoutLocale } from './getPathWithoutLocale';
import { getPrefix } from './getPrefix';

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
  currentLocale: LocalesValues,
  options: {
    locales?: LocalesValues[];
    defaultLocale?: LocalesValues;
    mode?: RoutingConfig['mode'];
  } = {}
): string => {
  const { defaultLocale, mode, locales } = {
    defaultLocale:
      configuration?.internationalization?.defaultLocale ??
      DefaultValues.Internationalization.DEFAULT_LOCALE,
    mode: configuration?.routing?.mode ?? DefaultValues.Routing.ROUTING_MODE,
    locales:
      configuration?.internationalization?.locales ??
      DefaultValues.Internationalization.LOCALES,
    ...options,
  };

  // Remove any existing locale segment from the URL
  const urlWithoutLocale = getPathWithoutLocale(url, locales);

  if (mode === 'no-prefix') {
    // No locale prefixing
    return urlWithoutLocale;
  }

  // Determine if the original URL is absolute (includes protocol)
  const isAbsoluteUrl = checkIsURLAbsolute(urlWithoutLocale);

  // Initialize a URL object if the URL is absolute
  // For relative URLs, use a dummy base to leverage the URL API
  const parsedUrl = isAbsoluteUrl
    ? new URL(urlWithoutLocale)
    : new URL(urlWithoutLocale, 'http://example.com');

  // Prepare the base URL (protocol + host) if it's absolute
  const baseUrl = isAbsoluteUrl
    ? `${parsedUrl.protocol}//${parsedUrl.host}`
    : '';

  if (mode === 'search-params') {
    // Use search parameters for locale handling
    const searchParams = new URLSearchParams(parsedUrl.search);
    searchParams.set('locale', currentLocale.toString());

    const queryString = searchParams.toString();
    const pathWithQuery = queryString
      ? `${parsedUrl.pathname}?${queryString}`
      : parsedUrl.pathname;

    if (isAbsoluteUrl) {
      return `${baseUrl}${pathWithQuery}${parsedUrl.hash}`;
    }

    return `${pathWithQuery}${parsedUrl.hash}`;
  }

  const { prefix } = getPrefix(currentLocale, {
    defaultLocale,
    mode,
    locales,
  });

  // Construct the new pathname with or without the locale prefix
  let localizedPath = `/${prefix}${parsedUrl.pathname}`;

  // Remove double slashes
  localizedPath = localizedPath.replaceAll(/\/+/g, '/');

  // Remove trailing slash for non-root paths
  if (localizedPath.length > 1 && localizedPath.endsWith('/')) {
    localizedPath = localizedPath.slice(0, -1);
  }

  // Combine with the base URL if the original URL was absolute
  if (isAbsoluteUrl) {
    return `${baseUrl}${localizedPath}${parsedUrl.search}${parsedUrl.hash}`;
  }

  return `${localizedPath}${parsedUrl.search}${parsedUrl.hash}`;
};
