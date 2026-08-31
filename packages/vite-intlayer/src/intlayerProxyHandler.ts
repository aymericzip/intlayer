/**
 * Runtime half of the Intlayer proxy: locale detection, redirects and rewrites.
 *
 * Nothing here may import `@intlayer/config/node`. This module is bundled into
 * production servers (see `intlayerNitroHandler`), and the node configuration
 * loader transpiles `intlayer.config.ts` with `esbuild` at runtime, which makes
 * the built server depend on `esbuild` being resolvable next to it.
 */

import type { IncomingMessage, ServerResponse } from 'node:http';
import { parse } from 'node:url';
import { ROUTING_MODE } from '@intlayer/config/defaultValues';
import {
  getCanonicalPath,
  getDomainHostname,
  getDomainOrigin,
  getInternalPath,
  getLocaleFromDomain,
  getRewriteRules,
  isProxyStorageLocaleEnabled,
  localeDetector,
  resolveLocalizedPath,
  resolveProxyMode,
} from '@intlayer/core/localization';
import {
  getCookie,
  getLocaleFromStorageServer,
  setLocaleInStorageServer,
} from '@intlayer/core/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
/* @ts-ignore - Vite types error */
import type { Connect } from 'vite';

/**
 * Header Nitro's prerenderer sets on every request it issues to the server it
 * is generating pages from. Its value is the route being generated.
 */
const NITRO_PRERENDER_HEADER = 'x-nitro-prerender';

/**
 * Environment flag TanStack Start sets on the build process while it prerenders
 * pages through a Vite preview server. The preview server — and therefore this
 * middleware — runs in that same process, so the flag is readable here.
 */
const TANSTACK_PRERENDER_ENV_VAR = 'TSS_PRERENDERING';

/**
 * Detects requests issued by a prerenderer rather than by a real visitor.
 *
 * Prerendered pages are written to disk and then served to every visitor, so
 * their content must depend on the URL alone. Anything client-specific — a
 * locale cookie, a persisted locale on the response — would either be baked
 * into a static file or make the generated page depend on the machine running
 * the build.
 *
 * @param req - The incoming request.
 * @returns `true` when the request comes from a prerender pass.
 *
 * @example
 * ```ts
 * isPrerenderRequest({ headers: { 'x-nitro-prerender': '/about' } }); // true
 * ```
 */
const isPrerenderRequest = (req: IncomingMessage): boolean =>
  Boolean(req.headers[NITRO_PRERENDER_HEADER]) ||
  process.env[TANSTACK_PRERENDER_ENV_VAR] === 'true';

/**
 * Decodes a request pathname so it can be matched against the rewrite rules.
 *
 * A rule is written with the characters the locale actually uses
 * (`/doc/релизы/v8`) while the browser sends them percent-encoded, so without
 * this every non-ASCII localized URL misses its own rule and is treated as an
 * unlocalized path. `decodeURI` leaves the reserved escapes (`%2F`, `%3F`,
 * `%23`) encoded, which keeps the segmentation of the path intact, and a
 * malformed escape is handed back untouched rather than throwing.
 */
const decodePathname = (pathname: string): string => {
  try {
    return decodeURI(pathname);
  } catch {
    return pathname;
  }
};

/**
 * Re-encodes a decoded path before it is written back to `req.url`, leaving the
 * query string as it was received.
 *
 * The inverse of {@link decodePathname}: `encodeURI` escapes exactly what it
 * decoded, so characters that are legal in a path — `+` in
 * `/doc/intlayer_with_vite+react`, for instance — survive the round trip, and
 * an already-encoded path is left as is.
 */
const encodePathname = (path: string): string => {
  const queryIndex = path.indexOf('?');
  const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
  const search = queryIndex === -1 ? '' : path.slice(queryIndex);

  return `${encodeURI(pathname)}${search}`;
};

/**
 * A Node.js-compatible Connect middleware function.
 * Compatible with Vite dev/preview server, Node.js http, Express, and h3's
 * `fromNodeMiddleware` wrapper for Nitro/TanStack Start production use.
 */
export type NodeMiddleware = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  next: () => void
) => void;

