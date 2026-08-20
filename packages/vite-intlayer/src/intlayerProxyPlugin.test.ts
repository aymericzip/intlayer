import type { IncomingMessage, ServerResponse } from 'node:http';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// ── Hoisted mock state ────────────────────────────────────────────────────────

const mockConfig = vi.hoisted(() => ({
  internationalization: {
    locales: ['en', 'fr', 'es'] as string[],
    defaultLocale: 'en' as string,
  },
  routing: {
    basePath: '',
    mode: 'prefix-no-default' as string,
    rewrite: undefined as undefined,
    domains: undefined as Record<string, string> | undefined,
    // Unset by default, which resolves to the proxy's auto mode.
    enableProxy: undefined as boolean | undefined,
  },
}));

const mockGetLocaleFromStorage = vi.hoisted(() =>
  vi.fn((_opts: unknown): string | undefined => undefined)
);
// Simulates cookie storage: invokes the setCookieStore callback so the proxy's
// inline Set-Cookie serialization is actually exercised.
const mockSetLocaleInStorage = vi.hoisted(() =>
  vi.fn(
    (
      locale: string,
      options?: {
        setCookieStore?: (
          name: string,
          value: string,
          attributes: Record<string, unknown>
        ) => void;
      }
    ) => {
      options?.setCookieStore?.('INTLAYER_LOCALE', locale, {
        path: '/',
        sameSite: 'lax',
      });
    }
  )
);
const mockLocaleDetector = vi.hoisted(() =>
  vi.fn((_headers: unknown, _locales: unknown, def: string): string => def)
);
const mockGetCanonicalPath = vi.hoisted(() =>
  vi.fn((path: string): string => path)
);
const mockResolveLocalizedPath = vi.hoisted(() =>
  vi.fn((path: string) => ({ path, isRewritten: false }))
);
const mockGetRewriteRules = vi.hoisted(() => vi.fn((): unknown => undefined));

// ── Module mocks ──────────────────────────────────────────────────────────────

