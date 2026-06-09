import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

// ── Hoisted mock state ────────────────────────────────────────────────────────

const mockConfig = vi.hoisted(() => ({
  internationalization: {
    locales: ['en', 'fr', 'es'] as string[],
    defaultLocale: 'en',
  },
  routing: {
    basePath: '',
    mode: 'prefix-no-default' as string,
    rewrite: undefined as undefined,
    domains: undefined as Record<string, string> | undefined,
  },
}));

const mockGetLocaleFromStorage = vi.hoisted(() =>
  vi.fn((_opts: unknown): string | undefined => undefined)
);
const mockSetLocaleInStorage = vi.hoisted(() => vi.fn());
const mockLocaleDetectorFn = vi.hoisted(() =>
  vi.fn((_req: unknown): string | undefined => undefined)
);
const mockGetCanonicalPath = vi.hoisted(() =>
  vi.fn((path: string, _locale: string, _rules: unknown): string => path)
);
const mockGetLocalizedPath = vi.hoisted(() =>
  vi.fn(
    (
      path: string,
      _locale: string,
      _rules: unknown
    ): string | { path: string; isRewritten: boolean } => path
  )
);
const mockGetRewriteRules = vi.hoisted(() =>
  vi.fn((_rewrite: unknown, _type: string): undefined => undefined)
);

const mockNextResponseActions = vi.hoisted(() => ({
  redirect: vi.fn((url: URL) => ({
    __type: 'redirect' as const,
    url: url.href,
    headers: { set: vi.fn() },
  })),
  rewrite: vi.fn((url: URL, _opts?: unknown) => ({
    __type: 'rewrite' as const,
    url: url.href,
    headers: { set: vi.fn() },
  })),
  next: vi.fn((_opts?: unknown) => ({
    __type: 'next' as const,
    headers: { set: vi.fn() },
  })),
}));

// ── Module mocks ──────────────────────────────────────────────────────────────
// NOTE: Only next/server and @intlayer/core/* are registered here as static
// top-level mocks (they do not change between describe blocks). The config
// mocks are registered dynamically inside reimportProxy() via vi.doMock so
// that each describe block gets fresh module constants (noPrefix, prefixDefault
// etc.) computed from the current mockConfig state.

vi.mock('@intlayer/core/localization', () => ({
  getCanonicalPath: mockGetCanonicalPath,
  getLocalizedPath: mockGetLocalizedPath,
  getRewriteRules: mockGetRewriteRules,
  localeDetector: vi.fn(),
}));

vi.mock('@intlayer/core/utils', () => ({
  getLocaleFromStorageServer: mockGetLocaleFromStorage,
  setLocaleInStorageServer: mockSetLocaleInStorage,
}));

vi.mock('./localeDetector', () => ({
  localeDetector: mockLocaleDetectorFn,
}));

vi.mock('next/server', () => ({
  NextResponse: mockNextResponseActions,
}));

// ── Types ─────────────────────────────────────────────────────────────────────

type MockResponse = {
  __type: 'redirect' | 'rewrite' | 'next';
  url: string;
  headers: { set: ReturnType<typeof vi.fn> };
};

type ProxyFn = (
  request: NextRequest,
  event?: NextFetchEvent,
  response?: NextResponse
) => MockResponse;

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Creates a minimal mock NextRequest for use in proxy tests.
 * Uses a real `Headers` instance so that `new Headers(request.headers)` inside
 * `rewriteUrl` works correctly in the jsdom environment.
 *
 * When `basePathPrefix` is provided it simulates Next.js's behaviour of
 * stripping the basePath from `nextUrl.pathname` while keeping the full URL
 * (origin + basePath + pathname) in `url` / `nextUrl.href`.
 *
 * @param pathname - The URL pathname WITHOUT basePath (as Next.js exposes it
 *   to middleware via `request.nextUrl.pathname`).
 * @param options - Optional hostname, search string, headers, cookies, and
 *   basePathPrefix.
 */
