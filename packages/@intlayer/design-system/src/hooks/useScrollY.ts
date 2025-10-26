'use client';

import { useCallback, useSyncExternalStore } from 'react';

type UseScrollYResult = {
  scrollY: number;
  scrollPercentage: number;
  scrollYMax: number;
};

const INITIAL_SCROLL_STATE: UseScrollYResult = {
  scrollY: 0,
  scrollPercentage: 0,
  scrollYMax: 0,
};

let lastSnapshot: UseScrollYResult = INITIAL_SCROLL_STATE;

export const useScrollY = (): UseScrollYResult => {
  const subscribe = useCallback((onChange: () => void) => {
    if (typeof window === 'undefined') return () => {};
    let raf = 0;

    const handler = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        onChange();
      });
    };

    window.addEventListener('scroll', handler, { passive: true });

    return () => {
      window.removeEventListener('scroll', handler);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const getSnapshot = (): UseScrollYResult => {
    if (typeof window === 'undefined') {
      return INITIAL_SCROLL_STATE; // SSR/hydration-safe
    }

    const doc = document.documentElement;
    const body = document.body;

    const scrollY =
      window.scrollY ??
      window.pageYOffset ??
      doc?.scrollTop ??
      body?.scrollTop ??
      0;

    const scrollHeight = doc?.scrollHeight ?? body?.scrollHeight ?? 0;
    const clientHeight = doc?.clientHeight ?? window.innerHeight ?? 0;
    const scrollYMax = Math.max(0, scrollHeight - clientHeight);
    const scrollPercentage = scrollYMax > 0 ? scrollY / scrollYMax : 0;

    if (
      lastSnapshot.scrollY === scrollY &&
      lastSnapshot.scrollPercentage === scrollPercentage &&
      lastSnapshot.scrollYMax === scrollYMax
    ) {
      return lastSnapshot;
    }

    lastSnapshot = { scrollY, scrollPercentage, scrollYMax };
    return lastSnapshot;
  };

  const getServerSnapshot = (): UseScrollYResult => INITIAL_SCROLL_STATE;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
