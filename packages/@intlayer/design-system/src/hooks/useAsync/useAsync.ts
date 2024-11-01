'use client';

// This is an ESLint directive to disable specific rules.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useRef } from 'react';
import { useAsyncStateStore } from './useAsyncStateStore';

// Defines the base structure for the result of the custom hook.
type UseAsyncResultBase<T extends (...args: any[]) => Promise<any>> = {
  isFetched: boolean;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  data: Awaited<ReturnType<T>> | null;
  retryCount: number;
  isDisabled: boolean;
  revalidate: T;
  setData: (data: Awaited<ReturnType<T> | null>) => void;
};

// Options type for the hook, allowing customization of behavior.
type UseAsyncOptions<T extends (...args: any[]) => Promise<any>> = {
  retryLimit?: number;
  revalidateTime?: number; // Time in milliseconds for revalidating the data
  cache?: boolean;
  onSuccess?: (data: Awaited<ReturnType<T>>) => void;
  onError?: (error: string) => void;
  autoFetch?: boolean;
};

// Default values for the hook's options
const DEFAULT_CACHE_ENABLED = false;
const DEFAULT_AUTO_FETCH = false;
const DEFAULT_RETRY_LIMIT = 1;
const DEFAULT_REVALIDATE_TIME = 5 * 60 * 1000; // 5 minutes

// The main hook type that includes the async function along with its additional properties.
export type UseAsyncResult<
  U extends string,
  T extends (...args: any[]) => Promise<any>,
> = UseAsyncResultBase<T> & Record<U, T>;

/**
 * A custom React hook that manages asynchronous operations, providing easy-to-use states and controls over fetching, caching, and retry mechanisms.
 * This hook abstracts away the complexity of handling loading, error, and success states for any asynchronous function.
 *
 * @template U - A string type that extends the keys of the async function, used as a key to store and retrieve state.
 * @template T - A function type that must return a Promise, representing the asynchronous operation to be managed.
 *
 * @param {U} key - A unique identifier for the async operation, used to handle state internally and avoid conflicts.
 * @param {T} asyncFunction - The asynchronous function that will be managed by this hook. This function should return a Promise.
 * @param {UseAsyncOptions<T>} [options] - Optional configuration options to customize the behavior of the hook.
 * @returns {UseAsyncResult<U, T>} The states and controls related to the managed async function. Includes states like isLoading, isSuccess, and provides control methods like revalidate and setData.
 *
 * @typedef {Object} UseAsyncOptions
 * @property {number} [retryLimit=1] - The number of times the hook should retry the asynchronous function on failure before giving up.
 * @property {number} [revalidateTime=300000] - Time in milliseconds after which the cached data is considered stale and the async function is re-invoked, if caching is enabled.
 * @property {boolean} [cache=false] - Whether to cache the result of the async function. When enabled, revalidation is controlled by `revalidateTime`.
 * @property {(data: Awaited<ReturnType<T>>) => void} [onSuccess] - Callback function that is called when the asynchronous function resolves successfully.
 * @property {(error: string) => void} [onError] - Callback function that is called when the asynchronous function rejects or encounters an error.
 * @property {boolean} [autoFetch=false] - Whether the hook should automatically invoke the asynchronous function on mount.
 *
 * @example
 * // Example of using useAsync to manage fetching user data from an API.
 * const fetchUserData = async (userId) => {
 *   const response = await fetch(`/api/users/${userId}`);
 *   if (!response.ok) throw new Error('Failed to fetch');
 *   return await response.json();
 * };
 *
 * const UserDetails = ({ userId }) => {
 *   const {
 *     isLoading,
 *     data,
 *     error,
 *     revalidate,
 *   } = useAsync('userDetails', fetchUserData, {
 *     cache: true,
 *     revalidateTime: 60000, // 1 minute
 *     autoFetch: true,
 *     onSuccess: (data) => console.log('User data fetched successfully:', data),
 *     onError: (error) => console.error('Error fetching user data:', error),
 *   });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   return (
 *     <div>
 *       <h1>{data.name}</h1>
 *       <button onClick={() => revalidate()}>Refresh</button>
 *     </div>
 *   );
 * };
 */
export const useAsync = <
  U extends string,
  T extends (...args: any[]) => Promise<any>,
