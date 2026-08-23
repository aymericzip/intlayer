import React from 'react';

type AsyncRungStore<T> = {
  status: 'pending' | 'resolved' | 'rejected';
  value?: T;
  error?: unknown;
  promise?: Promise<void>;
};

/**
 * Turns an async loader into a synchronous reader that suspends until the
 * value is available, without going through `React.use`.
 *
 * `React.use` matches its per-component state positionally across suspense
 * retries, so a `use()` call whose condition can change between attempts
 * (here: the server context is seeded by the provider concurrently with the
 * page render) shifts the index and hands a later `use()` — such as the
 * dynamic dictionary chunk loader — the wrong promise's value. Throwing the
 * promise ourselves and caching the settlement in a request-scoped store
 * keeps the suspension mechanics without touching React's positional state,
 * which makes the ambient chain safe to run conditionally.
 *
 * Requires `React.cache` for per-request isolation; without it (React < 19)
 * the reader reports `undefined` so callers fall back to the default locale,
 * matching the previous behavior.
 */
export const createSuspendingReader = <T>(
  load: () => Promise<T | undefined>
): (() => T | undefined) => {
  if (typeof React.cache !== 'function') return () => undefined;

  const getStore = React.cache(
    (): AsyncRungStore<T | undefined> => ({ status: 'pending' })
  );

  return (): T | undefined => {
    const store = getStore();

    // Suspending is only safe when the store survives the retry: React replays
    // the component from the top, so a cache that hands back a fresh store
    // every call would restart the load and throw a new promise forever. That
    // is what `React.cache` degrades to outside a request scope — notably in
    // the SSR pass of client components, where it is a passthrough. Reporting
    // no value there lets the caller fall back instead of hanging the render.
    if (getStore() !== store) return undefined;

    if (store.status === 'resolved') return store.value;
    if (store.status === 'rejected') throw store.error;

    if (!store.promise) {
      store.promise = load().then(
        (value) => {
          store.value = value;
          store.status = 'resolved';
        },
        (error) => {
          store.error = error;
          store.status = 'rejected';
        }
      );
    }

    // Suspend: React retries the component once the promise settles.
    throw store.promise;
  };
};
