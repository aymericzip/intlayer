import { type Locales, getConfiguration } from '@intlayer/config/client';
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import { localeDetector } from './localeDetector';

const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;
const {
  headerName,
  cookieName,
  prefixDefault,
  basePath,
  serverSetCookie,
  noPrefix,
} = middleware;

/**
 * Middleware that handles the internationalization layer
 *
 * Usage:
 *
 * // ./src/middleware.ts
 *
 * ```ts
 * export { intlayerMiddleware as middleware } from '@intlayer/next/middleware';
 *
 * // applies this middleware only to files in the app directory
 * export const config = {
 *   matcher: '/((?!api|static|.*\\..*|_next).*)',
 * };
 * ```
 *
 */
export const intlayerMiddleware = (
  request: NextRequest,
  _event?: NextFetchEvent,
  _response?: NextResponse
): NextResponse => {
  const pathname = request.nextUrl.pathname;
  const cookieLocale = getCookieLocale(request);
  const basePathTrailingSlash = basePath.endsWith('/');

  if (noPrefix) {
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

const getCookieLocale = (request: NextRequest): Locales | undefined => {
  if (!cookieName) return undefined;
  const cookieValue = request.cookies.get(cookieName)?.value as Locales;
  if (cookieValue && locales.includes(cookieValue)) {
    return cookieValue;
  }
};

const handleNoPrefix = (
  request: NextRequest,
  cookieLocale: Locales | undefined,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  const locale = cookieLocale ?? defaultLocale;
  const newPath = constructPath(
    locale,
    pathname,
    basePath,
    basePathTrailingSlash
  );
  return rewriteUrl(request, newPath, locale);
};

const getPathLocale = (pathname: string): Locales | undefined =>
  locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

const handlePrefix = (
  request: NextRequest,
  cookieLocale: Locales | undefined,
  pathLocale: Locales | undefined,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  if (!pathLocale) {
    return handleMissingPathLocale(
      request,
      cookieLocale,
      pathname,
      basePathTrailingSlash
    );
  }
  return handleExistingPathLocale(
    request,
    cookieLocale,
    pathLocale,
    pathname,
    basePathTrailingSlash
  );
};

const handleMissingPathLocale = (
  request: NextRequest,
  cookieLocale: Locales | undefined,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  let locale = cookieLocale ?? localeDetector?.(request) ?? defaultLocale;
  if (!locales.includes(locale)) {
    console.warn(
      'The localeDetector callback must return a locale included in your locales array. Reverting to using defaultLocale.'
    );
    locale = defaultLocale;
  }
  const newPath = constructPath(
    locale,
    pathname,
    basePath,
    basePathTrailingSlash
  );
  return prefixDefault || locale !== defaultLocale
    ? redirectUrl(request, newPath)
    : rewriteUrl(request, newPath, locale);
};

const handleExistingPathLocale = (
  request: NextRequest,
  cookieLocale: Locales | undefined,
  pathLocale: Locales,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  if (
    cookieLocale &&
    cookieLocale !== pathLocale &&
    serverSetCookie !== 'always'
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

  return handleDefaultLocaleRedirect(
    request,
    pathLocale,
    pathname,
    basePathTrailingSlash
  );
};

const handleCookieLocaleMismatch = (
  request: NextRequest,
  pathname: string,
  pathLocale: Locales,
  cookieLocale: Locales,
  basePath: string,
  basePathTrailingSlash: boolean
): string => {
  const newPath = pathname.replace(`/${pathLocale}`, `/${cookieLocale}`);
  return constructPath(
    cookieLocale,
    newPath,
    basePath,
    basePathTrailingSlash,
    request.nextUrl.search
  );
};

const handleDefaultLocaleRedirect = (
  request: NextRequest,
  pathLocale: Locales,
  pathname: string,
  basePathTrailingSlash: boolean
): NextResponse => {
  if (!prefixDefault && pathLocale === defaultLocale) {
    let pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) || '/';

    if (basePathTrailingSlash) {
      pathWithoutLocale = pathWithoutLocale.slice(1);
    }

    if (request.nextUrl.search) {
      pathWithoutLocale += request.nextUrl.search;
    }

    return rewriteUrl(request, `${basePath}${pathWithoutLocale}`, pathLocale);
  }
  return rewriteUrl(request, pathname, pathLocale);
};

const constructPath = (
  locale: Locales,
  path: string,
  basePath: string,
  basePathTrailingSlash: boolean,
  search?: string
): string => {
  let newPath = `${locale}${path}`;
  newPath = `${basePath}${basePathTrailingSlash ? '' : '/'}${newPath}`;
  if (search) {
    newPath += search;
  }
  return newPath;
};

const rewriteUrl = (
  request: NextRequest,
  newPath: string,
  locale: Locales
): NextResponse => {
  const response = NextResponse.rewrite(new URL(newPath, request.url));
  response.headers.set(headerName, locale);
  return response;
};

const redirectUrl = (request: NextRequest, newPath: string): NextResponse =>
  NextResponse.redirect(new URL(newPath, request.url));
