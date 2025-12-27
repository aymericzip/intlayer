import { DefaultValues } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import type { Locale, LocalesValues, RoutingConfig } from '@intlayer/types';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';

type GetLocaleFromPathOptions = {
  defaultLocale?: LocalesValues;
  locales?: LocalesValues[];
  mode?: RoutingConfig['mode'];
};

/**
 * Extracts the locale segment from the given URL or pathname based on the routing mode.
 *
 * Mode Behaviors:
 * - 'prefix-no-default': Checks path prefiIf no prefix found, assumes default locale.
 * - 'prefix-all': Checks path prefix.
 * - 'search-params': Checks for 'locale' query parameter.
 * - 'no-prefix': Returns undefined (or default if fallback is true).
 *
 * @param inputUrl - The complete URL string or pathname to process.
 * @returns The detected locale, default locale (if fallback/implicit), or undefined.
 */
export const getLocaleFromPath = (
  inputUrl: string = '/',
  options?: GetLocaleFromPathOptions
): Locale | undefined => {
  const { defaultLocale, locales, mode } = {
    defaultLocale:
      configuration?.internationalization?.defaultLocale ??
      DefaultValues.Internationalization.DEFAULT_LOCALE,
    mode: configuration?.routing?.mode ?? DefaultValues.Routing.ROUTING_MODE,
    locales:
      configuration?.internationalization?.locales ??
      DefaultValues.Internationalization.LOCALES,
    ...options,
  };

  if (!defaultLocale || !locales) {
    return DefaultValues.Internationalization.DEFAULT_LOCALE;
  }

  // Prepare the URL object
  const isAbsoluteUrl = checkIsURLAbsolute(inputUrl);
  let fixedInputUrl = inputUrl;

  if (inputUrl?.endsWith('/') && inputUrl.length > 1) {
    fixedInputUrl = inputUrl.slice(0, -1);
  }

  // For relative URLs, use a dummy base to leverage the URL API
  const url = isAbsoluteUrl
    ? new URL(fixedInputUrl)
    : new URL(fixedInputUrl, 'http://example.com');

  // Handle 'search-params' mode
  // Example: /dashboard?locale=fr
  if (mode === 'search-params') {
    const localeParam = url.searchParams.get('locale');

    if (localeParam && locales.includes(localeParam)) {
      return localeParam as Locale;
    }

    return defaultLocale as Locale;
  }

  // Handle 'no-prefix' mode
  // The locale is not stored in the URL path.
  if (mode === 'no-prefix') {
    return defaultLocale as Locale;
  }

  // Handle Prefix Modes ('prefix-all' | 'prefix-no-default')
  const pathname = url.pathname;

  // Split the pathname to extract the first segment
  // pathSegments[0] is empty string because path starts with /
  const pathSegments = pathname.split('/');
  const firstSegment = pathSegments[1];

  // Check if the first segment is a valid supported locale
  const isSegmentLocale = firstSegment && locales.includes(firstSegment);

  if (isSegmentLocale) {
    return firstSegment as Locale;
  }

  // If the first segment is NOT a locale (e./dashboard), handle based on mode
  if (mode === 'prefix-no-default') {
    // In this mode, absence of a prefix implies the default locale
    return defaultLocale as Locale;
  }

  return undefined;
};
