import type { IncomingMessage, ServerResponse } from 'node:http';
import { fileURLToPath, parse } from 'node:url';
import * as ANSIColors from '@intlayer/config/colors';
import { ROUTING_MODE } from '@intlayer/config/defaultValues';
import { colorize, getAppLogger } from '@intlayer/config/logger';
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
 * A Node.js-compatible Connect middleware function.
 * Compatible with Vite dev/preview server, Node.js http, Express, and h3's
 * `fromNodeMiddleware` wrapper for Nitro/TanStack Start production use.
 */
type NodeMiddleware = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  next: () => void
) => void;

/**
 * Creates a standalone, framework-agnostic locale-routing middleware.
 *
 * This function contains all the locale detection, redirect, and rewrite logic.
 * It is intentionally separated from the Vite plugin so the same handler can be
 * used in every environment:
 *
 * - **Dev**: wired up automatically by `intlayerProxy` via `configureServer`
 * - **Preview**: wired up automatically by `intlayerProxy` via `configurePreviewServer`
 * - **Production (Nitro / TanStack Start)**: create `server/middleware/intlayerProxy.ts`:
 *
 * @example
 * ```ts
 * // server/middleware/intlayerProxy.ts
 * import { fromNodeMiddleware } from 'h3';
 * import { createIntlayerProxyHandler } from 'vite-intlayer';
 *
 * export default fromNodeMiddleware(createIntlayerProxyHandler());
 * ```
 *
 * @param configOptions - Optional Intlayer configuration overrides.
 * @param options - Plugin-specific options, such as path ignoring.
 * @returns A Connect-compatible `(req, res, next) => void` middleware.
 */
