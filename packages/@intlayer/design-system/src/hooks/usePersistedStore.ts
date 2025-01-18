'use client';

import { useState, useEffect, type SetStateAction } from 'react';

export const usePersistedStore = <T>(key: string, initialValue?: T) => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue as T;

    const persistedState = localStorage?.getItem(key);

    if (persistedState) {
      try {
        return JSON.parse(persistedState);
      } catch (e) {
        console.error(e);
      }
    }

    return undefined as T;
  });

  useEffect(() => {
    const persistedState = localStorage?.getItem(key);

    if (persistedState && state === undefined) {
      try {
        setState(JSON.parse(persistedState));
      } catch (e) {
        console.error(e);
      }
    } else if (initialValue !== undefined && state === undefined) {
      setState(initialValue);
    }
  }, [key, state]);

  /**
   * Allows setting state either directly or via a functional update.
   * If passed a function, we merge/update based on the previous state.
   */
  const setStateResult = (valueOrUpdater: SetStateAction<T>) => {
    setState((prev) => {
      const newValue: T =
        typeof valueOrUpdater === 'function'
          ? (valueOrUpdater as (prevVal: T) => T)(prev)
          : valueOrUpdater;

      localStorage?.setItem(key, JSON.stringify(state));

      return newValue;
    });
  };

  return [(state ?? initialValue) as T, setStateResult] as const;
};
