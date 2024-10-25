'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';
import { useAsyncStateStore } from './useAsyncStateStore';

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
  cache?: boolean;
};

const DEFAULT_CACHE_ENABLED = false;
const DEFAULT_RETRY_LIMIT = 1;
const DEFAULT_REVALIDATE_TIME = 5 * 60 * 1000; // 5 minutes

export const useAsync = <
  U extends string,
  T extends (...args: any[]) => Promise<any>,
>(
  key: U,
  asyncFunction: T,
  options?: UseAsyncOptions
): UseAsyncResultBase<T> & Record<U, T> => {
  const {
    setIsLoading,
    setError,
    setIsSuccess,
    setData,
    incrementRetryCount,
    resetRetryCount,
    setIsDisabled,
  } = useAsyncStateStore((state) => ({
    setIsLoading: state.setIsLoading,
    setError: state.setError,
    setIsSuccess: state.setIsSuccess,
    setData: state.setData,
    incrementRetryCount: state.incrementRetryCount,
    resetRetryCount: state.resetRetryCount,
    setIsDisabled: state.setIsDisabled,
  }));
  const { isLoading, error, isSuccess, data, retryCount, isDisabled } =
    useAsyncStateStore((state) => state.getStates(key));

  const retryLimit = options?.retryLimit ?? DEFAULT_RETRY_LIMIT;
  const revalidateTime = options?.revalidateTime ?? DEFAULT_REVALIDATE_TIME;
  const cacheEnabled = options?.cache ?? DEFAULT_CACHE_ENABLED;

  // Ref to store the last arguments used
  const storedArgsRef = useRef<any[]>([]);

  const execute: T = useCallback<T>(
    (async (...args) => {
      storedArgsRef.current = args;

      if (isDisabled) return;

      if (isSuccess && data) return data;

      setIsLoading(key, true);

      let response = null;
      await asyncFunction(...args)
        .then((result) => {
          response = result;
          setData(key, result);
          setIsSuccess(key, true);
          incrementRetryCount(key);
        })
        .catch((error) => {
          const errorMessage = error.message ?? 'An error occurred';
          setError(key, errorMessage);
          resetRetryCount(key);
          setIsDisabled(key, true);
        })
        .finally(() => {
          setIsLoading(key, false);
        });

      return response;
    }) as T,
    [asyncFunction, key, isSuccess, data, isDisabled]
  );

  // Retry mechanism
  useEffect(() => {
    const isRetryEnabled = retryCount > 0 && retryLimit > 0;
    const isRetryLimitReached = retryCount >= retryLimit;

    if (!isRetryEnabled || isRetryLimitReached || isSuccess) return;

    const interval = setInterval(() => {
      if (isRetryEnabled && !isRetryLimitReached && !isSuccess) {
        execute(...storedArgsRef.current);
      }
    }, revalidateTime);

    return () => {
      clearInterval(interval);
    };
  }, [execute, retryCount, retryLimit, revalidateTime]);

  // Periodic revalidation
  useEffect(() => {
    if (!cacheEnabled || revalidateTime <= 0 || !isSuccess) return;

    const interval = setInterval(() => {
      if (cacheEnabled && revalidateTime > 0 && isSuccess) {
        execute(...storedArgsRef.current);
      }
    }, revalidateTime);

    return () => {
      clearInterval(interval);
    };
  }, [cacheEnabled, revalidateTime, execute]);

  return {
    isLoading,
    error,
    isSuccess,
    data,
    retryCount,
    isDisabled,
    [key]: execute,
  } as UseAsyncResultBase<T> & Record<U, T>;
};
