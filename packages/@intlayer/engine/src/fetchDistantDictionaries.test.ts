import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchDistantDictionaries } from './fetchDistantDictionaries';
import type { DictionariesStatus } from './loadDictionaries';

type PendingRequest = {
  batchKeys: string[];
  resolve: () => void;
  reject: (error: Error) => void;
};

/** Requests received by the mocked endpoint, in call order. */
let pendingRequests: PendingRequest[] = [];

/** Number of requests currently awaiting a response. */
let inFlightRequests = 0;

/** Highest number of requests observed in flight at the same time. */
let maxInFlightRequests = 0;

/** Keys whose request must reject once before succeeding. */
let keysFailingOnce = new Set<string>();

const getDictionariesByKeys = vi.fn(async (batchKeys: string[]) => {
  inFlightRequests++;
  maxInFlightRequests = Math.max(maxInFlightRequests, inFlightRequests);

  const shouldFailOnce = batchKeys.some((batchKey) =>
    keysFailingOnce.has(batchKey)
  );

  return await new Promise<{ data: { key: string }[] }>((resolve, reject) => {
    const settle = () => {
      inFlightRequests--;

      if (shouldFailOnce) {
        for (const batchKey of batchKeys) keysFailingOnce.delete(batchKey);
        reject(new Error('network error'));
        return;
      }

      resolve({ data: batchKeys.map((batchKey) => ({ key: batchKey })) });
    };

    pendingRequests.push({
      batchKeys,
      resolve: settle,
      reject: (error: Error) => {
        inFlightRequests--;
        reject(error);
      },
    });
  });
});

vi.mock('@intlayer/api', () => ({
  createIntlayerCMS: () => ({}),
}));

const getDictionary = vi.fn(async (dictionaryKey: string) => ({
  data: { key: dictionaryKey },
}));

vi.mock('@intlayer/api/dictionary', () => ({
  dictionaryEndpoint: () => ({
    getDictionariesByKeys: (batchKeys: string[]) =>
      getDictionariesByKeys(batchKeys),
    getDictionary: (dictionaryKey: string) => getDictionary(dictionaryKey),
  }),
}));

/** Builds an error shaped like the one thrown by the API fetcher. */
const buildHttpError = (status: number): Error =>
  Object.assign(new Error(`HTTP ${status}`), { status });

vi.mock('@intlayer/config/node', () => ({
  getConfiguration: () => ({}),
}));

vi.mock('@intlayer/config/logger', () => ({
  getAppLogger: () => () => undefined,
  x: 'x',
}));

/**
 * Keeps resolving the requests reaching the mocked endpoint - including the
 * ones started as slots free up - until the whole fetch settles.
 */
const drainPendingRequests = async (
  fetchPromise: Promise<unknown>
): Promise<void> => {
  let isSettled = false;

  fetchPromise.finally(() => {
    isSettled = true;
  });

  while (!isSettled) {
    const requests = pendingRequests;
    pendingRequests = [];

    for (const request of requests) request.resolve();

    await new Promise((resolve) => setTimeout(resolve, 0));
  }
};

const buildKeys = (count: number): string[] =>
  Array.from({ length: count }, (_, index) => `key-${index}`);