const makeRequest = (
  pathname: string,
  options?: {
    search?: string;
    hostname?: string;
    headers?: Record<string, string>;
    cookies?: Record<string, string>;
    /** Simulates a Next.js `basePath` (e.g. '/app'). Added to the full URL
     *  but NOT to `nextUrl.pathname`, matching Next.js middleware semantics. */
    basePathPrefix?: string;
  }
): NextRequest => {
  const hostname = options?.hostname ?? 'localhost:3000';
  const isLocalhost = hostname.startsWith('localhost');
  const origin = isLocalhost ? `http://${hostname}` : `https://${hostname}`;
  const search = options?.search ?? '';
  const basePathPrefix = options?.basePathPrefix ?? '';
  // Full URL includes basePath; nextUrl.pathname does not (Next.js strips it).
  const href = `${origin}${basePathPrefix}${pathname}${search}`;

  // Use a real Headers instance so `new Headers(request.headers)` succeeds.
  const headersInstance = new Headers(options?.headers ?? {});
  const cookieMap = new Map(Object.entries(options?.cookies ?? {}));

  return {
    url: href,
    nextUrl: {
      pathname, // basePath-stripped, as Next.js provides it
      search,
      hostname: hostname.split(':')[0],
      href, // full URL including basePath
      origin,
    },
    headers: headersInstance,
    cookies: {
      get: (name: string) => {
        const value = cookieMap.get(name);
        return value !== undefined ? { name, value } : undefined;
      },
    },
  } as unknown as NextRequest;
};

/** Extracts the pathname from a mock response URL. */
const getResponsePathname = (response: MockResponse): string =>
  new URL(response.url).pathname;

/** Extracts the search string from a mock response URL. */
const getResponseSearch = (response: MockResponse): string =>
  new URL(response.url).search;

/** Clears mock state and restores identity implementations for path helpers. */
const restorePathMocks = (): void => {
  mockGetCanonicalPath.mockImplementation((path: string) => path);
  mockGetLocalizedPath.mockImplementation((path: string) => path);
  mockGetRewriteRules.mockReturnValue(undefined);
  mockLocaleDetectorFn.mockReturnValue(undefined);
  mockGetLocaleFromStorage.mockReturnValue(undefined);
};

// ── Test suites ───────────────────────────────────────────────────────────────

