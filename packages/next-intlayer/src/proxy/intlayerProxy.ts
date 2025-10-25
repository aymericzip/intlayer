import configuration from '@intlayer/config/built';
import { getLocaleFromStorage } from '@intlayer/core';
import type { Locale } from '@intlayer/types';
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import { localeDetector } from './localeDetector';

console.log({ configuration });
const { internationalization, routing } = configuration ?? {};
const { locales, defaultLocale } = internationalization ?? {};
const { headerName, basePath, detectLocaleOnPrefetchNoPrefix, mode } =
  routing ?? {};
// Note: cookie names are resolved inside LocaleStorage based on configuration

// Derived flags from routing.mode
const noPrefix = !mode || mode === 'no-prefix' || mode === 'search-params';
const prefixDefault = !mode || mode === 'prefix-all';

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
  if (mode !== 'search-params') return search;

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

  const cookieLocale = getCookieLocale(request);
  const basePathTrailingSlash = basePath.endsWith('/');

  if (
    noPrefix // If the application is configured not to use locale prefixes in URLs
  ) {
    return handleNoPrefix(
      request,
      cookieLocale,
      pathname,
      basePathTrailingSlash
    );
  }

  const pathLocale = getPathLocale(pathname);

  return handlePrefix(
    request,
    cookieLocale,
    pathLocale,
    pathname,
    basePathTrailingSlash
  );
};

/**
 * Retrieves the locale from the request cookies if available and valid.
 *
 * @param request - The incoming Next.js request object.
 * @returns - The locale found in the cookies, or undefined if not found or invalid.
 */
const getCookieLocale = (request: NextRequest): Locale | undefined =>
  getLocaleFromStorage({
    getCookie: (name: string) => request.cookies.get(name)?.value ?? null,
  });

/**
 * Handles the case where URLs do not have locale prefixes.
 *
 * @param request - The incoming Next.js request object.
 * @param cookieLocale - The locale from the cookie.
 * @param pathname - The pathname from the request URL.
 * @param basePathTrailingSlash - Indicates if the basePath ends with a slash.
 * @returns - The rewritten response with the locale applied.
 */
