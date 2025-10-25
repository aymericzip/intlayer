import type { IncomingMessage, ServerResponse } from 'node:http';
import { parse } from 'node:url';
import { getConfiguration } from '@intlayer/config';
import { DefaultValues } from '@intlayer/config/client';
import {
  getLocaleFromStorage,
  localeDetector,
  setLocaleInStorage,
} from '@intlayer/core';
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

const { basePath = '', mode = DefaultValues.Routing.ROUTING_MODE } = routing;

// Derived flags from routing.mode
const noPrefix = mode === 'no-prefix' || mode === 'search-params';
const prefixDefault = mode === 'prefix-all';

/**
 *
 * A Vite plugin that integrates a logic similar to the Next.js intlayer middleware.
 *
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerProxyPlugin() ],
 * });
 */
export const intlayerProxy = (): Plugin => {
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
  if (locale) {
    setLocaleInStorage(locale, {
      setHeader: (name: string, value: string) => res.setHeader(name, value),
    });
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
  // Strip any incoming locale prefix if present
  const pathWithoutPrefix = currentPath.startsWith(`/${locale}`)
    ? (currentPath.slice(`/${locale}`.length) ?? '/')
    : currentPath;

  // Ensure basePath always starts with '/', and remove trailing slash if needed
  const cleanBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
  // If basePath is '/', no trailing slash is needed
  const normalizedBasePath = cleanBasePath === '/' ? '' : cleanBasePath;

  // In 'search-params' and 'no-prefix' modes, do not prefix the path with the locale
  if (mode === 'no-prefix') {
    const newPath = search
      ? `${pathWithoutPrefix}${search}`
      : pathWithoutPrefix;
    return newPath;
  }

  if (mode === 'search-params') {
    const newPath = search
      ? `${pathWithoutPrefix}${search}`
      : pathWithoutPrefix;
    return newPath;
  }

  // Check if path already starts with locale to avoid double-prefixing
  const pathWithLocalePrefix = currentPath.startsWith(`/${locale}`)
    ? currentPath
    : `/${locale}${currentPath}`;

  const basePathTrailingSlash = basePath.endsWith('/');

  let newPath = `${normalizedBasePath}${basePathTrailingSlash ? '' : ''}${pathWithLocalePrefix}`;

  // Special case: if prefixDefault is false and locale is defaultLocale, remove the locale prefix
  if (!prefixDefault && locale === defaultLocale) {
    newPath = `${normalizedBasePath}${pathWithoutPrefix}`;
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

  // In search-params mode, we need to redirect to add the locale search param
  if (mode === 'search-params') {
    // Check if locale search param already exists and matches the detected locale
    const existingSearchParams = new URLSearchParams(searchParams ?? '');
    const existingLocale = existingSearchParams.get('locale');

    // If the existing locale matches the detected locale, no redirect needed
    if (existingLocale === locale) {
      // For internal routing, we need to add the locale prefix so the framework can match [locale] param
      const internalPath = `/${locale}${originalPath}`;
      const rewritePath = `${internalPath}${searchParams ?? ''}`;

      // Rewrite internally (URL stays the same in browser, but internally routes to /[locale]/path)
      rewriteUrl(req, res, rewritePath, locale);
      return next();
    }

    // Locale param missing or doesn't match - redirect to add/update it
    const search = appendLocaleSearchIfNeeded(searchParams, locale);
    const redirectPath = search
      ? `${originalPath}${search}`
      : `${originalPath}${searchParams ?? ''}`;

    // Redirect to add/update the locale search param (URL changes in browser)
    return redirectUrl(res, redirectPath);
  }

  // For no-prefix mode (not search-params), add locale prefix internally for routing
  const internalPath = `/${locale}${originalPath}`;

  // Add search params if needed
  const search = appendLocaleSearchIfNeeded(searchParams, locale);
  const rewritePath = search
    ? `${internalPath}${search}`
    : `${internalPath}${searchParams ?? ''}`;

  // Rewrite internally (URL stays the same in browser, but internally routes to /[locale]/path)
  rewriteUrl(req, res, rewritePath, locale);

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

  // 2. If pathLocale exists, handle it
  handleExistingPathLocale({
    req,
    res,
    next,
    originalPath,
    searchParams,
    pathLocale,
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

  // 3. Construct new path - preserving original search params
  const search = appendLocaleSearchIfNeeded(searchParams, locale);
  const newPath = constructPath(locale, originalPath, search);

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
 */
const handleExistingPathLocale = ({
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
  // In prefix modes, respect the URL path locale
  // The path locale takes precedence, and we'll update storage to match
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
    // In prefix modes, don't add locale to search params
    // Just preserve the original search params if they exist
    if (searchParams) {
      newPath += searchParams;
    }
    rewriteUrl(req, res, newPath, pathLocale);
    return next();
  }

  // If we do prefix default or pathLocale != default, keep as is, but rewrite headers
  // Preserve original search params without adding locale
  const newPath = searchParams
    ? `${originalPath}${searchParams}`
    : originalPath;
  rewriteUrl(req, res, newPath, pathLocale);
  return next();
};

/**
 * @deprecated Rename to intlayerProxy instead
 *
 * A Vite plugin that integrates a logic similar to the Next.js intlayer middleware.
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerMiddleware() ],
 * });
 * ```
 */
export const intlayerMiddleware = intlayerProxy;

/**
 * @deprecated Rename to intlayerProxy instead
 * 
 * A Vite plugin that integrates a logic similar to the Next.js intlayer middleware.

 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerMiddleware() ],
 * });
 * ```
 */
export const intLayerMiddlewarePlugin = intlayerProxy;
