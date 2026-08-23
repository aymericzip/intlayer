import { beforeEach, describe, expect, it, vi } from 'vitest';

const getServerContextMock = vi.fn();
const getLocaleMock = vi.fn();

vi.mock('react-intlayer/server', () => ({
  getServerContext: (...args: unknown[]) => getServerContextMock(...args),
  IntlayerServer: {},
}));

vi.mock('./getLocale', () => ({
  getLocale: (...args: unknown[]) => getLocaleMock(...args),
}));

// The suspending reader needs a memoizing `React.cache` to hold its
// request-scoped store; the React client build used by vitest ships a
// passthrough, which would mint a fresh store on every call.
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  const cache = <T>(fn: () => T): (() => T) => {
    let called = false;
    let value: T;
    return () => {
      if (!called) {
        called = true;
        value = fn();
      }
      return value;
    };
  };
  return { ...actual, cache, default: { ...actual, cache } };
});

import { getFallbackLocale, resolveFallbackLocale } from './ambientLocale';

/**
 * Simulates React's suspense loop: calls the reader, awaits any thrown
 * promise, and retries until it returns.
 */
const renderWithSuspense = async <T>(render: () => T): Promise<T> => {
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      return render();
    } catch (thrown) {
      if (thrown instanceof Promise) {
        await thrown;
        continue;
      }
      throw thrown;
    }
  }
  throw new Error('did not settle');
};

/**
 * The contract of the ambient locale chain: request storage
 * (`headers()`/`cookies()`, which opt the route into dynamic rendering) must
 * only be read when the server context and the call-site locale both miss —
 * and the synchronous reader must suspend by throwing its own promise, never
 * through `React.use`, so its conditional rungs cannot shift the positional
 * `use()` state of later hooks.
 *
 * Ordering note: the reader store is module-scoped in this mocked setup, so
 * the "storage is not read" cases run before any test that lets storage
 * resolve.
 */
describe('resolveFallbackLocale', () => {
  beforeEach(() => {
    getServerContextMock.mockReset();
    getLocaleMock.mockReset();
  });

  it('reports no fallback when the server context carries the locale', () => {
    getServerContextMock.mockReturnValue('fr');

    expect(resolveFallbackLocale()).toBeUndefined();
    expect(getLocaleMock).not.toHaveBeenCalled();
  });

  it('skips request storage when the call site passes a locale', () => {
    getServerContextMock.mockReturnValue(undefined);

    expect(resolveFallbackLocale('en')).toBeUndefined();
    expect(getLocaleMock).not.toHaveBeenCalled();
  });

  it('skips request storage when a selector carries an explicit locale', () => {
    getServerContextMock.mockReturnValue(undefined);

    expect(resolveFallbackLocale({ locale: 'en', item: 'a' })).toBeUndefined();
    expect(getLocaleMock).not.toHaveBeenCalled();
  });

  it('suspends on a context miss and resolves from request storage', async () => {
    getServerContextMock.mockReturnValue(undefined);
    getLocaleMock.mockResolvedValue('es');

    await expect(
      renderWithSuspense(() => resolveFallbackLocale())
    ).resolves.toBe('es');
    expect(getLocaleMock).toHaveBeenCalledTimes(1);
  });

  it('serves later context misses from the request-scoped store', () => {
    getServerContextMock.mockReturnValue(undefined);

    // The store settled in the previous test; no further suspension and no
    // further storage read.
    expect(resolveFallbackLocale()).toBe('es');
    expect(resolveFallbackLocale({ item: 'a' })).toBe('es');
    expect(getLocaleMock).not.toHaveBeenCalled();
  });
});

describe('getFallbackLocale', () => {
  beforeEach(() => {
    getServerContextMock.mockReset();
    getLocaleMock.mockReset();
  });

  it('applies the same rungs without suspending', async () => {
    getServerContextMock.mockReturnValue(undefined);
    getLocaleMock.mockResolvedValue('es');

    await expect(getFallbackLocale()).resolves.toBe('es');

    getServerContextMock.mockReturnValue('fr');
    await expect(getFallbackLocale()).resolves.toBeUndefined();
    await expect(getFallbackLocale('en')).resolves.toBeUndefined();
    expect(getLocaleMock).toHaveBeenCalledTimes(1);
  });
});
