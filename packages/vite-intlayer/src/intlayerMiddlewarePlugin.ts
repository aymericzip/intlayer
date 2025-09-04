import { getConfiguration, type Locales } from '@intlayer/config';
import { localeDetector } from '@intlayer/core';
import type { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
/* @ts-ignore - Vite types error */
import type { Connect, Plugin } from 'vite';

// Grab all the config you need.
// Make sure your config includes the following fields if you want to replicate Next.js logic:
//   - internationalization.locales
//   - internationalization.defaultLocale
//   - middleware.cookieName
//   - middleware.headerName
//   - middleware.prefixDefault
//   - middleware.noPrefix
//   - middleware.serverSetCookie
//   - middleware.basePath
//   - etc.
const intlayerConfig = getConfiguration();
const { internationalization, middleware } = intlayerConfig;
const { locales: supportedLocales, defaultLocale } = internationalization;

const {
  cookieName,
  headerName,
  prefixDefault,
  noPrefix,
  serverSetCookie,
  basePath = '',
} = middleware;

/**
 * A Vite plugin that integrates a logic similar to the Next.js intlayer middleware.
 */
export const intlayerMiddlewarePlugin = (): Plugin => {
  return {
    name: 'vite-intlayer-middleware-plugin',
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        // 1. Bypass assets and special Vite endpoints
        if (
          req.url?.startsWith('/node_modules') ||
          req.url?.startsWith('/@') ||
          req.url?.split('?')[0].match(/\.[a-z]+$/i) // checks for file extensions
        ) {
          return next();
        }

        // 2. Parse original URL for path and query
        const parsedUrl = parse(req.url ?? '/', true);
        const originalPath = parsedUrl.pathname ?? '/';

        // 3. Attempt to read the cookie locale
        const cookies = parseCookies(req.headers.cookie ?? '');
        const cookieLocale = getValidLocaleFromCookie(cookies[cookieName]);

        // 4. Check if there's a locale prefix in the path
        const pathLocale = getPathLocale(originalPath);

        // 5. If noPrefix is true, we skip prefix logic altogether
        if (noPrefix) {
          handleNoPrefix({
            req,
            res,
            next,
            originalPath,
            cookieLocale,
          });
          return;
        }

        // 6. Otherwise, handle prefix logic
        handlePrefix({
          req,
          res,
          next,
          originalPath,
          pathLocale,
          cookieLocale,
        });
      });
    },
  };
};

/* --------------------------------------------------------------------
 *                     Helper & Utility Functions
 * --------------------------------------------------------------------
 */

/**
 * Parses cookies from the Cookie header string into an object.
 */
const parseCookies = (cookieHeader: string) => {
  return cookieHeader.split(';').reduce(
    (acc, cookie) => {
      const [key, val] = cookie.trim().split('=');
      acc[key] = val;
      return acc;
    },
    {} as Record<string, string>
  );
};

/**
 * Checks if the cookie locale is valid and is included in the supported locales.
 */
const getValidLocaleFromCookie = (
  locale: string | undefined
): Locales | undefined => {
  if (locale && supportedLocales.includes(locale as Locales)) {
    return locale as Locales;
  }
  return undefined;
};

/**
 * Extracts the locale from the URL pathname if present as the first segment.
 */
const getPathLocale = (pathname: string): Locales | undefined => {
  // e.g. if pathname is /en/some/page or /en
  // we check if "en" is in your supportedLocales
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && supportedLocales.includes(firstSegment as Locales)) {
    return firstSegment as Locales;
  }
  return undefined;
};

/**
 * Writes a 301 redirect response with the given new URL.
 */
const redirectUrl = (res: ServerResponse<IncomingMessage>, newUrl: string) => {
  res.writeHead(301, { Location: newUrl });
  return res.end();
};

/**
 * "Rewrite" the request internally by adjusting req.url;
 * we also set the locale in the response header if needed.
 */
const rewriteUrl = (
  req: Connect.IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  newUrl: string,
  locale?: Locales
) => {
  req.url = newUrl;
  // If you want to mimic Next.js's behavior of setting a header for the locale:
  if (locale && headerName) {
    res.setHeader(headerName, locale);
  }
};

/**
 * Constructs a new path string, optionally including a locale prefix and basePath.
 * - basePath:   (e.g., '/myapp')
 * - locale:     (e.g., 'en')
 * - currentPath:(e.g., '/products/shoes')
 */
const constructPath = (locale: Locales, currentPath: string) => {
  // Ensure basePath always starts with '/', and remove trailing slash if needed
  const cleanBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
  // If basePath is '/', no trailing slash is needed
  const normalizedBasePath = cleanBasePath === '/' ? '' : cleanBasePath;

  // Combine basePath + locale + the rest of the path
  // Example: basePath = '/myapp', locale = 'en', currentPath = '/products' => '/myapp/en/products'
  let newPath = `${normalizedBasePath}/${locale}${currentPath}`;

  // Special case: if prefixDefault is false and locale is defaultLocale, remove the locale prefix
  if (!prefixDefault && locale === defaultLocale) {
    newPath = `${normalizedBasePath}${currentPath}`;
  }

  return newPath;
};

