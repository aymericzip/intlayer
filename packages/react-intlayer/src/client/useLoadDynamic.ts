type Status = 'pending' | 'success' | 'error';

type Suspender<T> = {
  /**
   * Settles once the entry has left `pending`, never rejecting. Awaiting it
   * guarantees a subsequent {@link Suspender.read} returns without suspending.
   */
  settled: Promise<void>;
  read: () => T;
};

const createSuspender = <T>(promise: Promise<T>): Suspender<T> => {
  let status: Status = 'pending';
  let result: T;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e as any;
    }
  );

  return {
    settled: suspender,
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result!;
    },
  };
};

const cache = new Map<string, Suspender<unknown>>();

export const useLoadDynamic = <T>(key: string, promise: Promise<T>): T => {
  if (!cache.has(key)) {
    cache.set(key, createSuspender(promise));
  }

  return (cache.get(key)! as Suspender<T>).read() as T;
};

/**
 * Fills the same cache {@link useLoadDynamic} reads, ahead of render.
 *
 * A component that reads a dictionary during render suspends whenever the entry
 * is still `pending`, and the nearest boundary shows its fallback. Awaiting this
 * before the render — in a router loader, or during app startup — makes that
 * read synchronous, so no boundary ever falls back.
 *
 * Handing over an already-resolved promise is not enough on its own:
 * {@link createSuspender} only leaves `pending` inside a `.then` callback, so
 * the first read would still suspend for one microtask. Awaiting the returned
 * promise resolves that race, because the callback registered by
 * `createSuspender` runs before this one.
 *
 * @param key - Cache key, identical to the one the later read uses.
 * @param loader - Invoked only when the key is not cached yet, so preloading a
 *                 dictionary twice never issues a second request.
 * @returns A promise that settles — never rejects — once the entry is readable.
 */
export const preloadDynamic = <T>(
  key: string,
  loader: () => Promise<T>
): Promise<void> => {
  if (!cache.has(key)) {
    cache.set(key, createSuspender(loader()) as Suspender<unknown>);
  }

  return cache.get(key)!.settled;
};
