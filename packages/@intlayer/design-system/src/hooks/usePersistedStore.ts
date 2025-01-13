'use client';

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (state === undefined) return;

    localStorage?.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [(state ?? initialValue) as T, setState] as const;
};
