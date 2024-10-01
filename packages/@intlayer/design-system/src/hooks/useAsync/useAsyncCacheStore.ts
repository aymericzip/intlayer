/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { create } from 'zustand';

type AsyncCacheEntry<T> = {
  data: T;
  timestamp: number;
  expireAt: number; // Time when data expires
};

type AsyncCacheStore = {
  cache: Record<string, AsyncCacheEntry<any>>;
  setCache: (key: string, value: AsyncCacheEntry<any>) => void;
  getCache: (key: string) => AsyncCacheEntry<any> | undefined;
  removeCache: (key: string) => void;
  clearCache: () => void;
};

export const useAsyncCacheStore = create<AsyncCacheStore>((set, get) => ({
  cache: {},
  setCache: (key, value) =>
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: value,
      },
    })),
  getCache: (key) => get().cache[key],
  removeCache: (key) =>
    set((state) => {
      const newCache = { ...state.cache };
      delete newCache[key];
      return { cache: newCache };
    }),
  clearCache: () => set({ cache: {} }),
}));
