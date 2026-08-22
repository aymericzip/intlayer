'use client';

import { scheduleFrameTask } from '@utils/scheduleFrameTask';
import type { FC } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import {
  type DetailProps,
  type PopoverProps,
  PopoverStatic,
  type PopoverType,
  Detail as StaticDetail,
  usePopoverIds,
} from './static';

/** Gap kept between the trigger and the panel, mirroring the `1rem` offset of the static styles. */
const TRIGGER_GAP = 16;

/** Space kept between the panel and the edges of the viewport. */
const VIEWPORT_PADDING = 16;

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
 * - Measures only while the panel is open, on a frame shared with the rest of
 *   the page
 *
 * @param props - Popover Detail component props
 * @returns Positioned popover content with animations and accessibility
 */
const Detail: FC<DetailProps> = ({
  xAlign = 'start',
  yAlign = 'below',
  ...props
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { triggerId } = usePopoverIds(props.identifier);
  const [computedXAlign, setComputedXAlign] = useState(xAlign);
  const [computedYAlign, setComputedYAlign] = useState(yAlign);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    /** Cancels the measurement queued for the next frame, if any. */
    let cancelScheduledMeasurement: (() => void) | null = null;
    /** Cancels the read that follows the max-width write, if any. */
    let cancelScheduledRead: (() => void) | null = null;
    /** Whether the pointer or the focus is currently inside the trigger. */
    let isOpen = false;

    const measurePosition = () => {
      const popoverElement = popoverRef.current;
      const triggerElement = document.getElementById(triggerId);

      if (!popoverElement || !triggerElement) return;

      const triggerRect = triggerElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate maximum width based on viewport and trigger position, using
      // the larger of the two sides so the panel can always fit somewhere.
      const maxWidthFromLeft =
        viewportWidth - triggerRect.left - VIEWPORT_PADDING;
      const maxWidthFromRight = triggerRect.right - VIEWPORT_PADDING;

      setMaxWidth(Math.max(maxWidthFromLeft, maxWidthFromRight));

      // A panel that is still hidden has no box to measure, so it is revealed
      // to layout only — `visibility: hidden` keeps it off the screen.
      const wasInvisible = popoverElement.classList.contains('invisible');
      if (wasInvisible) {
        popoverElement.style.visibility = 'hidden';
        popoverElement.classList.remove('invisible');
      }

      // The max-width above still has to be committed and laid out, so the
      // panel is measured on the next frame rather than right away.
      cancelScheduledRead = scheduleFrameTask(() => {
        cancelScheduledRead = null;

        const popoverRect = popoverElement.getBoundingClientRect();

        if (wasInvisible) {
          popoverElement.style.visibility = '';
          popoverElement.classList.add('invisible');
        }

        // Determine optimal Y alignment
        let newYAlign = yAlign;
        const spaceBelow = viewportHeight - triggerRect.bottom - TRIGGER_GAP;
        const spaceAbove = triggerRect.top - TRIGGER_GAP;

        if (yAlign === 'below' && spaceBelow < popoverRect.height) {
          // Not enough space below, try above
          if (spaceAbove >= popoverRect.height) {
            newYAlign = 'above';
          }
        } else if (yAlign === 'above' && spaceAbove < popoverRect.height) {
          // Not enough space above, try below
          if (spaceBelow >= popoverRect.height) {
            newYAlign = 'below';
          }
        }

        // Determine optimal X alignment
        let newXAlign = xAlign;
        const spaceRight = viewportWidth - triggerRect.left - VIEWPORT_PADDING;
        const spaceLeft = triggerRect.right - VIEWPORT_PADDING;

        if (xAlign === 'start' && spaceRight < popoverRect.width) {
          // Not enough space on the right, try left
          if (spaceLeft >= popoverRect.width) {
            newXAlign = 'end';
          }
        } else if (xAlign === 'end' && spaceLeft < popoverRect.width) {
          // Not enough space on the left, try right
          if (spaceRight >= popoverRect.width) {
            newXAlign = 'start';
          }
        }

        setComputedYAlign(newYAlign);
        setComputedXAlign(newXAlign);
      });
    };

    /**
     * Defers the measurement to the next frame, and to a single one however
     * many events fire.
     *
     * Reading `getBoundingClientRect()` straight from a scroll, resize or
     * observer callback forces a synchronous reflow. Sharing one frame with
     * every other measurement the page schedules keeps the reads in a single
     * batch, so React commits them all after the last one.
     */
    const scheduleMeasurement = () => {
      if (cancelScheduledMeasurement) return;

      cancelScheduledMeasurement = scheduleFrameTask(() => {
        cancelScheduledMeasurement = null;
        measurePosition();
      });
    };

    /*
     * Scrolling only matters while the panel is on screen, and a closed
     * popover is re-measured when it opens — behind an 800ms CSS delay, so the
     * measurement always lands before anything is painted. Subscribing on open
     * rather than on mount keeps a page holding several popovers from running
     * one capture-phase handler per popover on every scroll event, and leaves
     * a page whose popovers are never opened with no layout work at all.
     */
    const handleOpen = () => {
      if (!isOpen) {
        isOpen = true;
        window.addEventListener('scroll', scheduleMeasurement, {
          passive: true,
          capture: true,
        });
      }

      scheduleMeasurement();
    };

    const handleClose = () => {
      if (!isOpen) return;

      isOpen = false;
      window.removeEventListener('scroll', scheduleMeasurement, true);
    };

    const triggerElement = document.getElementById(triggerId);

    if (triggerElement) {
      triggerElement.addEventListener('mouseenter', handleOpen, {
        passive: true,
      });
      triggerElement.addEventListener('focusin', handleOpen, { passive: true });
      triggerElement.addEventListener('mouseleave', handleClose, {
        passive: true,
      });
      triggerElement.addEventListener('focusout', handleClose, {
        passive: true,
      });
    }

    // The panel keeps its own size in check: content growing past the viewport
    // has to flip the alignment even when the user did nothing.
    const resizeObserver = new ResizeObserver(() => {
      if (isOpen) scheduleMeasurement();
    });

    if (popoverRef.current) {
      resizeObserver.observe(popoverRef.current);
    }

    window.addEventListener('resize', scheduleMeasurement, { passive: true });

    return () => {
      cancelScheduledMeasurement?.();
      cancelScheduledRead?.();

      if (triggerElement) {
        triggerElement.removeEventListener('mouseenter', handleOpen);
        triggerElement.removeEventListener('focusin', handleOpen);
        triggerElement.removeEventListener('mouseleave', handleClose);
        triggerElement.removeEventListener('focusout', handleClose);
      }

      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleMeasurement);
      window.removeEventListener('scroll', scheduleMeasurement, true);
    };
  }, [triggerId, xAlign, yAlign]);

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
