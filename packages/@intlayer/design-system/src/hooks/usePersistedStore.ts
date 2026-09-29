'use client';

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

/** Serialized value of a key, or `null` when nothing is stored. */
type StoredValue = string | null;

/**
 * Values written from this tab, kept so the hook still works when
 * `localStorage` throws (private mode, quota, disabled storage).
 */
const writtenValues = new Map<string, StoredValue>();
const listenersByKey = new Map<string, Set<() => void>>();

const readStorage = (key: string): StoredValue => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: StoredValue) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // The in-memory copy in `writtenValues` still serves this tab.
  }
};

const getStoredValue = (key: string): StoredValue => {
  const storedValue = writtenValues.has(key)
    ? writtenValues.get(key)!
    : readStorage(key);

  return storedValue === 'undefined' ? null : storedValue;
};

const notifyKey = (key: string) => {
  for (const listener of listenersByKey.get(key) ?? []) listener();
};

const setStoredValue = (key: string, value: StoredValue) => {
  writtenValues.set(key, value);
  writeStorage(key, value);
  notifyKey(key);
};

/** Another tab wrote a key (`null`: cleared everything): its value now wins. */
const handleStorage = (event: StorageEvent) => {
  const changedKeys =
    event.key === null ? [...listenersByKey.keys()] : [event.key];

  for (const changedKey of changedKeys) {
    writtenValues.delete(changedKey);
    notifyKey(changedKey);
  }
};

const subscribeToKey = (key: string, listener: () => void) => {
  // One window listener for every hook: a doc page mounts ~100 of them.
  if (listenersByKey.size === 0) {
    window.addEventListener('storage', handleStorage);
  }

  const listeners = listenersByKey.get(key) ?? new Set();
  listeners.add(listener);
  listenersByKey.set(key, listeners);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) listenersByKey.delete(key);
    if (listenersByKey.size === 0) {
      window.removeEventListener('storage', handleStorage);
    }
  };
};

const parseStoredValue = <S>(storedValue: StoredValue, fallback: S): S => {
  if (storedValue === null) return fallback;

  try {
    return JSON.parse(storedValue) as S;
  } catch (error) {
    console.error(error);
    return fallback;
  }
};

/**
 * `useState` persisted in `localStorage`, shared by every hook using the same
 * key in the tab and synced across tabs.
 *
 * The server and the hydration render use `initialState`, so the markup
 * matches; the persisted value is applied right after hydration. A component
 * mounted later on the client reads it on its first render, with no
 * default-then-restored flash.
 *
 * @param key - The `localStorage` key.
 * @param initialState - Value used while nothing is stored. Only the first
 * render's value is used, as with `useState`.
 * @returns `[state, setState, loadState, clearState]`: `loadState` re-reads
 * the storage, `clearState` removes the key and falls back to `initialState`.
 */
export const usePersistedStore = <S>(
  key: string,
  initialState?: S | (() => S)
): [S, Dispatch<SetStateAction<S>>, () => void, () => void] => {
  const [fallbackState] = useState<S>(initialState as S | (() => S));

  const subscribe = useCallback(
    (listener: () => void) => subscribeToKey(key, listener),
    [key]
  );

  const storedValue = useSyncExternalStore(
    subscribe,
    () => getStoredValue(key),
    () => null
  );

  const state = useMemo(
    () => parseStoredValue(storedValue, fallbackState),
    [storedValue, fallbackState]
  );

  const setState: Dispatch<SetStateAction<S>> = useCallback(
    (valueOrUpdater) => {
      const newValue =
        typeof valueOrUpdater === 'function'
          ? (valueOrUpdater as (previousValue: S) => S)(
              parseStoredValue(getStoredValue(key), fallbackState)
            )
          : valueOrUpdater;

      if (typeof newValue === 'undefined') return;

      setStoredValue(key, JSON.stringify(newValue));
    },
    [key, fallbackState]
  );

  const loadState = useCallback(() => {
    writtenValues.delete(key);
    notifyKey(key);
  }, [key]);

  const clearState = useCallback(() => setStoredValue(key, null), [key]);

  return useMemo(
    () => [state, setState, loadState, clearState],
    [state, setState, loadState, clearState]
  );
};
