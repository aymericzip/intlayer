import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPublicTokenManager } from './publicToken';

const BACKEND_URL = 'https://back.intlayer.org';
const CLIENT_ID = 'public_client_id';

/** Resolves once the pending microtasks of the exchange have settled. */
const flushMicrotasks = () =>
  new Promise<void>((resolve) => setTimeout(resolve));

const mockExchange = (data: unknown, ok = true) =>
  vi.fn().mockResolvedValue({ ok, json: async () => ({ data }) });

describe('createPublicTokenManager', () => {
  beforeEach(() => {
    window.sessionStorage?.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('exposes no token before the exchange resolves', () => {
    vi.stubGlobal('fetch', mockExchange({ token: 'tok', expiresIn: 3600 }));

    const manager = createPublicTokenManager({
      backendURL: BACKEND_URL,
      clientId: CLIENT_ID,
    });
    manager.prime();

    // Synchronous by contract: the flush-on-hide path cannot await.
    expect(manager.getToken()).toBeUndefined();
  });

  it('exchanges the public client id for a token', async () => {
    const fetchMock = mockExchange({ token: 'tok', expiresIn: 3600 });
    vi.stubGlobal('fetch', fetchMock);

    const manager = createPublicTokenManager({
      backendURL: BACKEND_URL,
      clientId: CLIENT_ID,
    });
    manager.prime();
    await flushMicrotasks();

    expect(manager.getToken()).toBe('tok');

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe(`${BACKEND_URL}/api/public/token`);
    expect(init.credentials).toBe('omit');
    expect(JSON.parse(init.body)).toEqual({ clientId: CLIENT_ID });
  });

  it('de-duplicates concurrent and repeated priming', async () => {
    const fetchMock = mockExchange({ token: 'tok', expiresIn: 3600 });
    vi.stubGlobal('fetch', fetchMock);

    const manager = createPublicTokenManager({
      backendURL: BACKEND_URL,
      clientId: CLIENT_ID,
    });
    manager.prime();
    manager.prime();
    await flushMicrotasks();
    manager.prime();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('reuses a token cached by an earlier page of the same tab', async () => {
    const fetchMock = mockExchange({ token: 'tok', expiresIn: 3600 });
    vi.stubGlobal('fetch', fetchMock);

    const first = createPublicTokenManager({
      backendURL: BACKEND_URL,
      clientId: CLIENT_ID,
    });
    first.prime();
    await flushMicrotasks();

    // A fresh manager stands in for the next navigation in the same tab.
    const second = createPublicTokenManager({
      backendURL: BACKEND_URL,
      clientId: CLIENT_ID,
    });

    expect(second.getToken()).toBe('tok');
    second.prime();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('treats a token near its expiry as unusable', async () => {
    // Shorter than the one-minute refresh margin.
    vi.stubGlobal('fetch', mockExchange({ token: 'tok', expiresIn: 10 }));

    const manager = createPublicTokenManager({
      backendURL: BACKEND_URL,
      clientId: CLIENT_ID,
    });
    manager.prime();
    await flushMicrotasks();

    expect(manager.getToken()).toBeUndefined();
  });

  it('stays silent when the backend issues no token', async () => {
    vi.stubGlobal('fetch', mockExchange({ token: null, expiresIn: 0 }));

    const manager = createPublicTokenManager({
      backendURL: BACKEND_URL,
      clientId: CLIENT_ID,
    });
    manager.prime();
    await flushMicrotasks();

    expect(manager.getToken()).toBeUndefined();
  });

  it('swallows a failing exchange', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    const manager = createPublicTokenManager({
      backendURL: BACKEND_URL,
      clientId: CLIENT_ID,
    });

    expect(() => manager.prime()).not.toThrow();
    await flushMicrotasks();
    expect(manager.getToken()).toBeUndefined();
  });

  it('never exchanges without a public client id', () => {
    const fetchMock = mockExchange({ token: 'tok', expiresIn: 3600 });
    vi.stubGlobal('fetch', fetchMock);

    createPublicTokenManager({ backendURL: BACKEND_URL }).prime();

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
