import { DefaultValues } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { getLocaleFromStorage, setLocaleInStorage } from '@intlayer/core';
import type { Locale } from '@intlayer/types';
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import { localeDetector } from './localeDetector';

/**
 * Controls whether locale detection occurs during Next.js prefetch requests
 * - true: Detect and apply locale during prefetch
 * - false: Use default locale during prefetch (recommended)
 *
 * This setting affects how Next.js handles locale prefetching:
 *
 * Example scenario:
 * - User's browser language is 'fr'
 * - Current page is /fr/about
 * - Link prefetches /about
 *
 * With `detectLocaleOnPrefetchNoPrefix:true`
 * - Prefetch detects 'fr' locale from browser
 * - Redirects prefetch to /fr/about
 *
 * With `detectLocaleOnPrefetchNoPrefix:false` (default)
 * - Prefetch uses default locale
 * - Redirects prefetch to /en/about (assuming 'en' is default)
 *
 * When to use true:
 * - Your app uses non-localized internal links (e.g. <a href="/about">)
 * - You want consistent locale detection behavior between regular and prefetch requests
 *
 * When to use false (default):
 * - Your app uses locale-prefixed links (e.g. <a href="/fr/about">)
 * - You want to optimize prefetching performance
 * - You want to avoid potential redirect loops
 */
const DEFAULT_DETECT_LOCALE_ON_PREFETCH_NO_PREFIX = false;

const { internationalization, routing } = configuration ?? {};
const { locales, defaultLocale } = internationalization ?? {};
const { basePath, mode } = routing ?? {};
// Note: cookie names are resolved inside LocaleStorage based on configuration

// Derived flags from routing.mode
const effectiveMode = mode ?? DefaultValues.Routing.ROUTING_MODE;
const noPrefix =
  effectiveMode === 'no-prefix' || effectiveMode === 'search-params';
const prefixDefault = effectiveMode === 'prefix-all';

/**
 * Detects if the request is a prefetch request from Next.js.
 *
 * Next.js prefetch requests can be identified by several headers:
 * - purpose: 'prefetch' (standard prefetch header)
 * - next-router-prefetch: '1' (Next.js router prefetch)
 * - next-url: present (Next.js internal navigation)
 *
 * During prefetch, we should ignore cookie-based locale detection
 * to prevent unwanted redirects when users are switching locales.
 *
 * @param request - The incoming Next.js request object.
 * @returns - True if the request is a prefetch request, false otherwise.
 */
const isPrefetchRequest = (request: NextRequest): boolean => {
  const purpose = request.headers.get('purpose');
  const nextRouterPrefetch = request.headers.get('next-router-prefetch');
  const nextUrl = request.headers.get('next-url');
  const xNextjsData = request.headers.get('x-nextjs-data');

  return (
    purpose === 'prefetch' ||
    nextRouterPrefetch === '1' ||
    !!nextUrl ||
    !!xNextjsData
  );
};

// Ensure locale is reflected in search params when routing mode is 'search-params'
const appendLocaleSearchIfNeeded = (
  search: string | undefined,
  locale: Locale
): string | undefined => {
  if (effectiveMode !== 'search-params') return search;

  const params = new URLSearchParams(search ?? '');

  params.set('locale', locale);

  return `?${params.toString()}`;
};

/**
 * Proxy that handles the internationalization layer
 *
 * Usage:
 *
 * ```ts
 * // ./src/proxy.ts
 *
 * export { intlayerProxy as proxy } from '@intlayer/next/proxy';
 *
 * // applies this proxy only to files in the app directory
 * export const config = {
 *   matcher: '/((?!api|static|.*\\..*|_next).*)',
 * };
 * ```
 *
 * Main proxy function for handling internationalization.
 *
 * @param request - The incoming Next.js request object.
 * @param event - The Next.js fetch event (optional).
 * @param response - The Next.js response object (optional).
 * @returns - The response to be returned to the client.
 */
