'use client';

import { useState, useEffect } from 'react';

export const usePersistedStore = <T>(key: string, initialValue?: T) => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue as T;

    const persistedState = sessionStorage?.getItem(key);

    if (persistedState) {
      return JSON.parse(persistedState);
    }

    return initialValue as T;
  });

  useEffect(() => {
    const persistedState = sessionStorage?.getItem(key);

    if (persistedState) {
      setState(JSON.parse(persistedState));
    }
  }, [key, initialValue]);

  return [state, setState] as const;
};
