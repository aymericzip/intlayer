import type { IntlayerConfig } from '@intlayer/types/config';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { dictionaryEndpoint } from '../getIntlayerAPI/dictionary';
import { createAuthManager } from './createAuthManager';
import { createIntlayerCMS } from './createIntlayerCMS';

const BACKEND_URL = 'https://back.test.intlayer.org';

const config = {
  editor: {
    backendURL: BACKEND_URL,
    clientId: 'client-id',
    clientSecret: 'client-secret',
  },
} as unknown as Pick<IntlayerConfig, 'editor'>;

/**
 * Builds a `fetch` mock that answers the OAuth2 token endpoint with a fresh
 * token and echoes a JSON `{ data }` payload for every other request, exposing
 * the captured calls for assertions.
 */
const createFetchMock = (accessToken = 'access-token') => {
  const calls: { url: string; init?: RequestInit }[] = [];

  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    calls.push({ url, init });

    const isTokenEndpoint = url.includes('/oauth2/token');

    return {
      ok: true,
      json: async () =>
        isTokenEndpoint
          ? {
              data: {
                accessToken,
                accessTokenExpiresAt: new Date(
                  Date.now() + 60 * 60 * 1000
                ).toISOString(),
              },
            }
          : { data: [] },
    };
  });

  return { fetchMock, calls };
};

const getAuthorizationHeader = (init?: RequestInit): string | undefined =>
  (init?.headers as Record<string, string> | undefined)?.Authorization;

describe('createIntlayerCMS', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('fetches an access token, then injects it on dictionary reads', async () => {
    const { fetchMock, calls } = createFetchMock();
    vi.stubGlobal('fetch', fetchMock);

    const cms = createIntlayerCMS(config);
    await dictionaryEndpoint(cms).getDictionaries();

    const tokenCall = calls.find((call) => call.url.includes('/oauth2/token'));
    const dictionaryCall = calls.find((call) =>
      call.url.includes('/api/dictionary')
    );

    expect(tokenCall).toBeDefined();
    expect(dictionaryCall).toBeDefined();
    expect(getAuthorizationHeader(dictionaryCall?.init)).toBe(
      'Bearer access-token'
    );
  });

  it('reuses the cached token across multiple calls', async () => {
    const { fetchMock, calls } = createFetchMock();
    vi.stubGlobal('fetch', fetchMock);

    const cms = createIntlayerCMS(config);
    const dictionary = dictionaryEndpoint(cms);
    await dictionary.getDictionaries();
    await dictionary.pushDictionaries([]);

    const tokenCalls = calls.filter((call) =>
      call.url.includes('/oauth2/token')
    );

    expect(tokenCalls).toHaveLength(1);
  });

  it('skips authentication entirely when no credentials are available', async () => {
    const { fetchMock, calls } = createFetchMock();
    vi.stubGlobal('fetch', fetchMock);

    const cms = createIntlayerCMS({ editor: { backendURL: BACKEND_URL } });
    await dictionaryEndpoint(cms).getDictionaries();

    const tokenCall = calls.find((call) => call.url.includes('/oauth2/token'));
    const dictionaryCall = calls.find((call) =>
      call.url.includes('/api/dictionary')
    );

    expect(tokenCall).toBeUndefined();
    expect(dictionaryCall).toBeDefined();
    expect(getAuthorizationHeader(dictionaryCall?.init)).toBeUndefined();
  });

  it('uses a session token directly without an OAuth2 exchange', async () => {
    const { fetchMock, calls } = createFetchMock();
    vi.stubGlobal('fetch', fetchMock);

    const cms = createIntlayerCMS(config, {
      sessionToken: 'clisession_abc',
    });
    await dictionaryEndpoint(cms).getDictionaries();

    const tokenCall = calls.find((call) => call.url.includes('/oauth2/token'));
    const dictionaryCall = calls.find((call) =>
      call.url.includes('/api/dictionary')
    );

    expect(tokenCall).toBeUndefined();
    expect(getAuthorizationHeader(dictionaryCall?.init)).toBe(
      'Bearer clisession_abc'
    );
  });
});

describe('createAuthManager', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('exposes withAuth to authenticate a single bound method', async () => {
    const { fetchMock, calls } = createFetchMock('single-token');
    vi.stubGlobal('fetch', fetchMock);

    const authManager = createAuthManager(config);

    const protectedMethod = authManager.withAuth(async () => {
      // Read the header at call time, after the manager applied the token.
      return getAuthorizationHeader(authManager.fetcherOptions);
    });

    const header = await protectedMethod();

    expect(header).toBe('Bearer single-token');
    expect(calls.some((call) => call.url.includes('/oauth2/token'))).toBe(true);
  });
});
