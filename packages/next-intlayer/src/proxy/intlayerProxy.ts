import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
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
 */
const handleNoPrefix = (
  request: NextRequest,
  localLocale: Locale | undefined,
  pathname: string
): NextResponse => {
  const pathLocale = getPathLocale(pathname);
  const locale = localLocale ?? defaultLocale;

  // If user typed /fr/about but mode is no-prefix,
  // we REDIRECT to /about (clean URL)
  if (pathLocale) {
    const pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) || '/';
    const search = appendLocaleSearchIfNeeded(
      request.nextUrl.search,
      pathLocale
    );
    return redirectUrl(request, `${pathWithoutLocale}${search}`);
  }

  // Handle search-params redirect if locale is missing from URL
  if (effectiveMode === 'search-params') {
    const currentParam = request.nextUrl.searchParams.get('locale');
    if (currentParam !== locale) {
      const search = appendLocaleSearchIfNeeded(request.nextUrl.search, locale);
      return redirectUrl(request, `${pathname}${search}`);
    }
  }

  // INTERNAL REWRITE
  // We rewrite to the clean pathname.
  // If they have a [locale] folder, rewriteUrl (above) will handle adding it back.
  return rewriteUrl(request, pathname, locale);
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

  // Determine if we should redirect or rewrite
  // If we are in 'prefix-all', we MUST redirect / -> /en/
  // If we are in 'prefix-no-default' and locale is NOT default, redirect / -> /fr/
  const shouldRedirect = prefixDefault || locale !== defaultLocale;

  if (shouldRedirect) {
    const newPath = constructPath(
      locale,
      pathname,
      basePath,
      appendLocaleSearchIfNeeded(request.nextUrl.search, locale)
    );
    return redirectUrl(request, newPath);
  }

  // --- THE FIX FOR / 404 ---
  // If we are at the root (or any path) and it's the default locale
  // (or we are in no-prefix mode), rewrite to the actual physical pathname.
  return rewriteUrl(request, pathname, locale);
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
/**
 * Handles requests where the locale exists in the URL pathname.
 */
const handleExistingPathLocale = (
  request: NextRequest,
  localLocale: Locale | undefined,
  pathLocale: Locale,
  pathname: string
): NextResponse => {
  // 1. If cookie locale differs from path locale, redirect to the cookie locale
  // (Standard Intlayer behavior)
  if (localLocale && localLocale !== pathLocale) {
    const newPath = handleCookieLocaleMismatch(
      request,
      pathname,
      pathLocale,
      localLocale,
      basePath
    );
    return redirectUrl(request, newPath);
  }

  // 2. Handle the rewrite logic
  return handleDefaultLocaleRedirect(request, pathLocale, pathname);
};

/**
 * The key fix for 404s without [locale] folders
 */
const handleDefaultLocaleRedirect = (
  request: NextRequest,
  pathLocale: Locale,
  pathname: string
): NextResponse => {
  // Determine if we need to remove the prefix for the default locale
  const isDefaultAndNoPrefix = !prefixDefault && pathLocale === defaultLocale;

  if (isDefaultAndNoPrefix) {
    const pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) || '/';
    // ... (rest of your existing search param logic)
    return redirectUrl(request, `${basePath}${pathWithoutLocale}`);
  }

  // --- THE FIX ---
  // If the path contains a locale (like /fr) but we DON'T have a [locale] folder,
  // we rewrite the path to its "clean" version internally.

  // Strip the /fr prefix from the pathname for the internal rewrite
  const internalPathname = pathname.slice(`/${pathLocale}`.length) || '/';

  const searchWithLocale = appendLocaleSearchIfNeeded(
    request.nextUrl.search,
    pathLocale
  );

  const rewritePath = searchWithLocale
    ? `${internalPathname}${searchWithLocale}`
    : internalPathname;

  // Internal rewrite: Next.js sees / (or /path), user sees /fr/path
  return rewriteUrl(request, rewritePath, pathLocale);
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
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  let finalPath = normalizedPath;

  // If we are in a mode that doesn't want prefixes in the URL
  if (effectiveMode === 'no-prefix' || effectiveMode === 'search-params') {
    // Strip the locale from the path if it exists
    // This allows /fr/about to be treated as /about internally
    for (const loc of locales) {
      if (
        normalizedPath.startsWith(`/${loc}/`) ||
        normalizedPath === `/${loc}`
      ) {
        finalPath = normalizedPath.slice(`/${loc}`.length) || '/';
        break;
      }
    }
  } else {
    // Prefix modes: ensure the locale IS there
    finalPath = normalizedPath.startsWith(`/${locale}`)
      ? normalizedPath
      : `/${locale}${normalizedPath}`;
  }

  const cleanBasePath = basePath.replace(/\/$/, '');
  const result = `${cleanBasePath}${finalPath}`;

  return search
    ? `${result}${search.startsWith('?') ? '' : '?'}${search}`
    : result;
};

/**
 * This handles the internal path Next.js sees.
 * To support optional [locale] folders, we need to decide if we
 * keep the locale prefix or strip it.
 */
const rewriteUrl = (
  request: NextRequest,
  newPath: string,
  locale: Locale
): NextResponse => {
  const url = request.nextUrl.clone();
  const pathname = newPath.split('?')[0];

  // We determine if we should internally prefix based on the routing mode.
  // If user has [locale] folder, 'prefix-all' or 'prefix-no-default' usually works.
  // If user does NOT have [locale] folder, they usually use 'no-prefix'.

  const shouldInternallyPrefix =
    effectiveMode !== 'no-prefix' && effectiveMode !== 'search-params';

  if (shouldInternallyPrefix) {
    // If the path doesn't already have the locale, we add it for internal routing
    if (!getPathLocale(pathname)) {
      url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    } else {
      url.pathname = pathname;
    }
  } else {
    // For no-prefix or search-params, we ensure the internal path is CLEAN
    const pathLocale = getPathLocale(pathname);
    if (pathLocale) {
      url.pathname = pathname.slice(`/${pathLocale}`.length) || '/';
    } else {
      url.pathname = pathname;
    }
  }

  const response = NextResponse.rewrite(url);

  // CRITICAL: Set the locale in a header.
  // If the [locale] folder is missing, the Intlayer server-component
  // will read this header as a fallback to prevent "Missing Tags"
  setLocaleInStorage(locale, {
    setHeader: (name: string, value: string) => {
      response.headers.set(name, value);
    },
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
