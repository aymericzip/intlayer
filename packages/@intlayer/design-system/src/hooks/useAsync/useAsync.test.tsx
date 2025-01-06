import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useAsync } from './useAsync';
import { AsyncStateProvider } from './useAsyncStateStore';

describe('useAsync hook', () => {
  // Mock functions for success & failure
  const mockSuccessFunction = vi.fn().mockResolvedValue('mock-data');
  const mockFailureFunction = vi
    .fn()
    .mockRejectedValue(new Error('mock-error'));

  afterEach(() => {
    // Clear mock call counts between tests
    vi.clearAllMocks();
  });

  it('should have initial states (isLoading=false, data=null, etc.)', () => {
    const { result } = renderHook(
      () =>
        useAsync('testKey', mockSuccessFunction, {
          enable: false, // disabled so it won't auto-fetch
        }),
      {
        wrapper: AsyncStateProvider, // ✅ Wrap with the provider
      }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetched).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isDisabled).toBe(false);
  });

  it('should call asyncFunction on mount when autoFetch is true', async () => {
    renderHook(
      () =>
        useAsync('autoFetchKey', mockSuccessFunction, {
          autoFetch: true, // <--- autoFetch
        }),
      {
        wrapper: AsyncStateProvider, // ✅ Wrap with the provider
      }
    );

    // The mock function should be called once after mount
    expect(mockSuccessFunction).toHaveBeenCalledTimes(1);
  });

  it('should update data and states after a successful fetch', async () => {
    const { result } = renderHook(
      () =>
        useAsync('successKey', mockSuccessFunction, {
          autoFetch: true,
        }),
      {
        wrapper: AsyncStateProvider, // ✅ Wrap with the provider
      }
    );

    // Wait for the async function to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetched).toBe(true);
      expect(result.current.data).toBe('mock-data');
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.error).toBeNull();
    });
  });

  it('should manually fetch data via revalidate', async () => {
    const { result } = renderHook(
      () => useAsync('revalidateKey', mockSuccessFunction),
      {
        wrapper: AsyncStateProvider, // ✅ Wrap with the provider
      }
    );

    // By default, autoFetch is false, so the function
    // should not be called yet
    expect(mockSuccessFunction).not.toHaveBeenCalled();

    // Now manually fetch data
    await act(async () => {
      await result.current.revalidate();
    });

    expect(mockSuccessFunction).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe('mock-data');
  });

  it('should set error state correctly after a failed fetch', async () => {
    const { result } = renderHook(
      () =>
        useAsync('failureKey', mockFailureFunction, {
          autoFetch: true,
        }),
      {
        wrapper: AsyncStateProvider, // ✅ Wrap with the provider
      }
    );

    // Wait for the async function to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetched).toBe(true);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBe('mock-error');
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.errorCount).toBe(1);
    });
  });

  it('should respect retryLimit and retryTime for failed fetch', async () => {
    const mockFailureWithDelay = vi
      .fn()
      .mockRejectedValue(new Error('retry-error'));

    const { result } = renderHook(
      () =>
        useAsync('retryKey', mockFailureWithDelay, {
          autoFetch: true,
          retryLimit: 2,
          retryTime: 100, // For faster test runs
        }),
      {
        wrapper: AsyncStateProvider, // ✅ Wrap with the provider
      }
    );

    // Wait for first attempt to fail
    await waitFor(() => {
      expect(result.current.errorCount).toBeGreaterThan(0);
    });

    // Wait for the second attempt (because retryLimit=2)
    await waitFor(() => {
      expect(mockFailureWithDelay).toHaveBeenCalledTimes(2);
      // Eventually the second attempt fails again
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.data).toBeNull();
    });
  });

  it('should revalidate data after revalidateTime if revalidation is enabled', async () => {
    vi.useFakeTimers(); // Mock timers

    renderHook(
      () =>
        useAsync('revalKey', mockSuccessFunction, {
          autoFetch: true,
          revalidation: true,
          revalidateTime: 2000,
        }),
      {
        wrapper: AsyncStateProvider,
      }
    );

    // Ensure the initial fetch happens inside act
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    // Advance the timers by 6 seconds (more than 2s revalidateTime)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    // Expect the hook to have re-fetched
    expect(mockSuccessFunction).toHaveBeenCalledTimes(2);

    // Advance the timers by 6 seconds (more than 2s revalidateTime)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    // Expect the hook to have re-fetched
    expect(mockSuccessFunction).toHaveBeenCalledTimes(3);

    // Cleanup timers
    vi.useRealTimers();
  }, 10000);

  describe('useAsync hook - failures & retries', () => {
    const mockFailureFunction = vi
      .fn()
      .mockRejectedValue(new Error('mock-error'));

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return error when the fetch function fails', async () => {
      const { result } = renderHook(
        () =>
          useAsync('failureTestKey', mockFailureFunction, {
            autoFetch: true,
            retryLimit: 0, // no retries
          }),
        {
          wrapper: AsyncStateProvider,
        }
      );

      // Wait for the async function to reject
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isFetched).toBe(true);
        expect(result.current.isSuccess).toBe(false);
        expect(result.current.error).toBe('mock-error');
      });

      // Ensure the function was called exactly once
      expect(mockFailureFunction).toHaveBeenCalledTimes(1);
    });
  });
});