describe('fetchDistantDictionaries', () => {
  beforeEach(() => {
    pendingRequests = [];
    inFlightRequests = 0;
    maxInFlightRequests = 0;
    keysFailingOnce = new Set();
    // `mockReset` restores the implementation passed to `vi.fn`, so a test
    // overriding it does not leak into the next one.
    getDictionariesByKeys.mockReset();
    getDictionary.mockReset();
  });

  it('groups keys into batches of 3 and keeps 5 requests in flight', async () => {
    const fetchPromise = fetchDistantDictionaries({
      dictionaryKeys: buildKeys(30),
      retryDelay: 0,
    });

    await vi.waitFor(() => expect(pendingRequests.length).toBe(5));

    expect(inFlightRequests).toBe(5);
    for (const request of pendingRequests) {
      expect(request.batchKeys).toHaveLength(3);
    }

    await drainPendingRequests(fetchPromise);

    const dictionaries = await fetchPromise;

    // 30 keys / 3 per request = 10 requests, never more than 5 at a time.
    expect(getDictionariesByKeys).toHaveBeenCalledTimes(10);
    expect(maxInFlightRequests).toBe(5);
    expect(dictionaries.map((dictionary) => dictionary.key)).toEqual(
      buildKeys(30)
    );
  });

  it('starts the next request as soon as a slot frees, without waiting for the whole wave', async () => {
    const fetchPromise = fetchDistantDictionaries({
      dictionaryKeys: buildKeys(18),
      retryDelay: 0,
    });

    // 18 keys → 6 batches, 5 of which start immediately.
    await vi.waitFor(() =>
      expect(getDictionariesByKeys).toHaveBeenCalledTimes(5)
    );

    // Release a single request while the four others stay pending.
    const [slowRequest, ...fastRequests] = pendingRequests;
    pendingRequests = [slowRequest];
    for (const request of fastRequests) request.resolve();

    // The freed slot is refilled right away, so the 6th batch starts even
    // though the first request has not settled yet.
    await vi.waitFor(() =>
      expect(getDictionariesByKeys).toHaveBeenCalledTimes(6)
    );

    await drainPendingRequests(fetchPromise);

    const dictionaries = await fetchPromise;

    expect(dictionaries).toHaveLength(18);
  });

  it('retries a failing request before reporting its keys as errors', async () => {
    keysFailingOnce = new Set(['key-0']);

    const statuses: DictionariesStatus[] = [];

    const fetchPromise = fetchDistantDictionaries(
      { dictionaryKeys: buildKeys(6), retryDelay: 0 },
      (status) => statuses.push(...status)
    );

    await drainPendingRequests(fetchPromise);

    const dictionaries = await fetchPromise;

    // 2 batches + 1 retry of the failing one.
    expect(getDictionariesByKeys).toHaveBeenCalledTimes(3);
    expect(dictionaries).toHaveLength(6);
    expect(statuses.some((status) => status.status === 'error')).toBe(false);
  });

  it('reports every key of a batch as errored once the retries are exhausted', async () => {
    keysFailingOnce = new Set();

    getDictionariesByKeys.mockImplementationOnce(async () => {
      throw new Error('network error');
    });
    getDictionariesByKeys.mockImplementationOnce(async () => {
      throw new Error('network error');
    });
    getDictionariesByKeys.mockImplementationOnce(async () => {
      throw new Error('network error');
    });

    const statuses: DictionariesStatus[] = [];

    const dictionaries = await fetchDistantDictionaries(
      { dictionaryKeys: buildKeys(3), retryDelay: 0, maxRetry: 2 },
      (status) => statuses.push(...status)
    );

    expect(getDictionariesByKeys).toHaveBeenCalledTimes(3);
    expect(dictionaries).toEqual([]);
    expect(
      statuses
        .filter((status) => status.status === 'error')
        .map((status) => status.dictionaryKey)
    ).toEqual(buildKeys(3));
  });

  it('requests a duplicated key only once', async () => {
    const fetchPromise = fetchDistantDictionaries({
      dictionaryKeys: ['key-0', 'key-1', 'key-0'],
      retryDelay: 0,
    });

    await drainPendingRequests(fetchPromise);
    await fetchPromise;

    expect(getDictionariesByKeys).toHaveBeenCalledTimes(1);
    expect(getDictionariesByKeys).toHaveBeenCalledWith(['key-0', 'key-1']);
  });

  it('falls back to one request per key against a backend without the batch endpoint', async () => {
    // A backend that predates the batch endpoint routes `/by-keys` to its
    // `/:dictionaryKey` handler, which answers 404.
    getDictionariesByKeys.mockImplementation(async () => {
      throw buildHttpError(404);
    });

    const statuses: DictionariesStatus[] = [];

    const dictionaries = await fetchDistantDictionaries(
      { dictionaryKeys: buildKeys(30), retryDelay: 0 },
      (status) => statuses.push(...status)
    );

    // 30 keys → 10 batches. Only the 5 batches already in flight can waste an
    // attempt on the missing endpoint; the flag spares the 5 that follow.
    expect(getDictionariesByKeys.mock.calls.length).toBeLessThanOrEqual(5);

    // Every key is still retrieved, one request at a time.
    expect(getDictionary).toHaveBeenCalledTimes(30);
    expect(dictionaries.map((dictionary) => dictionary.key)).toEqual(
      buildKeys(30)
    );
    expect(statuses.some((status) => status.status === 'error')).toBe(false);
  });

  it('does not retry an error another attempt cannot fix', async () => {
    getDictionariesByKeys.mockImplementation(async () => {
      throw buildHttpError(401);
    });

    const statuses: DictionariesStatus[] = [];

    const dictionaries = await fetchDistantDictionaries(
      { dictionaryKeys: buildKeys(3), retryDelay: 0 },
      (status) => statuses.push(...status)
    );

    // A 401 is deterministic: one attempt, no retry.
    expect(getDictionariesByKeys).toHaveBeenCalledTimes(1);
    expect(getDictionary).not.toHaveBeenCalled();
    expect(dictionaries).toEqual([]);
    expect(
      statuses
        .filter((status) => status.status === 'error')
        .map((status) => status.dictionaryKey)
    ).toEqual(buildKeys(3));
  });

  it('retries a server error, which another attempt may fix', async () => {
    getDictionariesByKeys.mockImplementation(async () => {
      throw buildHttpError(503);
    });

    await fetchDistantDictionaries({
      dictionaryKeys: buildKeys(3),
      retryDelay: 0,
      maxRetry: 2,
    });

    expect(getDictionariesByKeys).toHaveBeenCalledTimes(3);
  });

  it('sends no request when there is no key to fetch', async () => {
    const dictionaries = await fetchDistantDictionaries({
      dictionaryKeys: [],
    });

    expect(getDictionariesByKeys).not.toHaveBeenCalled();
    expect(dictionaries).toEqual([]);
  });
});
