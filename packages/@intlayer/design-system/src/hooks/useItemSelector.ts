'use client';

import { scheduleFrameTask } from '@utils/scheduleFrameTask';
import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export type ItemSelectorOrientation = 'horizontal' | 'vertical';

type HorizontalStyleState = {
  left: number;
  width: number;
  opacity: number;
};

type VerticalStyleState = {
  top: number;
  height: number;
  opacity: number;
};

type StyleState = HorizontalStyleState | VerticalStyleState;

const selectorDefault = (option: HTMLElement) =>
  option?.getAttribute('aria-selected') === 'true';

/** Attributes whose change moves the indicator to another option. */
const WATCHED_ATTRIBUTES = ['aria-selected', 'data-active', 'data-indicator'];

/** Delay before the indicator leaves the option the pointer just left. */
const HOVER_RELEASE_DELAY = 150;

type Options = {
  selector?: (option: HTMLElement, index: number) => boolean;
  isHoverable?: boolean;
  orientation?: ItemSelectorOrientation;
};

export const useItemSelector = (
  optionsRefs: RefObject<HTMLElement[]>,
  {
    selector = selectorDefault,
    isHoverable = false,
    orientation = 'horizontal',
  }: Options = {
    selector: selectorDefault,
    isHoverable: false,
    orientation: 'horizontal',
  }
) => {
  const [choiceIndicatorPosition, setChoiceIndicatorPosition] =
    useState<StyleState | null>(null);

  const hoveredItemRef = useRef<HTMLElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastPositionRef = useRef<StyleState | null>(null);
  const cancelMeasurementRef = useRef<(() => void) | null>(null);

  /*
   * Callers build their options object inline, so `selector` and `orientation`
   * are new values on every render. Reading them from refs keeps the observers
   * below from being torn down and rebuilt each time — a switch selector used
   * to re-subscribe one MutationObserver per option per render.
   */
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  const orientationRef = useRef(orientation);
  orientationRef.current = orientation;

  const itemsLength = optionsRefs.current.length;

  const calculatePosition = useCallback(() => {
    const targetElement =
      hoveredItemRef.current ??
      optionsRefs.current.find(selectorRef.current) ??
      null;

    if (hoveredItemRef.current && hideTimeoutRef.current) {
      // Clear any pending hide timeout when hovering over an item
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    const isVertical = orientationRef.current === 'vertical';

    if (!targetElement) {
      // Keep previous position but set opacity to 0
      if (lastPositionRef.current?.opacity === 0) return;

      const newPosition: StyleState = isVertical
        ? {
            top:
              (lastPositionRef.current as VerticalStyleState | null)?.top ?? 0,
            height:
              (lastPositionRef.current as VerticalStyleState | null)?.height ??
              0,
            opacity: 0,
          }
        : {
            left:
              (lastPositionRef.current as HorizontalStyleState | null)?.left ??
              0,
            width:
              (lastPositionRef.current as HorizontalStyleState | null)?.width ??
              0,
            opacity: 0,
          };

      setChoiceIndicatorPosition(newPosition);
      lastPositionRef.current = newPosition;
      return;
    }

    if (isVertical) {
      const top = targetElement.offsetTop;
      const height = targetElement.offsetHeight;
      const previous = lastPositionRef.current as VerticalStyleState | null;

      if (
        previous?.top === top &&
        previous.height === height &&
        previous.opacity === 1
      ) {
        return;
      }

      const newPosition: VerticalStyleState = { top, height, opacity: 1 };

      setChoiceIndicatorPosition(newPosition);
      lastPositionRef.current = newPosition;
      return;
    }

    const left = targetElement.offsetLeft;
    const width = targetElement.offsetWidth;
    const previous = lastPositionRef.current as HorizontalStyleState | null;

    if (
      previous?.left === left &&
      previous.width === width &&
      previous.opacity === 1
    ) {
      return;
    }

    const newPosition: HorizontalStyleState = { left, width, opacity: 1 };

    setChoiceIndicatorPosition(newPosition);
    lastPositionRef.current = newPosition;
  }, [optionsRefs]);

  /**
   * Defers the measurement to the next frame, and to a single one however many
   * observers fire.
   *
   * Reading `offsetLeft` straight from a mutation, resize or scroll callback
   * forces a synchronous reflow, and a documentation page mounts one selector
   * per tab group and one per code block. The frame is shared with every other
   * selector on the page, so React commits their positions in one pass instead
   * of invalidating layout between two measurements.
   */
  const scheduleMeasurement = useCallback(() => {
    if (cancelMeasurementRef.current !== null) return;

    cancelMeasurementRef.current = scheduleFrameTask(() => {
      cancelMeasurementRef.current = null;
      calculatePosition();
    });
  }, [calculatePosition]);

  useEffect(() => {
    scheduleMeasurement();

    window.addEventListener('resize', scheduleMeasurement, { passive: true });
    window.addEventListener('DOMContentLoaded', scheduleMeasurement);

    const options = optionsRefs.current.filter(Boolean);

    // One observer of each kind covers every option: both accept repeated
    // `observe` calls, so a group of ten options costs two observers, not
    // twenty.
    const mutationObserver = new MutationObserver(scheduleMeasurement);
    const resizeObserver = new ResizeObserver(scheduleMeasurement);

    const handleMouseEnter = (event: Event) => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      hoveredItemRef.current = event.currentTarget as HTMLElement;
      scheduleMeasurement();
    };

    const handleMouseLeave = () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

      // Keep the indicator where it is for a moment, so moving between two
      // neighbouring options does not make it blink out and back in.
      hideTimeoutRef.current = setTimeout(() => {
        hoveredItemRef.current = null;
        scheduleMeasurement();
      }, HOVER_RELEASE_DELAY);
    };

    for (const option of options) {
      mutationObserver.observe(option, {
        attributes: true,
        attributeFilter: WATCHED_ATTRIBUTES,
      });
      resizeObserver.observe(option);

      if (isHoverable) {
        option.addEventListener('mouseenter', handleMouseEnter, {
          passive: true,
        });
        option.addEventListener('mouseleave', handleMouseLeave, {
          passive: true,
        });
      }
    }

    return () => {
      cancelMeasurementRef.current?.();
      cancelMeasurementRef.current = null;

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      window.removeEventListener('resize', scheduleMeasurement);
      window.removeEventListener('DOMContentLoaded', scheduleMeasurement);

      mutationObserver.disconnect();
      resizeObserver.disconnect();

      if (isHoverable) {
        for (const option of options) {
          option.removeEventListener('mouseenter', handleMouseEnter);
          option.removeEventListener('mouseleave', handleMouseLeave);
        }
      }
    };
  }, [optionsRefs, itemsLength, isHoverable, orientation, scheduleMeasurement]);

  return {
    choiceIndicatorPosition,
    /** Measures immediately. Prefer `scheduleMeasurement`, which does not force a reflow. */
    calculatePosition,
    scheduleMeasurement,
    orientation,
  };
};
