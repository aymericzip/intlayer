import type { IncomingMessage, ServerResponse } from 'node:http';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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

    expect(res.writeHead).toHaveBeenCalledWith(301, { Location: '/' });
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

    expect(res.writeHead).toHaveBeenCalledWith(301, { Location: '/about' });
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

    expect(res.writeHead).toHaveBeenCalledWith(301, { Location: '/fr/' });
    expect(mockSetLocaleInStorage).not.toHaveBeenCalled();
    expect(res.__headers['Set-Cookie']).toBeUndefined();
  });
});
