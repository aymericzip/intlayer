'use client';

import { useState, useEffect } from 'react';

export const usePersistedStore = <T>(key: string, initialValue?: T) => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue as T;

    const persistedState = localStorage?.getItem(key);

    if (persistedState) {
      try {
        setState(JSON.parse(persistedState));
      } catch (e) {
        console.error(e);
      }
    }

    return initialValue as T;
  });

  useEffect(() => {
    const persistedState = localStorage?.getItem(key);

    if (persistedState) {
      try {
        setState(JSON.parse(persistedState));
      } catch (e) {
        console.error(e);
      }
    }
  }, [key]);

  useEffect(() => {
    if (state === undefined) return;

    localStorage?.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};