export const intlayerProxy = (
  request: NextRequest,
  _event?: NextFetchEvent,
  _response?: NextResponse
): NextResponse => {
  const pathname = request.nextUrl.pathname;

  const localLocale = getLocalLocale(request);

  if (
    noPrefix // If the application is configured not to use locale prefixes in URLs
  ) {
    return handleNoPrefix(request, localLocale, pathname);
  }

  const pathLocale = getPathLocale(pathname);

  return handlePrefix(request, localLocale, pathLocale, pathname);
};

/**
 * Retrieves the locale from the request cookies if available and valid.
 *
 * @param request - The incoming Next.js request object.
 * @returns - The locale found in the cookies, or undefined if not found or invalid.
 */
const getLocalLocale = (request: NextRequest): Locale | undefined =>
  getLocaleFromStorage({
    getCookie: (name: string) => request.cookies.get(name)?.value ?? null,
    getHeader: (name: string) => request.headers.get(name) ?? null,
  });

/**
 * Handles the case where URLs do not have locale prefixes.
 *
 * @param request - The incoming Next.js request object.
 * @param localLocale - The locale from the cookie.
 * @param pathname - The pathname from the request URL.
 * @returns - The rewritten response with the locale applied.
 */
const handleNoPrefix = (
  request: NextRequest,
  localLocale: Locale | undefined,
  pathname: string
): NextResponse => {
  // Check if pathname has a locale prefix (even though we're in no-prefix mode)
  const pathLocale = getPathLocale(pathname);

  // If a locale prefix is detected in the URL, redirect to remove it
  if (pathLocale) {
    // Strip the locale prefix from the pathname
    const pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) || '/';

    // Build redirect URL without locale prefix but with search params if needed
    const search = appendLocaleSearchIfNeeded(
      request.nextUrl.search,
      pathLocale
    );
    const redirectPath = search
      ? `${pathWithoutLocale}${search}`
      : `${pathWithoutLocale}${request.nextUrl.search ?? ''}`;

    // Redirect to the path without locale prefix (URL changes in browser)
    return redirectUrl(request, redirectPath);
  }

  // If no locale prefix in URL, determine locale and rewrite internally
  const locale = localLocale ?? defaultLocale;

  // In search-params mode, we need to redirect to add the locale search param
  if (effectiveMode === 'search-params') {
    // Check if locale search param already exists and matches the detected locale
    const existingSearchParams = new URLSearchParams(request.nextUrl.search);
    const existingLocale = existingSearchParams.get('locale');

    // If the existing locale matches the detected locale, no redirect needed
    if (existingLocale === locale) {
      // For internal routing, we need to add the locale prefix so Next.js can match [locale] param
      const internalPath = `/${locale}${pathname}`;
      const rewritePath = `${internalPath}${request.nextUrl.search ?? ''}`;

      // Rewrite internally (URL stays the same in browser, but Next.js routes to /[locale]/path)
      return rewriteUrl(request, rewritePath, locale);
    }

    const search = appendLocaleSearchIfNeeded(request.nextUrl.search, locale);
    const redirectPath = search
      ? `${pathname}${search}`
      : `${pathname}${request.nextUrl.search ?? ''}`;

    // Redirect to add/update the locale search param (URL changes in browser)
    return redirectUrl(request, redirectPath);
  }

  // For internal routing, we need to add the locale prefix so Next.js can match [locale] param
  const internalPath = `/${locale}${pathname}`;

  // Add search params if needed
  const search = appendLocaleSearchIfNeeded(request.nextUrl.search, locale);
  const rewritePath = search
    ? `${internalPath}${search}`
    : `${internalPath}${request.nextUrl.search ?? ''}`;

  // Rewrite internally (URL stays the same in browser, but Next.js routes to /[locale]/path)
  return rewriteUrl(request, rewritePath, locale);
};

/**
 * Extracts the locale from the URL pathname if present.
 *
 * @param pathname - The pathname from the request URL.
 * @returns - The locale found in the pathname, or undefined if not found.
 */
const getPathLocale = (pathname: string): Locale | undefined =>
  locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

