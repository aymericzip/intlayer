import { logger } from './logger';

export type RetryManagerOptions = {
  /** maximum number of retries before giving up */
  maxRetry?: number;
  /** delay between attempts, in milliseconds */
  delay?: number;
  /** function to call when an error occurs */
  onError?: (err: Error) => void;
};

const DEFAULT_MAX_RETRY = 3;
const DEFAULT_DELAY = 0;

/**
 * Wrap an async function `fn` so it’s retried on failure.
 *
 * @param fn       The async function to wrap
 * @param options  { maxRetry, delay }
 * @returns        A new function with the same signature as `fn`
 */
export const retryManager =
  <Args extends any[], R>(
    fn: (...args: Args) => Promise<R>,
    {
      maxRetry = DEFAULT_MAX_RETRY,
      delay = DEFAULT_DELAY,
      onError,
    }: RetryManagerOptions = {}
  ): ((...args: Args) => Promise<R>) =>
  // ───────────────────────────────^ returned wrapper function
  async (...args: Args): Promise<R> => {
    for (let attempt = 0; ; attempt++) {
      try {
        return await fn(...args);
      } catch (err) {
        onError?.(err as Error);
        logger(['Request failed', err], {
          level: 'error',
        });
        if (attempt >= maxRetry) throw err; // out of retries
        if (delay > 0) await new Promise((res) => setTimeout(res, delay));
      }
    }
  };