>(
  key: U,
  asyncFunction: T,
  options?: UseAsyncOptions<T>
): UseAsyncResult<U, T> => {
  // Using a custom hook to manage state specific to asynchronous operations
  const {
    setIsFetched,
    setIsLoading,
    setError,
    setIsSuccess,
    setData,
    incrementRetryCount,
    resetRetryCount,
  } = useAsyncStateStore((state) => ({
    setIsFetched: state.setIsFetched,
    setIsLoading: state.setIsLoading,
    setError: state.setError,
    setIsSuccess: state.setIsSuccess,
    setData: state.setData,
    incrementRetryCount: state.incrementRetryCount,
    resetRetryCount: state.resetRetryCount,
  }));

  // Storing the last arguments used to call the async function
  const storedArgsRef = useRef<any[]>([]);

  // Apply different key for different requests
  const keyWithArgs = storedArgsRef.current.length
    ? `${key}/${JSON.stringify(storedArgsRef.current)}`
    : key;

  // Retrieving the current state of async operations using the same custom hook
  const {
    isFetched,
    fetchedDateTime,
    isLoading,
    error,
    isSuccess,
    data,
    retryCount,
    isDisabled,
  } = useAsyncStateStore((state) => state.getStates(keyWithArgs));

  // Resolving optional parameters with default values
  const retryLimit = options?.retryLimit ?? DEFAULT_RETRY_LIMIT;
  const autoFetch = options?.autoFetch ?? DEFAULT_AUTO_FETCH;
  const revalidateTime = options?.revalidateTime ?? DEFAULT_REVALIDATE_TIME;
  const cacheEnabled = options?.cache ?? DEFAULT_CACHE_ENABLED;
  const onSuccess = options?.onSuccess ?? (() => {});
  const onError = options?.onError ?? (() => {});

  // The core fetching function, designed to be called directly or automatically based on configuration
  const fetch: T = useCallback<T>(
    (async (...args) => {
      storedArgsRef.current = args;
      setIsLoading(keyWithArgs, true);
      let response = null;

      await asyncFunction(...args)
        .then((result) => {
          response = result;
          setData(keyWithArgs, result);
          setIsSuccess(keyWithArgs, true);
          incrementRetryCount(keyWithArgs);
          onSuccess(result);
        })
        .catch((error) => {
          const errorMessage = error.message ?? 'An error occurred';

          setError(keyWithArgs, errorMessage);
          resetRetryCount(keyWithArgs);
          onError(errorMessage);
        })
        .finally(() => {
          setIsLoading(keyWithArgs, false);
          setIsFetched(keyWithArgs, true);
        });
      return response;
    }) as T,
    [asyncFunction, keyWithArgs]
  );

  // Wrapped execution function to handle disabled state and check for success before re-fetching
  const execute: T = useCallback<T>(
    (async (...args) => {
      if (isDisabled) return;
      if (isSuccess && data) return data;
      return fetch(...args);
    }) as T,
    [fetch, isDisabled, isSuccess, data]
  );

  // Function to revalidate the data when necessary
  const revalidate: T = useCallback<T>(
    (async (...args) => {
      if (isDisabled) return;

      return fetch(...args);
    }) as T,
    [fetch, isDisabled]
  );

  // Handle retry based on conditions set in options
  useEffect(() => {
    const isRetryEnabled = retryCount > 0 && retryLimit > 0;
    const isRetryLimitReached = retryCount >= retryLimit;
    if (!isRetryEnabled || isRetryLimitReached || isSuccess) return;
    const interval = setInterval(() => {
      if (isRetryEnabled && !isRetryLimitReached && !isSuccess) {
        execute(...storedArgsRef.current);
      }
    }, revalidateTime);
    return () => clearInterval(interval);
  }, [execute, retryCount, retryLimit, revalidateTime, isSuccess]);

  // Handle periodic revalidation if caching is enabled
  useEffect(() => {
    if (!cacheEnabled || revalidateTime <= 0 || !isSuccess || !fetchedDateTime)
      return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const lastFetchedTime = new Date(fetchedDateTime).getTime();
      const shouldRevalidate = now - lastFetchedTime >= revalidateTime;
      if (shouldRevalidate) {
        execute(...storedArgsRef.current);
      }
    }, revalidateTime);
    return () => clearInterval(interval);
  }, [cacheEnabled, revalidateTime, execute, isSuccess, fetchedDateTime]);

  // Auto-fetch data on hook mount if autoFetch is true
  useEffect(() => {
    if (autoFetch && !isFetched) {
      execute(...storedArgsRef.current);
    }
  }, [autoFetch, execute, isFetched]);

  // Memoization of the setData function to prevent unnecessary re-renders
  const setDataMemo = useCallback(
    (data: Awaited<ReturnType<T> | null>) => {
      setData(keyWithArgs, data);
    },
    [setData]
  );

  // Return the hook's result, including all state and control functions
  return {
    isFetched,
    isLoading,
    error,
    isSuccess,
    data,
    retryCount,
    isDisabled,
    [key]: execute,
    revalidate,
    setData: setDataMemo,
  } as UseAsyncResultBase<T> & Record<U, T>;
};