const handleNoPrefix = (
  request: NextRequest,
  cookieLocale: Locale | undefined,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  const locale = cookieLocale ?? defaultLocale;

  const newPath = constructPath(
    locale,
    pathname,
    basePath,
    basePathTrailingSlash,
    appendLocaleSearchIfNeeded(request.nextUrl.search, locale)
  );
  return rewriteUrl(request, newPath, locale);
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
 * @param cookieLocale - The locale from the cookie.
 * @param pathLocale - The locale extracted from the pathname.
 * @param pathname - The pathname from the request URL.
 * @param basePathTrailingSlash - Indicates if the basePath ends with a slash.
 * @returns - The response to be returned to the client.
 */
const handlePrefix = (
  request: NextRequest,
  cookieLocale: Locale | undefined,
  pathLocale: Locale | undefined,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  if (
    !pathLocale // If the URL does not contain a locale prefix
  ) {
    const isPrefetch = isPrefetchRequest(request);

    if (isPrefetch && !detectLocaleOnPrefetchNoPrefix) {
      return handleMissingPathLocale(
        request,
        defaultLocale,
        pathname,
        basePathTrailingSlash
      );
    }

    return handleMissingPathLocale(
      request,
      cookieLocale,
      pathname,
      basePathTrailingSlash
    );
  }

  // If the URL contains a locale prefix
  return handleExistingPathLocale(
    request,
    cookieLocale,
    pathLocale,
    pathname,
    basePathTrailingSlash
  );
};

/**
 * Handles requests where the locale is missing from the URL pathname.
 *
 * @param request - The incoming Next.js request object.
 * @param cookieLocale - The locale from the cookie.
 * @param pathname - The pathname from the request URL.
 * @param basePathTrailingSlash - Indicates if the basePath ends with a slash.
 * @returns - The response to be returned to the client.
 */
const handleMissingPathLocale = (
  request: NextRequest,
  cookieLocale: Locale | undefined,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  let locale = (cookieLocale ??
    localeDetector?.(request) ??
    defaultLocale) as Locale;
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  const newPath = constructPath(
    locale,
    pathname,
    basePath,
    basePathTrailingSlash,
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
 * @param cookieLocale - The locale from the cookie.
 * @param pathLocale - The locale extracted from the pathname.
 * @param pathname - The pathname from the request URL.
 * @param basePathTrailingSlash - Indicates if the basePath ends with a slash.
 * @returns - The response to be returned to the client.
 */
const handleExistingPathLocale = (
  request: NextRequest,
  cookieLocale: Locale | undefined,
  pathLocale: Locale,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  if (
    // If the cookie locale is set and differs from the locale in the URL
    cookieLocale &&
    cookieLocale !== pathLocale
  ) {
    const newPath = handleCookieLocaleMismatch(
      request,
      pathname,
      pathLocale,
      cookieLocale,
      basePath,
      basePathTrailingSlash
    );
    return redirectUrl(request, newPath);
  }

  // If the cookie locale matches the path locale, or cookie locale is not set, or serverSetCookie is 'always'
  return handleDefaultLocaleRedirect(
    request,
    pathLocale,
    pathname,
    basePathTrailingSlash
  );
};

/**
 * Handles the scenario where the locale in the cookie does not match the locale in the URL pathname.
 *
 * @param request - The incoming Next.js request object.
 * @param pathname - The pathname from the request URL.
 * @param pathLocale - The locale extracted from the pathname.
 * @param cookieLocale - The locale from the cookie.
 * @param basePath - The base path of the application.
 * @param basePathTrailingSlash - Indicates if the basePath ends with a slash.
 * @returns - The new URL path with the correct locale.
 */
const handleCookieLocaleMismatch = (
  request: NextRequest,
  pathname: string,
  pathLocale: Locale,
  cookieLocale: Locale,
  basePath: string,
  basePathTrailingSlash: boolean
): string => {
  // Replace the pathLocale in the pathname with the cookieLocale
  const newPath = pathname.replace(`/${pathLocale}`, `/${cookieLocale}`);

  return constructPath(
    cookieLocale,
    newPath,
    basePath,
    basePathTrailingSlash,
    appendLocaleSearchIfNeeded(request.nextUrl.search, cookieLocale)
  );
};

/**
 * Handles redirection when the default locale is used and prefixing is not required.
 *
 * @param request - The incoming Next.js request object.
 * @param pathLocale - The locale extracted from the pathname.
 * @param pathname - The pathname from the request URL.
 * @param basePathTrailingSlash - Indicates if the basePath ends with a slash.
 * @returns - The rewritten response without the locale prefix.
 */
const handleDefaultLocaleRedirect = (
  request: NextRequest,
  pathLocale: Locale,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  if (
    // If default locale should not be prefixed and the pathLocale is the defaultLocale
    !prefixDefault &&
    pathLocale === defaultLocale
  ) {
    let pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) ?? '/';

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
 * @param basePathTrailingSlash - Indicates if the basePath ends with a slash.
 * @param [search] - The query string from the request URL (optional).
 * @returns - The constructed new path.
 */
const constructPath = (
  locale: Locale,
  path: string,
  basePath: string,
  basePathTrailingSlash: boolean,
  search?: string
): string => {
  // In 'search-params' mode, we do not prefix the path with the locale
  // If the path is already prefixed with the same locale (e.g. '/fr/...'), avoid double prefixing
  const pathWithLocalePrefix =
    mode === 'search-params'
      ? path
      : path.startsWith(`/${locale}`)
        ? path
        : `${locale}${path}`;

  let newPath = `${basePath}${basePathTrailingSlash ? '' : '/'}${pathWithLocalePrefix}`;
  if (search) {
    newPath += search;
  }
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
  response.headers.set(headerName, locale);
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

/**
 * Middleware that handles the internationalization layer
 *
 * Usage:
 *
 * ```ts
 * // ./src/middleware.ts
 *
 * export { intlayerMiddleware as middleware } from '@intlayer/next/middleware';
 *
 * // applies this middleware only to files in the app directory
 * export const config = {
 *   matcher: '/((?!api|static|.*\\..*|_next).*)',
 * };
 * ```
 *
 * Main middleware function for handling internationalization.
 *
 * @param request - The incoming Next.js request object.
 * @param event - The Next.js fetch event (optional).
 * @param response - The Next.js response object (optional).
 * @returns - The response to be returned to the client.
 */
export const intlayerMiddleware = intlayerProxy;
