'use client';

import { useLayoutEffect, useState } from 'react';

export type PresenceState<TElement extends HTMLElement> = {
  /** Whether the element should still be rendered. */
  isMounted: boolean;
  /** Callback ref to attach to the animated element. */
  ref: (element: TElement | null) => void;
};

const hasRunningAnimation = (element: HTMLElement): boolean => {
  const { animationName, display } = getComputedStyle(element);

  return display !== 'none' && !!animationName && animationName !== 'none';
};

/**
 * Keeps an element mounted after `isPresent` turns false, until its exit CSS
 * animation (e.g. `data-[state=closed]:animate-out`) has finished.
 *
 * @example
 * const { isMounted, ref } = usePresence<HTMLDivElement>(open);
 * if (!isMounted) return null;
 * return <div ref={ref} data-state={open ? 'open' : 'closed'} />;
 */
export const usePresence = <TElement extends HTMLElement>(
  isPresent: boolean
): PresenceState<TElement> => {
  const [isMounted, setIsMounted] = useState(isPresent);
  const [element, setElement] = useState<TElement | null>(null);

  // Mount synchronously on open, so the enter animation starts on first paint.
  if (isPresent && !isMounted) setIsMounted(true);

  useLayoutEffect(() => {
    if (isPresent || !isMounted) return;

    if (!element || !hasRunningAnimation(element)) {
      setIsMounted(false);
      return;
    }

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target === element) setIsMounted(false);
    };

    element.addEventListener('animationend', handleAnimationEnd);
    element.addEventListener('animationcancel', handleAnimationEnd);

    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
      element.removeEventListener('animationcancel', handleAnimationEnd);
    };
  }, [isPresent, isMounted, element]);

  return { isMounted: isPresent || isMounted, ref: setElement };
};
