'use client';

import { useCallback, useSyncExternalStore } from 'react';

export const useScrollY = (): number => {
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

  const getSnapshot = () => {
    if (typeof window === 'undefined') return 0; // SSR/hydration-safe
    const doc = document.documentElement;
    const body = document.body;
    return (
      window.scrollY ??
      window.pageYOffset ??
      doc?.scrollTop ??
      body?.scrollTop ??
      0
    );
  };

  const getServerSnapshot = () => 0;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
