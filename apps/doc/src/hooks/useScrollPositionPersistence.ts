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

  // Restore scroll position on mount
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(storageKey);
    if (savedScrollPosition && elementRef.current) {
      elementRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
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
