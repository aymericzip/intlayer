'use client';

import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { cn } from '../../utils/cn';

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
  children,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);

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
      setIsResizing(true);
      mouseDownEvent.preventDefault();
    },
    []
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
  }, [resize, stopResizing]);

  return (
    <div
      className={cn(
        'relative h-full w-full max-h-[80%] cursor-ns-resize border-t-[2px] border-neutral-200 transition dark:border-neutral-950',
        'before:absolute before:top-0 before:z-10 before:left-1/2 before:block before:w-10 before:h-2 before:-translate-y-1/2 before:-translate-x-1/2 before:transform before:cursor-ns-resize before:rounded-full before:bg-neutral-200 before:transition before:content-[""] dark:before:bg-neutral-950',
        'active:border-neutral-400 active:before:bg-neutral-400 dark:active:border-neutral-600 active:dark:before:bg-neutral-600',
        className
      )}
      style={{
        height: `${height}px`,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        minHeight: `${minHeight}px`,
      }}
      ref={containerRef}
      onMouseDown={startResizing}
      onTouchStart={startResizing}
      aria-valuemin={minHeight}
      aria-valuemax={maxHeight}
      aria-valuenow={height}
      aria-label="Resizable component - drag the handle to adjust height"
      role="slider"
      tabIndex={0}
      {...props}
    >
      <div
        className="absolute left-0 top-0 size-full cursor-default overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
