// @ts-ignore intlayer declared for module augmentation
import { getConfiguration, Locales } from '@intlayer/config/client';
import type { IConfigLocales } from 'intlayer';
import {
  checkIsAbsoluteUrl,
  getPathWithoutLocale,
} from './getPathWithoutLocale';

// Destructure necessary configurations
const { internationalization, middleware } = getConfiguration();
const { locales: localesDefault, defaultLocale: defaultLocaleDefault } =
  internationalization;
const { prefixDefault: prefixDefaultDefault } = middleware;

/**
 * Generates multilingual URLs by prefixing the given URL with each supported locale.
 * Handles both absolute and relative URLs appropriately.
 *
 * This function get the locales, default locale, and prefix default from the configuration if not provided.
 *
 * Example:
 *
 * ```ts
 *  getMultilingualUrls('/dashboard', ['en', 'fr'], 'en', false)
 *     // Returns { en: '/dashboard', fr: '/fr/dashboard' }
 *  getMultilingualUrls('https://example.com/dashboard', ['en', 'fr'], 'en', true)
 *     // Returns { en: 'https://example.com/en/dashboard', fr: 'https://example.com/fr/dashboard' }
 * ```
 *
 * @param url - The original URL string to be prefixed with locales.
 * @param locales - Optional array of supported locales. Defaults to `localesDefault`.
 * @param defaultLocale - The default locale. Defaults to `defaultLocaleDefault`.
 * @param prefixDefault - Whether to prefix the default locale. Defaults to `prefixDefaultDefault`.
 * @returns An object mapping each locale to its corresponding multilingual URL.
 */
export const getMultilingualUrls = (
  url: string,
  locales: Locales[] = localesDefault,
  defaultLocale: Locales = defaultLocaleDefault,
  prefixDefault: boolean = prefixDefaultDefault
): IConfigLocales<string> => {
  // Remove any existing locale segment from the URL
  const urlWithoutLocale = getPathWithoutLocale(url, locales);

  // Determine if the original URL is absolute (includes protocol)
  const isAbsoluteUrl = checkIsAbsoluteUrl(urlWithoutLocale);

  // Initialize a URL object if the URL is absolute
  // For relative URLs, use a dummy base to leverage the URL API
  const base = isAbsoluteUrl ? undefined : 'http://example.com';
  const parsedUrl = new URL(urlWithoutLocale, base);

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

  // Generate multilingual URLs by iterating over each locale
  const multilingualUrls = locales.reduce<IConfigLocales<string>>(
    (acc, locale) => {
      // Determine if the current locale is the default locale
      const isDefaultLocale = locale.toString() === defaultLocale.toString();

      // Decide whether to prefix the default locale based on `prefixDefault`
      const shouldPrefix = prefixDefault || !isDefaultLocale;

      // Construct the new pathname with or without the locale prefix
      const localizedPath = shouldPrefix ? `/${locale}${pathname}` : pathname;

      // Combine with the base URL if the original URL was absolute
      const localizedUrl = isAbsoluteUrl
        ? `${baseUrl}${localizedPath}${parsedUrl.search}${parsedUrl.hash}`
        : `${localizedPath}${parsedUrl.search}${parsedUrl.hash}`;

      // Assign the constructed URL to the corresponding locale key
      acc[locale as unknown as keyof IConfigLocales<string>] = localizedUrl;

      return acc;
    },
    {} as IConfigLocales<string> // Initialize an empty object
  );

  return multilingualUrls;
};
