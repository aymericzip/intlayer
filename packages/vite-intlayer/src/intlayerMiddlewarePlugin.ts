import type { IncomingMessage, ServerResponse } from 'node:http';
import { parse } from 'node:url';
import { getConfiguration } from '@intlayer/config';
import { getLocaleFromStorage, localeDetector } from '@intlayer/core';
import type { Locale } from '@intlayer/types';
/* @ts-ignore - Vite types error */
import type { Connect, Plugin } from 'vite';

// Grab all the config you need.
// Make sure your config includes the following fields if you want to replicate Next.js logic:
//   - internationalization.locales
//   - internationalization.defaultLocale
//   - routing.mode
//   - routing.storage
//   - routing.headerName
//   - routing.basePath
//   - etc.
const intlayerConfig = getConfiguration();
const { internationalization, routing } = intlayerConfig;
const { locales: supportedLocales, defaultLocale } = internationalization;

const { headerName, basePath = '', mode } = routing;

// Derived flags from routing.mode
const noPrefix = mode === 'no-prefix' || mode === 'search-params';
const prefixDefault = mode === 'prefix-all';

/**
 * @deprecated Rename to intlayerMiddleware instead
 *
 * A Vite plugin that integrates a logic similar to the Next.js intlayer middleware.
 *
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerMiddleware() ],
 * });
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
        const searchParams = parsedUrl.search ?? '';

        // 3. Attempt to read the locale from storage (cookies, localStorage, etc.)
        const storageLocale = getStorageLocale(req);

        // 4. Check if there's a locale prefix in the path
        const pathLocale = getPathLocale(originalPath);

        // 5. If noPrefix is true, we skip prefix logic altogether
        if (noPrefix) {
          handleNoPrefix({
            req,
            res,
            next,
            originalPath,
            searchParams,
            storageLocale,
          });
          return;
        }

        // 6. Otherwise, handle prefix logic
        handlePrefix({
          req,
          res,
          next,
          originalPath,
          searchParams,
          pathLocale,
          storageLocale,
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
 * Retrieves the locale from storage (cookies, localStorage, sessionStorage).
 */
const getStorageLocale = (req: IncomingMessage): Locale | undefined => {
  const locale = getLocaleFromStorage({
    getCookie: (name: string) => {
      const cookieHeader = req.headers.cookie ?? '';
      const cookies = cookieHeader.split(';').reduce(
        (acc, cookie) => {
          const [key, val] = cookie.trim().split('=');
          acc[key] = val;
          return acc;
        },
        {} as Record<string, string>
      );
      return cookies[name] ?? null;
    },
  });
  return locale;
};

/**
 * Appends locale to search params when routing mode is 'search-params'.
 */
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
 * Extracts the locale from the URL pathname if present as the first segment.
 */
const getPathLocale = (pathname: string): Locale | undefined => {
  // e.g. if pathname is /en/some/page or /en
  // we check if "en" is in your supportedLocales
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && supportedLocales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
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
  locale?: Locale
) => {
  req.url = newUrl;
  // If you want to mimic Next.js's behavior of setting a header for the locale:
  if (locale && headerName) {
    res.setHeader(headerName, locale);
  }
};

/**
 * Constructs a new path string, optionally including a locale prefix, basePath, and search parameters.
 * - basePath:   (e.g., '/myapp')
 * - locale:     (e.g., 'en')
 * - currentPath:(e.g., '/products/shoes')
 * - search:     (e.g., '?foo=bar')
 */
