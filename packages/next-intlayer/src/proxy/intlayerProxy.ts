import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
import {
  getCanonicalPath,
  getLocaleFromStorage,
  getLocalizedPath,
  getRewriteRules,
  setLocaleInStorage,
} from '@intlayer/core';
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
const { basePath, mode, rewrite } = routing ?? {};

// Note: cookie names are resolved inside LocaleStorage based on configuration

// Derived flags from routing.mode
const effectiveMode = mode ?? DefaultValues.Routing.ROUTING_MODE;
const noPrefix =
  effectiveMode === 'no-prefix' || effectiveMode === 'search-params';
const prefixDefault = effectiveMode === 'prefix-all';

const internalPrefix = !noPrefix;

const rewriteRules = getRewriteRules(rewrite, 'url');

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

  if (noPrefix) {
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

  if (pathLocale) {
    const pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) || '/';

    const canonicalPath = getCanonicalPath(
      pathWithoutLocale,
      pathLocale,
      rewriteRules
    );

    const search = appendLocaleSearchIfNeeded(
      request.nextUrl.search,
      pathLocale
    );

    const redirectPath = search
      ? `${canonicalPath}${search}`
      : `${canonicalPath}${request.nextUrl.search ?? ''}`;

    return redirectUrl(request, redirectPath);
  }

  // Resolve the internal canonical path
  // If user visits /a-propos (no prefix), and we detect 'fr', we resolve to /about
  const canonicalPath = getCanonicalPath(
    pathname,
    locale as Locale,
    rewriteRules
  );

  if (effectiveMode === 'search-params') {
    const existingSearchParams = new URLSearchParams(request.nextUrl.search);
    const existingLocale = existingSearchParams.get('locale');

    if (existingLocale === locale) {
      const internalPath = internalPrefix
        ? `/${locale}${canonicalPath}`
        : canonicalPath;
      const rewritePath = `${internalPath}${request.nextUrl.search ?? ''}`;
      return rewriteUrl(request, rewritePath, locale as Locale);
    }

    const search = appendLocaleSearchIfNeeded(
      request.nextUrl.search,
      locale as Locale
    );
    // Use original pathname for redirect to preserve user's URL input, just adding params
    const redirectPath = search
      ? `${pathname}${search}`
      : `${pathname}${request.nextUrl.search ?? ''}`;

    return redirectUrl(request, redirectPath);
  }

  const internalPath = internalPrefix
    ? `/${locale}${canonicalPath}`
    : canonicalPath;
  const search = appendLocaleSearchIfNeeded(
    request.nextUrl.search,
    locale as Locale
  );
  const rewritePath = search
    ? `${internalPath}${search}`
    : `${internalPath}${request.nextUrl.search ?? ''}`;

  return rewriteUrl(request, rewritePath, locale as Locale);
};

/**
 * Extracts the locale from the URL pathname if present.
 *
 * @param pathname - The pathname from the request URL.
 * @returns - The locale found in the pathname, or undefined if not found.
 */
const getPathLocale = (pathname: string): Locale | undefined =>
  (locales as Locale[]).find(
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
  if (!pathLocale) {
    const isPrefetch = isPrefetchRequest(request);
    if (isPrefetch && !DEFAULT_DETECT_LOCALE_ON_PREFETCH_NO_PREFIX) {
      return handleMissingPathLocale(
        request,
        defaultLocale as Locale,
        pathname
      );
    }
    return handleMissingPathLocale(request, localLocale, pathname);
  }

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

  if (!(locales as Locale[]).includes(locale)) {
    locale = defaultLocale as Locale;
  }

  // Resolve to canonical path.
  // If user visits /a-propos (implied 'fr'), we resolve to /about
  const canonicalPath = getCanonicalPath(pathname, locale, rewriteRules);

  // Determine target localized path for redirection
  // /about + 'fr' -> /a-propos
  const targetLocalizedPathResult = getLocalizedPath(
    canonicalPath,
    locale,
    rewriteRules
  );
  const targetLocalizedPath =
    typeof targetLocalizedPathResult === 'string'
      ? targetLocalizedPathResult
      : targetLocalizedPathResult.path;

  const newPath = constructPath(
    locale,
    targetLocalizedPath,
    basePath as string,
    appendLocaleSearchIfNeeded(request.nextUrl.search, locale)
  );

  return prefixDefault || locale !== defaultLocale
    ? redirectUrl(request, newPath)
    : rewriteUrl(
        request,
        internalPrefix ? `/${locale}${canonicalPath}` : canonicalPath,
        locale
      ); // Rewrite must use Canonical
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
  const rawPath = pathname.slice(`/${pathLocale}`.length) || '/';

  // 1. Identify the Canonical Path (Internal Next.js path)
  // Ex: /a-propos (from URL) -> /about (Canonical)
  const canonicalPath = getCanonicalPath(rawPath, pathLocale, rewriteRules);

  if (localLocale && localLocale !== pathLocale) {
    // Cookie mismatch: Redirect to the correct locale using the Canonical Path as the source
    const newPath = handleCookieLocaleMismatch(
      request,
      canonicalPath, // Pass /about
      localLocale,
      basePath as string
    );
    return redirectUrl(request, newPath);
  }

  // Rewrite Logic
  // We must rewrite to the Next.js internal structure: /[locale]/[canonicalPath]
  // Ex: Rewrite /fr/a-propos -> /fr/about

  // 2. Redirect to localized path if needed (Canonical -> Localized)
  // Ex: /fr/about -> /fr/a-propos
  const targetLocalizedPathResult = getLocalizedPath(
    canonicalPath,
    pathLocale,
    rewriteRules
  );
  const targetLocalizedPath =
    typeof targetLocalizedPathResult === 'string'
      ? targetLocalizedPathResult
      : targetLocalizedPathResult.path;
  const isRewritten =
    typeof targetLocalizedPathResult === 'string'
      ? false
      : targetLocalizedPathResult.isRewritten;

  if (isRewritten && targetLocalizedPath !== rawPath) {
    const newPath = constructPath(
      pathLocale,
      targetLocalizedPath,
      basePath as string,
      appendLocaleSearchIfNeeded(request.nextUrl.search, pathLocale)
    );
    return redirectUrl(request, newPath);
  }

  const internalUrl = internalPrefix
    ? `/${pathLocale}${canonicalPath}`
    : canonicalPath;

  // Only handle redirect if we are strictly managing default locale prefixing
  if (!prefixDefault && pathLocale === defaultLocale) {
    return handleDefaultLocaleRedirect(
      request,
      pathLocale,
      pathname,
      canonicalPath
    );
  }

  const search = request.nextUrl.search;
  return rewriteUrl(request, internalUrl + (search ?? ''), pathLocale);
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
  canonicalPath: string,
  localLocale: Locale,
  basePath: string
): string => {
  // Translate canonical path (/about) to target locale path (/es/acerca)
  const targetLocalizedPathResult = getLocalizedPath(
    canonicalPath,
    localLocale,
    rewriteRules
  );
  const targetLocalizedPath =
    typeof targetLocalizedPathResult === 'string'
      ? targetLocalizedPathResult
      : targetLocalizedPathResult.path;

  return constructPath(
    localLocale,
    targetLocalizedPath,
    basePath,
    appendLocaleSearchIfNeeded(request.nextUrl.search, localLocale)
  );
};

