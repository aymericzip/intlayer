'use client';

import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Container } from '../Container';

/**
 * Props for the main Popover component
 * Extends HTMLDivElement attributes for full DOM compatibility
 */
export type PopoverProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  /** Unique identifier linking the trigger to its popover content for accessibility */
  identifier: string;
};

/**
 * Composite type for the Popover component with Detail subcomponent
 * Allows for Popover.Detail usage pattern
 */
export type PopoverType = FC<PopoverProps> & {
  Detail: FC<DetailProps>;
};

/**
 * Horizontal alignment options for popover positioning
 */
export enum PopoverXAlign {
  /** Align popover to start (left) of trigger */
  START = 'start',
  /** Align popover to end (right) of trigger */
  END = 'end',
}

/**
 * Vertical alignment options for popover positioning
 */
export enum PopoverYAlign {
  /** Position popover below the trigger */
  BELOW = 'bellow',
  /** Position popover above the trigger */
  ABOVE = 'above',
}

/**
 * Popover Component
 *
 * A versatile popover container that displays contextual content when triggered by hover
 * or focus interactions. Built with accessibility in mind and supports multiple positioning
 * options with smooth animations.
 *
 * Features:
 * - Hover and focus-based triggering
 * - Multiple positioning options (above/below, start/end)
 * - Accessibility compliant with ARIA attributes
 * - Smooth animations with configurable delays
 * - Optional directional arrows
 * - Automatic z-index management
 * - Responsive design support
 *
 * Architecture:
 * - Main Popover acts as trigger container
 * - Popover.Detail renders the actual popover content
 * - Uses CSS groups for coordinated hover/focus states
 * - Unique identifier system prevents conflicts
 *
 * @example
 * Basic hover popover:
 * ```jsx
 * <Popover identifier="help-tooltip">
 *   <button>Need Help?</button>
 *
 *   <Popover.Detail identifier="help-tooltip">
 *     <div>This is helpful information!</div>
 *   </Popover.Detail>
 * </Popover>
 * ```
 *
 * @example
 * Focus-triggered popover:
 * ```jsx
 * <Popover identifier="focus-menu">
 *   <input placeholder="Focus me" />
 *
 *   <Popover.Detail
 *     identifier="focus-menu"
 *     isFocusable
 *     isOverable={false}
 *   >
 *     <div>Focus-only menu content</div>
 *   </Popover.Detail>
 * </Popover>
 * ```
 *
 * @example
 * Positioned popover with custom alignment:
 * ```jsx
 * <Popover identifier="positioned">
 *   <span>Hover me</span>
 *
 *   <Popover.Detail
 *     identifier="positioned"
 *     xAlign={PopoverXAlign.END}
 *     yAlign={PopoverYAlign.ABOVE}
 *     displayArrow={false}
 *   >
 *     <div>Above and right-aligned</div>
 *   </Popover.Detail>
 * </Popover>
 * ```
 *
 * Accessibility Features:
 * - Proper ARIA labeling and relationships
 * - Keyboard navigation support
 * - Screen reader compatibility
 * - Focus management
 *
 * Performance Considerations:
 * - CSS-only animations for smooth transitions
 * - Efficient group-based state management
 * - Minimal DOM updates during interactions
 *
 * @param props - Popover component props
 * @returns Trigger container with popover functionality
 */
export const Popover: PopoverType = ({
  children,
  className,
  identifier,
  ...props
}) => (
  <div
    className={cn('group/popover relative flex cursor-pointer', className)}
    id={`unrollable-panel-button-${identifier}`}
    aria-haspopup
    {...props}
  >
    {children}
  </div>
);

/**
 * Props for the Popover.Detail component
 * Extends HTMLDivElement attributes for styling flexibility
 */
export type DetailProps = HTMLAttributes<HTMLDivElement> & {
  /** Whether the popover responds to focus events on the trigger */
  isFocusable?: boolean;
  /** Controls visibility state - undefined allows automatic hover/focus control */
  isHidden?: boolean;
  /** Whether the popover responds to hover events on the trigger */
  isOverable?: boolean;
  /** Unique identifier matching the trigger's identifier for accessibility */
  identifier: string;
  /** Horizontal positioning relative to trigger */
  xAlign?: PopoverXAlign | `${PopoverXAlign}`;
  /** Vertical positioning relative to trigger */
  yAlign?: PopoverYAlign | `${PopoverYAlign}`;
  /** Whether to display the directional arrow indicator */
  displayArrow?: boolean;
};

