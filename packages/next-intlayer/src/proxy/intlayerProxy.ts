import { internationalization, routing } from '@intlayer/config/built';
import { ROUTING_MODE } from '@intlayer/config/defaultValues';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

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
const { basePath, mode, rewrite, domains, enableProxy } = routing ?? {};

// Whether the locale-routing proxy is enabled (default: true). When disabled,
// `intlayerProxy` becomes a pass-through so apps can handle routing themselves.
// The env var is injected at build time so bundlers can tree-shake this branch.
const isProxyEnabled =
  process.env.INTLAYER_ROUTING_ENABLE_PROXY !== 'false' &&
  (enableProxy ?? true);

// Note: cookie names are resolved inside LocaleStorage based on configuration

// Derived flags from routing.mode
const effectiveMode = mode ?? ROUTING_MODE;
const noPrefix =
  (!(
    process.env.INTLAYER_ROUTING_MODE &&
    process.env.INTLAYER_ROUTING_MODE !== 'no-prefix'
  ) &&
    effectiveMode === 'no-prefix') ||
  (!(
    process.env.INTLAYER_ROUTING_MODE &&
    process.env.INTLAYER_ROUTING_MODE !== 'search-params'
  ) &&
    effectiveMode === 'search-params');
const prefixDefault =
  !(
    process.env.INTLAYER_ROUTING_MODE &&
    process.env.INTLAYER_ROUTING_MODE !== 'prefix-all'
  ) && effectiveMode === 'prefix-all';

const internalPrefix = !noPrefix;

const rewriteRules =
  process.env.INTLAYER_ROUTING_REWRITE_RULES !== 'false'
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
    ([, domain]) => normalizeDomainHostname(domain!) === hostname
  );

  return matching.length === 1 ? (matching[0]?.[0] as Locale) : undefined;
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
  if (
    (process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'search-params') ||
    effectiveMode !== 'search-params'
  )
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
 *
 */
