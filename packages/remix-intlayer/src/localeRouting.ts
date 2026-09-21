import { ROUTING_MODE } from '@intlayer/config/defaultValues';
import {
  getCanonicalPath,
  getDomainHostname,
  getDomainOrigin,
  getLocaleFromDomain,
  getRewriteRules,
  isProxyStorageLocaleEnabled,
  localeDetector,
  resolveLocalizedPath,
  resolveProxyMode,
} from '@intlayer/core/localization';
import { getCookie, getLocaleFromStorageServer } from '@intlayer/core/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * The part of an incoming request the locale routing is decided from.
 */
export type LocaleRoutingRequest = {
  url: URL;
  headers: Headers;
};

/**
 * What the locale routing decided for a request.
 *
 * - `pass` — leave the request untouched (proxy disabled, ignored path).
 * - `rewrite` — keep serving the request, but from `path` (locale prefix
 *   stripped, rewrite rule resolved to its canonical path). `locale` is the
 *   locale the request resolved to, absent for a static asset.
 * - `redirect` — answer with a redirect to `location`. `persistLocale` asks
 *   for the locale to be stored on the response so the follow-up request
 *   resolves the same locale.
 */
export type LocaleRoutingAction =
  | { kind: 'pass' }
  | { kind: 'rewrite'; path: string; locale?: Locale }
  | {
      kind: 'redirect';
      location: string;
      status: 301 | 302;
      persistLocale?: Locale;
    };

export type LocaleRoutingOptions = {
  /**
   * Whether a development server is serving the app. In `enableProxy: auto`
   * mode, a development server ignores the stored locale (cookie / header)
   * when deciding where a request goes, so a stale cookie cannot keep pulling
   * every navigation to another locale while developing.
   *
   * @default process.env.NODE_ENV === 'development'
   */
  isDevServer?: boolean;
  /**
   * Requests to leave untouched, in addition to static assets.
   */
  ignore?: (request: LocaleRoutingRequest) => boolean;
};

export type LocaleRoutingConfiguration = Pick<
  IntlayerConfig,
  'internationalization' | 'routing'
>;

/** Matches a pathname ending with a file extension (`/logo.svg`). */
const STATIC_ASSET_PATTERN = /\.[a-zA-Z0-9]+$/;

const PASS: LocaleRoutingAction = { kind: 'pass' };

/**
 * Decodes a pathname so it can be matched against the rewrite rules, which are
 * written with the characters the locale actually uses (`/doc/релизы`) while
 * the browser sends them percent-encoded. A malformed escape is kept as is.
 */
const decodePathname = (pathname: string): string => {
  try {
    return decodeURI(pathname);
  } catch {
    return pathname;
  }
};

/**
 * Removes a trailing slash, except on the root path. A redirect to `/fr/`
 * would otherwise ping-pong with any trailing-slash normalisation downstream.
 */
const trimTrailingSlash = (path: string): string =>
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

/**
 * Removes `/{locale}` from the start of a pathname that carries that prefix.
 */
const stripLocalePrefix = (pathname: string, locale: Locale): string =>
  pathname.slice(`/${locale}`.length) || '/';

/**
 * Builds the locale-routing resolver of a Remix application.
 *
 * Decides, for each request, whether to serve it as is, serve it from another
 * internal path, or redirect it — mirroring the Intlayer proxies of
 * `next-intlayer` and `vite-intlayer`. Unlike them, an internal rewrite hands
 * the router the path *without* its locale prefix: the Remix router has no
 * trailing-slash normalisation to work around, and this lets an application
 * declare each route once (`/about`) whatever the routing mode, the locale
 * being read from the request context instead of a route param.
 *
 * @param configuration - The `internationalization` and `routing` configuration.
 * @param options - Runtime options.
 * @returns A pure function deciding the routing of a request.
 *
 * @example
 * ```ts
 * const resolveLocaleRouting = createLocaleRouting(configuration);
 *
 * resolveLocaleRouting({ url: new URL('http://host/fr/about'), headers });
 * // { kind: 'rewrite', path: '/about', locale: 'fr' }
 * ```
 */
