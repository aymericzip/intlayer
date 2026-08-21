'use client';

import { observeScrollExtent } from '@utils/observeScrollExtent';
import { scheduleFrameTask } from '@utils/scheduleFrameTask';
import { useEffect, useState } from 'react';
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

/**
 * Tracks the vertical scroll of an element — or of the page — as a position and
 * a 0-to-1 progress.
 *
 * @param props.element - Scrollable element. Defaults to the document.
 * @returns The current offset, its maximum, and the ratio between the two.
 *
 * @example
 * const { scrollPercentage } = useScrollY({ element: contentElement });
 */
export const useScrollY = (props?: UseScrollYProps): UseScrollYResult => {
  const { element } = props ?? {};
  const containerElement = useGetElementOrWindow(element);
  const [scrollState, setScrollState] =
    useState<UseScrollYResult>(INITIAL_SCROLL_STATE);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerElement) return;

    const isElementScroll = containerElement instanceof HTMLElement;

    /**
     * Travel available to the scroll, cached between layout changes.
     *
     * `scrollHeight` and `clientHeight` both flush pending layout, so reading
     * them on every scroll frame would recompute the whole page while the user
     * scrolls. Only `scrollTop` is read per frame; the rest is refreshed when
     * the content or the viewport actually resizes.
     */
    let scrollYMax = 0;

    const measureScrollRange = () => {
      const scrollHeight = isElementScroll
        ? containerElement.scrollHeight
        : (document.documentElement?.scrollHeight ??
          document.body?.scrollHeight ??
          0);

      const clientHeight = isElementScroll
        ? containerElement.clientHeight
        : (document.documentElement?.clientHeight ?? window.innerHeight ?? 0);

      scrollYMax = Math.max(0, scrollHeight - clientHeight);
    };

    const updateScrollState = () => {
      const scrollY = isElementScroll
        ? containerElement.scrollTop
        : (window.scrollY ?? document.documentElement?.scrollTop ?? 0);

      const scrollPercentage = scrollYMax > 0 ? scrollY / scrollYMax : 0;

      setScrollState((previousState) =>
        previousState.scrollY === scrollY &&
        previousState.scrollPercentage === scrollPercentage &&
        previousState.scrollYMax === scrollYMax
          ? previousState
          : { scrollY, scrollPercentage, scrollYMax }
      );
    };

    let cancelScheduledRead: (() => void) | null = null;

    const scheduleScrollRead = () => {
      if (cancelScheduledRead) return;

      cancelScheduledRead = scheduleFrameTask(() => {
        cancelScheduledRead = null;
        updateScrollState();
      });
    };

    let cancelScheduledRangeRead: (() => void) | null = null;

    const scheduleRangeRead = () => {
      if (cancelScheduledRangeRead) return;

      cancelScheduledRangeRead = scheduleFrameTask(() => {
        cancelScheduledRangeRead = null;
        measureScrollRange();
        updateScrollState();
      });
    };

    // Initial measurement, deferred so that it shares the frame of every other
    // measurement the page schedules while mounting.
    scheduleRangeRead();

    const stopObservingScrollExtent = observeScrollExtent(
      isElementScroll ? containerElement : document.documentElement,
      scheduleRangeRead
    );

    containerElement.addEventListener('scroll', scheduleScrollRead, {
      passive: true,
    });
    window.addEventListener('resize', scheduleRangeRead, { passive: true });

    return () => {
      cancelScheduledRead?.();
      cancelScheduledRangeRead?.();
      stopObservingScrollExtent();
      containerElement.removeEventListener('scroll', scheduleScrollRead);
      window.removeEventListener('resize', scheduleRangeRead);
    };
  }, [containerElement]);

  return scrollState;
};
