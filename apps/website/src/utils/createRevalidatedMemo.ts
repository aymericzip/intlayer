type MemoizedValue<Value> = {
  readonly value: Promise<Value | null>;
  readonly fetchedAt: number;
};

/**
 * Wraps `fetchValue` in a process-wide memo refreshed at most once per
 * `revalidationIntervalMs`, so every page, locale and visitor is answered from
 * a single upstream call.
 *
 * A `null` result (upstream unreachable, rate-limited, unexpected payload) is
 * deliberately not memoized: the next caller retries instead of freezing the
 * failure until the interval elapses.
 *
 * @param fetchValue - Upstream call, resolving to `null` on failure.
 * @param revalidationIntervalMs - How long a resolved value stays fresh.
 * @returns The memoized fetcher.
 */
export const createRevalidatedMemo = <Value>(
  fetchValue: () => Promise<Value | null>,
  revalidationIntervalMs: number
): (() => Promise<Value | null>) => {
  let memoized: MemoizedValue<Value> | null = null;

  return async () => {
    const now = Date.now();

    if (
      memoized === null ||
      now - memoized.fetchedAt >= revalidationIntervalMs
    ) {
      memoized = { value: fetchValue(), fetchedAt: now };
    }

    const current = memoized;
    const value = await current.value;

    // Only drop the entry this call installed: a concurrent call may already
    // have replaced it with a newer one while this request was in flight.
    if (value === null && memoized === current) {
      memoized = null;
    }

    return value;
  };
};
