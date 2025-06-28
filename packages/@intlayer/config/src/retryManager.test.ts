import { describe, expect, it, vi } from 'vitest';
import { retryManager } from './retryManager';

describe('retryManager', () => {
  it('should retry until the wrapped function succeeds', async () => {
    const fn = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('first fail'))
      .mockResolvedValueOnce('success');

    const wrapped = retryManager(fn, { delay: 0 });

    const result = await wrapped();

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2); // 1 failure + 1 success
  });

  it('should throw after exceeding the maximum number of retries', async () => {
    const fn = vi
      .fn<() => Promise<void>>()
      .mockRejectedValue(new Error('always fail'));

    const onError = vi.fn();
    const maxRetry = 2;

    const wrapped = retryManager(fn, { maxRetry, delay: 0, onError });

    await expect(wrapped()).rejects.toThrow('always fail');

    // Attempt count = maxRetry + 1 (first attempt + retries)
    expect(fn).toHaveBeenCalledTimes(maxRetry + 1);
    expect(onError).toHaveBeenCalledTimes(maxRetry + 1);
  });
});
