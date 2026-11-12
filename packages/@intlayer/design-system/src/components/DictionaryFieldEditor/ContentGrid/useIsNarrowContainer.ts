'use client';

import { useEffect, useRef, useState } from 'react';

/** Container width under which editors switch to their compact layout. */
export const NARROW_CONTAINER_BREAKPOINT_PX = 640;

/**
 * Tracks whether the referenced element is narrower than `breakpoint`. Reads
 * the container, not the viewport, so the editor adapts inside side panels.
 */
export const useIsNarrowContainer = <
  Element extends HTMLElement = HTMLDivElement,
>(
  breakpoint: number = NARROW_CONTAINER_BREAKPOINT_PX
) => {
  const containerRef = useRef<Element>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // contentRect is computed by the observer itself: reading it forces no reflow
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setIsNarrow(entry.contentRect.width < breakpoint);
    });
    observer.observe(containerElement);

    return () => observer.disconnect();
  }, [breakpoint]);

  return { containerRef, isNarrow };
};
