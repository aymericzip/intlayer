import type { Range } from '@tiptap/core';
import { useSyncExternalStore } from 'react';

type Listener = () => void;

/**
 * Minimal module-level observable store.
 *
 * rendered by Tiptap in a separate React root (outside the editor's provider
 * tree), so the query/range state has to live in a plain module singleton that
 * both roots can read and write — no shared React context needed. This is what
 * `useSyncExternalStore` store removes the dependency with identical behaviour.
 */
const createExternalStore = <T>(initialValue: T) => {
  let value = initialValue;
  const listeners = new Set<Listener>();

  return {
    getSnapshot: (): T => value,
    setValue: (next: T): void => {
      if (Object.is(next, value)) return;
      value = next;
      for (const listener of listeners) listener();
    },
    subscribe: (listener: Listener): (() => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
};

export const queryStore = createExternalStore('');
export const rangeStore = createExternalStore<Range | null>(null);

/** Subscribe to the current slash-command query string. */
export const useQuery = (): string =>
  useSyncExternalStore(
    queryStore.subscribe,
    queryStore.getSnapshot,
    queryStore.getSnapshot
  );

/** Subscribe to the current slash-command range. */
export const useRange = (): Range | null =>
  useSyncExternalStore(
    rangeStore.subscribe,
    rangeStore.getSnapshot,
    rangeStore.getSnapshot
  );