vi.mock('@intlayer/config/node', () => ({
  getConfiguration: () => mockConfig,
}));
vi.mock('@intlayer/config/defaultValues', () => ({
  ROUTING_MODE: 'prefix-no-default',
}));
vi.mock('@intlayer/config/colors', () => ({}));
vi.mock('@intlayer/config/logger', () => ({
  colorize: (s: string) => s,
  getAppLogger: () => () => undefined,
}));
vi.mock('./dedupePlugin', () => ({
  createPrimaryInstanceGuard: () => ({
    resolve: vi.fn(),
    setPlugin: vi.fn(),
    isPrimary: true,
  }),
}));
// The pure helpers below mirror the real implementations in
// @intlayer/core/src/localization (rewriteUtils.ts / domainUtils.ts).
// Loading the actual module via importOriginal is not possible here: its
// import chain pulls in the full @intlayer/config loader (esbuild), which
// breaks in the jsdom test environment.
vi.mock('@intlayer/core/localization', () => {
  const getDomainHostname = (domain: string): string => {
    try {
      return /^https?:\/\//.test(domain) ? new URL(domain).hostname : domain;
    } catch {
      return domain;
    }
  };

  return {
    getCanonicalPath: mockGetCanonicalPath,
    resolveLocalizedPath: mockResolveLocalizedPath,
    getRewriteRules: mockGetRewriteRules,
    localeDetector: mockLocaleDetector,
    getInternalPath: (canonicalPath: string, locale: string): string => {
      const pathWithLeadingSlash = canonicalPath.startsWith('/')
        ? canonicalPath
        : `/${canonicalPath}`;
      if (
        pathWithLeadingSlash.startsWith(`/${locale}/`) ||
        pathWithLeadingSlash === `/${locale}`
      ) {
        return pathWithLeadingSlash;
      }
      return `/${locale}${pathWithLeadingSlash === '/' ? '' : pathWithLeadingSlash}`;
    },
    getDomainHostname,
    getDomainOrigin: (domain: string): string =>
      /^https?:\/\//.test(domain) ? domain : `https://${domain}`,
    getLocaleFromDomain: (
      hostname: string,
      domains?: Record<string, string>
    ): string | undefined => {
      if (!domains) return undefined;
      const matchingLocales = Object.entries(domains).filter(
        ([, domain]) =>
          typeof domain === 'string' && getDomainHostname(domain) === hostname
      );
      return matchingLocales.length === 1 ? matchingLocales[0]?.[0] : undefined;
    },
    resolveProxyMode: (enableProxy?: boolean): string => {
      const environmentValue = process.env.INTLAYER_ROUTING_ENABLE_PROXY;
      if (environmentValue === 'false') return 'disabled';
      if (environmentValue === 'true') return 'forced';
      if (enableProxy === false) return 'disabled';
      if (enableProxy === true) return 'forced';
      return 'auto';
    },
    isProxyStorageLocaleEnabled: (
      proxyMode: string,
      isDevServer: boolean
    ): boolean => !(proxyMode === 'auto' && isDevServer),
    formatProxyEnabledMessage: (isStorageLocaleSuppressed: boolean): string =>
      isStorageLocaleSuppressed
        ? 'Intlayer proxy enabled - storage redirection disabled for dev purpose'
        : 'Intlayer proxy enabled',
  };
});
vi.mock('@intlayer/core/utils', () => ({
  getCookie: vi.fn(() => undefined),
  getLocaleFromStorageServer: mockGetLocaleFromStorage,
  setLocaleInStorageServer: mockSetLocaleInStorage,
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

type MockResponse = ServerResponse<IncomingMessage> & {
  writeHead: ReturnType<typeof vi.fn>;
  setHeader: ReturnType<typeof vi.fn>;
  getHeader: ReturnType<typeof vi.fn>;
  end: ReturnType<typeof vi.fn>;
  __headers: Record<string, string | string[]>;
};

const makeReq = (
  url: string,
  headers: Record<string, string> = {}
): IncomingMessage => ({ url, headers }) as unknown as IncomingMessage;

const makeRes = (): MockResponse => {
  const stored: Record<string, string | string[]> = {};
  return {
    __headers: stored,
    writeHead: vi.fn(),
    end: vi.fn(),
    setHeader: vi.fn((name: string, value: string | string[]) => {
      stored[name] = value;
    }),
    getHeader: vi.fn((name: string) => stored[name]),
  } as unknown as MockResponse;
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('createIntlayerProxyHandler (prefix-no-default)', () => {
  let handler: (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: () => void
  ) => void;

  beforeEach(async () => {
    vi.resetModules();
    mockGetLocaleFromStorage.mockReturnValue(undefined);
    mockLocaleDetector.mockImplementation((_h, _l, def: string) => def);
    const mod = await import('./intlayerProxyPlugin');
    handler = mod.createIntlayerProxyHandler();
  });

  it('persists the default locale when stripping the prefix (/en/ → /) despite Accept-Language fr', () => {
    // Regression: without persisting, the follow-up GET / re-runs
    // Accept-Language detection and can override the explicit /en with a
    // browser-preferred locale (e.g. /fr).
    const req = makeReq('/en/', { 'accept-language': 'fr-FR,fr;q=0.9' });
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/' });
    expect(mockSetLocaleInStorage).toHaveBeenCalledWith(
      'en',
      expect.anything()
    );
    // The inline Set-Cookie serialization runs and emits the locale cookie.
    const setCookie = res.__headers['Set-Cookie'];
    expect(String(setCookie)).toContain('INTLAYER_LOCALE=en');
  });

  it('rewrites the bare locale root /fr internally without a trailing slash (no redirect loop)', () => {
    // Regression: /fr was rewritten to /fr/ (trailing slash), making the
    // framework issue a trailing-slash normalisation redirect back to /fr,
    // which the proxy rewrote to /fr/ again — an infinite redirect loop
    // ("redirect count exceeded" during TanStack Start prerender).
    const next = vi.fn();
    const req = makeReq('/fr');
    const res = makeRes();
    handler(req, res, next);

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(req.url).toBe('/fr');
    expect(next).toHaveBeenCalled();
  });

  it('rewrites the root path / internally to /en without a trailing slash', () => {
    // Same regression as above for the default locale: an internal rewrite of
    // / to /en/ triggers the framework's trailing-slash normalisation redirect.
    const next = vi.fn();
    const req = makeReq('/');
    const res = makeRes();
    handler(req, res, next);

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(req.url).toBe('/');
    expect(next).toHaveBeenCalled();
  });

  it('persists the default locale when stripping /en/about → /about', () => {
    const req = makeReq('/en/about');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/about' });
    expect(mockSetLocaleInStorage).toHaveBeenCalledWith(
      'en',
      expect.anything()
    );
  });

  it('does NOT persist locale on a detector-driven redirect (/ → /fr avoids sticky detection)', () => {
    // No stored locale + Accept-Language fr → detector resolves fr and redirects
    // to /fr (never /fr/ — a trailing slash would loop with the framework's
    // trailing-slash normalisation). This must NOT write a cookie, or the
    // first detected locale would become permanently sticky.
    mockLocaleDetector.mockReturnValue('fr');
    const req = makeReq('/', { 'accept-language': 'fr-FR,fr;q=0.9' });
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/fr' });
    expect(mockSetLocaleInStorage).not.toHaveBeenCalled();
    expect(res.__headers['Set-Cookie']).toBeUndefined();
  });

  it('redirects /friends to /fr/friends when the detector resolves fr (no locale-prefix false positive)', () => {
    // Regression: `'/friends'.startsWith('/fr')` made constructPath treat the
    // path as already prefixed, redirecting /friends → /friends and returning
    // a 500 through the loop detector.
    mockLocaleDetector.mockReturnValue('fr');
    const req = makeReq('/friends', { 'accept-language': 'fr-FR,fr;q=0.9' });
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, {
      Location: '/fr/friends',
    });
  });

  it('scopes redirect-loop detection per client', () => {
    // Regression: the loop counter was keyed only by URL pair, so 11 different
    // visitors hitting the same legitimate redirect within the TTL received 500s.
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    mockLocaleDetector.mockReturnValue('fr');

    // 11 redirects for the same URL pair from DIFFERENT clients: all succeed.
    for (let clientIndex = 0; clientIndex <= 10; clientIndex++) {
      const res = makeRes();
      handler(
        makeReq('/', { 'x-forwarded-for': `10.0.0.${clientIndex}` }),
        res,
        vi.fn()
      );
      expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/fr' });
    }

    // 11 redirects from the SAME client within the TTL: the loop detector trips.
    let lastRes = makeRes();
    for (let attempt = 0; attempt <= 10; attempt++) {
      lastRes = makeRes();
      handler(
        makeReq('/', { 'x-forwarded-for': '10.0.0.99' }),
        lastRes,
        vi.fn()
      );
    }
    expect(lastRes.writeHead).toHaveBeenCalledWith(500, {
      'Content-Type': 'text/plain',
    });
  });
});

describe('createIntlayerProxyHandler (routing.enableProxy modes)', () => {
  type ProxyHandler = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: () => void
  ) => void;

  /**
   * Builds a handler for one point of the {mode} × {dev, prod} matrix, with a
   * stored `fr` locale and an `en`-preferring Accept-Language so the two
   * locale sources can be told apart by the resulting redirect.
   */
  const createHandler = async ({
    enableProxy,
    isDevServer,
  }: {
    enableProxy?: boolean;
    isDevServer: boolean;
  }): Promise<ProxyHandler> => {
    vi.resetModules();
    mockConfig.routing.enableProxy = enableProxy;
    mockGetLocaleFromStorage.mockReturnValue('fr');
    mockLocaleDetector.mockImplementation((_h, _l, def: string) => def);
    const mod = await import('./intlayerProxyPlugin');
    return mod.createIntlayerProxyHandler({ isDevServer });
  };

  afterEach(() => {
    mockConfig.routing.enableProxy = undefined;
    mockGetLocaleFromStorage.mockReturnValue(undefined);
  });

  it('auto mode on a dev server ignores the stored locale on /', async () => {
    // The whole point of auto mode: a lingering INTLAYER_LOCALE=fr cookie must
    // not keep dragging every unprefixed navigation to /fr while developing.
    const handler = await createHandler({
      enableProxy: undefined,
      isDevServer: true,
    });
    const req = makeReq('/');
    const res = makeRes();
    const next = vi.fn();
    handler(req, res, next);

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(req.url).toBe('/');
    expect(next).toHaveBeenCalled();
  });

  it('auto mode on a dev server still honours Accept-Language on /', async () => {
    // Only the storage read is suppressed — header detection stays active, so
    // a French browser is still redirected.
    const handler = await createHandler({
      enableProxy: undefined,
      isDevServer: true,
    });
    // Set after createHandler: the helper resets the detector to its
    // default-locale implementation.
    mockLocaleDetector.mockReturnValue('fr');
    const req = makeReq('/', { 'accept-language': 'fr-FR,fr;q=0.9' });
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/fr' });
  });

  it('auto mode on a dev server still strips /en → / and persists the locale', async () => {
    // Regression guard: suppressing the storage read must not disable prefix
    // normalisation or the Set-Cookie that carries the locale across it.
    const handler = await createHandler({
      enableProxy: undefined,
      isDevServer: true,
    });
    const req = makeReq('/en');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/' });
    expect(String(res.__headers['Set-Cookie'])).toContain('INTLAYER_LOCALE=en');
  });

  it('auto mode outside a dev server honours the stored locale on /', async () => {
    // Production behaves exactly like `enableProxy: true`.
    const handler = await createHandler({
      enableProxy: undefined,
      isDevServer: false,
    });
    const req = makeReq('/');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/fr' });
  });

  it('defaults to production behaviour when isDevServer is omitted', async () => {
    // `createIntlayerProxyHandler()` is mounted directly in production Nitro
    // servers, so the flag must default to false.
    vi.resetModules();
    mockConfig.routing.enableProxy = undefined;
    mockGetLocaleFromStorage.mockReturnValue('fr');
    const mod = await import('./intlayerProxyPlugin');
    const handler = mod.createIntlayerProxyHandler();
    const res = makeRes();
    handler(makeReq('/'), res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/fr' });
  });

  it('forced mode honours the stored locale even on a dev server', async () => {
    const handler = await createHandler({
      enableProxy: true,
      isDevServer: true,
    });
    const req = makeReq('/');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/fr' });
  });
});

describe('createIntlayerProxyHandler (prerendering)', () => {
  type ProxyHandler = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: () => void
  ) => void;

  /**
   * Builds a production handler (the one a Nitro build mounts) with a stored
   * `fr` locale, so any leak of the build machine's storage into a prerendered
   * page shows up as an /fr redirect.
   */
  const createProductionHandler = async (): Promise<ProxyHandler> => {
    vi.resetModules();
    mockGetLocaleFromStorage.mockReturnValue('fr');
    mockLocaleDetector.mockImplementation((_h, _l, def: string) => def);
    const mod = await import('./intlayerProxyPlugin');
    return mod.createIntlayerProxyHandler();
  };

  afterEach(() => {
    mockGetLocaleFromStorage.mockReturnValue(undefined);
    delete process.env.TSS_PRERENDERING;
  });

  it('ignores the stored locale on a Nitro prerender request', async () => {
    // Without this, the locale cookie of whoever/whatever ran the build would
    // decide which locale gets baked into the static page for `/`.
    const handler = await createProductionHandler();
    const req = makeReq('/', { 'x-nitro-prerender': '/' });
    const res = makeRes();
    const next = vi.fn();
    handler(req, res, next);

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(req.url).toBe('/');
    expect(next).toHaveBeenCalled();
  });

  it('ignores the stored locale while TanStack Start prerenders', async () => {
    // TanStack Start flags the whole build process instead of tagging each
    // request, since its prerenderer talks to a Vite preview server.
    process.env.TSS_PRERENDERING = 'true';
    const handler = await createProductionHandler();
    const req = makeReq('/');
    const res = makeRes();
    const next = vi.fn();
    handler(req, res, next);

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('does not persist the locale on a prerendered redirect (/en → /)', async () => {
    // Structural redirects still apply — only the Set-Cookie must not be, since
    // the prerendered response is replayed to every visitor. The stored `fr`
    // locale must not divert the redirect to /fr either.
    const handler = await createProductionHandler();
    const req = makeReq('/en', { 'x-nitro-prerender': '/en' });
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/' });
    expect(res.__headers['Set-Cookie']).toBeUndefined();
  });

  it('still strips /en → / while TanStack Start prerenders, without a cookie', async () => {
    // Same guarantee on the TanStack path, which flags the process instead of
    // tagging each request: the prefix-stripping redirect is URL-driven and
    // must survive, the locale persistence attached to it must not.
    process.env.TSS_PRERENDERING = 'true';
    const handler = await createProductionHandler();
    const req = makeReq('/en/about');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/about' });
    expect(res.__headers['Set-Cookie']).toBeUndefined();
    expect(mockSetLocaleInStorage).not.toHaveBeenCalled();
  });

  it('still honours the stored locale for a regular request', async () => {
    // Guard: the prerender bypass must not leak into normal traffic.
    const handler = await createProductionHandler();
    const req = makeReq('/');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/fr' });
  });
});

describe('intlayerProxy (preview server registration)', () => {
  /** Minimal Vite preview server stub exposing the middleware stack. */
  const makePreviewServer = () => ({
    middlewares: { use: vi.fn() },
  });

  it('does not add a preview middleware when Nitro serves the preview', async () => {
    // The built Nitro server already runs this proxy as a Nitro middleware, so
    // registering it here too would resolve the locale twice per request.
    vi.resetModules();
    const mod = await import('./intlayerProxyPlugin');
    const plugin = mod.intlayerProxy();
    plugin.configResolved?.({
      plugins: [{ name: 'nitro:preview' }, { name: plugin.name }],
    } as never);

    const server = makePreviewServer();
    (plugin.configurePreviewServer as (previewServer: unknown) => void)(server);

    expect(server.middlewares.use).not.toHaveBeenCalled();
  });

  it('adds a preview middleware for a plain (Nitro-less) preview server', async () => {
    vi.resetModules();
    const mod = await import('./intlayerProxyPlugin');
    const plugin = mod.intlayerProxy();
    plugin.configResolved?.({ plugins: [{ name: plugin.name }] } as never);

    const server = makePreviewServer();
    (plugin.configurePreviewServer as (previewServer: unknown) => void)(server);

    expect(server.middlewares.use).toHaveBeenCalledTimes(1);
  });
});

describe('createIntlayerProxyHandler (search-params)', () => {
  let handler: (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: () => void
  ) => void;

  beforeEach(async () => {
    vi.resetModules();
    mockConfig.routing.mode = 'search-params';
    mockGetLocaleFromStorage.mockReturnValue(undefined);
    mockLocaleDetector.mockImplementation((_h, _l, def: string) => def);
    const mod = await import('./intlayerProxyPlugin');
    handler = mod.createIntlayerProxyHandler();
  });

  afterEach(() => {
    mockConfig.routing.mode = 'prefix-no-default';
  });

  it('sanitizes protocol-relative redirect targets to same-origin (open-redirect guard)', () => {
    // Regression: `//evil.com/x` was echoed verbatim into the Location header,
    // which browsers interpret as a cross-origin protocol-relative URL.
    const req = makeReq('//evil.com/x');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, {
      Location: '/x?locale=en',
    });
  });

  it('redirects /about to /about?locale=en with a temporary (302) status', () => {
    const req = makeReq('/about');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, {
      Location: '/about?locale=en',
    });
  });
});

describe('createIntlayerProxyHandler (no-prefix)', () => {
  let handler: (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: () => void
  ) => void;

  beforeEach(async () => {
    vi.resetModules();
    mockConfig.routing.mode = 'no-prefix';
    mockGetLocaleFromStorage.mockReturnValue(undefined);
    mockLocaleDetector.mockImplementation((_h, _l, def: string) => def);
    const mod = await import('./intlayerProxyPlugin');
    handler = mod.createIntlayerProxyHandler();
  });

  afterEach(() => {
    mockConfig.routing.mode = 'prefix-no-default';
  });

  it('persists the stripped locale when redirecting /fr/about → /about', () => {
    // Regression: stripping the prefix drops the only locale signal from the
    // URL, so the locale must be persisted or the follow-up request would fall
    // back to cookie / Accept-Language detection.
    const req = makeReq('/fr/about');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/about' });
    expect(mockSetLocaleInStorage).toHaveBeenCalledWith(
      'fr',
      expect.anything()
    );
    expect(String(res.__headers['Set-Cookie'])).toContain('INTLAYER_LOCALE=fr');
  });
});

describe('createIntlayerProxyHandler (rewrite rules)', () => {
  // Mirrors `routing.rewrite: { '/contact': { en: '/contact', fr: '/contactez-nous' } }`
  // as normalised by `getRewriteRules(..., 'url')`.
  const rules = {
    rules: [
      {
        canonical: '/contact',
        localized: { en: '/contact', fr: '/contactez-nous', es: '/contacto' },
      },
    ],
  };

  /** Localized path → canonical, restricted to the given locale like the real helper. */
  const canonicalPath = (path: string, locale?: string): string => {
    for (const rule of rules.rules) {
      const locales = locale ? [locale] : Object.keys(rule.localized);
      for (const candidate of locales) {
        const localized =
          rule.localized[candidate as keyof typeof rule.localized];
        if (localized === path) return rule.canonical;
      }
    }
    return path;
  };

  let handler: (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: () => void
  ) => void;

  const loadHandler = async () => {
    vi.resetModules();
    const mod = await import('./intlayerProxyPlugin');
    handler = mod.createIntlayerProxyHandler();
  };

  beforeEach(async () => {
    mockConfig.internationalization.locales = ['en', 'fr', 'es'];
    mockConfig.internationalization.defaultLocale = 'en';
    mockGetLocaleFromStorage.mockReturnValue(undefined);
    mockGetRewriteRules.mockReturnValue(rules);
    mockGetCanonicalPath.mockImplementation(canonicalPath as never);
    mockResolveLocalizedPath.mockImplementation(((
      path: string,
      locale: string
    ) => {
      const rule = rules.rules.find((entry) => entry.canonical === path);
      const localized = rule?.localized[locale as keyof typeof rule.localized];
      return {
        path: localized ?? path,
        isRewritten: Boolean(localized) && localized !== path,
      };
    }) as never);
    await loadHandler();
  });

  afterEach(() => {
    mockGetRewriteRules.mockReturnValue(undefined);
    mockGetCanonicalPath.mockImplementation((path: string) => path);
    mockResolveLocalizedPath.mockImplementation((path: string) => ({
      path,
      isRewritten: false,
    }));
    mockLocaleDetector.mockImplementation((_h, _l, def: string) => def);
    mockConfig.routing.mode = 'prefix-no-default';
  });

  it('serves a default-locale pretty URL despite a conflicting Accept-Language', async () => {
    // Regression: /contacto was canonicalised against the *detected* locale
    // only. With Accept-Language: es and 'en' as default… the reverse case:
    // a Spanish-preferring visitor hitting the default locale's own pretty URL.
    mockConfig.internationalization.defaultLocale = 'fr';
    await loadHandler();
    mockLocaleDetector.mockReturnValue('en');

    const next = vi.fn();
    const req = makeReq('/contactez-nous', { 'accept-language': 'en-US,en' });
    const res = makeRes();
    handler(req, res, next);

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(req.url).toBe('/contact');
    expect(next).toHaveBeenCalled();
  });

  it('redirects a non-default pretty URL to its own locale, not the detected one', () => {
    // Regression: with Accept-Language: en, /contactez-nous matched no English
    // rule, so the proxy treated it as unlocalized and redirected to
    // /en/contactez-nous — a URL no locale owns, hence a 404.
    mockLocaleDetector.mockReturnValue('en');

    const req = makeReq('/contactez-nous', { 'accept-language': 'en-US,en' });
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, {
      Location: '/fr/contactez-nous',
    });
  });

  it('lets a stored locale lose against the locale the path declares', () => {
    mockGetLocaleFromStorage.mockReturnValue('es');

    const req = makeReq('/contactez-nous');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, {
      Location: '/fr/contactez-nous',
    });
  });

  it('leaves the default locale unprefixed canonical path alone', () => {
    // /contact is both the canonical path and the English localized path, so
    // it carries no locale signal and must not hijack locale resolution.
    mockLocaleDetector.mockReturnValue('en');

    const next = vi.fn();
    const req = makeReq('/contact');
    const res = makeRes();
    handler(req, res, next);

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(req.url).toBe('/contact');
    expect(next).toHaveBeenCalled();
  });

  it('redirects a prefixed canonical URL to the locale pretty URL', () => {
    // Regression: /fr/contact was served as-is in French. The canonical path
    // carries no rewrite rule for `fr`, so the URL must move to the one the
    // locale owns — the same one getLocalizedUrl emits.
    const next = vi.fn();
    const req = makeReq('/fr/contact');
    const res = makeRes();
    handler(req, res, next);

    expect(res.writeHead).toHaveBeenCalledWith(302, {
      Location: '/fr/contactez-nous',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('preserves search params when redirecting a prefixed canonical URL', () => {
    const req = makeReq('/fr/contact?ref=nav');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, {
      Location: '/fr/contactez-nous?ref=nav',
    });
  });

  it('serves a prefixed pretty URL without redirecting', () => {
    const next = vi.fn();
    const req = makeReq('/fr/contactez-nous');
    const res = makeRes();
    handler(req, res, next);

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(req.url).toBe('/fr/contactez-nous');
    expect(next).toHaveBeenCalled();
  });

  it('leaves a prefixed path with no rewrite rule alone', () => {
    const next = vi.fn();
    const req = makeReq('/fr/pricing');
    const res = makeRes();
    handler(req, res, next);

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(req.url).toBe('/fr/pricing');
    expect(next).toHaveBeenCalled();
  });

  it('strips the default locale prefix in one hop instead of redirecting twice', () => {
    // /en/contact → /contact directly: the English rule maps the canonical path
    // to itself, so no pretty-URL redirect may be inserted before the strip.
    const req = makeReq('/en/contact');
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(
      302,
      expect.objectContaining({ Location: '/contact' })
    );
  });

  it('resolves the locale from the pretty path in no-prefix mode', async () => {
    mockConfig.routing.mode = 'no-prefix';
    await loadHandler();
    mockLocaleDetector.mockReturnValue('en');

    const next = vi.fn();
    const req = makeReq('/contactez-nous', { 'accept-language': 'en-US,en' });
    const res = makeRes();
    handler(req, res, next);

    expect(req.url).toBe('/fr/contact');
    expect(next).toHaveBeenCalled();
  });
});
