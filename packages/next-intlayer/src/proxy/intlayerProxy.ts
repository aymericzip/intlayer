import { internationalization, routing } from '@intlayer/config/built';
import { ROUTING_MODE } from '@intlayer/config/defaultValues';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the build-time routing mode is known and is NOT 'no-prefix'.
 * Use to guard no-prefix-specific code paths so bundlers can eliminate them.
 */
const TREE_SHAKE_NO_PREFIX =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'no-prefix';

/**
 * True when the build-time routing mode is known and is NOT 'search-params'.
 */
const TREE_SHAKE_SEARCH_PARAMS =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'search-params';

/**
 * True when the build-time routing mode is known and is not a prefix-based
 * mode (neither 'prefix-all' nor 'prefix-no-default').
 */
const TREE_SHAKE_PREFIX_MODES =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'prefix-all' &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'prefix-no-default';

/**
 * True when rewrite rules are explicitly disabled at build time
 * (INTLAYER_ROUTING_REWRITE_RULES === 'false').
 */
const TREE_SHAKE_REWRITE =
  process.env['INTLAYER_ROUTING_REWRITE_RULES'] === 'false';

/**
 * True when no domain routing is configured at build time
 * (INTLAYER_ROUTING_DOMAINS === 'false').
 */
const TREE_SHAKE_DOMAINS = process.env['INTLAYER_ROUTING_DOMAINS'] === 'false';

import {
  getCanonicalPath,
  getLocalizedPath,
  getRewriteRules,
} from '@intlayer/core/localization';
import {
  getLocaleFromStorageServer,
  setLocaleInStorageServer,
} from '@intlayer/core/utils';
import type { Locale } from '@intlayer/types/allLocales';
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

const { locales, defaultLocale } = internationalization ?? {};
const { basePath, mode, rewrite, domains } = routing ?? {};

// Note: cookie names are resolved inside LocaleStorage based on configuration

// Derived flags from routing.mode
const effectiveMode = mode ?? ROUTING_MODE;
const noPrefix =
  (!TREE_SHAKE_NO_PREFIX && effectiveMode === 'no-prefix') ||
  (!TREE_SHAKE_SEARCH_PARAMS && effectiveMode === 'search-params');
const prefixDefault =
  !TREE_SHAKE_PREFIX_MODES && effectiveMode === 'prefix-all';

const internalPrefix = !noPrefix;

const rewriteRules = !TREE_SHAKE_REWRITE
  ? getRewriteRules(rewrite, 'url')
  : undefined;

/**
 * Strips the protocol from a domain string and returns only the hostname.
 * e.g. 'https://intlayer.zh' → 'intlayer.zh', 'intlayer.zh' → 'intlayer.zh'
 */
const normalizeDomainHostname = (domain: string): string => {
  try {
    return /^https?:\/\//.test(domain) ? new URL(domain).hostname : domain;
  } catch {
    return domain;
  }
};

/**
 * Returns the locale exclusively mapped to a given hostname via `routing.domains`,
 * or undefined if zero or more than one locale share that hostname.
 *
 * Example: with domains = { zh: 'intlayer.zh', fr: 'intlayer.org' }
 *   getLocaleFromDomain('intlayer.zh')  → 'zh'
 *   getLocaleFromDomain('intlayer.org') → undefined  (multiple locales share it)
 */
