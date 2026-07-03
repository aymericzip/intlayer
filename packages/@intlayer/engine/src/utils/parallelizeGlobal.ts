// === keep your Queue, Node, pLimit, validateConcurrency exactly as-is ===

import { pLimit } from './pLimit';

// --- NEW: single, shared limiter for the whole process ---
let _globalLimiter: ReturnType<typeof pLimit> | null = null;

/** Get (and optionally configure) the single, shared limiter. */
export const getGlobalLimiter = (concurrency?: number) => {
  if (!_globalLimiter) {
    _globalLimiter = pLimit(concurrency ?? 10);
  } else if (typeof concurrency === 'number') {
    (_globalLimiter as any).concurrency = concurrency;
  }
  return _globalLimiter!;
};

// --- NEW: task limiter for gating task starts ---
let _taskLimiter: ReturnType<typeof pLimit> | null = null;

/** Limits how many *tasks* run concurrently (independent from AI calls). */
export const getTaskLimiter = (concurrency?: number) => {
  if (!_taskLimiter) {
    _taskLimiter = pLimit(concurrency ?? 5);
  } else if (typeof concurrency === 'number') {
    (_taskLimiter as any).concurrency = concurrency;
  }
  return _taskLimiter!;
};

// --- REPLACE your existing `parallelize` with this version ---
export const parallelizeGlobal = async <T, R>(
  items: T[],
  callback: (item: T, index: number) => Promise<R> = async (item) =>
    item as unknown as Promise<R>,
  options?: {
    /** Share a single limiter across the app. If omitted, uses global limiter. */
    limiter?: ReturnType<typeof pLimit>;
    /** If provided and no limiter is passed, configure the global limiter. */
    concurrency?: number;
    /**
     * Whether to wrap *each* callback run in the limiter.
     * - For orchestration (outer loops): set `false` (don't burn limiter slots).
     * - For atomic work (AI calls, writes): leave `true` (default).
     */
    wrapInLimiter?: boolean;
  }
): Promise<R[]> => {
  const limiter = options?.limiter ?? getGlobalLimiter(options?.concurrency);
  const wrap = options?.wrapInLimiter ?? true;

  const run = wrap
    ? <U>(fn: () => Promise<U>) => limiter(fn)
    : <U>(fn: () => Promise<U>) => fn();

  const promises = items.map((item, index) => run(() => callback(item, index)));
  return Promise.all(promises);
};