export type IntlayerProxyHandlerOptions = {
  /**
   * The resolved Intlayer configuration driving locale detection and routing.
   */
  configuration: IntlayerConfig;
  /**
   * A function that allows you to ignore specific requests from the intlayer proxy.
   *
   * @param req - The incoming request.
   * @returns A boolean value indicating whether to ignore the request.
   */
  ignore?: (req: IncomingMessage) => boolean | undefined;
  /**
   * Whether a development or preview server is serving the app.
   *
   * It only matters in the proxy's auto mode, where a dev server keeps locale
   * routing URL-driven by ignoring the stored locale as a redirect source.
   *
   * @default false
   */
  isDevServer?: boolean;
};

/**
 * Creates the locale-routing middleware from an already-resolved configuration.
 *
 * This is the runtime core shared by every environment - dev server, preview
 * server and the production Nitro server. It deliberately receives the
 * configuration instead of loading it: loading it would pull
 * `@intlayer/config/node` - and therefore `esbuild` - into the server bundle,
 * which then fails to boot wherever `node_modules` is not shipped next to the
 * build output.
 *
 * @param options - The resolved configuration plus optional handler behaviour.
 * @returns A Connect-compatible `(req, res, next) => void` middleware.
 *
 * @see `createIntlayerProxyHandler` for the public, configuration-loading entry point.
 */
