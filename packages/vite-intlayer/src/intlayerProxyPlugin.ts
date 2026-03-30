import type { IncomingMessage, ServerResponse } from 'node:http';
import { parse } from 'node:url';
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

import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import {
  getCanonicalPath,
  getLocalizedPath,
  getRewriteRules,
  localeDetector,
} from '@intlayer/core/localization';
import {
  getCookie,
  getLocaleFromStorageServer,
  setLocaleInStorageServer,
} from '@intlayer/core/utils';
import type { Locale } from '@intlayer/types/allLocales';
/* @ts-ignore - Vite types error */
import type { Connect, Plugin } from 'vite';

type IntlayerProxyPluginOptions = {
  /**
   * A function that allows you to ignore specific requests from the intlayer proxy.
   *
   * @example
   * ```ts
   * export default defineConfig({
   *   plugins: [ intlayerProxyPlugin({ ignore: (req) => req.url?.startsWith('/api') }) ],
   * });
   * ```
   *
   * @param req - The incoming request.
   * @returns A boolean value indicating whether to ignore the request.
   */
  ignore?: (req: IncomingMessage) => boolean | undefined;
};

/**
 * Vite plugin that provides a development middleware for locale-based routing.
 *
 * This plugin mimics the behavior of the Intlayer middleware in Next.js,
 * handling locale detection, redirects, and rewrites during development.
 *
 * @param configOptions - Optional configuration for Intlayer.
 * @param options - Plugin-specific options, like ignoring certain paths.
 * @returns A Vite plugin.
 *
 * @example
 * ```ts
 * import { intlayerProxy } from 'vite-intlayer';
 *
 * export default defineConfig({
 *   plugins: [intlayerProxy()],
 * });
 * ```
 */
