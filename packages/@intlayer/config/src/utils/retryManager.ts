import { logger } from '../logger';
import { extractErrorMessage } from './extractErrorMessage';

export type RetryManagerOptions = {
  /** maximum number of retries before giving up */
  maxRetry?: number;
  /** delay between attempts, in milliseconds */
  delay?: number;
  /**
   * Decides whether a given error is worth another attempt. Returning `false`
   * gives up immediately, which avoids replaying a request that can only fail
   * again (ex: a `404`). Every error is retried when omitted.
   */
  shouldRetry?: (error: unknown) => boolean;
  /** function to call when an error occurs */
  onError?: (details: {
    error: string;
    attempt: number;
    maxRetry: number;
  }) => void;
  /** function to call when the maximum number of retries is reached */
  onMaxTryReached?: (details: {
    error: string;
    attempt: number;
    maxRetry: number;
  }) => void;
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
      shouldRetry,
      onError,
      onMaxTryReached,
    }: RetryManagerOptions = {}
  ): ((...args: Args) => Promise<R>) =>
  // ───────────────────────────────^ returned wrapper function
  async (...args: Args): Promise<R> => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetry; attempt++) {
      try {
        return await fn(...args);
      } catch (err) {
        lastError = err;
        const error = extractErrorMessage(err);

        // Give up right away on an error that another attempt cannot fix
        if (shouldRetry && !shouldRetry(err)) {
          if (onMaxTryReached) {
            onMaxTryReached({ error, attempt, maxRetry });
            return null as R;
          }

          throw err;
        }

        // If this was the last attempt, handle max retry reached
        if (attempt >= maxRetry) {
          if (onMaxTryReached) {
            onMaxTryReached?.({ error, attempt, maxRetry });
            return null as R;
          }

          // Otherwise, throw the error
          throw err;
        }

        if (onError) {
          onError?.({ error, attempt, maxRetry });
        } else {
          logger(error, {
            level: 'error',
          });
        }

        // Wait before retrying
        if (delay > 0) {
          await new Promise((res) => setTimeout(res, delay));
        }
      }
    }

    // This should never be reached, but TypeScript needs it
    throw (
      lastError ?? new Error('Unexpected: retry loop completed without result')
    );
  };
