import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';
import {
  isDeclaredLocale,
  type RoutingOptions,
  resolveRoutingConfig,
} from './getPrefix';

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
): DeclaredLocales | undefined => {
  const { defaultLocale, locales, mode } = resolveRoutingConfig(options);

  if (!defaultLocale || !locales) {
    return defaultLocale as DeclaredLocales | undefined;
  }

  const isAbsoluteUrl = checkIsURLAbsolute(inputUrl);
  const fixedInputUrl =
    inputUrl?.endsWith('/') && inputUrl.length > 1
      ? inputUrl.slice(0, -1)
      : inputUrl;

  const url = isAbsoluteUrl
    ? new URL(fixedInputUrl)
    : new URL(fixedInputUrl, 'http://e.com');

  // Handle 'search-params' mode — locale is in query string
  if (mode === 'search-params') {
    const localeParam = url.searchParams.get('locale');
    if (isDeclaredLocale(localeParam, locales)) {
      return localeParam;
    }
    return defaultLocale as DeclaredLocales;
  }

  // Handle 'no-prefix' mode — locale is not in the URL
  if (mode === 'no-prefix') {
    return defaultLocale as DeclaredLocales;
  }

  // Handle prefix modes ('prefix-all' | 'prefix-no-default')
  const firstSegment = url.pathname.split('/')[1];
  if (isDeclaredLocale(firstSegment, locales)) {
    return firstSegment;
  }

  // In 'prefix-no-default', no prefix implies the default locale
  if (mode === 'prefix-no-default') {
    return defaultLocale as DeclaredLocales;
  }

  return undefined;
};
