'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';

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

  const [hoveredItem, setHoveredItem] = useState<HTMLElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastPositionRef = useRef<StyleState | null>(null);

  const itemsLength = optionsRefs.current.length;

  const calculatePosition = () => {
    let targetElement: HTMLElement | null = null;

    if (hoveredItem) {
      targetElement = hoveredItem;
      // Clear any pending hide timeout when hovering over an item
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    } else {
      targetElement = optionsRefs.current.find(selector) ?? null;
    }

    if (!targetElement) {
      // Keep previous position but set opacity to 0
      if (orientation === 'vertical') {
        setChoiceIndicatorPosition((prev) => {
          const verticalPrev = prev as VerticalStyleState | null;
          const newPosition: VerticalStyleState = {
            top: verticalPrev?.top ?? 0,
            height: verticalPrev?.height ?? 0,
            opacity: 0,
          };
          lastPositionRef.current = newPosition;
          return newPosition;
        });
      } else {
        setChoiceIndicatorPosition((prev) => {
          const horizontalPrev = prev as HorizontalStyleState | null;
          const newPosition: HorizontalStyleState = {
            left: horizontalPrev?.left ?? 0,
            width: horizontalPrev?.width ?? 0,
            opacity: 0,
          };
          lastPositionRef.current = newPosition;
          return newPosition;
        });
      }
      return;
    }

    if (orientation === 'vertical') {
      const top = targetElement.offsetTop;
      const height = targetElement.offsetHeight;

      const newPosition = {
        top,
        height,
        opacity: 1,
      };
      setChoiceIndicatorPosition(newPosition);
      lastPositionRef.current = newPosition;
    } else {
      const left = targetElement.offsetLeft;
      const width = targetElement.offsetWidth;

      const newPosition = {
        left,
        width,
        opacity: 1,
      };
      setChoiceIndicatorPosition(newPosition);
      lastPositionRef.current = newPosition;
    }
  };

  useEffect(() => {
    calculatePosition();

    // Event listeners for window events
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('DOMContentLoaded', calculatePosition);

    // MutationObserver to watch for 'aria-selected' changes
    const mutationObservers: MutationObserver[] = [];

    optionsRefs.current.forEach((option) => {
      if (option) {
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (
              mutation.type === 'attributes' &&
              mutation.attributeName === 'aria-selected'
            ) {
              calculatePosition();
              break;
            }
          }
        });

        observer.observe(option, {
          attributes: true,
          attributeFilter: ['aria-selected'],
        });

        mutationObservers.push(observer);
      }
    });

    // ResizeObserver to watch for size changes
    const resizeObservers: ResizeObserver[] = [];

    const observeSize = (element: HTMLElement) => {
      if (!element) return;
      const resizeObserver = new ResizeObserver(() => {
        calculatePosition();
      });
      resizeObserver.observe(element);
      resizeObservers.push(resizeObserver);
    };

    // Observe the selected item
    const selectedItem = optionsRefs.current.find(selector) ?? null;

    if (selectedItem) {
      observeSize(selectedItem);
    }

    // Observe the hovered item
    if (hoveredItem) {
      observeSize(hoveredItem);
    }

    // Add hover event listeners
    const handleMouseEnter = (event: Event) => {
      // Clear any pending hide timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      setHoveredItem(event.currentTarget as HTMLElement);
    };

    const handleMouseLeave = () => {
      // Clear any existing timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Keep the indicator at its current position for 150ms
      // before removing the hovered item
      hideTimeoutRef.current = setTimeout(() => {
        setHoveredItem(null);
      }, 150); // 150ms delay before hiding
    };

    if (isHoverable) {
      optionsRefs.current.forEach((option) => {
        option?.addEventListener('mouseenter', handleMouseEnter, {
          passive: true,
        });
        option?.addEventListener('mouseleave', handleMouseLeave, {
          passive: true,
        });
      });
    }

    return () => {
      // Clear any pending hide timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Cleanup window event listeners
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('DOMContentLoaded', calculatePosition);

      // Disconnect MutationObservers
      mutationObservers.forEach((observer) => {
        observer.disconnect();
      });

      // Disconnect ResizeObservers
      resizeObservers.forEach((observer) => {
        observer.disconnect();
      });

      // Remove hover event listeners
      optionsRefs.current.forEach((option) => {
        option?.removeEventListener('mouseenter', handleMouseEnter);
        option?.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [optionsRefs, selector, hoveredItem, itemsLength, orientation]);

  return { choiceIndicatorPosition, calculatePosition, orientation };
};
