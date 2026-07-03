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
const mockGetLocalizedPath = vi.hoisted(() =>
  vi.fn((path: string): string => path)
);

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
vi.mock('@intlayer/core/localization', () => ({
  getCanonicalPath: mockGetCanonicalPath,
  getLocalizedPath: mockGetLocalizedPath,
  getRewriteRules: vi.fn(() => undefined),
  localeDetector: mockLocaleDetector,
}));
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

  it('does NOT persist locale on a detector-driven redirect (/ → /fr/ avoids sticky detection)', () => {
    // No stored locale + Accept-Language fr → detector resolves fr and redirects
    // to /fr/. This must NOT write a cookie, or the first detected locale would
    // become permanently sticky.
    mockLocaleDetector.mockReturnValue('fr');
    const req = makeReq('/', { 'accept-language': 'fr-FR,fr;q=0.9' });
    const res = makeRes();
    handler(req, res, vi.fn());

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/fr/' });
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
      expect(res.writeHead).toHaveBeenCalledWith(302, { Location: '/fr/' });
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