/**
 * Handles the case where URLs have locale prefixes.
 *
 * @param request - The incoming Next.js request object.
 * @param localLocale - The locale from the cookie.
 * @param pathLocale - The locale extracted from the pathname.
 * @param pathname - The pathname from the request URL.
 * @param basePathTrailingSlash - Indicates if the basePath ends with a slash.
 * @returns - The response to be returned to the client.
 */
const handlePrefix = (
  request: NextRequest,
  localLocale: Locale | undefined,
  pathLocale: Locale | undefined,
  pathname: string
): NextResponse => {
  if (
    !pathLocale // If the URL does not contain a locale prefix
  ) {
    const isPrefetch = isPrefetchRequest(request);

    if (isPrefetch && !DEFAULT_DETECT_LOCALE_ON_PREFETCH_NO_PREFIX) {
      return handleMissingPathLocale(request, defaultLocale, pathname);
    }

    return handleMissingPathLocale(request, localLocale, pathname);
  }

  // If the URL contains a locale prefix
  return handleExistingPathLocale(request, localLocale, pathLocale, pathname);
};

/**
 * Handles requests where the locale is missing from the URL pathname.
 *
 * @param request - The incoming Next.js request object.
 * @param localLocale - The locale from the cookie.
 * @param pathname - The pathname from the request URL.
 * @param basePathTrailingSlash - Indicates if the basePath ends with a slash.
 * @returns - The response to be returned to the client.
 */
const handleMissingPathLocale = (
  request: NextRequest,
  localLocale: Locale | undefined,
  pathname: string
): NextResponse => {
  let locale = (localLocale ??
    localeDetector?.(request) ??
    defaultLocale) as Locale;
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  const newPath = constructPath(
    locale,
    pathname,
    basePath,
    appendLocaleSearchIfNeeded(request.nextUrl.search, locale)
  );

  return prefixDefault || locale !== defaultLocale
    ? redirectUrl(request, newPath)
    : rewriteUrl(request, newPath, locale);
};

/**
 * Handles requests where the locale exists in the URL pathname.
 *
 * @param request - The incoming Next.js request object.
 * @param localLocale - The locale from the cookie.
 * @param pathLocale - The locale extracted from the pathname.
 * @param pathname - The pathname from the request URL.
 * @returns - The response to be returned to the client.
 */
const handleExistingPathLocale = (
  request: NextRequest,
  localLocale: Locale | undefined,
  pathLocale: Locale,
  pathname: string
): NextResponse => {
  if (
    // If the cookie locale is set and differs from the locale in the URL
    localLocale &&
    localLocale !== pathLocale
  ) {
    const newPath = handleCookieLocaleMismatch(
      request,
      pathname,
      pathLocale,
      localLocale,
      basePath
    );
    return redirectUrl(request, newPath);
  }

  // If the cookie locale matches the path locale, or cookie locale is not set, or serverSetCookie is 'always'
  return handleDefaultLocaleRedirect(request, pathLocale, pathname);
};

/**
 * Handles the scenario where the locale in the cookie does not match the locale in the URL pathname.
 *
 * @param request - The incoming Next.js request object.
 * @param pathname - The pathname from the request URL.
 * @param pathLocale - The locale extracted from the pathname.
 * @param localLocale - The locale from the cookie.
 * @param basePath - The base path of the application.
 * @returns - The new URL path with the correct locale.
 */
const handleCookieLocaleMismatch = (
  request: NextRequest,
  pathname: string,
  pathLocale: Locale,
  localLocale: Locale,
  basePath: string
): string => {
  // Replace the pathLocale in the pathname with the localLocale
  const newPath = pathname.replace(`/${pathLocale}`, `/${localLocale}`);

  return constructPath(
    localLocale,
    newPath,
    basePath,
    appendLocaleSearchIfNeeded(request.nextUrl.search, localLocale)
  );
};

/**
 * Handles redirection when the default locale is used and prefixing is not required.
 *
 * @param request - The incoming Next.js request object.
 * @param pathLocale - The locale extracted from the pathname.
 * @param pathname - The pathname from the request URL.
 * @returns - The rewritten response without the locale prefix.
 */
