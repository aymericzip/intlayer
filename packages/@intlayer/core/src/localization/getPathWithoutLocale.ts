import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';

import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';

/**
 * Removes the locale segment from the given URL or pathname if present.
 * Also removes locale from search parameters if present.
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
 * getPathWithoutLocale('/dashboard?locale=fr') // Returns '/dashboard'
 * getPathWithoutLocale('https://example.com/en/dashboard') // Returns 'https://example.com/dashboard'
 * getPathWithoutLocale('https://example.com/fr/dashboard') // Returns 'https://example.com/dashboard'
 * getPathWithoutLocale('https://example.com/dashboard') // Returns 'https://example.com/dashboard'
 * getPathWithoutLocale('https://example.com/dashboard?locale=fr') // Returns 'https://example.com/dashboard'
 * ```
 *
 * @param inputUrl - The complete URL string or pathname to process.
 * @param locales - Optional array of supported locales. Defaults to `localesDefault`.
 * @returns The URL string or pathname without the locale segment or locale search parameter.
 */
export const getPathWithoutLocale = (
  inputUrl: string,
  locales: LocalesValues[] = configuration?.internationalization?.locales
): string => {
  // Determine if the original URL is absolute (includes protocol)
  const isAbsoluteUrl = checkIsURLAbsolute(inputUrl);

  let fixedInputUrl = inputUrl;

  if (inputUrl.endsWith('/')) {
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
    // If not, return the URL as is
    url.pathname = `/${pathname}`;
  }

  // Split the pathname to extract the first segment
  const pathSegments = pathname.split('/');
  const firstSegment = pathSegments[1]; // The segment after the first '/'

  // Check if the first segment is a supported locale
  if (locales?.includes(firstSegment as LocalesValues)) {
    // Remove the locale segment from the pathname
    pathSegments.splice(1, 1); // Remove the first segment

    // Reconstruct the pathname
    const newPathname = pathSegments.join('/') ?? '/';
    url.pathname = newPathname;
  }

  // Remove locale from search parameters if present
  const searchParams = new URLSearchParams(url.search);
  if (searchParams.has('locale')) {
    searchParams.delete('locale');
    url.search = searchParams.toString();
  }

  if (isAbsoluteUrl) {
    // Return the modified URL as a string
    return url.toString();
  }

  // Return the modified URL as a string
  return url.toString().replace('http://example.com', '');
};
