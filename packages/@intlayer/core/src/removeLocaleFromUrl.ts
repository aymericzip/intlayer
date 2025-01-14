import { getConfiguration, type Locales } from '@intlayer/config/client';

const { internationalization } = getConfiguration();
const { locales: localesDefault } = internationalization;

/**
 * Removes the locale segment from the given URL if present.
 *
 * This function get the locales from the configuration if not provided.
 *
 * Example:
 *
 * ```ts
 * removeLocaleFromUrl('https://example.com/en/dashboard') // Returns 'https://example.com/dashboard'
 * removeLocaleFromUrl('https://example.com/fr/dashboard') // Returns 'https://example.com/fr/dashboard'
 * removeLocaleFromUrl('https://example.com/dashboard') // Returns 'https://example.com/dashboard'
 * ```
 *
 * @param inputUrl - The complete URL string to process.
 * @param locales - Optional array of supported locales. Defaults to `localesDefault`.
 * @returns The URL string without the locale segment.
 */
export const removeLocaleFromUrl = (
  inputUrl: string,
  locales: Locales[] = localesDefault
): string => {
  // Parse the input URL
  const url = new URL(inputUrl);

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

  // Return the modified URL as a string
  return url.toString();
};