const getLocaleFromDomain = (hostname: string): Locale | undefined => {
  if (!domains) return undefined;
  const matching = Object.entries(domains).filter(
    ([, domain]) => normalizeDomainHostname(domain) === hostname
  );
  return matching.length === 1 ? (matching[0][0] as Locale) : undefined;
};

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
  if (TREE_SHAKE_SEARCH_PARAMS || effectiveMode !== 'search-params')
    return search;
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

  // Domain routing: if the path locale is mapped to a different domain, redirect there.
  // e.g. intlayer.org/zh/about → https://intlayer.zh/about
  if (!TREE_SHAKE_DOMAINS && pathLocale && domains) {
    const localeDomain = domains[pathLocale];

    if (localeDomain) {
      const domainHost = normalizeDomainHostname(localeDomain);

      if (domainHost !== request.nextUrl.hostname) {
        const rawPath = pathname.slice(`/${pathLocale}`.length) || '/';
        const targetOrigin = /^https?:\/\//.test(localeDomain)
          ? localeDomain
          : `https://${localeDomain}`;

        return NextResponse.redirect(
          new URL(`${rawPath}${request.nextUrl.search}`, targetOrigin)
        );
      }
    }
  }

  // Domain routing: if the current hostname is exclusively mapped to one locale,
  // treat it as that locale's domain — no URL prefix needed.
  // e.g. intlayer.zh/about → internally rewrite to /zh/about
  if (!TREE_SHAKE_DOMAINS && !pathLocale) {
    const domainLocale = getLocaleFromDomain(request.nextUrl.hostname);

    if (domainLocale) {
      const canonicalPath = getCanonicalPath(
        pathname,
        domainLocale,
        rewriteRules
      );
      const internalPath = `/${domainLocale}${canonicalPath}`;

      return rewriteUrl(
        request,
        internalPath + (request.nextUrl.search ?? ''),
        domainLocale
      );
    }
  }

  return handlePrefix(request, localLocale, pathLocale, pathname);
};

/**
 * Retrieves the locale from the request cookies if available and valid.
 *
 * @param request - The incoming Next.js request object.
 * @returns - The locale found in the cookies, or undefined if not found or invalid.
 */
const getLocalLocale = (request: NextRequest): Locale | undefined =>
  getLocaleFromStorageServer({
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

  if (!TREE_SHAKE_SEARCH_PARAMS && effectiveMode === 'search-params') {
    const existingSearchParams = new URLSearchParams(request.nextUrl.search);
    const existingLocale = existingSearchParams.get('locale');

    const isExistingValid = locales?.includes(existingLocale as Locale);

    let locale = (localLocale ??
      (isExistingValid ? (existingLocale as Locale) : undefined) ??
      localLocale ??
      localeDetector?.(request) ??
      defaultLocale) as Locale;

    if (!locales?.includes(locale as Locale)) {
      locale = defaultLocale as Locale;
    }

    const canonicalPath = getCanonicalPath(
      pathname,
      locale as Locale,
      rewriteRules
    );

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

  // effectiveMode === 'no-prefix'
  let locale = (localLocale ??
    localeDetector?.(request) ??
    defaultLocale) as Locale;

  if (!locales?.includes(locale as Locale)) {
    locale = defaultLocale as Locale;
  }

  const canonicalPath = getCanonicalPath(
    pathname,
    locale as Locale,
    rewriteRules
  );

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

  return handleExistingPathLocale(request, pathLocale, pathname);
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
  pathLocale: Locale,
  pathname: string
): NextResponse => {
  const rawPath = pathname.slice(`/${pathLocale}`.length) || '/';

  // 1. Identify the Canonical Path (Internal Next.js path)
  // Ex: /a-propos (from URL) -> /about (Canonical)
  const canonicalPath = getCanonicalPath(rawPath, pathLocale, rewriteRules);

  // By skipping the forced localLocale check, we allow the explicit pathLocale
  // to take precedence, which correctly updates the header/cookie when navigating.

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
    return handleDefaultLocaleRedirect(request, pathLocale, pathname);
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
// Function handleCookieLocaleMismatch was removed because the URL locale should take precedence over the stored locale.

/**
 * The key fix for 404s without [locale] folders
 */
const handleDefaultLocaleRedirect = (
  request: NextRequest,
  pathLocale: Locale,
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

  if (
    (!TREE_SHAKE_NO_PREFIX && effectiveMode === 'no-prefix') ||
    (!TREE_SHAKE_SEARCH_PARAMS && effectiveMode === 'search-params')
  ) {
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
  setLocaleInStorageServer(locale, {
    setHeader: (name: string, value: string) => {
      requestHeaders.set(name, value);
    },
  });

  const targetUrl = new URL(pathWithSearch, request.url);

  // If the target URL is exactly the current request URL,
  // we just want to `next()` to avoid losing headers on a redundant rewrite.
  const response =
    targetUrl.href === request.nextUrl.href
      ? NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        })
      : NextResponse.rewrite(targetUrl, {
          request: {
            headers: requestHeaders,
          },
        });

  setLocaleInStorageServer(locale, {
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
