import type { Locale } from '@intlayer/types/allLocales';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';
import { type RoutingOptions, resolveRoutingConfig } from './getPrefix';

/**
 * Extracts the locale segment from the given URL or pathname based on the routing mode.
 *
 * Mode Behaviors:
 * - 'prefix-no-default': Checks path prefix. If no prefix found, assumes default locale.
 * - 'prefix-all': Checks path prefix.
 * - 'search-params': Checks for 'locale' query parameter.
 * - 'no-prefix': Returns the default locale.
 *
 * @param inputUrl - The complete URL string or pathname to process.
 * @returns The detected locale, default locale (if fallback/implicit), or undefined.
 */
export const getLocaleFromPath = (
  inputUrl: string = '/',
  options?: RoutingOptions
): Locale | undefined => {
  const { defaultLocale, locales, mode } = resolveRoutingConfig(options);

  if (!defaultLocale || !locales) {
    return defaultLocale as Locale | undefined;
  }

  const isAbsoluteUrl = checkIsURLAbsolute(inputUrl);
  const fixedInputUrl =
    inputUrl?.endsWith('/') && inputUrl.length > 1
      ? inputUrl.slice(0, -1)
      : inputUrl;

  const url = isAbsoluteUrl
    ? new URL(fixedInputUrl)
    : new URL(fixedInputUrl, 'http://example.com');

  // Handle 'search-params' mode — locale is in query string
  if (mode === 'search-params') {
    const localeParam = url.searchParams.get('locale');
    if (localeParam && locales.includes(localeParam)) {
      return localeParam as Locale;
    }
    return defaultLocale as Locale;
  }

  // Handle 'no-prefix' mode — locale is not in the URL
  if (mode === 'no-prefix') {
    return defaultLocale as Locale;
  }

  // Handle prefix modes ('prefix-all' | 'prefix-no-default')
  const firstSegment = url.pathname.split('/')[1];
  if (firstSegment && locales.includes(firstSegment)) {
    return firstSegment as Locale;
  }

  // In 'prefix-no-default', no prefix implies the default locale
  if (mode === 'prefix-no-default') {
    return defaultLocale as Locale;
  }

  return undefined;
};
