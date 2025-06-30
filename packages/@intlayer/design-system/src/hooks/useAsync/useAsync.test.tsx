import { act, renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useAsync } from './useAsync';
import { AsyncStateProvider } from './useAsyncStateStore';

// -----------------------------------------------------------------------------
// Test utilities
// -----------------------------------------------------------------------------
/**
 * Wrap test hooks with the AsyncStateProvider so that they have access to the
 * shared async state context used internally by `useAsync`.
 */
const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AsyncStateProvider>{children}</AsyncStateProvider>
);

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe('useAsync', () => {
  it('fetches data automatically when "autoFetch" is enabled', async () => {
    const asyncFn = vi.fn().mockResolvedValue('hello');

    const { result } = renderHook(
      () => useAsync('fetchHello', asyncFn, { autoFetch: true }),
      { wrapper }
    );

    // Wait until the async call starts (isLoading === true)
    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    // Wait until the promise resolves and state is updated
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBe('hello');
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  it('executes the async function manually when "autoFetch" is disabled', async () => {
    const asyncFn = vi.fn().mockResolvedValue('world');

    const { result } = renderHook(() => useAsync('fetchWorld', asyncFn), {
      wrapper,
    });

    // Initially, data has not been fetched
    expect(result.current.isFetched).toBe(false);

    // Trigger the fetch manually using the function exposed under the provided key
    await act(async () => {
      // @ts-ignore – dynamic property returned by the hook
      await result.current['fetchWorld']();
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toBe('world');
  });

  it('sets the error state when the async function rejects', async () => {
    const asyncFn = vi.fn().mockRejectedValue(new Error('Boom'));

    const { result } = renderHook(
      () =>
        useAsync('failingRequest', asyncFn, {
          autoFetch: true,
          retryLimit: 0, // disable automatic retries to keep the test deterministic
        }),
      { wrapper }
    );

    // Wait until the hook registers the error
    await waitFor(() => {
      expect(result.current.error).toBe('Boom');
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.errorCount).toBe(1);
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });
});
