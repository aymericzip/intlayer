'use client';

import { cn } from '@utils/cn';
import type React from 'react';
import {
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const HANDLE_DOUBLE_CLICK_ZONE_PX = 16;

/**
 * Props for the HeightResizer component
 *
 * @interface HeightResizerProps
 */
type HeightResizerProps = {
  /**
   * Initial height in pixels for the resizable container
   * Sets the default size when the component first loads
   * @example 200
   */
  initialHeight: number;

  /**
   * Maximum height in pixels that the user can resize to (optional)
   * When undefined, no maximum limit is enforced
   * @example 500
   */
  maxHeight?: number;

  /**
   * Minimum height in pixels that the user can resize to (optional)
   * Prevents the container from being resized below this threshold
   * @default 0
   * @example 50
   */
  minHeight?: number;
  /**
   * Disable the resizer. When true, it behaves as a normal static container without drag handle or resizing capability.
   * @default false
   */
  isDisabled?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * HeightResizer Component
 *
 * A resizable container component that allows users to dynamically adjust the height
 * by dragging a visual handle at the top. Provides smooth resizing with optional
 * minimum and maximum height constraints.
 *
 * ## Key Features
 * - **Interactive Resizing**: Drag handle to resize container vertically
 * - **Touch Support**: Full support for touch devices and mobile interactions
 * - **Height Constraints**: Optional minimum and maximum height limits
 * - **Visual Feedback**: Handle with hover and active states for clear interaction
 * - **Accessibility**: ARIA slider role with value announcements for screen readers
 * - **Smooth Animation**: CSS transitions for polished user experience
 *
 * ## Use Cases
 * - Code editors with resizable panels
 * - Chat interfaces with adjustable message areas
 * - Dashboard widgets with user-customizable sizes
 * - Documentation viewers with resizable content panes
 * - Settings panels with expandable sections
 *
 * ## Interaction Model
 * The component uses a drag interaction model where users click and drag the visual
 * handle (rounded bar) at the top of the container. The resize calculation is based
 * on the difference between the current cursor position and the container's top edge.
 *
 * ## Accessibility Features
 * - **ARIA Slider**: Proper slider role for assistive technologies
 * - **Value Announcements**: Current, min, and max values announced to screen readers
 * - **Keyboard Navigation**: Focusable with standard slider keyboard support
 * - **Visual Indicators**: Clear visual handle for drag interaction
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <HeightResizer initialHeight={200}>
 *   <div>Your resizable content here</div>
 * </HeightResizer>
 *
 * // With height constraints
 * <HeightResizer
 *   initialHeight={300}
 *   minHeight={100}
 *   maxHeight={600}
 * >
 *   <div>Content with size limits</div>
 * </HeightResizer>
 *
 * // In a code editor context
 * <HeightResizer
 *   initialHeight={400}
 *   minHeight={150}
 *   className="border rounded-lg"
 * >
 *   <CodeEditor />
 * </HeightResizer>
 * ```
 *
 * @param props - HeightResizer component props
 * @param props.initialHeight - Starting height in pixels
 * @param props.minHeight - Optional minimum height constraint
 * @param props.maxHeight - Optional maximum height constraint
 * @param props.children - Content to display in the resizable container
 * @param props.className - Additional CSS classes for styling
 * @returns Interactive resizable container component
 */
export const HeightResizer: FC<PropsWithChildren<HeightResizerProps>> = ({
  initialHeight,
  maxHeight,
  minHeight = 0,
  isDisabled = false,
  children,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);
  const lastExpandedHeightRef = useRef(initialHeight);

  /**
   * Handler to initiate the resizing process
   * Prevents default browser behavior and sets the resizing state
   *
   * @param mouseDownEvent - Mouse or touch event from the drag handle
   */
  const startResizing = useCallback(
    (
      mouseDownEvent:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>
    ) => {
      if (isDisabled) return;
      setIsResizing(true);
      mouseDownEvent.preventDefault();
    },
    [isDisabled]
  );

  /**
   * Handler to stop the resizing process
   * Resets the resizing state when user releases the drag handle
   */
  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  /**
   * Core resize logic that calculates new height based on cursor position
   * Handles both mouse and touch events with boundary checking
   *
   * @param mouseMoveEvent - Mouse or touch move event during drag
   */
  const resize = useCallback(
    (mouseMoveEvent: MouseEvent | TouchEvent) => {
      const container = containerRef.current;
      if (isResizing && container) {
        const { height: containerHeight, top: containerTop } =
          container.getBoundingClientRect();

        let clientY = 0;
        if (mouseMoveEvent instanceof MouseEvent) {
          clientY = mouseMoveEvent.clientY;
        } else if (mouseMoveEvent instanceof TouchEvent) {
          clientY = mouseMoveEvent.touches[0].clientY;
        }

        const resizeDifference = clientY - containerTop;
        const newHeight = containerHeight - resizeDifference;

        // Apply height constraints
        let correctedHeight = Math.max(newHeight, minHeight);
        if (maxHeight !== undefined) {
          correctedHeight = Math.min(correctedHeight, maxHeight);
        }

        setHeight(correctedHeight);
      }
    },
    [isResizing, minHeight, maxHeight]
  );

  /**
   * Effect to manage global event listeners for resize interactions
   * Handles both mouse and touch events with proper cleanup
   */
  useEffect(() => {
    if (isDisabled) return;

    window.addEventListener('mousemove', resize, { passive: true });
    window.addEventListener('mouseup', stopResizing);
    window.addEventListener('touchmove', resize, { passive: true });
    window.addEventListener('touchend', stopResizing);

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('touchmove', resize);
      window.removeEventListener('touchend', stopResizing);
    };
  }, [resize, stopResizing, isDisabled]);

  useEffect(() => {
    if (height > minHeight) {
      lastExpandedHeightRef.current = height;
    }
  }, [height, minHeight]);

  const handleDoubleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;

      const { top } = el.getBoundingClientRect();
      if (event.clientY - top > HANDLE_DOUBLE_CLICK_ZONE_PX) return;

      event.preventDefault();
      event.stopPropagation();

      if (isDisabled) return;

      if (height > minHeight) {
        setHeight(minHeight);
        return;
      }

      const capped =
        maxHeight !== undefined
          ? Math.min(lastExpandedHeightRef.current, maxHeight)
          : lastExpandedHeightRef.current;
      setHeight(Math.max(capped, minHeight));
    },
    [height, maxHeight, minHeight, isDisabled]
  );

  return (
    <div
      className={cn(
        'relative h-full w-full transition',
        !isDisabled &&
          'max-h-[80%] cursor-ns-resize border-neutral-200 border-t-[2px] dark:border-neutral-950',
        !isDisabled &&
          'before:absolute before:top-0 before:left-1/2 before:z-10 before:block before:h-2 before:w-10 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:cursor-ns-resize before:rounded-full before:bg-neutral-200 before:transition before:content-[""] dark:before:bg-neutral-950',
        !isDisabled &&
          'active:border-neutral-400 active:before:bg-neutral-400 dark:active:border-neutral-600 active:dark:before:bg-neutral-600',
        className
      )}
      style={{
        height: isDisabled ? '100%' : `${height}px`,
        maxHeight: isDisabled
          ? '100%'
          : maxHeight
            ? `${maxHeight}px`
            : undefined,
        minHeight: isDisabled ? undefined : `${minHeight}px`,
      }}
      ref={containerRef}
      onMouseDown={isDisabled ? undefined : startResizing}
      onTouchStart={isDisabled ? undefined : startResizing}
      onDoubleClick={isDisabled ? undefined : handleDoubleClick}
      aria-valuemin={isDisabled ? undefined : minHeight}
      aria-valuemax={isDisabled ? undefined : maxHeight}
      aria-valuenow={isDisabled ? undefined : height}
      aria-label={
        isDisabled
          ? undefined
          : 'Resizable component - drag the handle to adjust height'
      }
      role={isDisabled ? 'none' : 'slider'}
      tabIndex={isDisabled ? undefined : 0}
      {...props}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Stops content clicks from triggering resize on the parent slider */}
      <div
        role="presentation"
        className="absolute top-0 left-0 size-full cursor-default overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
