'use client';

// This is an ESLint directive to disable specific rules.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAsyncStateStore } from './useAsyncStateStore';

// Pending promises cache to prevent parallel requests when multiple components use the hook
const pendingPromises = new Map();

// Defines the base structure for the result of the custom hook.
type UseAsyncResultBase<T extends (...args: any[]) => Promise<any>> = {
  isFetched: boolean;
  isLoading: boolean;
  isInvalidated: boolean;
  isSuccess: boolean;
  isDisabled: boolean;
  error: string | null;
  data: Awaited<ReturnType<T>> | null;
  retryCount: number;
  revalidate: T;
  setData: (data: Awaited<ReturnType<T> | null>) => void;
};

// Options type for the hook, allowing customization of behavior.
export type UseAsyncOptions<T extends (...args: any[]) => Promise<any>> = {
  retryLimit?: number; // The number of times the hook should retry the function on failure before giving up
  retryTime?: number; // Time in milliseconds for retrying the data
  cache?: boolean; // Cache the result of the function using zustand
  store?: boolean; // Store the result of the function in session storage
  enable?: boolean; // Enable the hook
  autoFetch?: boolean; // Automatically fetch the data when the hook is mounted
  revalidation?: boolean; // Enable revalidation
  revalidateTime?: number; // Time in milliseconds for revalidating the data
  isInvalidated?: boolean; // Determine if the data is invalidated and should be refetched
  invalidateQueries?: string[]; // Invalidate other queries when the data is updated
  updateQueries?: string[]; // Update other queries when the data is updated
  onSuccess?: (data: Awaited<ReturnType<T>>) => void; // Callback function that is called when the asynchronous function resolves successfully
  onError?: (error: string) => void; // Callback function that is called when the asynchronous function rejects or encounters an error
  args?: Parameters<T>; // Arguments to pass to the asynchronous function
};

// Default values for the hook's options
const DEFAULT_CACHE_ENABLED = false;
const DEFAULT_STORE_ENABLED = false;
const DEFAULT_ENABLED = true;
const DEFAULT_AUTO_FETCH = false;
const DEFAULT_RETRY_LIMIT = 1;
const DEFAULT_REVALIDATION_ENABLED = false;
const DEFAULT_REVALIDATE_TIME = 5 * 60 * 1000; // 5 minutes
const DEFAULT_RETRY_TIME = 5 * 60 * 1000; // 5 minutes

// The main hook type that includes the async function along with its additional properties.
export type UseAsyncResult<
  U extends string,
  T extends (...args: any[]) => Promise<any>,
> = UseAsyncResultBase<T> & Record<U, T>;

