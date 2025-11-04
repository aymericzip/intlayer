'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  type DetailProps,
  type PopoverProps,
  PopoverStatic,
  type PopoverType,
  PopoverXAlign,
  PopoverYAlign,
  Detail as StaticDetail,
} from './static';

/**
 * Popover Component (Client-side)
 *
 * Client-side wrapper around the static Popover component.
 * Reuses the server-side compatible implementation.
 *
 * @param props - Popover component props
 * @returns Trigger container with popover functionality
 */
const PopoverComponent: FC<PopoverProps> = (props) => {
  return <PopoverStatic {...props} />;
};

/**
 * Popover Detail Component (Client-side)
 *
 * Client-side wrapper around the static Detail component that adds automatic
 * positioning logic based on viewport constraints.
 *
 * Features:
 * - Reuses server-side compatible static Detail component
 * - Adds automatic positioning adjustment based on viewport
 * - Calculates optimal X/Y alignment to prevent overflow
 * - Dynamically adjusts max-width based on available space
 * - Listens to window resize and scroll events
 *
 * @param props - Popover Detail component props
 * @returns Positioned popover content with animations and accessibility
 */
const Detail: FC<DetailProps> = ({
  xAlign = PopoverXAlign.START,
  yAlign = PopoverYAlign.BELOW,
  ...props
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [computedXAlign, setComputedXAlign] = useState(xAlign);
  const [computedYAlign, setComputedYAlign] = useState(yAlign);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const adjustPosition = () => {
      if (!popoverRef.current) return;

      const popoverElement = popoverRef.current;
      const triggerElement = document.getElementById(
        `unrollable-panel-button-${props.identifier}`
      );

      if (!triggerElement) return;

      const triggerRect = triggerElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const gap = 16; // 1rem gap
      const padding = 16; // Additional padding from viewport edges

      // Calculate maximum width based on viewport and trigger position
      const maxWidthFromLeft = viewportWidth - triggerRect.left - padding;
      const maxWidthFromRight = triggerRect.right - padding;

      // Use the larger space to ensure popover can fit
      const absoluteMaxWidth = Math.max(maxWidthFromLeft, maxWidthFromRight);

      setMaxWidth(absoluteMaxWidth);

      // Force a layout calculation by temporarily making visible if needed
      const wasInvisible = popoverElement.classList.contains('invisible');
      if (wasInvisible) {
        popoverElement.style.visibility = 'hidden';
        popoverElement.classList.remove('invisible');
      }

      // Small delay to ensure max-width is applied and content reflows
      requestAnimationFrame(() => {
        const popoverRect = popoverElement.getBoundingClientRect();

        // Restore invisible state if it was invisible
        if (wasInvisible) {
          popoverElement.style.visibility = '';
          popoverElement.classList.add('invisible');
        }

        // Determine optimal Y alignment
        let newYAlign = yAlign;
        const spaceBelow = viewportHeight - triggerRect.bottom - gap;
        const spaceAbove = triggerRect.top - gap;

        if (yAlign === PopoverYAlign.BELOW && spaceBelow < popoverRect.height) {
          // Not enough space below, try above
          if (spaceAbove >= popoverRect.height) {
            newYAlign = PopoverYAlign.ABOVE;
          }
        } else if (
          yAlign === PopoverYAlign.ABOVE &&
          spaceAbove < popoverRect.height
        ) {
          // Not enough space above, try below
          if (spaceBelow >= popoverRect.height) {
            newYAlign = PopoverYAlign.BELOW;
          }
        }

        // Determine optimal X alignment
        let newXAlign = xAlign;
        const spaceRight = viewportWidth - triggerRect.left - padding;
        const spaceLeft = triggerRect.right - padding;

        if (xAlign === PopoverXAlign.START && spaceRight < popoverRect.width) {
          // Not enough space on the right, try left
          if (spaceLeft >= popoverRect.width) {
            newXAlign = PopoverXAlign.END;
          }
        } else if (
          xAlign === PopoverXAlign.END &&
          spaceLeft < popoverRect.width
        ) {
          // Not enough space on the left, try right
          if (spaceRight >= popoverRect.width) {
            newXAlign = PopoverXAlign.START;
          }
        }

        setComputedYAlign(newYAlign);
        setComputedXAlign(newXAlign);
      });
    };

    // Adjust position with a slight delay to ensure DOM is ready
    const timeoutId = setTimeout(adjustPosition, 0);

    // Listen to mouse enter on the trigger to recalculate
    const triggerElement = document.getElementById(
      `unrollable-panel-button-${props.identifier}`
    );

    if (triggerElement) {
      triggerElement.addEventListener('mouseenter', adjustPosition);
      triggerElement.addEventListener('focusin', adjustPosition);
    }

    // Use ResizeObserver to detect popover content size changes
    const resizeObserver = new ResizeObserver(() => {
      adjustPosition();
    });

    if (popoverRef.current) {
      resizeObserver.observe(popoverRef.current);
    }

    window.addEventListener('resize', adjustPosition);
    window.addEventListener('scroll', adjustPosition, true);

    return () => {
      clearTimeout(timeoutId);
      if (triggerElement) {
        triggerElement.removeEventListener('mouseenter', adjustPosition);
        triggerElement.removeEventListener('focusin', adjustPosition);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', adjustPosition);
      window.removeEventListener('scroll', adjustPosition, true);
    };
  }, [props.identifier, xAlign, yAlign]);

  // Use the static Detail component with computed alignment values
  return (
    <StaticDetail
      {...props}
      xAlign={computedXAlign}
      yAlign={computedYAlign}
      ref={popoverRef}
      style={{
        ...props.style,
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
      }}
    />
  );
};

// Create Popover with Detail attached
export const Popover: PopoverType = PopoverComponent as PopoverType;

Popover.Detail = Detail;