export const createIntlayerProxyHandler = (
  configOptions?: GetConfigurationOptions,
  options?: IntlayerProxyPluginOptions
): NodeMiddleware => {
  const intlayerConfig = getConfiguration(configOptions);

  const { internationalization, routing } = intlayerConfig;
  const { locales: supportedLocales, defaultLocale } = internationalization;

  const { basePath = '', mode = ROUTING_MODE, rewrite, domains } = routing;

  type RedirectCounter = { count: number; lastSeen: number };
  const redirectCounts = new Map<string, RedirectCounter>();
  const MAX_REDIRECTS = 10;
  const REDIRECT_TTL_MS = 2_000;

  // Derived flags from routing.mode
  const noPrefix =
    (!(
      process.env['INTLAYER_ROUTING_MODE'] &&
      process.env['INTLAYER_ROUTING_MODE'] !== 'no-prefix'
    ) &&
      mode === 'no-prefix') ||
    (!(
      process.env['INTLAYER_ROUTING_MODE'] &&
      process.env['INTLAYER_ROUTING_MODE'] !== 'search-params'
    ) &&
      mode === 'search-params');
  const prefixDefault =
    !(
      process.env['INTLAYER_ROUTING_MODE'] &&
      process.env['INTLAYER_ROUTING_MODE'] !== 'prefix-all'
    ) && mode === 'prefix-all';

  const rewriteRules =
    process.env['INTLAYER_ROUTING_REWRITE_RULES'] !== 'false'
      ? getRewriteRules(rewrite, 'url')
      : undefined;

  /**
   * Strips the protocol from a domain string, returning only the hostname.
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
   */
  const getLocaleFromDomain = (hostname: string): Locale | undefined => {
    if (!domains) return undefined;
    const matching = Object.entries(domains).filter(
      ([, domain]) => normalizeDomainHostname(domain!) === hostname
    );
    return matching.length === 1 ? (matching[0]![0] as Locale) : undefined;
  };

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
    if (
      (process.env['INTLAYER_ROUTING_MODE'] &&
        process.env['INTLAYER_ROUTING_MODE'] !== 'search-params') ||
      mode !== 'search-params'
    )
      return search;

    const params = new URLSearchParams(search ?? '');

    params.set('locale', locale);

    return `?${params.toString()}`;
  };

  /**
   * Extracts the locale from the URL pathname if present as the first segment.
   * e.g. if pathname is /en/some/page or /en, checks if "en" is in supportedLocales.
   */
  const getPathLocale = (pathname: string): Locale | undefined => {
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
    if (originalUrl) {
      if (originalUrl === newUrl) {
        console.error('[REDIRECT LOOP DETECTED!]', { originalUrl, reason });
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end(
          `Redirect loop detected: ${originalUrl} redirects to itself`
        );
      }

      const now = Date.now();
      const key = `${originalUrl} -> ${newUrl}`;
      const prev = redirectCounts.get(key);
      const count =
        prev && now - prev.lastSeen < REDIRECT_TTL_MS ? prev.count + 1 : 1;

      redirectCounts.set(key, { count, lastSeen: now });

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

      for (const [key, entry] of redirectCounts) {
        if (now - entry.lastSeen >= REDIRECT_TTL_MS) redirectCounts.delete(key);
      }
    }

    res.writeHead(301, { Location: newUrl });
    return res.end();
  };

  /**
   * "Rewrite" the request internally by adjusting req.url.
   * Also sets the locale in the response/request headers via storage to mimic
   * Next.js's behaviour of propagating the detected locale downstream.
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
   * - basePath:    (e.g. '/myapp')
   * - locale:      (e.g. 'en')
   * - currentPath: (e.g. '/products/shoes')
   * - search:      (e.g. '?foo=bar')
   */
  const constructPath = (
    locale: Locale,
    currentPath: string,
    search?: string
  ) => {
    // Strip any incoming locale prefix to avoid double-prefixing
    const pathWithoutPrefix = currentPath.startsWith(`/${locale}`)
      ? currentPath.slice(`/${locale}`.length)
      : currentPath;

    // Ensure basePath always starts with '/' and has no trailing slash
    const cleanBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
    const normalizedBasePath = cleanBasePath.endsWith('/')
      ? cleanBasePath.slice(0, -1)
      : cleanBasePath;

    // In 'search-params' and 'no-prefix' modes, do not prefix the path with the locale
    if (
      (!(
        process.env['INTLAYER_ROUTING_MODE'] &&
        process.env['INTLAYER_ROUTING_MODE'] !== 'no-prefix'
      ) &&
        mode === 'no-prefix') ||
      (!(
        process.env['INTLAYER_ROUTING_MODE'] &&
        process.env['INTLAYER_ROUTING_MODE'] !== 'search-params'
      ) &&
        mode === 'search-params')
    ) {
      const newPath = search
        ? `${pathWithoutPrefix || '/'}${search}`
        : pathWithoutPrefix || '/';
      return newPath;
    }

    // Check if path already starts with locale to avoid double-prefixing
    const pathWithLocalePrefix = currentPath.startsWith(`/${locale}`)
      ? currentPath
      : `/${locale}${currentPath}`;

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

    // Determine the best locale: prefer cookie/storage, fall back to Accept-Language detection
    let locale = storageLocale ?? defaultLocale;

    // Use localeDetector if no storage locale is available
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
    if (
      !(
        process.env['INTLAYER_ROUTING_MODE'] &&
        process.env['INTLAYER_ROUTING_MODE'] !== 'search-params'
      ) &&
      mode === 'search-params'
    ) {
      // Check if locale search param already exists and matches the detected locale
      const existingSearchParams = new URLSearchParams(searchParams ?? '');
      const existingLocale = existingSearchParams.get('locale');

      if (existingLocale === locale) {
        // Rewrite internally — URL stays the same in the browser, but the framework
        // sees /[locale]/path so the [locale] route param is populated correctly
        const internalPath = `/${locale}${canonicalPath}`;
        const rewritePath = `${internalPath}${searchParams ?? ''}`;

        rewriteUrl(req, res, rewritePath, locale);
        return next();
      }

      // Locale param missing or doesn't match — redirect to add/update it (URL changes in browser)
      const search = appendLocaleSearchIfNeeded(searchParams, locale);
      const redirectPath = search
        ? `${originalPath}${search}`
        : `${originalPath}${searchParams ?? ''}`;

      return redirectUrl(res, redirectPath, undefined, originalUrl);
    }

    // For no-prefix mode (not search-params), add locale prefix internally for routing
    // so the framework can match the [locale] route param without exposing it in the URL
    const internalPath = `/${locale}${canonicalPath}`;

    const search = appendLocaleSearchIfNeeded(searchParams, locale);
    const rewritePath = search
      ? `${internalPath}${search}`
      : `${internalPath}${searchParams ?? ''}`;

    // Rewrite internally — URL stays the same in the browser
    rewriteUrl(req, res, rewritePath, locale);

    return next();
  };

  /**
   * The main prefix logic.
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
   * Detects a locale from storage / headers / default, then either redirects or rewrites.
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
    // Choose the best locale: cookie/storage → Accept-Language detection → defaultLocale
    let locale = (storageLocale ??
      localeDetector(
        req.headers as Record<string, string>,
        supportedLocales,
        defaultLocale
      )) as Locale;

    // If still invalid, fall back to defaultLocale
    if (!supportedLocales.includes(locale)) {
      locale = defaultLocale;
    }

    // Resolve to canonical path.
    // If user visits /a-propos (implied 'fr'), this resolves to /about
    const canonicalPath = getCanonicalPath(originalPath, locale, rewriteRules);

    // Determine target localized path for redirection.
    // /about + 'fr' → /a-propos
    const targetLocalizedPathResult = getLocalizedPath(
      canonicalPath,
      locale,
      rewriteRules
    );
    const targetLocalizedPath =
      typeof targetLocalizedPathResult === 'string'
        ? targetLocalizedPathResult
        : targetLocalizedPathResult.path;

    // Construct new path, preserving original search params
    const search = appendLocaleSearchIfNeeded(searchParams, locale);
    const newPath = constructPath(locale, targetLocalizedPath, search);

    // If we always prefix default or if this is not the default locale,
    // do a 301 redirect so the user sees the locale in the URL
    if (prefixDefault || locale !== defaultLocale) {
      return redirectUrl(res, newPath, undefined, originalUrl);
    }

    // If we do NOT prefix the default locale, pass through the canonical path unchanged.
    // Rewriting to `/${locale}${canonicalPath}` (e.g. /en/) causes TanStack Start to issue a
    // trailing-slash normalisation redirect (/en/ → /en), which the proxy then strips back to /,
    // creating an infinite redirect loop.
    // Because {-$locale} is an optional segment, the framework matches the un-prefixed URL with
    // locale=undefined and falls back to defaultLocale via `params.locale ?? defaultLocale`.
    // searchParams MUST be preserved here — dropping them causes the framework (e.g. TanStack Start) to
    // see a URL with no search params, trigger a validateSearch normalisation redirect to the prefixed URL
    // (e.g. /en?page=1&...), which the middleware then strips back to /?..., creating an infinite loop.
    rewriteUrl(req, res, `${canonicalPath}${searchParams}`, locale);
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

    // Identify the canonical path (internal path).
    // Ex: /a-propos (from URL) → /about (canonical)
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
    // We set the locale header and call next() so the server serves the page at the pretty URL.
    if (canonicalPath !== rawPath) {
      const newPath = searchParams
        ? `${originalPath}${searchParams}`
        : originalPath;
      rewriteUrl(req, res, newPath, pathLocale);
      return next();
    }

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
    // If we don't prefix the default locale AND the path locale IS the default → strip the prefix
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

    // If we do prefix the default or pathLocale !== default, keep as-is
    // but rewrite to canonical internally
    const internalUrl = `/${pathLocale}${canonicalPath}`;
    const newPath = searchParams
      ? `${internalUrl}${searchParams}`
      : internalUrl;

    rewriteUrl(req, res, newPath, pathLocale);
    return next();
  };

  return (req, res, next) => {
    // Parse original URL for path and query
    const parsedUrl = parse(req.url ?? '/', true);
    const originalPath = parsedUrl.pathname ?? '/';
    const searchParams = parsedUrl.search ?? '';

    // Check if there's a locale prefix in the path FIRST
    const pathLocale = getPathLocale(originalPath);

    // Bypass special Vite/server endpoints and node_modules
    if (
      // Custom ignore function
      (options?.ignore?.(req) ?? false) ||
      originalPath.startsWith('/node_modules') ||
      /**
       * /^@vite/            # HMR client and helpers
       * /^@fs/              # file-system import serving
       * /^@id/              # virtual module ids
       * /^@tanstack/start-router-manifest # Tanstack Start Router manifest
       */
      originalPath.startsWith('/@') ||
      /**
       * /^__vite_ping$      # health ping
       * /^__open-in-editor$
       * /^__manifest$       # Remix/RR7 lazyRouteDiscovery
       */
      originalPath.startsWith('/_')
    ) {
      return next();
    }

    // Static file requests (e.g. /assets/video.mp4): bypass locale routing.
    // If the URL carries a locale prefix (e.g. /fr/assets/video.mp4),
    // rewrite the request internally to the unprefixed path (/assets/video.mp4)
    // so the file can be served correctly from the public directory.
    if (originalPath.match(/\.[a-zA-Z0-9]+$/)) {
      if (pathLocale) {
        const pathWithoutLocale =
          originalPath.slice(`/${pathLocale}`.length) || '/';
        req.url = `${pathWithoutLocale}${searchParams}`;
      }
      return next();
    }

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

    // Domain routing: if the path locale is mapped to a different domain, redirect there.
    // e.g. intlayer.org/zh/about → https://intlayer.zh/about
    if (
      process.env['INTLAYER_ROUTING_DOMAINS'] !== 'false' &&
      !noPrefix &&
      pathLocale &&
      domains
    ) {
      const localeDomain = domains[pathLocale as keyof typeof domains];
      if (localeDomain) {
        const reqHost = (req.headers['host'] ?? '').split(':')[0] ?? '';
        const domainHost = normalizeDomainHostname(localeDomain);
        if (domainHost !== reqHost) {
          const rawPath = originalPath.slice(`/${pathLocale}`.length) || '/';
          const targetOrigin = /^https?:\/\//.test(localeDomain)
            ? localeDomain
            : `https://${localeDomain}`;
          redirectUrl(
            res,
            `${targetOrigin}${rawPath}${searchParams}`,
            'domain-routing',
            originalUrl
          );
          return;
        }
      }
    }

    // Domain routing: if the current hostname is exclusively mapped to one locale,
    // treat it as that locale without a URL prefix.
    // e.g. intlayer.zh/about → internally rewrite to /zh/about
    if (
      process.env['INTLAYER_ROUTING_DOMAINS'] !== 'false' &&
      !noPrefix &&
      !pathLocale
    ) {
      const reqHost = (req.headers['host'] ?? '').split(':')[0] ?? '';
      const domainLocale = getLocaleFromDomain(reqHost);
      if (domainLocale) {
        const canonicalPath = getCanonicalPath(
          originalPath,
          domainLocale,
          rewriteRules
        );
        const internalPath = `/${domainLocale}${canonicalPath}`;
        rewriteUrl(
          req as Connect.IncomingMessage,
          res,
          searchParams ? `${internalPath}${searchParams}` : internalPath,
          domainLocale
        );
        return next();
      }
    }

    if (noPrefix) {
      handleNoPrefix({
        req: req as Connect.IncomingMessage,
        res,
        next,
        originalPath,
        searchParams,
        storageLocale: effectiveStorageLocale,
        originalUrl,
      });
      return;
    }

    handlePrefix({
      req: req as Connect.IncomingMessage,
      res,
      next,
      originalPath,
      searchParams,
      pathLocale,
      storageLocale: effectiveStorageLocale,
      originalUrl,
    });
  };
};

