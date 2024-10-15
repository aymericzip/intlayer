'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from 'react';
import { useAsyncCacheStore } from './useAsyncCacheStore';

type UseAsyncResultBase<T extends (...args: any[]) => Promise<any>> = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  data: Awaited<ReturnType<T>> | null;
  retryCount: number;
  isDisabled: boolean;
};

type UseAsyncOptions = {
  retryLimit?: number;
  revalidateTime?: number; // Revalidation time in milliseconds
  generateKey?: (...args: any[]) => string;
  cache?: boolean;
};

const DEFAULT_CACHE_ENABLED = false;
const DEFAULT_RETRY_LIMIT = 3;
const DEFAULT_REVALIDATE_TIME = 5 * 60 * 1000; // 5 minutes

export const useAsync = <
  U extends string,
  T extends (...args: any[]) => Promise<any>,
>(
  functionName: U,
  asyncFunction: T,
  options?: UseAsyncOptions
): UseAsyncResultBase<T> & Record<U, T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  type DataType = Awaited<ReturnType<T>>;
  const [data, setData] = useState<DataType | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const retryLimit = options?.retryLimit ?? DEFAULT_RETRY_LIMIT;
  const revalidateTime = options?.revalidateTime ?? DEFAULT_REVALIDATE_TIME;
  const generateKey = options?.generateKey;
  const cacheEnabled = options?.cache ?? DEFAULT_CACHE_ENABLED;

  const cacheStore = useAsyncCacheStore();

  const execute: T = useCallback<T>(
    // eslint-disable-next-line sonarjs/cognitive-complexity
    (async (...args) => {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);
      setIsDisabled(false);

      let cacheKey: string | undefined;
      if (cacheEnabled) {
        // Generate a cache key
        if (generateKey) {
          cacheKey = generateKey(...args);
        } else {
          try {
            cacheKey = `${functionName}:${JSON.stringify(args)}`;
          } catch {
            console.error(
              'Arguments cannot be serialized. Provide a custom generateKey function.'
            );
            cacheKey = functionName;
          }
        }
      }

      const now = Date.now();
      let cachedEntry;
      if (cacheEnabled && cacheKey) {
        cachedEntry = cacheStore.getCache(cacheKey);
        if (cachedEntry && now < cachedEntry.expireAt) {
          // Return cached data
          setData(cachedEntry.data);
          setIsSuccess(true);
          setIsLoading(false);
          return cachedEntry.data;
        }
      }

      let pendingPromise;
      if (cacheEnabled && cacheKey) {
        // Check for pending promise
        pendingPromise = cacheStore.getPendingPromise(cacheKey);
      }

      if (cacheEnabled && pendingPromise) {
        // Wait for the pending promise
        try {
          const result = await pendingPromise;
          setData(result ?? null);
          setIsSuccess(true);
          setRetryCount(0); // Reset retry count on success
          setIsLoading(false);

          return result;
        } catch (err) {
          const errorMessage =
            (err as { message: string }).message ?? 'Something went wrong';

          setError(errorMessage);

          setRetryCount((prev) => {
            const newRetryCount = prev + 1;
            if (newRetryCount >= retryLimit) {
              setIsDisabled(true);
            }
            return newRetryCount;
          });

          setIsLoading(false);
          throw new Error(errorMessage);
        }
      } else {
        // No pending promise, execute the function
        const promise = asyncFunction(...args);

        if (cacheEnabled && cacheKey) {
          // Store the pending promise
          cacheStore.setPendingPromise(cacheKey, promise);
        }

        try {
          const result = await promise;
          setData(result ?? null);
          setIsSuccess(true);
          setRetryCount(0); // Reset retry count on success
          setIsLoading(false);

          if (cacheEnabled && cacheKey) {
            // Cache the result
            const expireAt =
              revalidateTime > 0 ? now + revalidateTime : Infinity;
            cacheStore.setCache(cacheKey, {
              data: result,
              timestamp: now,
              expireAt,
            });

            // Remove the pending promise
            cacheStore.removePendingPromise(cacheKey);
          }

          return result;
        } catch (err) {
          const errorMessage =
            (err as { message: string }).message ?? 'Something went wrong';

          setError(errorMessage);

          setRetryCount((prev) => {
            const newRetryCount = prev + 1;
            if (newRetryCount >= retryLimit) {
              setIsDisabled(true);
            }
            return newRetryCount;
          });

          setIsLoading(false);

          if (cacheEnabled && cacheKey) {
            // Remove the pending promise
            cacheStore.removePendingPromise(cacheKey);
          }

          throw new Error(errorMessage);
        }
      }
    }) as T,
    [
      asyncFunction,
      cacheStore,
      functionName,
      generateKey,
      revalidateTime,
      retryLimit,
      cacheEnabled,
    ]
  );

  return useMemo(
    () =>
      ({
        isLoading,
        error,
        isSuccess,
        data,
        retryCount,
        isDisabled,
        [functionName]: execute,
      }) as UseAsyncResultBase<T> & Record<U, T>,
    [isLoading, error, isSuccess, data, retryCount, isDisabled, execute]
  );
};
