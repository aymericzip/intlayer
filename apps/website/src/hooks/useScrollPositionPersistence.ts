import { useEffect, useRef } from 'react';

/**
 * Custom hook to persist scroll position across page navigations
 * @param storageKey - Unique key to identify the scroll position in sessionStorage
 * @returns A ref to attach to the scrollable element
 */
export const useScrollPositionPersistence = <T extends HTMLElement>(
  storageKey: string
) => {
  const elementRef = useRef<T>(null);

  // Restore scroll position on mount, deferred to an animation frame
  // to avoid forced reflow during initial mount/hydration commit.
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(storageKey);
    if (!savedScrollPosition) return;

    const parsedPosition = parseInt(savedScrollPosition, 10);
    if (Number.isNaN(parsedPosition)) return;

    const rafId = requestAnimationFrame(() => {
      if (elementRef.current) {
        elementRef.current.scrollTop = parsedPosition;
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [storageKey]);

  // Save scroll position on scroll
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      sessionStorage.setItem(storageKey, element.scrollTop.toString());
    };

    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => element.removeEventListener('scroll', handleScroll);
  }, [storageKey]);

  return elementRef;
};
