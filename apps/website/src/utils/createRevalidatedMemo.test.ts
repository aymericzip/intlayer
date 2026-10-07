import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRevalidatedMemo } from './createRevalidatedMemo';

const REVALIDATION_INTERVAL_MS = 1000;

describe('createRevalidatedMemo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('serves the memoized value until the interval elapses', async () => {
    const fetchValue = vi.fn(async () => 'value');
    const getValue = createRevalidatedMemo(
      fetchValue,
      REVALIDATION_INTERVAL_MS
    );

    expect(await getValue()).toBe('value');
    expect(await getValue()).toBe('value');
    expect(fetchValue).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(REVALIDATION_INTERVAL_MS);

    await getValue();
    expect(fetchValue).toHaveBeenCalledTimes(2);
  });

  it('shares one upstream call between concurrent callers', async () => {
    const fetchValue = vi.fn(async () => 42);
    const getValue = createRevalidatedMemo(
      fetchValue,
      REVALIDATION_INTERVAL_MS
    );

    const results = await Promise.all([getValue(), getValue(), getValue()]);

    expect(results).toEqual([42, 42, 42]);
    expect(fetchValue).toHaveBeenCalledTimes(1);
  });

  it('retries on the next call after a failed fetch', async () => {
    const fetchValue = vi
      .fn<() => Promise<string | null>>()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce('recovered');
    const getValue = createRevalidatedMemo(
      fetchValue,
      REVALIDATION_INTERVAL_MS
    );

    expect(await getValue()).toBeNull();
    expect(await getValue()).toBe('recovered');
    expect(fetchValue).toHaveBeenCalledTimes(2);
  });
});
