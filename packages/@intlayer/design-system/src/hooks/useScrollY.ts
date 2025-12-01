'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { useGetElementOrWindow } from './useGetElementOrWindow';

type UseScrollYProps = {
  element?: HTMLElement;
};

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

export const useScrollY = (props?: UseScrollYProps): UseScrollYResult => {
  const { element } = props ?? {};

  const containerElement = useGetElementOrWindow(element);

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined' || !containerElement) return () => {};
      let raf = 0;

      const handler = () => {
        if (raf) return;
        raf = window.requestAnimationFrame(() => {
          raf = 0;
          onChange();
        });
      };

      containerElement.addEventListener('scroll', handler, { passive: true });

      return () => {
        containerElement.removeEventListener('scroll', handler);
        if (raf) window.cancelAnimationFrame(raf);
      };
    },
    [containerElement]
  );

  const getSnapshot = (): UseScrollYResult => {
    if (typeof window === 'undefined' || !containerElement) {
      return INITIAL_SCROLL_STATE; // SSR/hydration-safe
    }

    // Handle custom element
    if (containerElement instanceof HTMLElement) {
      const scrollY = containerElement.scrollTop;
      const scrollHeight = containerElement.scrollHeight;
      const clientHeight = containerElement.clientHeight;
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
    }

    // Handle window
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