/* --------------------------------------------------------------------
 *               Handlers that mirror Next.js style logic
 * --------------------------------------------------------------------
 */

/**
 * If `noPrefix` is true, we never prefix the locale in the URL.
 * We simply rewrite the request to the same path, but with the best-chosen locale
 * in a header or cookie if desired.
 */
const handleNoPrefix = ({
  req,
  res,
  next,
  originalPath,
  cookieLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  cookieLocale?: Locales;
}) => {
  // Determine the best locale
  let locale = cookieLocale ?? defaultLocale;

  // Use fallback to localeDetector if no cookie
  if (!cookieLocale) {
    const detectedLocale = localeDetector(
      req.headers as Record<string, string>,
      supportedLocales,
      defaultLocale
    );
    locale = detectedLocale as Locales;
  }

  // Just rewrite the URL in-place (no prefix). We do NOT redirect because we do not want to alter the URL.
  rewriteUrl(req, res, originalPath, locale);
  return next();
};

/**
 * The main prefix logic:
 * - If there's no pathLocale in the URL, we might want to detect & redirect or rewrite
 * - If there is a pathLocale, handle cookie mismatch or default locale special cases
 */
const handlePrefix = ({
  req,
  res,
  next,
  originalPath,
  pathLocale,
  cookieLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  pathLocale?: Locales;
  cookieLocale?: Locales;
}) => {
  // 1. If pathLocale is missing, handle
  if (!pathLocale) {
    handleMissingPathLocale({
      req,
      res,
      next,
      originalPath,
      cookieLocale,
    });
    return;
  }

  // 2. If pathLocale exists, handle possible mismatch with cookie
  handleExistingPathLocale({
    req,
    res,
    next,
    originalPath,
    pathLocale,
    cookieLocale,
  });
};

/**
 * Handles requests where the locale is missing from the URL pathname.
 * We detect a locale from cookie / headers / default, then either redirect or rewrite.
 */
const handleMissingPathLocale = ({
  req,
  res,
  next,
  originalPath,
  cookieLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  cookieLocale?: Locales;
}) => {
  // If navigation comes from the same origin (e.g., via an in-app language switcher),
  // treat unprefixed paths as an explicit intent to view the default locale.
  // This avoids redirecting back to the cookie locale (e.g., '/tr/') when user selects '/'.
  const referer = (req.headers.referer || req.headers.referrer) as
    | string
    | undefined;
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const host = req.headers.host;
      if (host && refererUrl.host === host) {
        const locale = defaultLocale as Locales;
        const newPath = constructPath(locale, originalPath);
        rewriteUrl(req, res, newPath, locale);
        return next();
      }
    } catch {
      // ignore invalid referer
    }
  }

  // 1. Choose the best locale
  let locale = (cookieLocale ??
    localeDetector(
      req.headers as Record<string, string>,
      supportedLocales,
      defaultLocale
    )) as Locales;

  // 2. If still invalid, fallback
  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  // 3. Construct new path
  const newPath = constructPath(locale, originalPath);

  // If we always prefix default or if this is not the default locale, do a 301 redirect
  // so that the user sees the locale in the URL.
  if (prefixDefault || locale !== defaultLocale) {
    return redirectUrl(res, newPath);
  }

  // If we do NOT prefix the default locale, just rewrite in place
  rewriteUrl(req, res, newPath, locale);
  return next();
};

/**
 * Handles requests where the locale prefix is present in the pathname.
 * We verify if the cookie locale differs from the path locale; if so, handle.
 */
const handleExistingPathLocale = ({
  req,
  res,
  next,
  originalPath,
  pathLocale,
  cookieLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  pathLocale: Locales;
  cookieLocale?: Locales;
}) => {
  // 1. If the cookie locale is set and differs from the path locale,
  //    and we're not forcing the cookie to always override
  if (
    cookieLocale &&
    cookieLocale !== pathLocale &&
    serverSetCookie !== 'always'
  ) {
    // We want to swap out the pathLocale with the cookieLocale
    const newPath = originalPath.replace(`/${pathLocale}`, `/${cookieLocale}`);
    const finalPath = constructPath(cookieLocale, newPath.replace(/^\/+/, '/'));
    return redirectUrl(res, finalPath);
  }

  // 2. Otherwise, handle default-locale prefix if needed
  handleDefaultLocaleRedirect({
    req,
    res,
    next,
    originalPath,
    pathLocale,
  });
};

/**
 * If the path locale is the default locale but we don't want to prefix the default, remove it.
 */
const handleDefaultLocaleRedirect = ({
  req,
  res,
  next,
  originalPath,
  pathLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  pathLocale: Locales;
}) => {
  // If we don't prefix default AND the path locale is the default locale -> remove it
  if (!prefixDefault && pathLocale === defaultLocale) {
    // Remove the default locale part from the path
    const newPath = originalPath.replace(`/${defaultLocale}`, '') ?? '/';
    rewriteUrl(req, res, newPath, pathLocale);
    return next();
  }

  // If we do prefix default or pathLocale != default, keep as is, but rewrite headers
  rewriteUrl(req, res, originalPath, pathLocale);
  return next();
};
