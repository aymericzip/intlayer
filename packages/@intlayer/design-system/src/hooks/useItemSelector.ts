'use client';

import { type RefObject, useEffect, useState } from 'react';

type StyleState = {
  left: number;
  width: number;
  opacity: number;
};

const selectorDefault = (option: HTMLElement) =>
  option?.getAttribute('aria-selected') === 'true';

export const useItemSelector = (
  optionsRefs: RefObject<HTMLElement[]>,
  selector: (option: HTMLElement, index: number) => boolean = selectorDefault,
  isHoverable = false
) => {
  const [choiceIndicatorPosition, setChoiceIndicatorPosition] =
    useState<StyleState | null>(null);

  const [hoveredItem, setHoveredItem] = useState<HTMLElement | null>(null);

  const itemsLength = optionsRefs.current.length;

  useEffect(() => {
    const calculatePosition = () => {
      let targetElement: HTMLElement | null = null;

      if (hoveredItem) {
        targetElement = hoveredItem;
      } else {
        targetElement = optionsRefs.current.find(selector) ?? null;
      }

      if (!targetElement) {
        setChoiceIndicatorPosition((prev) => ({
          left: 0,
          width: 0,
          ...prev,
          opacity: 0,
        }));
        return;
      }

      const left = targetElement.offsetLeft;
      const width = targetElement.offsetWidth;

      setChoiceIndicatorPosition({
        left,
        width,
        opacity: 1,
      });
    };

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
  }, [optionsRefs, selector, hoveredItem, itemsLength]);

  return { choiceIndicatorPosition };
};