export const intlayerProxy = (
  configOptions?: GetConfigurationOptions,
  options?: IntlayerProxyPluginOptions
): Plugin => {
  const intlayerConfig = getConfiguration(configOptions);

  const { internationalization, routing } = intlayerConfig;
  const { locales: supportedLocales, defaultLocale } = internationalization;

  const { basePath = '', mode = ROUTING_MODE, rewrite } = routing;

  // Track redirect counts per request to detect loops
  const redirectCounts = new Map<string, number>();
  const MAX_REDIRECTS = 10;

  // Derived flags from routing.mode
  const noPrefix =
    (!TREE_SHAKE_NO_PREFIX && mode === 'no-prefix') ||
    (!TREE_SHAKE_SEARCH_PARAMS && mode === 'search-params');
  const prefixDefault = !TREE_SHAKE_PREFIX_MODES && mode === 'prefix-all';

  const rewriteRules = !TREE_SHAKE_REWRITE
    ? getRewriteRules(rewrite, 'url')
    : undefined;

  /* --------------------------------------------------------------------
   *                     Helper & Utility Functions
   * --------------------------------------------------------------------
   */

  /**
   * Retrieves the locale from storage (cookies, localStorage, sessionStorage).
   */
  const getStorageLocale = (req: IncomingMessage): Locale | undefined => {
    const locale = getLocaleFromStorageServer({
      getCookie: (name: string) => getCookie(name, req.headers.cookie),
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
    if (TREE_SHAKE_SEARCH_PARAMS || mode !== 'search-params') return search;

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
  const redirectUrl = (
    res: ServerResponse<IncomingMessage>,
    newUrl: string,
    reason?: string,
    originalUrl?: string
  ) => {
    // Track redirect count to detect loops
    if (originalUrl) {
      const count = (redirectCounts.get(originalUrl) || 0) + 1;
      redirectCounts.set(originalUrl, count);

      if (count > MAX_REDIRECTS) {
        console.error('[REDIRECT LOOP DETECTED!]', {
          originalUrl,
          redirectCount: count,
          lastRedirectTo: newUrl,
          reason,
        });
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end(
          `Redirect loop detected: ${count} redirects from ${originalUrl}`
        );
      }
    }

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
    if (req.url !== newUrl) {
      req.url = newUrl;
    }
    // If you want to mimic Next.js's behavior of setting a header for the locale:
    if (locale) {
      setLocaleInStorageServer(locale, {
        setHeader: (name: string, value: string) => {
          res.setHeader(name, value);
          req.headers[name] = value;
        },
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
      ? currentPath.slice(`/${locale}`.length)
      : currentPath;

    // Ensure basePath always starts with '/', and remove trailing slash if needed
    const cleanBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
    const normalizedBasePath = cleanBasePath.endsWith('/')
      ? cleanBasePath.slice(0, -1)
      : cleanBasePath;

    // In 'search-params' and 'no-prefix' modes, do not prefix the path with the locale
    if (
      (!TREE_SHAKE_NO_PREFIX && mode === 'no-prefix') ||
      (!TREE_SHAKE_SEARCH_PARAMS && mode === 'search-params')
    ) {
      const newPath = search
        ? `${pathWithoutPrefix || '/'}${search}`
        : pathWithoutPrefix || '/';
      return newPath;
    }

    // Check if path already starts with locale to avoid double-prefixing
    const pathWithLocalePrefix = currentPath.startsWith(`/${locale}`)
      ? currentPath
      : `/${locale}${currentPath === '/' ? '' : currentPath}`;

    let newPath = `${normalizedBasePath}${pathWithLocalePrefix}`;

    // Special case: if prefixDefault is false and locale is defaultLocale, remove the locale prefix
    if (!prefixDefault && locale === defaultLocale) {
      newPath = `${normalizedBasePath}${pathWithoutPrefix || '/'}`;
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
    originalUrl,
  }: {
    req: Connect.IncomingMessage;
    res: ServerResponse<IncomingMessage>;
    next: Connect.NextFunction;
    originalPath: string;
    searchParams: string;
    storageLocale?: Locale;
    originalUrl?: string;
  }) => {
    const pathLocale = getPathLocale(originalPath);
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

    if (pathLocale) {
      const pathWithoutLocale =
        originalPath.slice(`/${pathLocale}`.length) || '/';

      const canonicalPath = getCanonicalPath(
        pathWithoutLocale,
        pathLocale,
        rewriteRules
      );

      const search = appendLocaleSearchIfNeeded(searchParams, pathLocale);

      const redirectPath = search
        ? `${canonicalPath}${search}`
        : `${canonicalPath}${searchParams ?? ''}`;

      return redirectUrl(res, redirectPath, undefined, originalUrl);
    }

    const canonicalPath = getCanonicalPath(originalPath, locale, rewriteRules);

    // In search-params mode, we need to redirect to add the locale search param
    if (!TREE_SHAKE_SEARCH_PARAMS && mode === 'search-params') {
      // Check if locale search param already exists and matches the detected locale
      const existingSearchParams = new URLSearchParams(searchParams ?? '');
      const existingLocale = existingSearchParams.get('locale');

      // If the existing locale matches the detected locale, no redirect needed
      if (existingLocale === locale) {
        // For internal routing, we need to add the locale prefix so the framework can match [locale] param
        const internalPath = `/${locale}${
          canonicalPath === '/' ? '' : canonicalPath
        }`;
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
      return redirectUrl(res, redirectPath, undefined, originalUrl);
    }

    // For no-prefix mode (not search-params), add locale prefix internally for routing
    const internalPath = `/${locale}${
      canonicalPath === '/' ? '' : canonicalPath
    }`;

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
    originalUrl,
  }: {
    req: Connect.IncomingMessage;
    res: ServerResponse<IncomingMessage>;
    next: Connect.NextFunction;
    originalPath: string;
    searchParams: string;
    pathLocale?: Locale;
    storageLocale?: Locale;
    originalUrl?: string;
  }) => {
    // If pathLocale is missing, handle
    if (!pathLocale) {
      handleMissingPathLocale({
        req,
        res,
        next,
        originalPath,
        searchParams,
        storageLocale,
        originalUrl,
      });
      return;
    }

    // If pathLocale exists, handle it
    handleExistingPathLocale({
      req,
      res,
      next,
      originalPath,
      searchParams,
      pathLocale,
      originalUrl,
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
    originalUrl,
  }: {
    req: Connect.IncomingMessage;
    res: ServerResponse<IncomingMessage>;
    next: Connect.NextFunction;
    originalPath: string;
    searchParams: string;
    storageLocale?: Locale;
    originalUrl?: string;
  }) => {
    // 1. Choose the best locale
    let locale = (storageLocale ??
      localeDetector(
        req.headers as Record<string, string>,
        supportedLocales,
        defaultLocale
      )) as Locale;

    // If still invalid, fallback
    if (!supportedLocales.includes(locale)) {
      locale = defaultLocale;
    }

    // Resolve to canonical path.
    // If user visits /a-propos (implied 'fr'), we resolve to /about
    const canonicalPath = getCanonicalPath(originalPath, locale, rewriteRules);

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

    // Construct new path - preserving original search params
    const search = appendLocaleSearchIfNeeded(searchParams, locale);
    const newPath = constructPath(locale, targetLocalizedPath, search);

    // If we always prefix default or if this is not the default locale, do a 301 redirect
    // so that the user sees the locale in the URL.
    if (prefixDefault || locale !== defaultLocale) {
      return redirectUrl(res, newPath, undefined, originalUrl);
    }

    // If we do NOT prefix the default locale, just rewrite in place using canonical path for framework matching.
    // searchParams MUST be preserved here — dropping them causes the framework (e.g. TanStack Start) to
    // see a URL with no search params, trigger a validateSearch normalisation redirect to the prefixed URL
    // (e.g. /en?page=1&...), which the middleware then strips back to /?..., creating an infinite loop.
    rewriteUrl(
      req,
      res,
      `/${locale}${canonicalPath === '/' ? '' : canonicalPath}${searchParams}`,
      locale
    );
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
    originalUrl,
  }: {
    req: Connect.IncomingMessage;
    res: ServerResponse<IncomingMessage>;
    next: Connect.NextFunction;
    originalPath: string;
    searchParams: string;
    pathLocale: Locale;
    originalUrl?: string;
  }) => {
    const rawPath = originalPath.slice(`/${pathLocale}`.length);

    // Identify the Canonical Path (Internal path)
    // Ex: /a-propos (from URL) -> /about (Canonical)
    const canonicalPath = getCanonicalPath(rawPath, pathLocale, rewriteRules);

    // When rewrite rules are configured and the URL is already a valid localized pretty URL
    // (e.g. /fr/essais which maps to canonical /fr/tests), do NOT redirect to canonical.
    //
    // Why: the SPA router (Solid, React Router, Vue Router…) is expected to define routes using
    // the localized paths (e.g. <Route path="/essais">) so the browser URL must stay as-is.
    // A 301 redirect to canonical would:
    //  1. Change the browser URL to the canonical form (/fr/tests)
    //  2. Break subsequent client-side navigation because <A> links produced by getLocalizedUrl
    //     point back to the localized URL (/fr/essais) which then has no matching route.
    //
    // We set the locale header and call next() so Vite serves index.html at the pretty URL.
    if (canonicalPath !== rawPath) {
      const newPath = searchParams
        ? `${originalPath}${searchParams}`
        : originalPath;
      rewriteUrl(req, res, newPath, pathLocale);
      return next();
    }

    // In prefix modes, respect the URL path locale
    // The path locale takes precedence, and we'll update storage to match
    handleDefaultLocaleRedirect({
      req,
      res,
      next,
      searchParams,
      pathLocale,
      canonicalPath,
      originalUrl,
    });
  };

  /**
   * If the path locale is the default locale but we don't want to prefix the default, remove it.
   */
  const handleDefaultLocaleRedirect = ({
    req,
    res,
    next,
    searchParams,
    pathLocale,
    canonicalPath,
    originalUrl,
  }: {
    req: Connect.IncomingMessage;
    res: ServerResponse<IncomingMessage>;
    next: Connect.NextFunction;
    searchParams: string;
    pathLocale: Locale;
    canonicalPath: string;
    originalUrl?: string;
  }) => {
    // If we don't prefix default AND the path locale is the default locale -> remove it
    if (!prefixDefault && pathLocale === defaultLocale) {
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
      const cleanBasePath = basePath.startsWith('/')
        ? basePath
        : `/${basePath}`;
      const normalizedBasePath = cleanBasePath.endsWith('/')
        ? cleanBasePath.slice(0, -1)
        : cleanBasePath;

      let finalPath = targetLocalizedPath;
      if (finalPath.startsWith('/')) finalPath = finalPath.slice(1);

      const fullPath = `${normalizedBasePath}/${finalPath}`.replace(
        /\/+/g,
        '/'
      );

      return redirectUrl(
        res,
        fullPath + (searchParams ?? ''),
        undefined,
        originalUrl
      );
    }

    // If we do prefix default or pathLocale != default, keep as is, but rewrite to canonical internally
    const internalUrl = `/${pathLocale}${
      canonicalPath === '/' ? '' : canonicalPath
    }`;
    const newPath = searchParams
      ? `${internalUrl}${searchParams}`
      : internalUrl;

    rewriteUrl(req, res, newPath, pathLocale);
    return next();
  };

  return {
    name: 'vite-intlayer-middleware-plugin',
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        // Bypass assets and special Vite endpoints
        if (
          // Custom ignore function
          (options?.ignore?.(req) ?? false) ||
          req.url?.startsWith('/node_modules') ||
          /**
           * /^@vite/            # HMR client and helpers
           * /^@fs/              # file-system import serving
           * /^@id/              # virtual module ids
           * /^@tanstack/start-router-manifest # Tanstack Start Router manifest
           */
          req.url?.startsWith('/@') ||
          /**
           * /^__vite_ping$      # health ping
           * /^__open-in-editor$
           * /^__manifest$       # Remix/RR7 lazyRouteDiscovery
           */
          req.url?.startsWith('/_') ||
          /**
           * ./myFile.js
           */
          req.url?.split('?')[0].match(/\.[a-z]+$/i) // checks for file extensions
        ) {
          return next();
        }

        // Parse original URL for path and query
        const parsedUrl = parse(req.url ?? '/', true);
        const originalPath = parsedUrl.pathname ?? '/';
        const searchParams = parsedUrl.search ?? '';

        // Check if there's a locale prefix in the path FIRST
        const pathLocale = getPathLocale(originalPath);

        // Attempt to read the locale from storage (cookies, localStorage, etc.)
        const storageLocale = getStorageLocale(req);

        // CRITICAL FIX: If there's a valid pathLocale, it takes precedence over storage
        // This prevents race conditions when cookies are stale during locale switches
        const effectiveStorageLocale =
          pathLocale && supportedLocales.includes(pathLocale)
            ? pathLocale
            : storageLocale;

        // Store original URL for redirect tracking
        const originalUrl = req.url;

        // If noPrefix is true, we skip prefix logic altogether
        if (noPrefix) {
          handleNoPrefix({
            req,
            res,
            next,
            originalPath,
            searchParams,
            storageLocale: effectiveStorageLocale,
            originalUrl,
          });
          return;
        }

        // Otherwise, handle prefix logic
        handlePrefix({
          req,
          res,
          next,
          originalPath,
          searchParams,
          pathLocale,
          storageLocale: effectiveStorageLocale,
          originalUrl,
        });
      });

      // Clean up redirect counts periodically (every 100 requests)
      if (redirectCounts.size > 100) {
        redirectCounts.clear();
      }
    },
  };
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