/**
 * The key fix for 404s without [locale] folders
 */
const handleDefaultLocaleRedirect = (
  request: NextRequest,
  pathLocale: Locale,
  pathname: string, // Current URL path (e.g. /en/about)
  canonicalPath: string // Internal path (e.g. /about)
): NextResponse => {
  if (!prefixDefault && pathLocale === defaultLocale) {
    // Redirect to remove prefix
    // We use canonicalPath because in no-prefix default mode, the URL is usually just the path
    // But wait, if we are in this function, the URL *has* a prefix.
    // We want to redirect to /about (localized for EN).

    const targetLocalizedPathResult = getLocalizedPath(
      canonicalPath,
      pathLocale,
      rewriteRules
    );
    const targetLocalizedPath =
      typeof targetLocalizedPathResult === 'string'
        ? targetLocalizedPathResult
        : targetLocalizedPathResult.path;

    // Construct path without prefix
    const basePathTrailingSlash = (basePath as string).endsWith('/');
    let finalPath = targetLocalizedPath;
    if (finalPath.startsWith('/')) finalPath = finalPath.slice(1);

    const fullPath = `${basePath}${basePathTrailingSlash ? '' : '/'}${finalPath}`;

    const searchWithLocale = appendLocaleSearchIfNeeded(
      request.nextUrl.search,
      pathLocale
    );

    return redirectUrl(
      request,
      fullPath + (searchWithLocale ?? request.nextUrl.search ?? '')
    );
  }

  const searchWithLocale = appendLocaleSearchIfNeeded(
    request.nextUrl.search,
    pathLocale
  );

  // If no redirect needed, we rewrite to the internal canonical path
  const internalPath = internalPrefix
    ? `/${pathLocale}${canonicalPath}`
    : canonicalPath;

  const rewriteTarget = searchWithLocale
    ? `${internalPath}${searchWithLocale}`
    : `${internalPath}${request.nextUrl.search ?? ''}`;

  return rewriteUrl(request, rewriteTarget, pathLocale);
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
  // Remove existing locale prefix from path if it was passed by mistake,
  // though we usually pass localized paths here now.
  const pathWithoutPrefix = path.startsWith(`/${locale}`)
    ? path.slice(`/${locale}`.length) || '/'
    : path;

  if (effectiveMode === 'no-prefix' || effectiveMode === 'search-params') {
    return `${pathWithoutPrefix}${search ? `?${search}` : ''}`;
  }

  // Prefix handling
  const pathWithLocalePrefix = path.startsWith(`/${locale}`)
    ? path
    : `${locale}${path.startsWith('/') ? '' : '/'}${path}`;

  const basePathTrailingSlash = basePath.endsWith('/');
  const newPath = `${basePath}${basePathTrailingSlash ? '' : '/'}${pathWithLocalePrefix}`;

  // Clean double slashes
  const cleanPath = newPath.replace(/\/+/g, '/');

  return cleanPath;
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
  const search = request.nextUrl.search;
  const pathWithSearch =
    search && !newPath.includes('?') ? `${newPath}${search}` : newPath;

  const requestHeaders = new Headers(request.headers);
  setLocaleInStorage(locale, {
    setHeader: (name: string, value: string) => {
      requestHeaders.set(name, value);
    },
  });

  const response = NextResponse.rewrite(new URL(pathWithSearch, request.url), {
    request: {
      headers: requestHeaders,
    },
  });

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
  const search = request.nextUrl.search;
  const pathWithSearch =
    search && !newPath.includes('?') ? `${newPath}${search}` : newPath;
  return NextResponse.redirect(new URL(pathWithSearch, request.url));
};