const getKeyWithArgs = (key: string, args: any[]) =>
  args.length > 0 ? `${key}/${JSON.stringify(args)}` : key;

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
 * @property {number} [retryTime=300000] - Time in milliseconds for retrying the data after an error occurs.
 * @property {number} [retryLimit=1] - The number of times the hook should retry the asynchronous function on failure before giving up.
 * @property {boolean} [revalidation=false] - Enable revalidation.
 * @property {number} [revalidateTime=300000] - Time in milliseconds after which the cached data is considered stale and the async function is re-invoked, if caching is enabled.
 * @property {boolean} [cache=false] - Whether to cache the result of the async function. When enabled, revalidation is controlled by `revalidateTime`.
 * @property {boolean} [store=false] - Store the result of the function in session storage.
 * @property {boolean} [autoFetch=false] - Whether the hook should automatically invoke the asynchronous function on mount.
 * @property {number} [revalidateTime=300000] - Time in milliseconds after which the cached data is considered stale and the async function is re-invoked, if caching is enabled.
 * @property {boolean} [isInvalidated=false] - Determine if the data is invalidated and should be refetched.
 * @property {string[]} [updateQueries=[]] - Update other queries when the data is updated.
 * @property {string[]} [invalidateQueries=[]] - Invalidate other queries when the data is updated.
 * @property {(data: Awaited<ReturnType<T>>) => void} [onSuccess] - Callback function that is called when the asynchronous function resolves successfully.
 * @property {(error: string) => void} [onError] - Callback function that is called when the asynchronous function rejects or encounters an error.
 * @property {Parameters<T>} [args=[]] - Arguments to pass to the asynchronous function.
 *
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
  // Resolving optional parameters with default values
  const retryLimit = options?.retryLimit ?? DEFAULT_RETRY_LIMIT;
  const autoFetch = options?.autoFetch ?? DEFAULT_AUTO_FETCH;
  const retryTime = options?.retryTime ?? DEFAULT_RETRY_TIME;
  const cacheEnabled = options?.cache ?? DEFAULT_CACHE_ENABLED;
  const storeEnabled = options?.store ?? DEFAULT_STORE_ENABLED;
  const enabled = options?.enable ?? DEFAULT_ENABLED;
  const revalidationEnabled =
    options?.revalidation ?? DEFAULT_REVALIDATION_ENABLED;
  const revalidateTime = options?.revalidateTime ?? DEFAULT_REVALIDATE_TIME;
  const isInvalidatedProps = options?.isInvalidated ?? false;
  const updateQueries = options?.updateQueries ?? [];
  const invalidateQueries = options?.invalidateQueries ?? [];
  const onSuccess = options?.onSuccess;
  const onError = options?.onError;
  const args = options?.args ?? [];

  // Using a custom hook to manage state specific to asynchronous operations
  const {
    setIsFetched,
    setIsLoading,
    setError,
    setIsSuccess,
    setData,
    setIsInvalidated,
    setIsEnabled,
    incrementRetryCount,
    resetRetryCount,
  } = useAsyncStateStore(
    useShallow((state) => ({
      setIsFetched: state.setIsFetched,
      setIsLoading: state.setIsLoading,
      setError: state.setError,
      setIsSuccess: state.setIsSuccess,
      setIsInvalidated: state.setIsInvalidated,
      setIsEnabled: state.setIsEnabled,
      setData: state.setData,
      incrementRetryCount: state.incrementRetryCount,
      resetRetryCount: state.resetRetryCount,
    }))
  );

  // Storing the last arguments used to call the async function
  const storedArgsRef = useRef<any>(args ?? []);

  // Apply different key for different requests
  const keyWithArgs = getKeyWithArgs(key, storedArgsRef.current);

  // Retrieving the current state of async operations using the same custom hook
  const {
    isFetched,
    fetchedDateTime,
    isLoading,
    isEnabled,
    error,
    isSuccess,
    isInvalidated,
    data,
    retryCount: errorCount,
  } = useAsyncStateStore((state) => state.getStates(keyWithArgs));

  // The core fetching function, designed to be called directly or automatically based on configuration
  const fetch: T = useCallback<T>(
    (async (...args) => {
      const keyWithArgs = getKeyWithArgs(key, args);

      if (pendingPromises.has(keyWithArgs)) {
        // Return the existing pending promise
        return pendingPromises.get(keyWithArgs);
      }

      const promise = (async () => {
        setIsLoading(keyWithArgs, true);
        let response = null;

        await asyncFunction(...args)
          .then((result) => {
            response = result;

            const isResultChanged =
              JSON.stringify(result) !== JSON.stringify(data);

            const invalidate =
              invalidateQueries.length > 0 &&
              // If data is not defined, always invalidate
              // Otherwise, invalidate only if the result is different
              (!data || isResultChanged);

            // Invalidate other queries if necessary
            if (invalidate) {
              invalidateQueries.forEach((key) => setIsInvalidated(key, true));
            }

            if (isResultChanged && cacheEnabled) {
              setData(keyWithArgs, result);
            }
            setIsSuccess(keyWithArgs, true);
            onSuccess?.(result);
            resetRetryCount(keyWithArgs);
            setError(keyWithArgs, null);

            // Store the result in session storage
            if (storeEnabled) {
              sessionStorage.setItem(keyWithArgs, JSON.stringify(result));
            }

            // Update other queries if necessary
            if (isResultChanged && updateQueries.length > 0) {
              updateQueries.forEach((key) => {
                setData(key, result);
              });
            }
          })
          .catch((error) => {
            setData(keyWithArgs, null);
            setError(keyWithArgs, error.message);
            incrementRetryCount(keyWithArgs);
            onError?.(error.message);
          })
          .finally(() => {
            setIsLoading(keyWithArgs, false);
            setIsFetched(keyWithArgs, true);
            setIsInvalidated(keyWithArgs, false);

            // Remove the pending promise from the cache
            pendingPromises.delete(keyWithArgs);
          });

        return response;
      })();

      // Store the pending promise in the cache
      pendingPromises.set(keyWithArgs, promise);

      return await promise;
    }) as T,
    [asyncFunction, keyWithArgs, storeEnabled, cacheEnabled, onSuccess, onError]
  );

  // Wrapped execution function to handle disabled state and check for success before re-fetching
  const execute: T = useCallback<T>(
    (async (...args) => {
      if (!isEnabled) return;
      if (isLoading) return;
      if (!isInvalidated && isSuccess && cacheEnabled && data) return data;

      if (args) {
        storedArgsRef.current = args;
      }

      return await fetch(...args);
    }) as T,
    [isEnabled, isInvalidated, cacheEnabled, isSuccess, data, isLoading, fetch]
  );

  // Function to revalidate the data when necessary
  const revalidate: T = useCallback<T>(
    (async (...args) => {
      if (!isEnabled) return;
      if (isSuccess) return;
      if (isLoading) return;

      if (args) {
        storedArgsRef.current = args;
      }

      return await fetch(...storedArgsRef.current);
    }) as T,
    [isEnabled, storedArgsRef, isSuccess, isLoading, fetch]
  );

  const autoRevalidate = useCallback(async () => {
    if (!isEnabled) return;
    if (isLoading) return;
    if (!(cacheEnabled || storeEnabled)) return;
    if (!isSuccess) return;
    if (!revalidationEnabled || revalidateTime <= 0) return;
    if (!fetchedDateTime) return;

    const now = new Date().getTime();
    const lastFetchedTime = new Date(fetchedDateTime).getTime();
    const shouldRevalidate = now - lastFetchedTime >= revalidateTime;
    if (shouldRevalidate) {
      return await fetch(...storedArgsRef.current);
    }
  }, [
    cacheEnabled,
    revalidationEnabled,
    revalidateTime,
    isSuccess,
    fetchedDateTime,
    isLoading,
    isEnabled,
  ]);

  // Handle invalidation if props are changed
  useEffect(() => {
    setIsInvalidated(keyWithArgs, isInvalidatedProps);
  }, [isInvalidatedProps, keyWithArgs]);

  useEffect(() => {
    setIsEnabled(keyWithArgs, enabled);
  }, [enabled, keyWithArgs]);

  // Auto-fetch data on hook mount if autoFetch is true
  useEffect(() => {
    if (!autoFetch) return;
    if (!isEnabled) return;
    if (isFetched && !isInvalidated) return;
    if (isLoading) return;

    fetch(...storedArgsRef.current);
  }, [autoFetch, isFetched, isInvalidated, isEnabled, isLoading, fetch]);

  // Handle retry based on conditions set in options
  useEffect(() => {
    const isRetryEnabled = errorCount > 0 && retryLimit > 0;
    const isRetryLimitReached = errorCount >= retryLimit;
    if (isEnabled) return;
    if (!(cacheEnabled || storeEnabled)) return;
    if (!isRetryEnabled || isRetryLimitReached) return;
    if (isSuccess) return;
    if (isLoading) return;

    const timeOut = setTimeout(() => {
      if (isRetryEnabled && !isRetryLimitReached && !isSuccess) {
        execute(...storedArgsRef.current);
      }
    }, retryTime);

    return () => clearTimeout(timeOut);
  }, [execute, errorCount, retryLimit, retryTime, isSuccess, isEnabled]);

  // Handle periodic revalidation if caching is enabled
  useEffect(() => {
    const interval = setInterval(autoRevalidate, revalidateTime);

    return () => clearInterval(interval);
  }, [autoRevalidate, revalidateTime]);

  // Load data from session storage if storeEnabled is true
  useEffect(() => {
    if (isEnabled) return;
    if (!storeEnabled) return;
    if (isInvalidated) return;
    if (isFetched) return;

    const storedData = sessionStorage.getItem(keyWithArgs);

    if (storedData) {
      setData(keyWithArgs, JSON.parse(storedData));
    }
  }, [storeEnabled, keyWithArgs, isFetched, isInvalidated, isEnabled]);

  // Memoization of the setData function to prevent unnecessary re-renders
  const setDataMemo = useCallback(
    (data: Awaited<ReturnType<T> | null>) => {
      setData(keyWithArgs, data);
    },
    [keyWithArgs]
  );

  // Return the hook's result, including all state and control functions
  return {
    isFetched,
    isLoading,
    isInvalidated,
    error,
    isSuccess,
    data,
    retryCount: errorCount,
    isDisabled: !isEnabled,
    isEnabled,
    [key]: execute,
    revalidate,
    setData: setDataMemo,
  } as UseAsyncResultBase<T> & Record<U, T>;
};
