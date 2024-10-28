'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';
import { useAsyncStateStore } from './useAsyncStateStore';

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

type UseAsyncOptions<T extends (...args: any[]) => Promise<any>> = {
  retryLimit?: number;
  revalidateTime?: number; // Revalidation time in milliseconds
  cache?: boolean;
  onSuccess?: (data: Awaited<ReturnType<T>>) => void;
  onError?: (error: string) => void;
};

const DEFAULT_CACHE_ENABLED = false;
const DEFAULT_RETRY_LIMIT = 1;
const DEFAULT_REVALIDATE_TIME = 5 * 60 * 1000; // 5 minutes

export type UseAsyncResult<
  U extends string,
  T extends (...args: any[]) => Promise<any>,
> = UseAsyncResultBase<T> & Record<U, T>;

export const useAsync = <
  U extends string,
  T extends (...args: any[]) => Promise<any>,
>(
  key: U,
  asyncFunction: T,
  options?: UseAsyncOptions<T>
): UseAsyncResult<U, T> => {
  const {
    setIsFetched,
    setIsLoading,
    setError,
    setIsSuccess,
    setData,
    incrementRetryCount,
    resetRetryCount,
    setIsDisabled,
  } = useAsyncStateStore((state) => ({
    setIsFetched: state.setIsFetched,
    setIsLoading: state.setIsLoading,
    setError: state.setError,
    setIsSuccess: state.setIsSuccess,
    setData: state.setData,
    incrementRetryCount: state.incrementRetryCount,
    resetRetryCount: state.resetRetryCount,
    setIsDisabled: state.setIsDisabled,
  }));
  const {
    isFetched,
    isLoading,
    error,
    isSuccess,
    data,
    retryCount,
    isDisabled,
  } = useAsyncStateStore((state) => state.getStates(key));

  const retryLimit = options?.retryLimit ?? DEFAULT_RETRY_LIMIT;
  const revalidateTime = options?.revalidateTime ?? DEFAULT_REVALIDATE_TIME;
  const cacheEnabled = options?.cache ?? DEFAULT_CACHE_ENABLED;
  const onSuccess = options?.onSuccess ?? (() => {});
  const onError = options?.onError ?? (() => {});

  // Ref to store the last arguments used
  const storedArgsRef = useRef<any[]>([]);

  const fetch: T = useCallback<T>(
    (async (...args) => {
      storedArgsRef.current = args;

      setIsLoading(key, true);

      let response = null;
      await asyncFunction(...args)
        .then((result) => {
          response = result;

          setData(key, result);
          setIsSuccess(key, true);
          incrementRetryCount(key);
          onSuccess(result);
        })
        .catch((error) => {
          const errorMessage = error.message ?? 'An error occurred';
          setError(key, errorMessage);
          resetRetryCount(key);
          setIsDisabled(key, true);
          onError(errorMessage);
        })
        .finally(() => {
          setIsLoading(key, false);
          setIsFetched(key, true);
        });

      return response;
    }) as T,
    [asyncFunction, key, isSuccess, data, isDisabled]
  );

  const execute: T = useCallback<T>(
    (async (...args) => {
      storedArgsRef.current = args;

      if (isDisabled) return;

      if (isSuccess && data) return data;

      return fetch(...args);
    }) as T,
    [asyncFunction, key, isSuccess, data, isDisabled]
  );

  const revalidate: T = useCallback<T>(
    (async (...args) => {
      storedArgsRef.current = args;

      if (isDisabled) return;

      return fetch(...args);
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

  const setDataMemo = useCallback(
    (data: Awaited<ReturnType<T> | null>) => {
      setData(key, data);
    },
    [setData]
  );

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
