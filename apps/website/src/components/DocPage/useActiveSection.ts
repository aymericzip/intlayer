import { useGetElementOrWindow } from '@intlayer/design-system/hooks';
import {
  observeScrollExtent,
  scheduleFrameTask,
} from '@intlayer/design-system/utils';
import { type RefObject, useEffect, useState } from 'react';

type UseActiveSectionOptions = {
  contentElement: HTMLElement | null;
  /** All headings to track */
  headings: HTMLElement[];
  /** Map of parent headings to their children */
  headingMap: Map<HTMLElement, HTMLElement[]>;
  /** Optional ref to navigation element for click tracking */
  navRef?: RefObject<HTMLElement | null>;
  /** Offset from top of viewport to consider a heading active (default: 1/3 of viewport height) */
  scrollOffset?: number;
};

type UseActiveSectionReturn = {
  /** Currently active parent heading */
  activeParent: HTMLElement | null;
  /** Currently active child heading */
  activeChild: HTMLElement | null;
};

/**
 * Custom hook to detect and track the currently active section based on scroll position
 * @param options Configuration options for the hook
 * @returns Object containing active parent and child headings
 */
export const useActiveSection = ({
  contentElement,
  headings,
  headingMap,
  navRef,
  scrollOffset,
}: UseActiveSectionOptions): UseActiveSectionReturn => {
  const containerElement = useGetElementOrWindow(contentElement ?? undefined);
  const [activeParent, setActiveParent] = useState<HTMLElement | null>(null);
  const [activeChild, setActiveChild] = useState<HTMLElement | null>(null);

  useEffect(() => {
    /**
     * Offset of every tracked heading within the scroll container, measured
     * once per layout change instead of once per scroll frame: a long page
     * holds hundreds of headings, and `getBoundingClientRect()` on each of
     * them would recompute layout on every frame the user scrolls.
     */
    const headingOffsets = new Map<HTMLElement, number>();
    /** Height the offset is compared against, cached alongside the offsets. */
    let containerHeight = 0;
    let areOffsetsStale = true;

    const measureOffsets = () => {
      headingOffsets.clear();

      const containerTop = contentElement?.getBoundingClientRect().top ?? 0;
      const containerScroll = contentElement?.scrollTop ?? window.scrollY;

      for (const [parent, children] of headingMap) {
        for (const heading of [parent, ...children]) {
          headingOffsets.set(
            heading,
            heading.getBoundingClientRect().top - containerTop + containerScroll
          );
        }
      }

      containerHeight = contentElement?.clientHeight ?? window.innerHeight;
      areOffsetsStale = false;
    };

    const getActiveSection = () => {
      if (areOffsetsStale) measureOffsets();

      const offset = scrollOffset ?? containerHeight / 3;
      const scrollPosition = contentElement?.scrollTop ?? window.scrollY;
      const threshold = scrollPosition + offset;

      const isAboveThreshold = (heading: HTMLElement) =>
        (headingOffsets.get(heading) ?? Number.POSITIVE_INFINITY) < threshold;

      // Find the last heading that is above the scroll position
      const newActiveParent = headings.findLast(isAboveThreshold) ?? null;

      const newActiveChild = newActiveParent
        ? ((headingMap.get(newActiveParent) ?? []).findLast(isAboveThreshold) ??
          null)
        : null;

      setActiveParent((previous) =>
        previous === newActiveParent ? previous : newActiveParent
      );
      setActiveChild((previous) =>
        previous === newActiveChild ? previous : newActiveChild
      );
    };

    let cancelScheduledRead: (() => void) | null = null;

    const scheduleActiveSectionRead = () => {
      if (cancelScheduledRead) return;

      cancelScheduledRead = scheduleFrameTask(() => {
        cancelScheduledRead = null;
        getActiveSection();
      });
    };

    const invalidateOffsets = () => {
      areOffsetsStale = true;
      scheduleActiveSectionRead();
    };

    // Initial detection, deferred so that it shares the frame of every other
    // measurement the page schedules while mounting.
    scheduleActiveSectionRead();

    const navigationElement = navRef?.current;

    // Anything reflowing the content — a font swapping in, an image loading, a
    // code block collapsing — moves the headings, so the offsets are dropped
    // rather than refreshed on a timer.
    const stopObservingContent = contentElement
      ? observeScrollExtent(contentElement, invalidateOffsets)
      : null;

    navigationElement?.addEventListener('click', scheduleActiveSectionRead);
    containerElement?.addEventListener('scroll', scheduleActiveSectionRead, {
      passive: true,
    });
    window.addEventListener('resize', invalidateOffsets, { passive: true });
    window.addEventListener('orientationchange', invalidateOffsets);

    return () => {
      cancelScheduledRead?.();
      stopObservingContent?.();

      navigationElement?.removeEventListener(
        'click',
        scheduleActiveSectionRead
      );
      containerElement?.removeEventListener(
        'scroll',
        scheduleActiveSectionRead
      );
      window.removeEventListener('resize', invalidateOffsets);
      window.removeEventListener('orientationchange', invalidateOffsets);
    };
  }, [
    contentElement,
    containerElement,
    headings,
    headingMap,
    navRef,
    scrollOffset,
  ]);

  return {
    activeParent,
    activeChild,
  };
};