const handleDefaultLocaleRedirect = (
  request: NextRequest,
  pathLocale: Locale,
  pathname: string
): NextResponse => {
  if (
    // If default locale should not be prefixed and the pathLocale is the defaultLocale
    !prefixDefault &&
    pathLocale === defaultLocale
  ) {
    let pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) ?? '/';

    const basePathTrailingSlash = basePath.endsWith('/');

    if (basePathTrailingSlash) {
      pathWithoutLocale = pathWithoutLocale.slice(1);
    }

    const searchWithLocale = appendLocaleSearchIfNeeded(
      request.nextUrl.search,
      pathLocale
    );
    if (searchWithLocale) {
      pathWithoutLocale += searchWithLocale;
    } else if (request.nextUrl.search) {
      pathWithoutLocale += request.nextUrl.search;
    }

    return rewriteUrl(request, `${basePath}${pathWithoutLocale}`, pathLocale);
  }

  // If prefixing default locale is required or pathLocale is not the defaultLocale

  const searchWithLocale = appendLocaleSearchIfNeeded(
    request.nextUrl.search,
    pathLocale
  );
  const newPath = searchWithLocale
    ? `${pathname}${searchWithLocale}`
    : pathname;
  return rewriteUrl(request, newPath, pathLocale);
};

/**
 * Constructs a new path by combining the locale, path, basePath, and search parameters.
 *
 * @param locale - The locale to include in the path.
 * @param path - The original path from the request.
 * @param basePath - The base path of the application.
 * @param [search] - The query string from the request URL (optional).
 * @returns - The constructed new path.
 */
const constructPath = (
  locale: Locale,
  path: string,
  basePath: string,
  search?: string
): string => {
  // In 'search-params' and 'no-prefix' modes, do not prefix the path with the locale
  // Also, strip any incoming locale prefix if present
  const pathWithoutPrefix = path.startsWith(`/${locale}`)
    ? path.slice(`/${locale}`.length) || '/'
    : path;

  if (effectiveMode === 'no-prefix') {
    if (search) {
      return `${pathWithoutPrefix}?${search}`;
    }

    return pathWithoutPrefix;
  }

  if (effectiveMode === 'search-params') {
    if (search) {
      return `${pathWithoutPrefix}?${search}`;
    }

    return pathWithoutPrefix;
  }

  const pathWithLocalePrefix = path.startsWith(`/${locale}`)
    ? path
    : `${locale}${path}`;

  const basePathTrailingSlash = basePath.endsWith('/');

  const newPath = `${basePath}${basePathTrailingSlash ? '' : '/'}${pathWithLocalePrefix}`;

  return newPath;
};

/**
 * Rewrites the URL to the new path and sets the locale header.
 *
 * @param request - The incoming Next.js request object.
 * @param newPath - The new path to rewrite to.
 * @param locale - The locale to set in the response header.
 * @returns - The rewritten response.
 */
const rewriteUrl = (
  request: NextRequest,
  newPath: string,
  locale: Locale
): NextResponse => {
  // Ensure we preserve the original search params if they were present and not explicitly included in newPath
  const search = request.nextUrl.search;
  const pathWithSearch =
    search && !newPath.includes('?') ? `${newPath}${search}` : newPath;

  const response = NextResponse.rewrite(new URL(pathWithSearch, request.url));

  setLocaleInStorage(locale, {
    setHeader: (name: string, value: string) =>
      response.headers.set(name, value),
  });

  return response;
};

/**
 * Redirects the request to the new path.
 *
 * @param request - The incoming Next.js request object.
 * @param newPath - The new path to redirect to.
 * @returns - The redirect response.
 */
const redirectUrl = (request: NextRequest, newPath: string): NextResponse => {
  // Ensure we preserve the original search params if they were present and not explicitly included in newPath
  const search = request.nextUrl.search;
  const pathWithSearch =
    search && !newPath.includes('?') ? `${newPath}${search}` : newPath;

  return NextResponse.redirect(new URL(pathWithSearch, request.url));
};
