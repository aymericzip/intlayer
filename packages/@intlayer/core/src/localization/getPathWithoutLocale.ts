import { getConfiguration, type Locales } from '@intlayer/config/client';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';

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
  locales: (Locales | `${Locales}`)[] = localesDefault
): string => {
  // Determine if the original URL is absolute (includes protocol)
  const isAbsoluteUrl = checkIsURLAbsolute(inputUrl);

  // Initialize a URL object if the URL is absolute
  // For relative URLs, use a dummy base to leverage the URL API
  const url = isAbsoluteUrl
    ? new URL(inputUrl)
    : new URL(inputUrl, 'http://example.com');

  const pathname = url.pathname;

  // Ensure the pathname starts with '/'
  if (!pathname.startsWith('/')) {
    // If not, return the URL as is
    url.pathname = `/${pathname}`;
  }

  // Split the pathname to extract the first segment
  const pathSegments = pathname.split('/');
  const firstSegment = pathSegments[1]; // The segment after the first '/'

  // Check if the first segment is a supported locale
  if (locales.includes(firstSegment as Locales)) {
    // Remove the locale segment from the pathname
    pathSegments.splice(1, 1); // Remove the first segment

    // Reconstruct the pathname
    const newPathname = pathSegments.join('/') ?? '/';
    url.pathname = newPathname;
  }

  if (isAbsoluteUrl) {
    // Return the modified URL as a string
    return url.toString();
  }

  // Return the modified URL as a string
  return url.toString().replace('http://example.com', '');
};
