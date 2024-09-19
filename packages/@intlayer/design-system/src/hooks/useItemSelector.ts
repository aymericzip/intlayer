'use client';

import { useEffect, useState, type MutableRefObject } from 'react';

type PositionState = {
  left: number;
  width: number;
};

const selectorDefault = (option: HTMLElement) =>
  option.getAttribute('aria-selected') === 'true';

export const useItemSelector = (
  optionsRefs: MutableRefObject<HTMLElement[]>,
  selector: (option: HTMLElement, index: number) => boolean = selectorDefault,
  isHoverable = false
) => {
  const [choiceIndicatorPosition, setChoiceIndicatorPosition] =
    useState<PositionState | null>(null);

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

      if (!targetElement) return;

      const left = targetElement.offsetLeft;
      const width = targetElement.offsetWidth;

      setChoiceIndicatorPosition({
        left,
        width,
      });
    };

    calculatePosition();

    // Event listeners for window events
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('DOMContentLoaded', calculatePosition);

    // MutationObserver to watch for 'aria-selected' changes
    const mutationObservers: MutationObserver[] = [];

    optionsRefs.current.forEach((option) => {
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

    const handleMouseLeave = (event: Event) => {
      setHoveredItem(null);
    };

    if (isHoverable) {
      optionsRefs.current.forEach((option) => {
        option?.addEventListener('mouseenter', handleMouseEnter);
        option?.addEventListener('mouseleave', handleMouseLeave);
      });
    }

    return () => {
      // Cleanup window event listeners
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('DOMContentLoaded', calculatePosition);

      // Disconnect MutationObservers
      mutationObservers.forEach((observer) => observer.disconnect());

      // Disconnect ResizeObservers
      resizeObservers.forEach((observer) => observer.disconnect());

      // Remove hover event listeners
      optionsRefs.current.forEach((option) => {
        option?.removeEventListener('mouseenter', handleMouseEnter);
        option?.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [optionsRefs, selector, hoveredItem, itemsLength]);

  return { choiceIndicatorPosition };
};
