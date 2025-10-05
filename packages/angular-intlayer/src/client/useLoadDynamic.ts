import { signal } from '@angular/core';

/**
 * A "synchronous" loader for a dynamically‐imported JSON (or anything).
 *
 * - Immediately returns a reactive signal so that Angular can properly track changes.
 * - When the Promise resolves, it replaces the signal's value with the real data.
 */
export const useLoadDynamic = <T extends Record<string, any>>(
  key: string,
  promise: Promise<T>
): T => {
  // A module‐level cache of Promises, so we only import once per key.
  const cache: Map<string, Promise<T>> = (useLoadDynamic as any)._cache ||
  ((useLoadDynamic as any)._cache = new Map());

  // Hold the "current" value as a reactive signal
  // This starts as an empty object but Angular can track changes to it
  const container = signal({} as T);

  if (!cache.has(key)) {
    // Kick off the dynamic import & cache it
    const p = promise.then((real) => {
      // As soon as the import resolves, update the signal with the real data
      container.set(real);
      return real;
    });
    cache.set(key, p);
  } else {
    // If it's already in flight (or done), hook into it so that the container still updates
    cache.get(key)?.then((real) => {
      container.set(real);
    });
  }

  // Return the current signal value directly - Angular can track all changes to it
  return container();
};
