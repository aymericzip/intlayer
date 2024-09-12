'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';

type UseAsyncResultBase<T extends (...args: any[]) => Promise<any>> = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  data: ReturnType<T> | null;
  retryCount: number;
  isDisabled: boolean;
};

export const useAsync = <
  U extends string,
  T extends (...args: any[]) => Promise<any>,
>(
  functionName: U,
  asyncFunction: T,
  options?: { retryLimit?: number }
): UseAsyncResultBase<T> & Record<U, T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<ReturnType<T> | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const retryLimit = options?.retryLimit ?? 3;

  const execute: T = useCallback<T>(
    (async (...args) => {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);
      setIsDisabled(false);

      try {
        const result = await asyncFunction(...args);
        setData(result ?? null);
        setIsSuccess(true);
        setRetryCount(0); // Reset retry count on success
        setIsLoading(false);

        return result;
      } catch (err) {
        const errorMessage: string =
          (err as { message: string }).message ?? 'Something went wrong';
        setError(errorMessage);
        const newRetryCount = retryCount + 1;
        setRetryCount(newRetryCount);
        setIsLoading(false);

        if (newRetryCount >= retryLimit) {
          setIsDisabled(true); // Disable after reaching retry limit
        }

        throw new Error(errorMessage);
      }
    }) as T,
    [asyncFunction, error, functionName, isLoading, retryCount, retryLimit]
  );

  return {
    isLoading,
    error,
    isSuccess,
    data,
    retryCount,
    isDisabled,
    [functionName]: execute, // Dynamically assign the execute function to the functionName
  } as UseAsyncResultBase<T> & Record<U, T>;
};
