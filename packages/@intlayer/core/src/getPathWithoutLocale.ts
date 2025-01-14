import { getConfiguration, type Locales } from '@intlayer/config/client';
import { removeLocaleFromUrl } from './removeLocaleFromUrl';

const { internationalization } = getConfiguration();
const { locales: localesDefault } = internationalization;

/**
 * Removes the locale segment from the given URL or pathname if present.
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
 * getPathWithoutLocale('https://example.com/en/dashboard') // Returns 'https://example.com/dashboard'
 * getPathWithoutLocale('https://example.com/fr/dashboard') // Returns 'https://example.com/dashboard'
 * getPathWithoutLocale('https://example.com/dashboard') // Returns 'https://example.com/dashboard'
 * ```
 *
 * @param inputUrl - The complete URL string or pathname to process.
 * @param locales - Optional array of supported locales. Defaults to `localesDefault`.
 * @returns The URL string or pathname without the locale segment.
 */
export const getPathWithoutLocale = (
  inputUrl: string,
  locales: Locales[] = localesDefault
): string => {
  // Determine if the input is an absolute URL
  const isAbsoluteUrl = checkIsAbsoluteUrl(inputUrl);

  // If it's an absolute URL, parse it using the URL constructor
  // Otherwise, handle it as a relative pathname
  const url = isAbsoluteUrl
    ? new URL(inputUrl)
    : new URL(inputUrl, 'http://example.com');

  const urlWithoutLocale = removeLocaleFromUrl(url.toString(), locales);

  if (isAbsoluteUrl) {
    // If the input was an absolute URL, return the modified URL as a string
    return urlWithoutLocale;
  }

  // If the input was a relative pathname, return the modified pathname
  return urlWithoutLocale.replace('http://example.com', '');
};

export const checkIsAbsoluteUrl = (url: string): boolean =>
  /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
