import { beforeEach, describe, expect, it, vi } from 'vitest';

// React's `cache()` is request-scoped in Next.js; for a unit test we stub it
// with a process-level singleton so `set`/`get` share the same holder.
vi.mock('react', () => {
  let holder: unknown;
  let initialised = false;
  return {
    cache:
      <T>(factory: () => T) =>
      (): T => {
        if (!initialised) {
          holder = factory();
          initialised = true;
        }
        return holder as T;
      },
  };
});

const { getLocaleIntlayer } = vi.hoisted(() => ({
  getLocaleIntlayer: vi.fn(),
}));
vi.mock('next-intlayer/server', () => ({
  getLocale: getLocaleIntlayer,
}));

import { getLocale } from './getLocale';
import {
  getCachedRequestLocale,
  setCachedRequestLocale,
} from './requestLocaleCache';
import { setRequestLocale } from './setRequestLocale';

describe('next-intl per-request locale', () => {
  beforeEach(() => {
    // Reset the request locale between tests.
    setCachedRequestLocale(undefined as never);
    getLocaleIntlayer.mockReset();
  });

  it('stores the locale forwarded through setRequestLocale', () => {
    setRequestLocale('zh' as never);
    expect(getCachedRequestLocale()).toBe('zh');
  });

  it('getLocale prefers the locale set for the request (the [locale] segment)', async () => {
    getLocaleIntlayer.mockResolvedValue('en');
    setRequestLocale('zh' as never);

    await expect(getLocale()).resolves.toBe('zh');
    expect(getLocaleIntlayer).not.toHaveBeenCalled();
  });

  it('getLocale falls back to intlayer storage resolution when unset', async () => {
    getLocaleIntlayer.mockResolvedValue('en');

    await expect(getLocale()).resolves.toBe('en');
    expect(getLocaleIntlayer).toHaveBeenCalledTimes(1);
  });
});
