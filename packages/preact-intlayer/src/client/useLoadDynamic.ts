import { createChunkSuspenseCache } from '@intlayer/core/dictionaryManipulator';

/** Chunk cache read by every dynamic dictionary of the page. */
const chunkCache = createChunkSuspenseCache();

/**
 * Reads a chunk the Suspense way: throws while `promise` is pending, then
 * returns its value. Only the first `promise` given for a `key` is used.
 */
export const useLoadDynamic = <T>(key: string, promise: Promise<T>): T =>
  chunkCache.read(key, promise);
