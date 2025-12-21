import configuration from '@intlayer/config/built';
import { type Locale, Locales } from '@intlayer/types';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';

/**
 * Extracts the locale segment from the given URL or pathname if present.
 * If no locale is present, returns the default locale (en).
 *
 * Example:
 *
 * ```ts
 * getLocaleFromPath('/en/dashboard') // Returns 'en'
 * getLocaleFromPath('/fr/dashboard') // Returns 'fr'
 * getLocaleFromPath('/dashboard') // Returns 'en'
 * getLocaleFromPath('dashboard') // Returns 'en'
 * getLocaleFromPath('https://example.com/es/dashboard') // Returns 'es'
 * getLocaleFromPath('https://example.com/fr/dashboard') // Returns 'fr'
 * getLocaleFromPath('https://example.com/dashboard') // Returns 'en'
 * ```
 *
 * @param inputUrl - The complete URL string or pathname to process.
 * @returns The detected locale or default (en) if no locale is found
 */
export const getLocaleFromPath = (inputUrl: string = '/'): Locale => {
  // Define supported locales array
  const { defaultLocale, locales } = configuration?.internationalization ?? {};

  if (!defaultLocale || !locales) {
    return Locales.ENGLISH;
  }

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
    // If not, return the default locale
    return defaultLocale;
  }

  // Split the pathname to extract the first segment
  const pathSegments = pathname.split('/');
  const firstSegment = pathSegments[1]; // The segment after the first '/'

  // Check if the first segment is a supported locale
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    // Return the detected locale
    return firstSegment as Locale;
  }

  // Return the default locale if no locale is found in the path
  return defaultLocale;
};
