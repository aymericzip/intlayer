'use client';

import { useLayoutEffect, useState } from 'react';

export type PresenceState<TElement extends HTMLElement> = {
  /** Whether the element should still be rendered. */
  isMounted: boolean;
  /** Callback ref to attach to the animated element. */
  ref: (element: TElement | null) => void;
};

/**
 * Finite CSS transitions and animations running on the element itself.
 * `getAnimations` flushes styles, so an exit transition just triggered by a
 * `data-state` change is already listed. jsdom lacks it.
 */
const getExitAnimations = (element: HTMLElement): Animation[] =>
  (element.getAnimations?.() ?? []).filter(
    (animation) => animation.effect?.getComputedTiming().iterations !== Infinity
  );

/**
 * Keeps an element mounted after `isPresent` turns false, until its exit CSS
 * transition or animation (e.g. `data-[state=closed]:opacity-0`) has finished.
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

    const exitAnimations = element ? getExitAnimations(element) : [];
    let isCancelled = false;

    // `finished` rejects when an animation is cancelled; unmount either way.
    // Without animations it settles on the next microtask, still before paint.
    void Promise.allSettled(
      exitAnimations.map((animation) => animation.finished)
    ).then(() => {
      if (!isCancelled) setIsMounted(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [isPresent, isMounted, element]);

  return { isMounted: isPresent || isMounted, ref: setElement };
};