export const createProxyHandler = (
  options: IntlayerProxyHandlerOptions
): NodeMiddleware => {
  const {
    configuration: intlayerConfig,
    ignore,
    isDevServer = false,
  } = options;

  const { internationalization, routing } = intlayerConfig;
  const { locales: supportedLocales, defaultLocale } = internationalization;

  const {
    basePath = '',
    mode = ROUTING_MODE,
    rewrite,
    domains,
    enableProxy,
  } = routing;

  // In auto mode a dev/preview server ignores the stored locale when resolving
  // which locale a request maps to, so a lingering cookie cannot keep pulling
  // navigation to another locale while developing. Prefix redirects, locale
  // persistence and `Accept-Language` detection are unaffected.
  const canUseStorageLocale = isProxyStorageLocaleEnabled(
    resolveProxyMode(enableProxy),
    isDevServer
  );

  type RedirectCounter = { count: number; lastSeen: number };
  const redirectCounts = new Map<string, RedirectCounter>();
  const MAX_REDIRECTS = 10;
  const REDIRECT_TTL_MS = 2_000;

  // Derived flags from routing.mode
  const noPrefix =
    (!(
      process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'no-prefix'
    ) &&
      mode === 'no-prefix') ||
    (!(
      process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'search-params'
    ) &&
      mode === 'search-params');
  const prefixDefault =
    !(
      process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'prefix-all'
    ) && mode === 'prefix-all';

  const rewriteRules =
    process.env.INTLAYER_ROUTING_REWRITE_RULES !== 'false'
      ? getRewriteRules(rewrite, 'url')
      : undefined;

  /**
   * Resolves the locale a localized ("pretty") path belongs to.
   *
   * A path such as `/contacto` only exists because a rewrite rule maps it to
   * the Spanish locale, so it declares its locale just as explicitly as an
   * `/es` prefix would. Without this, a visitor whose `Accept-Language` (or
   * stored locale) says `en` gets `/contacto` canonicalized against the
   * English rules only, which never matches — the proxy then treats it as an
   * unlocalized path and redirects to `/en/contacto`, a URL no locale owns.
   *
   * Only patterns that differ from their canonical form are considered: a rule
   * whose localized path equals the canonical one (`en: '/contact'`) carries no
   * locale signal, and matching on it would hijack the default locale's
   * unprefixed URLs.
   *
   * @param path - The request pathname, without any locale prefix.
   * @returns The locale declared by the path, or `undefined` when it declares none.
   */
  const getRewriteLocale = (path: string): Locale | undefined =>
    rewriteRules
      ? supportedLocales.find(
          (candidate) =>
            getCanonicalPath(path, candidate, rewriteRules) !== path
        )
      : undefined;

  /**
   * Extracts the hostname from a request's `Host` header, handling IPv6
   * literals (`[::1]:5173` → `::1`) that a plain `split(':')` would mangle.
   */
  const getRequestHostname = (req: IncomingMessage): string => {
    const host = req.headers.host ?? '';
    const ipv6Match = host.match(/^\[([^\]]+)\]/);
    if (ipv6Match) return ipv6Match[1]!;
    return host.split(':')[0] ?? '';
  };

  /* --------------------------------------------------------------------
   *                     Helper & Utility Functions
   * --------------------------------------------------------------------
   */

  /**
   * Retrieves the locale from storage (cookies, localStorage, sessionStorage).
   *
   * Returns `undefined` when the stored locale is not allowed to drive locale
   * resolution (auto mode on a dev/preview server, or a prerender pass, whose
   * output must stay URL-driven), which makes every caller fall through to
   * `Accept-Language` detection and then the default locale.
   */
  const getStorageLocale = (req: IncomingMessage): Locale | undefined => {
    if (!canUseStorageLocale || isPrerenderRequest(req)) return undefined;

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
      (process.env.INTLAYER_ROUTING_MODE &&
        process.env.INTLAYER_ROUTING_MODE !== 'search-params') ||
      mode !== 'search-params'
    )
      return search;

    const params = new URLSearchParams(search ?? '');

    params.set('locale', locale);

    return `?${params.toString()}`;
  };

  /**
   * Checks whether a pathname starts with the given locale as a full path
   * segment (`/fr` or `/fr/...`). A bare `startsWith('/fr')` would also match
   * unrelated paths like `/friends`, causing wrong prefix stripping and
   * self-redirect loops.
   */
  const hasLocaleSegmentPrefix = (pathname: string, locale: Locale): boolean =>
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);

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
   * Persists the resolved locale onto the outgoing response as a cookie (and
   * header, per `routing.storage`). Only the cookie survives a client redirect,
   * so this is what carries an explicitly-selected locale across a
   * prefix-stripping redirect. Enabled cookie/header targets are resolved by
   * {@link setLocaleInStorageServer} from the config; disabled ones are no-ops.
   */
  const persistLocaleOnResponse = (
    res: ServerResponse<IncomingMessage>,
    locale: Locale
  ) => {
    setLocaleInStorageServer(locale, {
      setCookieStore: (name, value, attributes) => {
        const parts: string[] = [`${name}=${encodeURIComponent(value)}`];
        if (attributes.path) parts.push(`Path=${attributes.path}`);
        if (attributes.domain) parts.push(`Domain=${attributes.domain}`);
        if (typeof attributes.expires === 'number')
          parts.push(`Expires=${new Date(attributes.expires).toUTCString()}`);
        if (attributes.secure) parts.push('Secure');
        if (attributes.httpOnly) parts.push('HttpOnly');
        if (attributes.sameSite) parts.push(`SameSite=${attributes.sameSite}`);

        const cookieString = parts.join('; ');
        const existing = res.getHeader('Set-Cookie');
        const cookies = Array.isArray(existing)
          ? existing.map(String)
          : existing !== undefined
            ? [String(existing)]
            : [];
        cookies.push(cookieString);
        res.setHeader('Set-Cookie', cookies);
      },
      setHeader: (name: string, value: string) => {
        res.setHeader(name, value);
      },
    });
  };

  /**
   * Identifies the client issuing a request, so redirect-loop tracking is
   * scoped per client. Without this, concurrent visitors hitting the same
   * legitimate redirect (e.g. `/` → `/fr/`) would share one counter and trip
   * the loop detector under normal production traffic.
   */
  const getClientKey = (req: IncomingMessage): string => {
    const forwardedFor = req.headers['x-forwarded-for'];
    const forwardedIp = (
      Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor
    )
      ?.split(',')[0]
      ?.trim();

    return forwardedIp || req.socket?.remoteAddress || 'unknown';
  };

  /**
   * Strips any origin from a redirect target, keeping only path, search and
   * hash. Prevents open redirects: user-controlled paths like `//evil.com/x`
   * would otherwise be echoed verbatim into the `Location` header and be
   * interpreted by browsers as a protocol-relative cross-origin URL.
   */
  const toSameOriginUrl = (url: string): string => {
    try {
      const parsed = new URL(url, 'http://intlayer-internal');
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch {
      return url;
    }
  };

  type RedirectOptions = {
    /** Human-readable reason logged when a redirect loop is detected. */
    reason?: string;
    /** The URL of the incoming request, used for redirect-loop tracking. */
    originalUrl?: string;
    /**
     * When provided, the locale is persisted (cookie/header, per config) on
     * the redirect response so the follow-up request resolves the same locale.
     */
    persistLocale?: Locale;
    /**
     * HTTP status for the redirect. Defaults to 302: locale redirects depend
     * on mutable state (cookie, Accept-Language) and must not be cached by
     * the browser as permanent. Domain-routing redirects pass 301 explicitly.
     */
    status?: number;
    /**
     * Allows a cross-origin `Location` target. Only the domain-routing
     * redirect sets this; all other targets are sanitized to same-origin.
     */
    allowCrossOrigin?: boolean;
  };

  /**
   * Writes a redirect response with the given new URL.
   */
  const redirectUrl = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    newUrl: string,
    options?: RedirectOptions
  ) => {
    const {
      reason,
      originalUrl,
      persistLocale,
      status = 302,
      allowCrossOrigin = false,
    } = options ?? {};

    const targetUrl = allowCrossOrigin ? newUrl : toSameOriginUrl(newUrl);

    if (originalUrl) {
      if (originalUrl === targetUrl) {
        console.error('[REDIRECT LOOP DETECTED!]', { originalUrl, reason });
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end(
          `Redirect loop detected: ${originalUrl} redirects to itself`
        );
      }

      const now = Date.now();
      const trackingKey = `${getClientKey(req)}|${originalUrl} -> ${targetUrl}`;
      const previousEntry = redirectCounts.get(trackingKey);
      const count =
        previousEntry && now - previousEntry.lastSeen < REDIRECT_TTL_MS
          ? previousEntry.count + 1
          : 1;

      redirectCounts.set(trackingKey, { count, lastSeen: now });

      if (count > MAX_REDIRECTS) {
        console.error('[REDIRECT LOOP DETECTED!]', {
          originalUrl,
          redirectCount: count,
          lastRedirectTo: targetUrl,
          reason,
        });
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end(
          `Redirect loop detected: ${count} redirects from ${originalUrl}`
        );
      }

      for (const [entryKey, entry] of redirectCounts) {
        if (now - entry.lastSeen >= REDIRECT_TTL_MS)
          redirectCounts.delete(entryKey);
      }
    }

    // A prerendered response is stored as a static file and replayed to every
    // visitor, so persisting the locale on it would hand the locale of the
    // build machine to everyone hitting that page.
    if (persistLocale && !isPrerenderRequest(req)) {
      persistLocaleOnResponse(res, persistLocale);
    }

    res.writeHead(status, { Location: targetUrl });
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
    const encodedUrl = encodePathname(newUrl);

    if (req.url !== encodedUrl) {
      req.url = encodedUrl;
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
    const pathWithoutPrefix = hasLocaleSegmentPrefix(currentPath, locale)
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
        process.env.INTLAYER_ROUTING_MODE &&
        process.env.INTLAYER_ROUTING_MODE !== 'no-prefix'
      ) &&
        mode === 'no-prefix') ||
      (!(
        process.env.INTLAYER_ROUTING_MODE &&
        process.env.INTLAYER_ROUTING_MODE !== 'search-params'
      ) &&
        mode === 'search-params')
    ) {
      const newPath = search
        ? `${pathWithoutPrefix || '/'}${search}`
        : pathWithoutPrefix || '/';
      return newPath;
    }

    // Check if path already starts with locale to avoid double-prefixing
    const pathWithLocalePrefix = hasLocaleSegmentPrefix(currentPath, locale)
      ? currentPath
      : `/${locale}${currentPath}`;

    let newPath = `${normalizedBasePath}${pathWithLocalePrefix}`;

    // Special case: if prefixDefault is false and locale is defaultLocale, remove the locale prefix
    if (!prefixDefault && locale === defaultLocale) {
      newPath = `${normalizedBasePath}${pathWithoutPrefix || '/'}`;
    }

    // Never emit a trailing slash (`/fr/` for the root path): the framework's
    // trailing-slash normalisation would redirect it back and forth with this
    // proxy, creating an infinite redirect loop.
    if (newPath.length > 1 && newPath.endsWith('/')) {
      newPath = newPath.slice(0, -1);
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

    // Guard against a stale/unsupported locale coming from storage or detection
    if (!supportedLocales.includes(locale)) {
      locale = defaultLocale;
    }

    // Without a prefix, a localized path is the only locale signal the URL
    // carries, so it takes precedence over storage / `Accept-Language`.
    if (!pathLocale) {
      locale = getRewriteLocale(originalPath) ?? locale;
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

      // Persist the explicitly-requested locale: stripping the prefix drops
      // the only locale signal from the URL, so without this the follow-up
      // request would fall back to cookie / Accept-Language detection and
      // could resolve a different locale.
      return redirectUrl(req, res, redirectPath, {
        originalUrl,
        persistLocale: pathLocale,
      });
    }

    const canonicalPath = getCanonicalPath(originalPath, locale, rewriteRules);

    // In search-params mode, we need to redirect to add the locale search param
    if (
      !(
        process.env.INTLAYER_ROUTING_MODE &&
        process.env.INTLAYER_ROUTING_MODE !== 'search-params'
      ) &&
      mode === 'search-params'
    ) {
      // Check if locale search param already exists and matches the detected locale
      const existingSearchParams = new URLSearchParams(searchParams ?? '');
      const existingLocale = existingSearchParams.get('locale');

      if (existingLocale === locale) {
        // Rewrite internally — URL stays the same in the browser, but the framework
        // sees /[locale]/path so the [locale] route param is populated correctly.
        // getInternalPath collapses the root path to `/${locale}` — a trailing
        // slash (`/fr/`) would trigger the framework's trailing-slash
        // normalisation redirect and loop with this proxy.
        const internalPath = getInternalPath(canonicalPath, locale);
        const rewritePath = `${internalPath}${searchParams ?? ''}`;

        rewriteUrl(req, res, rewritePath, locale);
        return next();
      }

      // Locale param missing or doesn't match — redirect to add/update it (URL changes in browser)
      const search = appendLocaleSearchIfNeeded(searchParams, locale);
      const redirectPath = search
        ? `${originalPath}${search}`
        : `${originalPath}${searchParams ?? ''}`;

      return redirectUrl(req, res, redirectPath, { originalUrl });
    }

    // For no-prefix mode (not search-params), add locale prefix internally for routing
    // so the framework can match the [locale] route param without exposing it in the URL.
    // getInternalPath collapses the root path to `/${locale}` — a trailing slash
    // (`/fr/`) would trigger the framework's trailing-slash normalisation
    // redirect and loop with this proxy.
    const internalPath = getInternalPath(canonicalPath, locale);

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

    // A localized path names its own locale, and the URL always outranks the
    // stored / negotiated one — otherwise /a-propos read as 'en' resolves to
    // no rule and gets redirected to the ownerless /en/a-propos.
    locale = getRewriteLocale(originalPath) ?? locale;

    // Resolve to canonical path.
    // If user visits /a-propos (implied 'fr'), this resolves to /about
    const canonicalPath = getCanonicalPath(originalPath, locale, rewriteRules);

    // Determine target localized path for redirection.
    // /about + 'fr' → /a-propos
    const { path: targetLocalizedPath } = resolveLocalizedPath(
      canonicalPath,
      locale,
      rewriteRules
    );

    // Construct new path, preserving original search params
    const search = appendLocaleSearchIfNeeded(searchParams, locale);
    const newPath = constructPath(locale, targetLocalizedPath, search);

    // If we always prefix default or if this is not the default locale,
    // do a redirect so the user sees the locale in the URL
    if (prefixDefault || locale !== defaultLocale) {
      return redirectUrl(req, res, newPath, { originalUrl });
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
    const rawPath = originalPath.slice(`/${pathLocale}`.length) || '/';

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

    // The URL is in canonical form (e.g. /fr/about) while the locale owns a
    // different pretty URL for it (fr: '/a-propos'). Redirect so the visible
    // URL is the one the locale owns — the same one `getLocalizedUrl` emits
    // and the one the SPA router declares a route for. Skipped when the
    // default-locale prefix has to be stripped anyway: `handleDefaultLocaleRedirect`
    // resolves the localized path itself, so redirecting here first would
    // cost a second round trip.
    if (prefixDefault || pathLocale !== defaultLocale) {
      const { path: targetLocalizedPath, isRewritten } = resolveLocalizedPath(
        canonicalPath,
        pathLocale,
        rewriteRules
      );

      if (isRewritten && targetLocalizedPath !== rawPath) {
        const search = appendLocaleSearchIfNeeded(searchParams, pathLocale);

        return redirectUrl(
          req,
          res,
          constructPath(pathLocale, targetLocalizedPath, search),
          { originalUrl }
        );
      }
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
      const { path: targetLocalizedPath } = resolveLocalizedPath(
        canonicalPath,
        pathLocale,
        rewriteRules
      );

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

      // Persist the explicitly-requested default locale. Stripping the prefix
      // (e.g. /es → /) drops the only locale signal from the URL, so without
      // this the follow-up request to the canonical path would fall back to
      // Accept-Language detection and could resolve a different locale.
      return redirectUrl(req, res, fullPath + (searchParams ?? ''), {
        originalUrl,
        persistLocale: pathLocale,
      });
    }

    // If we do prefix the default or pathLocale !== default, keep as-is
    // but rewrite to canonical internally.
    // Never emit a trailing slash (`/fr/` for the bare `/fr` URL): rewriting
    // `/fr` to `/fr/` makes the framework issue a trailing-slash normalisation
    // redirect back to `/fr`, which this proxy rewrites again — an infinite
    // redirect loop. `getInternalPath` collapses the root path to `/${locale}`.
    const internalUrl = getInternalPath(canonicalPath, pathLocale);
    const newPath = searchParams
      ? `${internalUrl}${searchParams}`
      : internalUrl;

    rewriteUrl(req, res, newPath, pathLocale);
    return next();
  };

  return (req, res, next) => {
    // Parse original URL for path and query
    const parsedUrl = parse(req.url ?? '/', true);
    // Decoded so the rewrite rules — written with the locale's own characters —
    // match; `rewriteUrl` re-encodes whatever is written back to `req.url`.
    const originalPath = decodePathname(parsedUrl.pathname ?? '/');
    const searchParams = parsedUrl.search ?? '';

    // Check if there's a locale prefix in the path FIRST
    const pathLocale = getPathLocale(originalPath);

    // Bypass special Vite/server endpoints and node_modules
    if (
      // Custom ignore function
      (ignore?.(req) ?? false) ||
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
        req.url = encodePathname(`${pathWithoutLocale}${searchParams}`);
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
      process.env.INTLAYER_ROUTING_DOMAINS !== 'false' &&
      !noPrefix &&
      pathLocale &&
      domains
    ) {
      const localeDomain = domains[pathLocale as keyof typeof domains];
      if (localeDomain) {
        const reqHost = getRequestHostname(req);
        const domainHost = getDomainHostname(localeDomain);
        if (domainHost !== reqHost) {
          const rawPath = originalPath.slice(`/${pathLocale}`.length) || '/';
          const targetOrigin = getDomainOrigin(localeDomain);
          // Domain mapping is stable config, so a cacheable 301 is intended
          // here — unlike locale-detection redirects, which use 302.
          redirectUrl(req, res, `${targetOrigin}${rawPath}${searchParams}`, {
            reason: 'domain-routing',
            originalUrl,
            status: 301,
            allowCrossOrigin: true,
          });
          return;
        }
      }
    }

    // Domain routing: if the current hostname is exclusively mapped to one locale,
    // treat it as that locale without a URL prefix.
    // e.g. intlayer.zh/about → internally rewrite to /zh/about
    if (
      process.env.INTLAYER_ROUTING_DOMAINS !== 'false' &&
      !noPrefix &&
      !pathLocale
    ) {
      const reqHost = getRequestHostname(req);
      const domainLocale = getLocaleFromDomain(reqHost, domains);
      if (domainLocale) {
        const canonicalPath = getCanonicalPath(
          originalPath,
          domainLocale,
          rewriteRules
        );

        // Default locale without forced prefixing: pass the canonical path
        // through unchanged, mirroring handleMissingPathLocale. Rewriting `/`
        // to `/en/` makes TanStack Start issue a trailing-slash normalisation
        // redirect (/en/ → /en), whose prefix the proxy then strips back to /,
        // creating an infinite redirect loop.
        if (!prefixDefault && domainLocale === defaultLocale) {
          rewriteUrl(
            req as Connect.IncomingMessage,
            res,
            `${canonicalPath}${searchParams}`,
            domainLocale
          );
          return next();
        }

        // Never emit a trailing slash (`/zh/`): the framework would redirect
        // it to `/zh`, which this proxy rewrites to `/zh/` again — a loop.
        const internalPath = getInternalPath(canonicalPath, domainLocale);

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
