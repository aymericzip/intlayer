import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPublicClient } from './createPublicClient';

const BACKEND_URL = 'https://back.intlayer.org';
const CLIENT_ID = 'public_client_id';

const config = {
  editor: { backendURL: BACKEND_URL, clientId: CLIENT_ID },
} as never;

/** Queues one JSON response per call, in order. */
const mockFetch = (...payloads: { ok?: boolean; data: unknown }[]) => {
  const fetchMock = vi.fn();

  for (const { ok = true, data } of payloads) {
    fetchMock.mockResolvedValueOnce({ ok, json: async () => ({ data }) });
  }

  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

describe('createPublicClient', () => {
  beforeEach(() => {
    globalThis.sessionStorage?.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('exchanges the public client id before its first read', async () => {
    const fetchMock = mockFetch(
      { data: { token: 'tok', expiresIn: 3600 } },
      { data: ['navbar', 'footer'] }
    );

    const keys = await createPublicClient({
      intlayerConfig: config,
    }).getDictionaryKeys();

    expect(keys).toEqual(['navbar', 'footer']);

    const [tokenUrl, tokenInit] = fetchMock.mock.calls[0]!;
    expect(tokenUrl).toBe(`${BACKEND_URL}/api/public/token`);
    expect(JSON.parse(tokenInit.body)).toEqual({ clientId: CLIENT_ID });
    // Authorised by Origin, never by cookies.
    expect(tokenInit.credentials).toBe('omit');

    const [readUrl, readInit] = fetchMock.mock.calls[1]!;
    expect(readUrl).toBe(`${BACKEND_URL}/api/public/dictionaries/keys`);
    expect(readInit.headers.Authorization).toBe('Bearer tok');
  });

  it('reuses one token across reads', async () => {
    const fetchMock = mockFetch(
      { data: { token: 'tok', expiresIn: 3600 } },
      { data: [] },
      { data: [] }
    );

    const client = createPublicClient({ intlayerConfig: config });
    await client.getDictionaryKeys();
    await client.getDictionaries(['navbar']);

    const tokenCalls = fetchMock.mock.calls.filter(([url]) =>
      String(url).endsWith('/api/public/token')
    );
    expect(tokenCalls).toHaveLength(1);
  });

  it('encodes the requested keys', async () => {
    const fetchMock = mockFetch(
      { data: { token: 'tok', expiresIn: 3600 } },
      { data: [] }
    );

    await createPublicClient({ intlayerConfig: config }).getDictionaries([
      'navbar',
      'footer',
    ]);

    expect(fetchMock.mock.calls[1]![0]).toBe(
      `${BACKEND_URL}/api/public/dictionaries?keys=navbar%2Cfooter`
    );
  });

  it('returns an empty result when no token is issued', async () => {
    const fetchMock = mockFetch({ data: { token: null, expiresIn: 0 } });

    const client = createPublicClient({ intlayerConfig: config });

    expect(await client.getDictionaryKeys()).toEqual([]);
    // The read is never attempted without a token.
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('never exchanges without a public client id', async () => {
    const fetchMock = mockFetch({ data: { token: 'tok', expiresIn: 3600 } });

    const client = createPublicClient({
      intlayerConfig: { editor: { backendURL: BACKEND_URL } } as never,
    });

    expect(await client.getToken()).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