/**
 * Vite plugin that provides locale-based routing middleware for **all environments**:
 * development, preview, and production SSR (Nitro / TanStack Start).
 *
 * - **Dev** (`vite dev`): registered via `configureServer`.
 * - **Preview** (`vite preview`): registered via `configurePreviewServer`.
 * - **Production Nitro** (`vite build`): automatically injected via the `.nitro` module
 *   property that `nitro/vite` reads and pushes into `nitroConfig.modules`. The module
 *   registers `intlayerNitroHandler` as a Nitro server middleware — no extra user config
 *   needed.
 *
 * If you need custom config options or an `ignore` predicate in production, bypass
 * auto-injection and create a server middleware file manually:
 *
 * ```ts
 * // server/middleware/intlayerProxy.ts
 * import { fromNodeMiddleware } from 'h3';
 * import { createIntlayerProxyHandler } from 'vite-intlayer';
 *
 * export default fromNodeMiddleware(
 *   createIntlayerProxyHandler(myConfig, { ignore: (req) => req.url?.startsWith('/api') })
 * );
 * ```
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
  const handler = createIntlayerProxyHandler(configOptions, options);
  const intlayerConfig = getConfiguration(configOptions);
  const logger = getAppLogger(intlayerConfig);

  /**
   * Nitro module injected automatically by `nitro/vite`.
   *
   * When a Vite plugin carries a `.nitro` property, `nitro/vite` pushes it into
   * `nitroConfig.modules` during the build phase. The module's `setup` hook adds
   * our locale-routing handler to Nitro's server pipeline, making locale detection
   * work in production SSR builds (TanStack Start, Nuxt, etc.) without any extra
   * user configuration.
   *
   * @see https://github.com/nitrojs/nitro (nitro/vite source, line ~402)
   */
  const nitroModule = {
    name: 'intlayer-proxy',
    setup(nitro: {
      options: {
        dev: boolean;
        handlers: {
          route: string;
          handler: string;
          middleware: boolean;
        }[];
      };
    }) {
      // In dev mode, locale routing is already handled by configureServer (Vite dev server).
      // The Nitro dev server uses h3 v2's Web Fetch API event model which is incompatible
      // with fromNodeMiddleware (h3 v1) and would cause double-execution anyway.
      // Only inject for production builds where Nitro is the actual HTTP server.
      if (nitro.options.dev) return;

      const handlerPath = fileURLToPath(
        new URL('./intlayerNitroHandler.mjs', import.meta.url)
      );

      nitro.options.handlers.push({
        route: '/**',
        handler: handlerPath,
        middleware: true,
      });
    },
  };

  return {
    name: 'vite-intlayer-middleware-plugin',
    // Injected into nitroConfig.modules by the `nitro/vite` plugin so the
    // locale-routing middleware is registered in the production Nitro server.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nitro: nitroModule as any,
    // Vite dev server
    configureServer: (server) => {
      logger(`Intlayer proxy ${colorize('enabled', ANSIColors.GREEN)}`, {
        level: 'info',
      });
      server.middlewares.use(handler);
    },
    // Vite preview server
    configurePreviewServer: (server) => {
      logger(`Intlayer proxy ${colorize('enabled', ANSIColors.GREEN)}`, {
        level: 'info',
      });
      server.middlewares.use(handler);
    },
  } as Plugin;
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
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerMiddleware() ],
 * });
 * ```
 */
export const intLayerMiddlewarePlugin = intlayerProxy;
