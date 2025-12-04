'use client';

import { type RefObject, useEffect, useState } from 'react';

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

  const itemsLength = optionsRefs.current.length;

  const calculatePosition = () => {
    let targetElement: HTMLElement | null = null;

    if (hoveredItem) {
      targetElement = hoveredItem;
    } else {
      targetElement = optionsRefs.current.find(selector) ?? null;
    }

    if (!targetElement) {
      if (orientation === 'vertical') {
        setChoiceIndicatorPosition((prev) => ({
          top: 0,
          height: 0,
          ...prev,
          opacity: 0,
        }));
      } else {
        setChoiceIndicatorPosition((prev) => ({
          left: 0,
          width: 0,
          ...prev,
          opacity: 0,
        }));
      }
      return;
    }

    if (orientation === 'vertical') {
      const top = targetElement.offsetTop;
      const height = targetElement.offsetHeight;

      setChoiceIndicatorPosition({
        top,
        height,
        opacity: 1,
      });
    } else {
      const left = targetElement.offsetLeft;
      const width = targetElement.offsetWidth;

      setChoiceIndicatorPosition({
        left,
        width,
        opacity: 1,
      });
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
      setHoveredItem(event.currentTarget as HTMLElement);
    };

    const handleMouseLeave = () => {
      setHoveredItem(null);
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
