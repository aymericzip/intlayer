// useAsyncCacheStore.ts
import { create } from 'zustand';

type AsyncCacheEntry<T> = {
  data: T;
  timestamp: number;
  expireAt: number; // Time when data expires
};

type AsyncCacheStore<T> = {
  cache: Record<string, AsyncCacheEntry<T>>;
  pendingPromises: Record<string, Promise<T>>;
  setCache: (key: string, value: AsyncCacheEntry<T>) => void;
  getCache: (key: string) => AsyncCacheEntry<T> | undefined;
  removeCache: (key: string) => void;
  clearCache: () => void;
  setPendingPromise: (key: string, promise: Promise<T>) => void;
  getPendingPromise: (key: string) => Promise<T> | undefined;
  removePendingPromise: (key: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAsyncCacheStore = create<AsyncCacheStore<any>>((set, get) => ({
  cache: {},
  pendingPromises: {},
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
  setPendingPromise: (key, promise) =>
    set((state) => ({
      pendingPromises: {
        ...state.pendingPromises,
        [key]: promise,
      },
    })),
  getPendingPromise: (key) => get().pendingPromises[key],
  removePendingPromise: (key) =>
    set((state) => {
      const newPendingPromises = { ...state.pendingPromises };
      delete newPendingPromises[key];
      return { pendingPromises: newPendingPromises };
    }),
}));
