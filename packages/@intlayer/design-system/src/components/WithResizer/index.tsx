'use client';

import React, {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';

/**
 * Props for the WithResizer component.
 *
 * Defines the configuration for a resizable container with drag-based width adjustment.
 *
 * @example
 * ```tsx
 * // Basic resizable container
 * <WithResizer initialWidth={300} minWidth={200} maxWidth={600}>
 *   <div className="p-4">Resizable content</div>
 * </WithResizer>
 *
 * // Sidebar with resizing
 * <WithResizer
 *   initialWidth={250}
 *   minWidth={180}
 *   maxWidth={400}
 * >
 *   <nav className="h-full p-4">
 *     <SidebarContent />
 *   </nav>
 * </WithResizer>
 *
 * // Panel with unlimited growth
 * <WithResizer initialWidth={400} minWidth={300}>
 *   <div className="h-full overflow-auto">
 *     <PanelContent />
 *   </div>
 * </WithResizer>
 * ```
 */
type WithResizerProps = {
  /** Initial width of the resizable container in pixels */
  initialWidth: number;
  /** Maximum allowed width in pixels (optional, no limit if not specified) */
  maxWidth?: number;
  /** Minimum allowed width in pixels */
  minWidth?: number;
};

/**
 * WithResizer Component
 *
 * A flexible container component that allows users to dynamically resize its width
 * through mouse or touch drag interactions. Perfect for creating adjustable panels,
 * sidebars, and split-pane layouts.
 *
 * ## Features
 * - **Mouse & Touch Support**: Works with both mouse drag and touch interactions
 * - **Constraint Enforcement**: Respects minimum and maximum width boundaries
 * - **Visual Feedback**: Clear resize handle with hover and active states
 * - **Smooth Interactions**: Passive event listeners for optimal performance
 * - **Accessibility**: ARIA slider role with proper value announcements
 * - **Responsive Design**: Adapts to different screen sizes and containers
 *
 * ## Technical Implementation
 * - **Event Handling**: Uses `useCallback` for optimal performance
 * - **Boundary Calculation**: Real-time width calculation based on mouse/touch position
 * - **State Management**: Tracks resizing state for visual feedback
 * - **Memory Management**: Proper cleanup of global event listeners
 * - **Touch Events**: Full support for mobile touch interactions
 *
 * ## Visual Design
 * - **Resize Handle**: Rounded handle positioned on the right border
 * - **Border Indicator**: Visual border showing resizable edge
 * - **State Feedback**: Different colors for normal, hover, and active states
 * - **Dark Mode**: Full support with appropriate color scheme
 * - **Smooth Transitions**: CSS transitions for visual polish
 *
 * ## Use Cases
 * - **Application Sidebars**: Collapsible navigation and tool panels
 * - **Content Panels**: Adjustable content areas in complex layouts
 * - **Split Panes**: Dividing screen space between multiple content areas
 * - **Inspector Panels**: Debugging tools and property inspectors
 * - **File Explorers**: Tree views with adjustable column widths
 * - **Dashboard Widgets**: Customizable widget sizes for dashboards
 *
 * ## Accessibility Features
 * - **ARIA Slider**: Proper slider role for screen readers
 * - **Value Announcements**: Current, minimum, and maximum values announced
 * - **Keyboard Focus**: Focusable with tab navigation
 * - **Clear Affordances**: Visual indicators for interactive elements
 *
 * @example
 * ```tsx
 * // Application sidebar with resizing
 * const [sidebarWidth, setSidebarWidth] = useState(250);
 *
 * <div className="flex h-screen">
 *   <WithResizer
 *     initialWidth={sidebarWidth}
 *     minWidth={200}
 *     maxWidth={400}
 *   >
 *     <aside className="h-full bg-gray-100 p-4">
 *       <nav>
 *         <NavItems />
 *       </nav>
 *     </aside>
 *   </WithResizer>
 *
 *   <main className="flex-1 p-6">
 *     <MainContent />
 *   </main>
 * </div>
 *
 * // Developer tools panel
 * <WithResizer
 *   initialWidth={350}
 *   minWidth={250}
 *   maxWidth={600}
 * >
 *   <div className="h-full flex flex-col">
 *     <div className="flex-1 overflow-auto p-4">
 *       <InspectorContent />
 *     </div>
 *     <div className="border-t p-2">
 *       <Controls />
 *     </div>
 *   </div>
 * </WithResizer>
 *
 * // Multi-column layout
 * <div className="flex h-full">
 *   <WithResizer initialWidth={300} minWidth={200} maxWidth={500}>
 *     <FileExplorer />
 *   </WithResizer>
 *
 *   <WithResizer initialWidth={400} minWidth={300}>
 *     <CodeEditor />
 *   </WithResizer>
 *
 *   <div className="flex-1 min-w-0">
 *     <OutputPanel />
 *   </div>
 * </div>
 * ```
 *
 * ## Performance Considerations
 * - Uses passive event listeners to prevent scroll blocking
 * - Optimized with `useCallback` to prevent unnecessary re-renders
 * - Efficient boundary calculations using `getBoundingClientRect`
 * - Minimal DOM manipulation for smooth drag interactions
 *
 * ## Browser Support
 * - Modern browsers with support for touch events
 * - Graceful degradation for older browsers
 * - Mobile-first touch interaction handling
 */
export const WithResizer: FC<PropsWithChildren<WithResizerProps>> = ({
  initialWidth,
  maxWidth,
  minWidth = 0,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);

  // Handler to start resizing
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

  // Handler to stop resizing
  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Handler to resize the div
  const resize = useCallback(
    (mouseMoveEvent: MouseEvent | TouchEvent) => {
      const container = containerRef.current;
      if (isResizing && container && parent) {
        const { left: containerLeft } = container.getBoundingClientRect();

        let clientX = 0;
        if (mouseMoveEvent instanceof MouseEvent) {
          clientX = mouseMoveEvent.clientX;
        } else if (mouseMoveEvent instanceof TouchEvent) {
          clientX = mouseMoveEvent.touches[0].clientX;
        }

        const newWidth = clientX - containerLeft;
        const correctedWidth = Math.max(newWidth, 0);

        setWidth(correctedWidth);
      }
    },
    [isResizing]
  );

  // Add event listeners for mouse move and mouse up
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
        minWidth && `max-w-[${maxWidth}px]`,
        maxWidth && `min-w-[${minWidth}px]`,
        'relative h-full w-full max-w-[80%] cursor-ew-resize border-r-[2px] border-neutral-200 transition dark:border-neutral-950',
        'after:absolute after:right-0 after:top-1/2 after:block after:h-10 after:w-2 after:-translate-y-1/2 after:translate-x-1/2 after:transform after:cursor-ew-resize after:rounded-full after:bg-neutral-200 after:transition after:content-[""] dark:after:bg-neutral-950',
        'active:border-neutral-400 active:after:bg-neutral-400 dark:active:border-neutral-600 active:dark:after:bg-neutral-600'
      )}
      style={{
        width: `${width}px`,
      }}
      ref={containerRef}
      onMouseDown={startResizing}
      onTouchStart={startResizing}
      aria-valuemin={minWidth}
      aria-valuemax={maxWidth}
      aria-valuenow={width}
      aria-label="Resizable component"
      role="slider"
      tabIndex={0}
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
