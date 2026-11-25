import { createChunkSuspenseCache } from '@intlayer/core/dictionaryManipulator';

/** Chunk cache read by every dynamic dictionary of the page. */
const chunkCache = createChunkSuspenseCache();

/**
 * Whether {@link useLoadDynamic} already holds an entry for `key` (pending or
 * settled). A missing entry means the next read will start a load and suspend.
 */
export const hasDynamicEntry = (key: string): boolean => chunkCache.has(key);

/**
 * Reads a chunk the Suspense way: throws while `promise` is pending, then
 * returns its value. Only the first `promise` given for a `key` is used.
 */
export const useLoadDynamic = <T>(key: string, promise: Promise<T>): T =>
  chunkCache.read(key, promise);

/**
 * Fills the same cache {@link useLoadDynamic} reads, ahead of render.
 *
 * A component that reads a dictionary during render suspends whenever the entry
 * is still `pending`, and the nearest boundary shows its fallback. Awaiting this
 * before the render — in a router loader, or during app startup — makes that
 * read synchronous, so no boundary ever falls back.
 *
 * Handing over an already-resolved promise is not enough on its own: an entry
 * only leaves `pending` inside a `.then` callback, so the first read would
 * still suspend for one microtask. Awaiting the returned promise resolves that
 * race, because the entry's callback runs before the caller's.
 *
 * @param key - Cache key, identical to the one the later read uses.
 * @param loader - Invoked only when the key is not cached yet, so preloading a
 *                 dictionary twice never issues a second request.
 * @returns A promise that settles — never rejects — once the entry is readable.
 */
export const preloadDynamic = <T>(
  key: string,
  loader: () => Promise<T>
): Promise<void> => chunkCache.preload(key, loader);