/**
 * Popover Detail Component
 *
 * The actual popover content container with advanced positioning, animation, and
 * accessibility features. Automatically manages visibility based on trigger interactions.
 *
 * Features:
 * - Precise positioning with alignment options
 * - Smooth fade and slide animations
 * - Configurable directional arrows
 * - Hover and focus interaction support
 * - Accessibility-compliant ARIA attributes
 * - High z-index for overlay behavior
 * - Automatic visibility management
 *
 * Positioning System:
 * - X-axis: START (left-aligned) or END (right-aligned)
 * - Y-axis: BELOW (underneath) or ABOVE (on top)
 * - Automatic spacing with 1rem gap from trigger
 * - Responsive minimum width matching trigger
 *
 * Arrow Indicators:
 * - CSS-generated triangular arrows
 * - Positioned based on alignment settings
 * - Points toward trigger for visual connection
 * - Can be disabled for clean, minimal appearance
 *
 * Animation Behavior:
 * - Starts invisible with opacity: 0
 * - Smooth 400ms transitions with easing
 * - 800ms delay for hover states (prevents flicker)
 * - Immediate hiding when trigger loses focus/hover
 *
 * @example
 * Rich content popover:
 * ```jsx
 * <Popover.Detail identifier="rich-content">
 *   <div className="p-4">
 *     <h3>Popover Title</h3>
 *     <p>Detailed information with multiple paragraphs.</p>
 *     <button>Action Button</button>
 *   </div>
 * </Popover.Detail>
 * ```
 *
 * @example
 * Menu-style popover:
 * ```jsx
 * <Popover.Detail
 *   identifier="context-menu"
 *   displayArrow={false}
 *   xAlign={PopoverXAlign.END}
 * >
 *   <ul className="py-2">
 *     <li><button className="w-full px-4 py-2">Edit</button></li>
 *     <li><button className="w-full px-4 py-2">Delete</button></li>
 *   </ul>
 * </Popover.Detail>
 * ```
 *
 * @param props - Popover Detail component props
 * @returns Positioned popover content with animations and accessibility
 */
const Detail: FC<DetailProps> = ({
  children,
  isHidden = undefined,
  isOverable = true,
  isFocusable = false,
  xAlign = PopoverXAlign.START,
  yAlign = PopoverYAlign.BELOW,
  identifier,
  className,
  displayArrow = true,
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
        `unrollable-panel-button-${identifier}`
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
      `unrollable-panel-button-${identifier}`
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
  }, [identifier, xAlign, yAlign]);

  return (
    <Container
      ref={popoverRef}
      transparency="sm"
      role="group"
      aria-hidden={isHidden}
      aria-labelledby={`unrollable-panel-button-${identifier}`}
      id={`unrollable-panel-${identifier}`}
      className={cn(
        'absolute z-[1000] min-w-full rounded-md ring-1 ring-neutral',

        /* Positioning */
        computedXAlign === 'start' && 'left-0',
        computedXAlign === 'end' && 'right-0',
        computedYAlign === 'bellow' && 'top-[calc(100%+1rem)]',
        computedYAlign === 'above' && 'bottom-[calc(100%+1rem)]',

        /* Arrow indicator */
        displayArrow &&
          'before:absolute before:z-[999] before:h-0 before:w-0 before:content-[""]',

        /* Horizontal positioning */
        displayArrow && computedXAlign === 'start' && 'before:left-2',
        displayArrow && computedXAlign === 'end' && 'before:right-2',

        /* Arrow pointing up (when popover is below trigger) */
        displayArrow &&
          computedYAlign === 'bellow' &&
          'before:-top-[10px] before:border-r-[10px] before:border-r-transparent before:border-b-[10px] before:border-b-neutral before:border-l-[10px] before:border-l-transparent',

        /* Arrow pointing down (when popover is above trigger) */
        displayArrow &&
          computedYAlign === 'above' &&
          'before:-bottom-[10px] before:border-t-[10px] before:border-t-neutral before:border-r-[10px] before:border-r-transparent before:border-l-[10px] before:border-l-transparent',

        /* Visibility management */
        'overflow-x-visible opacity-0 transition-all duration-400 ease-in-out',
        isHidden !== false ? 'invisible' : 'visible opacity-100 delay-800',
        isOverable &&
          'group-hover/popover:visible group-hover/popover:opacity-100 group-hover/popover:delay-800',
        isFocusable &&
          'group-focus-within/popover:visible group-focus-within/popover:opacity-100 group-focus-within/popover:delay-800',
        className
      )}
      {...props}
      style={{
        ...props.style,
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
      }}
    >
      {children}
    </Container>
  );
};

Popover.Detail = Detail;