const constructPath = (
  locale: Locale,
  currentPath: string,
  search?: string
) => {
  // Ensure basePath always starts with '/', and remove trailing slash if needed
  const cleanBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
  // If basePath is '/', no trailing slash is needed
  const normalizedBasePath = cleanBasePath === '/' ? '' : cleanBasePath;

  // In 'search-params' mode, we do not prefix the path with the locale
  const pathWithLocalePrefix =
    mode === 'search-params' ? currentPath : `/${locale}${currentPath}`;

  // Combine basePath + locale prefix + the rest of the path
  let newPath = `${normalizedBasePath}${pathWithLocalePrefix}`;

  // Special case: if prefixDefault is false and locale is defaultLocale, remove the locale prefix
  if (!prefixDefault && locale === defaultLocale && mode !== 'search-params') {
    newPath = `${normalizedBasePath}${currentPath}`;
  }

  // Append search parameters if provided
  if (search) {
    newPath += search;
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
 * in a header or search params if desired.
 */
const handleNoPrefix = ({
  req,
  res,
  next,
  originalPath,
  searchParams,
  storageLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  searchParams: string;
  storageLocale?: Locale;
}) => {
  // Determine the best locale
  let locale = storageLocale ?? defaultLocale;

  // Use fallback to localeDetector if no storage locale
  if (!storageLocale) {
    const detectedLocale = localeDetector(
      req.headers as Record<string, string>,
      supportedLocales,
      defaultLocale
    );
    locale = detectedLocale as Locale;
  }

  // Construct the new path with locale in search params if needed
  const newPath = constructPath(
    locale,
    originalPath,
    appendLocaleSearchIfNeeded(searchParams, locale)
  );

  // Just rewrite the URL in-place (no prefix). We do NOT redirect because we do not want to alter the URL.
  rewriteUrl(req, res, newPath, locale);
  return next();
};

/**
 * The main prefix logic:
 * - If there's no pathLocale in the URL, we might want to detect & redirect or rewrite
 * - If there is a pathLocale, handle storage mismatch or default locale special cases
 */
const handlePrefix = ({
  req,
  res,
  next,
  originalPath,
  searchParams,
  pathLocale,
  storageLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  searchParams: string;
  pathLocale?: Locale;
  storageLocale?: Locale;
}) => {
  // 1. If pathLocale is missing, handle
  if (!pathLocale) {
    handleMissingPathLocale({
      req,
      res,
      next,
      originalPath,
      searchParams,
      storageLocale,
    });
    return;
  }

  // 2. If pathLocale exists, handle possible mismatch with storage
  handleExistingPathLocale({
    req,
    res,
    next,
    originalPath,
    searchParams,
    pathLocale,
    storageLocale,
  });
};

/**
 * Handles requests where the locale is missing from the URL pathname.
 * We detect a locale from storage / headers / default, then either redirect or rewrite.
 */
const handleMissingPathLocale = ({
  req,
  res,
  next,
  originalPath,
  searchParams,
  storageLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  searchParams: string;
  storageLocale?: Locale;
}) => {
  // If navigation comes from the same origin (e.g., via an in-app language switcher),
  // treat unprefixed paths as an explicit intent to view the default locale.
  // This avoids redirecting back to the storage locale (e.g., '/tr/') when user selects '/'.
  const referer = (req.headers.referer || req.headers.referrer) as
    | string
    | undefined;
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const host = req.headers.host;
      if (host && refererUrl.host === host) {
        const locale = defaultLocale as Locale;
        const newPath = constructPath(
          locale,
          originalPath,
          appendLocaleSearchIfNeeded(searchParams, locale)
        );
        rewriteUrl(req, res, newPath, locale);
        return next();
      }
    } catch {
      // ignore invalid referer
    }
  }

  // 1. Choose the best locale
  let locale = (storageLocale ??
    localeDetector(
      req.headers as Record<string, string>,
      supportedLocales,
      defaultLocale
    )) as Locale;

  // 2. If still invalid, fallback
  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  // 3. Construct new path
  const newPath = constructPath(
    locale,
    originalPath,
    appendLocaleSearchIfNeeded(searchParams, locale)
  );

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
 * We verify if the storage locale differs from the path locale; if so, handle.
 */
const handleExistingPathLocale = ({
  req,
  res,
  next,
  originalPath,
  searchParams,
  pathLocale,
  storageLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  searchParams: string;
  pathLocale: Locale;
  storageLocale?: Locale;
}) => {
  // 1. If the storage locale is set and differs from the path locale, redirect
  if (storageLocale && storageLocale !== pathLocale) {
    // We want to swap out the pathLocale with the storageLocale
    const newPath = originalPath.replace(`/${pathLocale}`, `/${storageLocale}`);
    const finalPath = constructPath(
      storageLocale,
      newPath.replace(/^\/+/, '/'),
      appendLocaleSearchIfNeeded(searchParams, storageLocale)
    );
    return redirectUrl(res, finalPath);
  }

  // 2. Otherwise, handle default-locale prefix if needed
  handleDefaultLocaleRedirect({
    req,
    res,
    next,
    originalPath,
    searchParams,
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
  searchParams,
  pathLocale,
}: {
  req: Connect.IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  next: Connect.NextFunction;
  originalPath: string;
  searchParams: string;
  pathLocale: Locale;
}) => {
  // If we don't prefix default AND the path locale is the default locale -> remove it
  if (!prefixDefault && pathLocale === defaultLocale) {
    // Remove the default locale part from the path
    let newPath = originalPath.replace(`/${defaultLocale}`, '') || '/';
    const searchWithLocale = appendLocaleSearchIfNeeded(
      searchParams,
      pathLocale
    );
    if (searchWithLocale) {
      newPath += searchWithLocale;
    }
    rewriteUrl(req, res, newPath, pathLocale);
    return next();
  }

  // If we do prefix default or pathLocale != default, keep as is, but rewrite headers
  const searchWithLocale = appendLocaleSearchIfNeeded(searchParams, pathLocale);
  const newPath = searchWithLocale
    ? `${originalPath}${searchWithLocale}`
    : originalPath;
  rewriteUrl(req, res, newPath, pathLocale);
  return next();
};

/**
 * A Vite plugin that integrates a logic similar to the Next.js intlayer middleware.
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerMiddleware() ],
 * });
 * ```
 */
export const intlayerMiddleware = intlayerMiddlewarePlugin;

/**
 * @deprecated Rename to intlayerMiddleware instead
 * 
 * A Vite plugin that integrates a logic similar to the Next.js intlayer middleware.

 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerMiddleware() ],
 * });
 * ```
 */
export const intLayerMiddleware = intlayerMiddlewarePlugin;