export const intlayerProxy = (
  request: NextRequest,
  _event?: NextFetchEvent,
  _response?: NextResponse
): NextResponse => {
  // When the proxy is disabled, pass the request through untouched.
  if (!isProxyEnabled) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  const localLocale = getLocalLocale(request);

  if (noPrefix) {
    return handleNoPrefix(request, localLocale, pathname);
  }

  const pathLocale = getPathLocale(pathname);

  // Domain routing: if the path locale is mapped to a different domain, redirect there.
  // e.g. intlayer.org/zh/about → https://intlayer.zh/about
  if (
    process.env.INTLAYER_ROUTING_DOMAINS !== 'false' &&
    pathLocale &&
    domains
  ) {
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
  if (process.env.INTLAYER_ROUTING_DOMAINS !== 'false' && !pathLocale) {
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

  if (
    !(
      process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'search-params'
    ) &&
    effectiveMode === 'search-params'
  ) {
    const existingSearchParams = new URLSearchParams(request.nextUrl.search);
    const existingLocale = existingSearchParams.get('locale');

    const isExistingValid = locales?.includes(existingLocale as Locale);

    let locale = (localLocale ??
      (isExistingValid ? (existingLocale as Locale) : undefined) ??
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
  (locales as Locale[] | undefined)?.find(
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

  if (!locales?.includes(locale as Locale)) {
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
  // Fix: pass `canonicalPath` (the path *without* the locale prefix, e.g. /pricing)
  // instead of `pathname` (the full path including prefix, e.g. /en/pricing).
  // Previously this caused an infinite redirect loop in prefix-no-default mode
  // because handleDefaultLocaleRedirect built the redirect target from its third
  // argument, which reproduced the same URL on every response.
  if (!prefixDefault && pathLocale === defaultLocale) {
    return handleDefaultLocaleRedirect(request, pathLocale, canonicalPath);
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
  // Always called with !prefixDefault && pathLocale === defaultLocale (pre-validated by caller).
  // Redirect to strip the default-locale prefix from the URL.
  const targetLocalizedPathResult = getLocalizedPath(
    canonicalPath,
    pathLocale,
    rewriteRules
  );
  const targetLocalizedPath =
    typeof targetLocalizedPathResult === 'string'
      ? targetLocalizedPathResult
      : targetLocalizedPathResult.path;

  const basePathValue = (basePath as string) || '';
  const basePathTrailingSlash = basePathValue.endsWith('/');
  let finalPath = targetLocalizedPath;
  if (finalPath.startsWith('/')) finalPath = finalPath.slice(1);

  const fullPath = `${basePathValue}${basePathTrailingSlash ? '' : '/'}${finalPath}`;

  const searchWithLocale = appendLocaleSearchIfNeeded(
    request.nextUrl.search,
    pathLocale
  );

  // Persist the explicitly-requested default locale. Stripping the prefix
  // (e.g. /es → /) drops the only locale signal from the URL, so without this
  // the follow-up request to the canonical path would fall back to
  // Accept-Language detection and could resolve a different locale (e.g. /en).
  return redirectUrl(
    request,
    fullPath + (searchWithLocale ?? request.nextUrl.search ?? ''),
    pathLocale
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
  // Remove existing locale prefix from path if it was passed by mistake,
  // though we usually pass localized paths here now.
  const pathWithoutPrefix = path.startsWith(`/${locale}`)
    ? path.slice(`/${locale}`.length) || '/'
    : path;

  if (
    (!(
      process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'no-prefix'
    ) &&
      effectiveMode === 'no-prefix') ||
    (!(
      process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'search-params'
    ) &&
      effectiveMode === 'search-params')
  ) {
    // `search` is either undefined or already has a leading '?' (from
    // appendLocaleSearchIfNeeded / request.nextUrl.search), so append as-is.
    return `${pathWithoutPrefix}${search ?? ''}`;
  }

  // Prefix handling
  const pathWithLocalePrefix = path.startsWith(`/${locale}`)
    ? path
    : `${locale}${path.startsWith('/') ? '' : '/'}${path}`;

  const basePathValue = basePath || '';
  const basePathTrailingSlash = basePathValue.endsWith('/');
  const newPath = `${basePathValue}${basePathTrailingSlash ? '' : '/'}${pathWithLocalePrefix}`;

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

  // Next.js strips `basePath` from `request.nextUrl.pathname` before the
  // middleware runs, so every path computed from it (e.g. `/en/about`) lacks
  // the basePath prefix. When we pass that as an absolute path to `new URL`,
  // it replaces the entire path after the origin, silently discarding the
  // basePath (e.g. `new URL('/en/', 'http://host/weather/')` →
  // `http://host/en/`). Prepending the configured basePath restores the
  // correct mount-point so rewrites resolve under the app root.
  const basePathValue = (basePath as string) || '';
  const pathWithBase =
    basePathValue && !newPath.startsWith(basePathValue)
      ? `${basePathValue}${newPath}`
      : newPath;

  const pathWithSearch =
    search && !pathWithBase.includes('?')
      ? `${pathWithBase}${search}`
      : pathWithBase;

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
 * @param persistLocale - When provided, the locale is written to storage
 *   (cookie/header, per config) on the redirect response so the follow-up
 *   request resolves the same locale instead of re-running detection.
 * @returns - The redirect response.
 */
const redirectUrl = (
  request: NextRequest,
  newPath: string,
  persistLocale?: Locale
): NextResponse => {
  const search = request.nextUrl.search;
  const pathWithSearch =
    search && !newPath.includes('?') ? `${newPath}${search}` : newPath;

  const target = new URL(pathWithSearch, request.url);

  // Prevent open redirect: if the resolved origin differs from the request
  // origin, strip it back to a same-origin URL using only the path/search/hash.
  const safeTarget =
    target.origin === request.nextUrl.origin
      ? target
      : new URL(
          `${target.pathname}${target.search}${target.hash}`,
          request.url
        );

  const response = NextResponse.redirect(safeTarget);

  if (persistLocale) {
    persistLocaleOnResponse(response, persistLocale);
  }

  return response;
};

/**
 * Writes the resolved locale to the outgoing response's storage (cookie and/or
 * header, according to `routing.storage`). Only the cookie survives a client
 * redirect, so this is what carries an explicitly-selected locale across a
 * prefix-stripping redirect. Enabled cookie/header targets are resolved by
 * {@link setLocaleInStorageServer} from the config; disabled ones are no-ops.
 *
 * @param response - The outgoing Next.js response to attach storage to.
 * @param locale - The locale to persist.
 */
const persistLocaleOnResponse = (
  response: NextResponse,
  locale: Locale
): void => {
  setLocaleInStorageServer(locale, {
    setCookieStore: (name, value, attributes) => {
      response.cookies.set(name, value, {
        path: attributes.path,
        domain: attributes.domain,
        expires:
          typeof attributes.expires === 'number'
            ? new Date(attributes.expires)
            : attributes.expires,
        secure: attributes.secure,
        sameSite: attributes.sameSite,
        httpOnly: attributes.httpOnly,
      });
    },
    setHeader: (name, value) => {
      response.headers.set(name, value);
    },
  });
};
