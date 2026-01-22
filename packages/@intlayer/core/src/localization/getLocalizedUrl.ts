import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
import type { LocalesValues, RoutingConfig } from '@intlayer/types';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';
import { getPathWithoutLocale } from './getPathWithoutLocale';
import { getPrefix } from './getPrefix';
import { getCanonicalPath, getLocalizedPath } from './rewriteUtils';

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
    rewrite?: RoutingConfig['rewrite'];
  } = {}
): string => {
  const { defaultLocale, mode, locales, rewrite } = {
    defaultLocale:
      configuration?.internationalization?.defaultLocale ??
      DefaultValues.Internationalization.DEFAULT_LOCALE,
    mode: configuration?.routing?.mode ?? DefaultValues.Routing.ROUTING_MODE,
    locales:
      configuration?.internationalization?.locales ??
      DefaultValues.Internationalization.LOCALES,
    rewrite: configuration?.routing?.rewrite,
    ...options,
  };

  const urlWithoutLocale = getPathWithoutLocale(url, locales);

  if (mode === 'no-prefix') {
    // 1. Resolve to canonical path first from the potentially localized input URL
    const canonicalPathname = getCanonicalPath(
      urlWithoutLocale,
      undefined,
      rewrite
    );

    // 2. Localize the canonical path for the target locale
    return getLocalizedPath(canonicalPathname, currentLocale as any, rewrite);
  }

  const isAbsoluteUrl = checkIsURLAbsolute(urlWithoutLocale);

  const parsedUrl = isAbsoluteUrl
    ? new URL(urlWithoutLocale)
    : new URL(urlWithoutLocale, 'http://example.com');

  const baseUrl = isAbsoluteUrl
    ? `${parsedUrl.protocol}//${parsedUrl.host}`
    : '';

  // 1. Resolve to canonical path first
  const canonicalPathname = getCanonicalPath(
    parsedUrl.pathname,
    undefined,
    rewrite
  );

  // 2. Localize the canonical path for the target locale
  const translatedPathname = getLocalizedPath(
    canonicalPathname,
    currentLocale as any,
    rewrite
  );

  if (mode === 'search-params') {
    const searchParams = new URLSearchParams(parsedUrl.search);
    searchParams.set('locale', currentLocale.toString());

    const queryString = searchParams.toString();
    const pathWithQuery = queryString
      ? `${translatedPathname}?${queryString}`
      : translatedPathname;

    return isAbsoluteUrl
      ? `${baseUrl}${pathWithQuery}${parsedUrl.hash}`
      : `${pathWithQuery}${parsedUrl.hash}`;
  }

  const { prefix } = getPrefix(currentLocale, {
    defaultLocale,
    mode,
    locales,
  });

  let localizedPath = `/${prefix}${translatedPathname}`;

  localizedPath = localizedPath.replaceAll(/\/+/g, '/');

  if (localizedPath.length > 1 && localizedPath.endsWith('/')) {
    localizedPath = localizedPath.slice(0, -1);
  }

  const finalUrl = isAbsoluteUrl
    ? `${baseUrl}${localizedPath}${parsedUrl.search}${parsedUrl.hash}`
    : `${localizedPath}${parsedUrl.search}${parsedUrl.hash}`;

  return finalUrl;
};