export const createLocaleRouting = (
  configuration: LocaleRoutingConfiguration,
  options: LocaleRoutingOptions = {}
): ((request: LocaleRoutingRequest) => LocaleRoutingAction) => {
  const { isDevServer = process.env.NODE_ENV === 'development', ignore } =
    options;
  const { locales, defaultLocale } = configuration.internationalization;
  const {
    basePath = '',
    mode = ROUTING_MODE,
    rewrite,
    domains,
    enableProxy,
  } = configuration.routing ?? {};

  const proxyMode = resolveProxyMode(enableProxy);
  const canUseStorageLocale = isProxyStorageLocaleEnabled(
    proxyMode,
    isDevServer
  );

  const isSearchParamsMode = mode === 'search-params';
  const noPrefix = mode === 'no-prefix' || isSearchParamsMode;
  const prefixDefault = mode === 'prefix-all';
  const rewriteRules = getRewriteRules(rewrite, 'url');
  const normalizedBasePath = trimTrailingSlash(
    basePath && !basePath.startsWith('/') ? `/${basePath}` : basePath
  );

  const isSupportedLocale = (value: string | undefined): value is Locale =>
    value !== undefined && locales.includes(value as Locale);

  /**
   * Locale carried by the first path segment (`/fr/about` → `fr`).
   */
  const getPathLocale = (pathname: string): Locale | undefined => {
    const firstSegment = pathname.split('/')[1];

    return isSupportedLocale(firstSegment) ? firstSegment : undefined;
  };

  /**
   * Locale a localized ("pretty") path belongs to. `/a-propos` only exists
   * because a rewrite rule maps it to French, so it declares its locale as
   * explicitly as an `/fr` prefix would; rules whose localized path equals the
   * canonical one carry no signal and are skipped.
   */
  const getRewriteLocale = (pathname: string): Locale | undefined =>
    rewriteRules
      ? locales.find(
          (candidate) =>
            getCanonicalPath(pathname, candidate, rewriteRules) !== pathname
        )
      : undefined;

  /**
   * Locale persisted by the client (cookie / header), when it may be used as
   * a routing source.
   */
  const getStorageLocale = (headers: Headers): Locale | undefined =>
    canUseStorageLocale
      ? getLocaleFromStorageServer({
          getCookie: (name) =>
            getCookie(name, headers.get('cookie') ?? undefined),
          getHeader: (name) => headers.get(name),
        })
      : undefined;

  /**
   * Best locale for a request that names none: storage, then
   * `Accept-Language`, then the default locale.
   */
  const detectLocale = (headers: Headers): Locale => {
    const locale =
      getStorageLocale(headers) ??
      localeDetector(
        { 'accept-language': headers.get('accept-language') ?? undefined },
        locales,
        defaultLocale
      );

    return isSupportedLocale(locale) ? locale : defaultLocale;
  };

  /**
   * Query string of a URL, with the `locale` param set in `search-params` mode.
   */
  const withLocaleSearch = (search: string, locale: Locale): string => {
    if (!isSearchParamsMode) return search;

    const params = new URLSearchParams(search);
    params.set('locale', locale);

    return `?${params.toString()}`;
  };

  /**
   * Public path of an application path for a locale: base path, then the
   * locale prefix when the routing mode shows one for that locale.
   */
  const toPublicPath = (
    locale: Locale,
    path: string,
    search: string
  ): string => {
    const showPrefix = !noPrefix && (prefixDefault || locale !== defaultLocale);
    const prefixedPath = showPrefix
      ? `/${locale}${path === '/' ? '' : path}`
      : path;

    return `${normalizedBasePath}${trimTrailingSlash(prefixedPath)}${withLocaleSearch(search, locale)}`;
  };

  /**
   * Internal path handed to the router: base path plus the canonical path.
   */
  const toInternalPath = (path: string, search: string): string =>
    `${normalizedBasePath}${path}${search}`;

  const rewriteTo = (
    path: string,
    search: string,
    locale?: Locale
  ): LocaleRoutingAction => ({
    kind: 'rewrite',
    path: encodeURI(toInternalPath(path, search)),
    locale,
  });

  /**
   * Same-origin redirect. A target equal to the request itself is served in
   * place instead, so a configuration mismatch can never loop.
   */
  const redirectTo = (
    location: string,
    current: string,
    persistLocale?: Locale
  ): LocaleRoutingAction => {
    const encodedLocation = encodeURI(location);

    if (encodedLocation === current) return PASS;

    return persistLocale
      ? {
          kind: 'redirect',
          location: encodedLocation,
          status: 302,
          persistLocale,
        }
      : { kind: 'redirect', location: encodedLocation, status: 302 };
  };

  /**
   * `no-prefix` and `search-params` modes: the URL never shows a prefix.
   */
  const handleNoPrefix = (
    { url, headers }: LocaleRoutingRequest,
    pathname: string,
    current: string
  ): LocaleRoutingAction => {
    const pathLocale = getPathLocale(pathname);

    if (pathLocale) {
      const canonicalPath = getCanonicalPath(
        stripLocalePrefix(pathname, pathLocale),
        pathLocale,
        rewriteRules
      );

      // Stripping the prefix drops the only locale signal from the URL, so the
      // locale is persisted for the follow-up request.
      return redirectTo(
        toPublicPath(pathLocale, canonicalPath, url.search),
        current,
        pathLocale
      );
    }

    if (isSearchParamsMode) {
      const searchLocale = url.searchParams.get('locale') ?? undefined;
      const locale =
        getStorageLocale(headers) ??
        (isSupportedLocale(searchLocale) ? searchLocale : undefined) ??
        detectLocale(headers);
      const canonicalPath = getCanonicalPath(pathname, locale, rewriteRules);

      return searchLocale === locale
        ? rewriteTo(canonicalPath, url.search, locale)
        : redirectTo(
            `${normalizedBasePath}${pathname}${withLocaleSearch(url.search, locale)}`,
            current
          );
    }

    const locale = getRewriteLocale(pathname) ?? detectLocale(headers);

    return rewriteTo(
      getCanonicalPath(pathname, locale, rewriteRules),
      url.search,
      locale
    );
  };

  /**
   * Prefix modes, URL without a locale prefix: redirect to the localized URL
   * when the mode shows a prefix for the resolved locale, serve it otherwise.
   */
  const handleMissingPathLocale = (
    { url, headers }: LocaleRoutingRequest,
    pathname: string,
    current: string
  ): LocaleRoutingAction => {
    // A localized path names its own locale and outranks storage and
    // `Accept-Language`, otherwise `/a-propos` read as `en` matches no rule.
    const locale = getRewriteLocale(pathname) ?? detectLocale(headers);
    const canonicalPath = getCanonicalPath(pathname, locale, rewriteRules);

    if (prefixDefault || locale !== defaultLocale) {
      const { path: localizedPath } = resolveLocalizedPath(
        canonicalPath,
        locale,
        rewriteRules
      );

      return redirectTo(
        toPublicPath(locale, localizedPath, url.search),
        current
      );
    }

    return rewriteTo(canonicalPath, url.search, locale);
  };

  /**
   * Prefix modes, URL with a locale prefix: normalise it to its localized
   * form, strip the prefix of the default locale when the mode hides it, and
   * serve the canonical path.
   */
  const handleExistingPathLocale = (
    { url }: LocaleRoutingRequest,
    pathname: string,
    pathLocale: Locale,
    current: string
  ): LocaleRoutingAction => {
    const rawPath = stripLocalePrefix(pathname, pathLocale);
    const canonicalPath = getCanonicalPath(rawPath, pathLocale, rewriteRules);
    const { path: localizedPath, isRewritten } = resolveLocalizedPath(
      canonicalPath,
      pathLocale,
      rewriteRules
    );

    // `/fr/about` → `/fr/a-propos`
    if (isRewritten && localizedPath !== rawPath) {
      return redirectTo(
        toPublicPath(pathLocale, localizedPath, url.search),
        current
      );
    }

    // `/en/about` → `/about`. The locale is persisted: the target no longer
    // names it, and detection could otherwise resolve another one.
    if (!prefixDefault && pathLocale === defaultLocale) {
      return redirectTo(
        toPublicPath(pathLocale, localizedPath, url.search),
        current,
        pathLocale
      );
    }

    return rewriteTo(canonicalPath, url.search, pathLocale);
  };

  return (request): LocaleRoutingAction => {
    if (proxyMode === 'disabled' || ignore?.(request)) return PASS;

    const { url } = request;
    const fullPathname = decodePathname(url.pathname);

    if (
      normalizedBasePath &&
      fullPathname !== normalizedBasePath &&
      !fullPathname.startsWith(`${normalizedBasePath}/`)
    ) {
      return PASS;
    }

    const pathname = fullPathname.slice(normalizedBasePath.length) || '/';
    const current = `${url.pathname}${url.search}`;
    const pathLocale = getPathLocale(pathname);

    // Static assets are served from their unprefixed path, untouched otherwise.
    if (STATIC_ASSET_PATTERN.test(pathname)) {
      return pathLocale
        ? rewriteTo(stripLocalePrefix(pathname, pathLocale), url.search)
        : PASS;
    }

    if (noPrefix) return handleNoPrefix(request, pathname, current);

    // `host/zh/about` → `https://host.zh/about` when `zh` has its own domain.
    // Domain mapping is stable configuration, hence a cacheable 301.
    const localeDomain = pathLocale && domains?.[pathLocale];

    if (localeDomain && getDomainHostname(localeDomain) !== url.hostname) {
      return {
        kind: 'redirect',
        location: `${getDomainOrigin(localeDomain)}${encodeURI(stripLocalePrefix(pathname, pathLocale))}${url.search}`,
        status: 301,
      };
    }

    // `host.zh/about` → `/about` as `zh`: the hostname alone names the locale.
    if (!pathLocale) {
      const domainLocale = getLocaleFromDomain(url.hostname, domains);

      if (domainLocale) {
        return rewriteTo(
          getCanonicalPath(pathname, domainLocale, rewriteRules),
          url.search,
          domainLocale
        );
      }

      return handleMissingPathLocale(request, pathname, current);
    }

    return handleExistingPathLocale(request, pathname, pathLocale, current);
  };
};
