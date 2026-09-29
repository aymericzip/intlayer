'use client';

import { useSyncExternalStore } from 'react';

let areTransitionsReady = false;
let isReadinessScheduled = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  if (!areTransitionsReady && !isReadinessScheduled) {
    isReadinessScheduled = true;

    // The first frame paints the state restored after hydration, the second
    // one re-enables transitions once that state is the "before" style.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        areTransitionsReady = true;
        for (const readyListener of listeners) readyListener();
      })
    );
  }

  return () => {
    listeners.delete(listener);
  };
};

/**
 * Whether the page has painted at least one frame after hydration.
 *
 * State restored on the client (e.g. `usePersistedStore`) changes classes
 * right after hydration, which animates every CSS transition from the server
 * default. Disable transitions while this returns `false` to apply the
 * restored state instantly instead.
 *
 * `false` on the server and during hydration; `true` for anything mounted
 * once the page is hydrated.
 *
 * @example
 * const areTransitionsReady = useAreTransitionsReady();
 * <div className={cn(!areTransitionsReady && '[&_*]:transition-none!')} />
 */
export const useAreTransitionsReady = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => areTransitionsReady,
    () => false
  );