describe('intlayerProxy', () => {
  let intlayerProxy: ProxyFn;

  /**
   * Re-imports intlayerProxy after clearing the module registry so that
   * module-level constants (noPrefix, prefixDefault, internalPrefix) are
   * recomputed from the current mockConfig state.
   *
   * vi.doMock is used (not the hoisted vi.mock) so that the factory is
   * re-evaluated each time with the latest mockConfig values.
   */
  const reimportProxy = async (): Promise<void> => {
    vi.resetModules();
    vi.doMock('@intlayer/config/built', () => ({
      internationalization: mockConfig.internationalization,
      routing: mockConfig.routing,
    }));
    vi.doMock('@intlayer/config/defaultValues', () => ({
      ROUTING_MODE: 'prefix-no-default',
    }));
    const mod = await import('./intlayerProxy');
    intlayerProxy = mod.intlayerProxy as unknown as ProxyFn;
  };

  // ── prefix-no-default mode ──────────────────────────────────────────────────
  // Default locale ('en') has no URL prefix; non-default locales ('/fr/', '/es/')
  // are prefixed. Visiting /en/... redirects to strip the default prefix.

  describe('prefix-no-default mode', () => {
    beforeAll(async () => {
      mockConfig.internationalization = {
        locales: ['en', 'fr', 'es'],
        defaultLocale: 'en',
      };
      mockConfig.routing = {
        basePath: '',
        mode: 'prefix-no-default',
        rewrite: undefined,
        domains: undefined,
      };
      await reimportProxy();
    });

    beforeEach(restorePathMocks);

    it('rewrites /about to /en/about internally when no stored locale', () => {
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/en/about');
    });

    it('rewrites / to /en/ internally (root path, default locale)', () => {
      const result = intlayerProxy(makeRequest('/'));
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/en/');
    });

    it('redirects /about to /fr/about when stored locale is fr', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/fr/about');
    });

    it('redirects /about to /es/about when stored locale is es', () => {
      mockGetLocaleFromStorage.mockReturnValue('es');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/es/about');
    });

    it('passes /fr/about through unchanged (URL matches internal target → next())', () => {
      // The proxy determines the internal path is also /fr/about; target === request URL → next()
      const result = intlayerProxy(makeRequest('/fr/about'));
      expect(result.__type).toBe('next');
    });

    it('passes /es/about through unchanged (URL matches internal target → next())', () => {
      const result = intlayerProxy(makeRequest('/es/about'));
      expect(result.__type).toBe('next');
    });

    it('redirects /en/about to /about (strips default locale prefix)', () => {
      const result = intlayerProxy(makeRequest('/en/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
    });

    it('redirects /en/ to / (strips default locale prefix from root)', () => {
      const result = intlayerProxy(makeRequest('/en/'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/');
    });

    it('passes /fr/ through unchanged (URL matches internal target → next())', () => {
      const result = intlayerProxy(makeRequest('/fr/'));
      expect(result.__type).toBe('next');
    });

    it('falls back to defaultLocale when detected locale is not configured', () => {
      mockLocaleDetectorFn.mockReturnValue('de'); // 'de' not in ['en','fr','es']
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/en/about');
    });

    it('treats unknown path segment as missing locale (rewrites to /en/de/about)', () => {
      // '/de/about': 'de' is not a configured locale → treated as missing prefix
      const result = intlayerProxy(makeRequest('/de/about'));
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/en/de/about');
    });

    it('preserves search params when redirecting /about?foo=bar with stored locale fr', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(
        makeRequest('/about', { search: '?foo=bar' })
      );
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/fr/about');
      expect(getResponseSearch(result)).toBe('?foo=bar');
    });

    it('passes /fr/about?page=2 through unchanged (URL with search matches → next())', () => {
      // rewriteUrl sees target === request URL so calls next()
      const result = intlayerProxy(
        makeRequest('/fr/about', { search: '?page=2' })
      );
      expect(result.__type).toBe('next');
    });

    it('preserves search params when redirecting /en/about?ref=x to /about?ref=x', () => {
      const result = intlayerProxy(
        makeRequest('/en/about', { search: '?ref=x' })
      );
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
      expect(getResponseSearch(result)).toBe('?ref=x');
    });
  });

  // ── prefix-all mode ─────────────────────────────────────────────────────────
  // All locales including the default are URL-prefixed (e.g. /en/about, /fr/about).
  // Visiting an un-prefixed path always redirects to add the locale prefix.

  describe('prefix-all mode', () => {
    beforeAll(async () => {
      mockConfig.internationalization = {
        locales: ['en', 'fr', 'es'],
        defaultLocale: 'en',
      };
      mockConfig.routing = {
        basePath: '',
        mode: 'prefix-all',
        rewrite: undefined,
        domains: undefined,
      };
      await reimportProxy();
    });

    beforeEach(restorePathMocks);

    it('redirects /about to /en/about (adds default locale prefix)', () => {
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/en/about');
    });

    it('redirects / to /en/ (adds prefix to root)', () => {
      const result = intlayerProxy(makeRequest('/'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/en/');
    });

    it('passes /en/about through unchanged (URL matches internal target → next())', () => {
      const result = intlayerProxy(makeRequest('/en/about'));
      expect(result.__type).toBe('next');
    });

    it('passes /fr/about through unchanged (URL matches internal target → next())', () => {
      const result = intlayerProxy(makeRequest('/fr/about'));
      expect(result.__type).toBe('next');
    });

    it('passes /es/about through unchanged (URL matches internal target → next())', () => {
      const result = intlayerProxy(makeRequest('/es/about'));
      expect(result.__type).toBe('next');
    });

    it('redirects /about to /fr/about when stored locale is fr', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/fr/about');
    });

    it('redirects /about to /es/about when stored locale is es', () => {
      mockGetLocaleFromStorage.mockReturnValue('es');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/es/about');
    });

    it('falls back to defaultLocale when stored locale is not configured', () => {
      mockGetLocaleFromStorage.mockReturnValue('de');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/en/about');
    });

    it('preserves search params when redirecting /about?ref=xyz', () => {
      const result = intlayerProxy(
        makeRequest('/about', { search: '?ref=xyz' })
      );
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/en/about');
      expect(getResponseSearch(result)).toBe('?ref=xyz');
    });

    it('passes /en/about?page=1 through unchanged (URL matches → next())', () => {
      const result = intlayerProxy(
        makeRequest('/en/about', { search: '?page=1' })
      );
      expect(result.__type).toBe('next');
    });
  });

  // ── no-prefix mode ──────────────────────────────────────────────────────────
  // No locale appears in the URL at all. The locale is stored only in cookies /
  // headers. Visiting a path that carries a locale prefix redirects to strip it.
  // When the target URL is the same as the request URL, next() is used instead
  // of rewrite() to avoid a redundant rewrite.

  describe('no-prefix mode', () => {
    beforeAll(async () => {
      mockConfig.internationalization = {
        locales: ['en', 'fr', 'es'],
        defaultLocale: 'en',
      };
      mockConfig.routing = {
        basePath: '',
        mode: 'no-prefix',
        rewrite: undefined,
        domains: undefined,
      };
      await reimportProxy();
    });

    beforeEach(restorePathMocks);

    it('passes /about through unchanged (same URL → next())', () => {
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('next');
    });

    it('passes / through unchanged (root, same URL → next())', () => {
      const result = intlayerProxy(makeRequest('/'));
      expect(result.__type).toBe('next');
    });

    it('passes /about through when stored locale is fr (URL unchanged → next())', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('next');
    });

    it('passes /about?page=2 through unchanged (search params, same URL → next())', () => {
      const result = intlayerProxy(
        makeRequest('/about', { search: '?page=2' })
      );
      expect(result.__type).toBe('next');
    });

    it('redirects /fr/about to /about (strips non-default locale prefix)', () => {
      const result = intlayerProxy(makeRequest('/fr/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
    });

    it('redirects /en/about to /about (strips default locale prefix)', () => {
      const result = intlayerProxy(makeRequest('/en/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
    });

    it('redirects /es/ to / (strips locale prefix from root)', () => {
      const result = intlayerProxy(makeRequest('/es/'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/');
    });

    it('preserves search params when stripping /fr/about?q=hello → /about?q=hello', () => {
      const result = intlayerProxy(
        makeRequest('/fr/about', { search: '?q=hello' })
      );
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
      expect(getResponseSearch(result)).toBe('?q=hello');
    });

    it('preserves search params when stripping /en/about?x=1 → /about?x=1', () => {
      const result = intlayerProxy(
        makeRequest('/en/about', { search: '?x=1' })
      );
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
      expect(getResponseSearch(result)).toBe('?x=1');
    });
  });

  // ── search-params mode ──────────────────────────────────────────────────────
  // Locale is communicated via ?locale= query param. URLs never carry a path
  // prefix. A missing or mismatched locale param triggers a redirect to add /
  // correct it. A matching ?locale= param results in a pass-through (next()).

  describe('search-params mode', () => {
    beforeAll(async () => {
      mockConfig.internationalization = {
        locales: ['en', 'fr', 'es'],
        defaultLocale: 'en',
      };
      mockConfig.routing = {
        basePath: '',
        mode: 'search-params',
        rewrite: undefined,
        domains: undefined,
      };
      await reimportProxy();
    });

    beforeEach(restorePathMocks);

    it('redirects /about to /about?locale=en when no locale param present', () => {
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
      expect(getResponseSearch(result)).toContain('locale=en');
    });

    it('passes /about?locale=en through unchanged (matching param → next())', () => {
      const result = intlayerProxy(
        makeRequest('/about', { search: '?locale=en' })
      );
      expect(result.__type).toBe('next');
    });

    it('redirects /about to /about?locale=fr when stored locale is fr', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponseSearch(result)).toContain('locale=fr');
    });

    it('passes /about?locale=fr through when stored locale matches (next())', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(
        makeRequest('/about', { search: '?locale=fr' })
      );
      expect(result.__type).toBe('next');
    });

    it('redirects /fr/about to /about?locale=fr (strips path prefix, adds search param)', () => {
      const result = intlayerProxy(makeRequest('/fr/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
      expect(getResponseSearch(result)).toContain('locale=fr');
    });

    it('redirects /en/about to /about?locale=en (strips default locale prefix)', () => {
      const result = intlayerProxy(makeRequest('/en/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
      expect(getResponseSearch(result)).toContain('locale=en');
    });

    it('redirects /about?locale=de to /about?locale=en (invalid locale → default)', () => {
      const result = intlayerProxy(
        makeRequest('/about', { search: '?locale=de' })
      );
      expect(result.__type).toBe('redirect');
      expect(getResponseSearch(result)).toContain('locale=en');
    });

    it('preserves other search params when adding locale (?page=2 → ?page=2&locale=en)', () => {
      const result = intlayerProxy(
        makeRequest('/about', { search: '?page=2' })
      );
      expect(result.__type).toBe('redirect');
      expect(getResponseSearch(result)).toContain('locale=en');
      expect(getResponseSearch(result)).toContain('page=2');
    });

    it('passes /about?locale=es&page=3 through when locale matches stored locale', () => {
      mockGetLocaleFromStorage.mockReturnValue('es');
      const result = intlayerProxy(
        makeRequest('/about', { search: '?locale=es&page=3' })
      );
      expect(result.__type).toBe('next');
    });
  });

  // ── domain routing ──────────────────────────────────────────────────────────
  // When routing.domains maps a locale to a hostname, visiting that locale's
  // path on the wrong domain triggers a redirect to the correct domain.
  // Visiting the domain that exclusively maps to a locale performs an internal
  // rewrite to add the locale prefix.

  describe('domain routing (prefix-no-default)', () => {
    beforeAll(async () => {
      mockConfig.internationalization = {
        locales: ['en', 'fr', 'zh'],
        defaultLocale: 'en',
      };
      mockConfig.routing = {
        basePath: '',
        mode: 'prefix-no-default',
        rewrite: undefined,
        domains: { zh: 'intlayer.zh', fr: 'https://intlayer.fr' },
      };
      await reimportProxy();
    });

    afterAll(() => {
      mockConfig.internationalization = {
        locales: ['en', 'fr', 'es'],
        defaultLocale: 'en',
      };
    });

    beforeEach(restorePathMocks);

    it('redirects intlayer.org/zh/about → https://intlayer.zh/about', () => {
      const result = intlayerProxy(
        makeRequest('/zh/about', { hostname: 'intlayer.org' })
      );
      expect(result.__type).toBe('redirect');
      expect(result.url).toContain('intlayer.zh');
      expect(getResponsePathname(result)).toBe('/about');
    });

    it('redirects intlayer.org/fr/about → https://intlayer.fr/about', () => {
      const result = intlayerProxy(
        makeRequest('/fr/about', { hostname: 'intlayer.org' })
      );
      expect(result.__type).toBe('redirect');
      expect(result.url).toContain('intlayer.fr');
      expect(getResponsePathname(result)).toBe('/about');
    });

    it('rewrites intlayer.zh/about → /zh/about internally (domain maps to zh)', () => {
      const result = intlayerProxy(
        makeRequest('/about', { hostname: 'intlayer.zh' })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/zh/about');
    });

    it('rewrites intlayer.fr/about → /fr/about internally (domain maps to fr)', () => {
      const result = intlayerProxy(
        makeRequest('/about', { hostname: 'intlayer.fr' })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/fr/about');
    });

    it('does NOT redirect when path locale matches the current domain hostname', () => {
      // intlayer.zh/zh/about: zh domain already matches zh path locale → no redirect
      const result = intlayerProxy(
        makeRequest('/zh/about', { hostname: 'intlayer.zh' })
      );
      expect(result.__type).not.toBe('redirect');
    });

    it('preserves search params in cross-domain redirect', () => {
      const result = intlayerProxy(
        makeRequest('/zh/about', {
          hostname: 'intlayer.org',
          search: '?ref=home',
        })
      );
      expect(result.__type).toBe('redirect');
      expect(getResponseSearch(result)).toBe('?ref=home');
    });

    it('rewrites intlayer.zh/ (root) → /zh/ internally', () => {
      const result = intlayerProxy(
        makeRequest('/', { hostname: 'intlayer.zh' })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/zh/');
    });
  });

  // ── basePath ──────────────────────────────────────────────────────────────
  // When routing.basePath is set, both redirect AND rewrite targets must carry
  // the basePath prefix. Rewrites previously omitted it because rewriteUrl used
  // `new URL('/locale/path', request.url)` — an absolute path that silently
  // discards the basePath. Regression tests use `basePathPrefix` in makeRequest
  // to mirror Next.js's behaviour of stripping basePath from nextUrl.pathname
  // while keeping it in the full request URL.

  describe('basePath = /app (prefix-no-default)', () => {
    beforeAll(async () => {
      mockConfig.internationalization = {
        locales: ['en', 'fr', 'es'],
        defaultLocale: 'en',
      };
      mockConfig.routing = {
        basePath: '/app',
        mode: 'prefix-no-default',
        rewrite: undefined,
        domains: undefined,
      };
      await reimportProxy();
    });

    afterAll(() => {
      mockConfig.routing = {
        basePath: '',
        mode: 'prefix-no-default',
        rewrite: undefined,
        domains: undefined,
      };
    });

    beforeEach(restorePathMocks);

    // ── Redirect tests (constructPath already included basePath) ────────────

    it('redirects /about to /app/fr/about when stored locale is fr', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/app/fr/about');
    });

    it('redirects /en/about to /app/about (strips default prefix, prepends basePath)', () => {
      const result = intlayerProxy(makeRequest('/en/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/app/about');
    });

    it('redirects /about to /app/es/about when stored locale is es', () => {
      mockGetLocaleFromStorage.mockReturnValue('es');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/app/es/about');
    });

    // ── Rewrite tests (regression for basePath-less rewrite bug) ───────────
    // Next.js strips basePath from nextUrl.pathname; makeRequest receives the
    // stripped pathname and the full URL is constructed with basePathPrefix.

    it('rewrites / to /app/en/ when visited as /app/ (basePath included in rewrite target)', () => {
      // Before fix: rewriteUrl built `new URL('/en/', 'http://host/app/')` →
      // `http://host/en/`  (basePath discarded).
      // After fix:  target becomes `http://host/app/en/`.
      const result = intlayerProxy(
        makeRequest('/', { basePathPrefix: '/app' })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/app/en/');
    });

    it('rewrites /about to /app/en/about when visited as /app/about', () => {
      const result = intlayerProxy(
        makeRequest('/about', { basePathPrefix: '/app' })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/app/en/about');
    });

    it('passes /fr/about through unchanged when visited as /app/fr/about (URL matches → next())', () => {
      const result = intlayerProxy(
        makeRequest('/fr/about', { basePathPrefix: '/app' })
      );
      expect(result.__type).toBe('next');
    });

    it('preserves search params in basePath rewrite (/app/about?q=1 → /app/en/about?q=1)', () => {
      const result = intlayerProxy(
        makeRequest('/about', { basePathPrefix: '/app', search: '?q=1' })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/app/en/about');
      expect(getResponseSearch(result)).toBe('?q=1');
    });
  });

  // ── prefetch requests ────────────────────────────────────────────────────────
  // Next.js prefetch requests must use the default locale, ignoring the stored
  // locale, to prevent spurious redirects during prefetching.

  describe('prefetch requests (prefix-no-default)', () => {
    beforeAll(async () => {
      mockConfig.internationalization = {
        locales: ['en', 'fr', 'es'],
        defaultLocale: 'en',
      };
      mockConfig.routing = {
        basePath: '',
        mode: 'prefix-no-default',
        rewrite: undefined,
        domains: undefined,
      };
      await reimportProxy();
    });

    beforeEach(restorePathMocks);

    it('uses defaultLocale for prefetch with purpose:prefetch header (ignores stored fr)', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(
        makeRequest('/about', { headers: { purpose: 'prefetch' } })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/en/about');
    });

    it('uses defaultLocale for prefetch with next-router-prefetch:1 header', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(
        makeRequest('/about', { headers: { 'next-router-prefetch': '1' } })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/en/about');
    });

    it('uses defaultLocale for prefetch with next-url header present', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(
        makeRequest('/about', { headers: { 'next-url': '/fr/about' } })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/en/about');
    });

    it('uses defaultLocale for prefetch with x-nextjs-data header', () => {
      mockGetLocaleFromStorage.mockReturnValue('es');
      const result = intlayerProxy(
        makeRequest('/about', { headers: { 'x-nextjs-data': '1' } })
      );
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/en/about');
    });

    it('passes /fr/about through in prefetch (explicit locale, URL unchanged → next())', () => {
      // /fr/about has an explicit locale prefix; prefetch detection skips the no-locale branch.
      // The proxy determines internal target === request URL → next().
      const result = intlayerProxy(
        makeRequest('/fr/about', { headers: { purpose: 'prefetch' } })
      );
      expect(result.__type).toBe('next');
    });
  });

  // ── rewrite rules ────────────────────────────────────────────────────────────
  // Localized paths (/a-propos for 'fr') are remapped via getCanonicalPath /
  // getLocalizedPath. The proxy must rewrite to the canonical internal path and
  // redirect when the user visits the canonical URL that should be localized.

  describe('rewrite rules (localized paths)', () => {
    beforeAll(async () => {
      mockConfig.internationalization = {
        locales: ['en', 'fr', 'es'],
        defaultLocale: 'en',
      };
      mockConfig.routing = {
        basePath: '',
        mode: 'prefix-no-default',
        rewrite: undefined,
        domains: undefined,
      };
      await reimportProxy();
    });

    beforeEach(() => {
      restorePathMocks();
      // /a-propos ↔ /about for locale 'fr'
      mockGetCanonicalPath.mockImplementation(
        (path: string, locale: string) => {
          if (locale === 'fr' && path === '/a-propos') return '/about';
          return path;
        }
      );
      mockGetLocalizedPath.mockImplementation(
        (path: string, locale: string) => {
          if (locale === 'fr' && path === '/about')
            return { path: '/a-propos', isRewritten: true };
          return path;
        }
      );
    });

    it('rewrites /fr/a-propos → /fr/about internally (canonical path)', () => {
      const result = intlayerProxy(makeRequest('/fr/a-propos'));
      // rawPath='/a-propos' canonical='/about'; localized('/about','fr')='/a-propos'
      // targetLocalizedPath===rawPath → no redirect; rewrite to /fr/about
      expect(result.__type).toBe('rewrite');
      expect(getResponsePathname(result)).toBe('/fr/about');
    });

    it('redirects /fr/about to /fr/a-propos (enforces localized URL)', () => {
      const result = intlayerProxy(makeRequest('/fr/about'));
      // rawPath='/about' canonical='/about'; localized('/about','fr')='/a-propos'
      // isRewritten && '/a-propos' !== '/about' → redirect
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/fr/a-propos');
    });

    it('redirects /about (stored locale fr) to /fr/a-propos (localized missing-prefix)', () => {
      mockGetLocaleFromStorage.mockReturnValue('fr');
      const result = intlayerProxy(makeRequest('/about'));
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/fr/a-propos');
    });

    it('rewrites /en/about to /en/about without localized redirect (only fr has rule)', () => {
      const result = intlayerProxy(makeRequest('/en/about'));
      // /en/about → strip default prefix → /about
      // handleDefaultLocaleRedirect → redirect to /about
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/about');
    });

    it('preserves search params when redirecting /fr/about?q=1 → /fr/a-propos?q=1', () => {
      const result = intlayerProxy(
        makeRequest('/fr/about', { search: '?q=1' })
      );
      expect(result.__type).toBe('redirect');
      expect(getResponsePathname(result)).toBe('/fr/a-propos');
      expect(getResponseSearch(result)).toBe('?q=1');
    });
  });
});
