import { reactive } from 'vue';

/**
 * A "synchronous" loader for a dynamically‐imported JSON (or anything).
 *
 * - Immediately returns a reactive object so that Vue can properly track changes.
 * - When the Promise resolves, it replaces the object's properties with the real data.
 */
export const useLoadDynamic = <T extends Record<string, any>>(
  key: string,
  promise: Promise<T>
): T => {
  // A module‐level cache of Promises, so we only import once per key.
  const cache: Map<string, Promise<T>> = (useLoadDynamic as any)._cache ||
  ((useLoadDynamic as any)._cache = new Map());

  // Hold the "current" value as a reactive object
  // This starts as an empty object but Vue can track changes to it
  const container = reactive({} as T);

  if (!cache.has(key)) {
    // Kick off the dynamic import & cache it
    const p = promise.then((real) => {
      // As soon as the import resolves, populate the container with the real data
      Object.assign(container, real);
      return real;
    });
    cache.set(key, p);
  } else {
    // If it's already in flight (or done), hook into it so that the container still updates
    cache.get(key)!.then((real) => {
      Object.assign(container, real);
    });
  }

  // Return the reactive container directly - Vue can track all changes to it
  return container as T;
};
