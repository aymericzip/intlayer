'use client';

import { useState, useEffect } from 'react';

export const usePersistedStore = <T>(key: string, initialValue?: T) => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue as T;

    const persistedState = localStorage?.getItem(key);

    if (persistedState) {
      return JSON.parse(persistedState);
    }

    return initialValue as T;
  });

  useEffect(() => {
    const persistedState = localStorage?.getItem(key);

    if (persistedState) {
      setState(JSON.parse(persistedState));
    }
  }, [key]);

  useEffect(() => {
    localStorage?.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};
