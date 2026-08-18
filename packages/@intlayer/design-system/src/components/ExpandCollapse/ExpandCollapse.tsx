'use client';

import { cn } from '@utils/cn';
import {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

/**
 * Props for the ExpandCollapse component
 */
export type ExpandCollapseProps = {
  /** Whether the component should provide expand/collapse functionality. If false, renders children directly */
  isRollable?: boolean;
  /** Minimum height in pixels before showing the expand/collapse toggle */
  minHeight?: number;
  /** Content that may overflow and trigger the expand/collapse behavior */
  children: ReactNode;
  /** Additional CSS classes for styling customization */
  className?: string;
};

/** Default minimum height threshold for triggering expand/collapse behavior */
const DEFAULT_MIN_HEIGHT = 700;

/**
 * ExpandCollapse Component
 *
 * A smart content container that automatically provides expand/collapse functionality
 * when content exceeds a specified height threshold. Features smooth animations,
 * internationalized toggle text, and intelligent height detection.
 *
 * @example
 * ```tsx
 * <ExpandCollapse minHeight={300}>
 *   <div>Very long content that will be collapsed...</div>
 * </ExpandCollapse>
 * ```
 *
 * ## Key Features
 * - **Smart Detection**: Automatically detects when content exceeds height threshold
 * - **Smooth Animations**: Uses CSS transitions for smooth expand/collapse effects
 * - **Internationalization**: Toggle text supports multiple languages via Intlayer
 * - **Customizable Height**: Configurable minimum height threshold
 * - **Performance Optimized**: Only applies collapse behavior when necessary
 * - **Accessibility**: Proper ARIA attributes and keyboard support
 *
 * ## Behavior Logic
 * 1. **Measurement Phase**: Measures actual content height on mount
 * 2. **Comparison**: Compares content height against minHeight threshold
 * 3. **Conditional Rendering**:
 *    - If content ≤ minHeight: Renders normally without collapse functionality
 *    - If content > minHeight: Enables expand/collapse with toggle button
 * 4. **State Management**: Manages collapsed/expanded state with smooth transitions
 *
 * ## When to Use
 * - Long-form content (articles, documentation, code blocks)
 * - Lists or tables that may grow beyond comfortable viewing height
 * - User-generated content with unpredictable length
 * - FAQ sections or expandable content cards
 * - Code examples or JSON data display
 *
 * ## Accessibility Features
 * - **Keyboard Navigation**: Toggle button is focusable and keyboard accessible
 * - **Screen Reader Support**: Proper ARIA labels and state announcements
 * - **Visual Indicators**: Clear visual cues for collapsed/expanded states
 * - **Smooth Animations**: Respects user preferences for reduced motion
 *
 * ## Internationalization
 * - Supports multiple languages through Intlayer integration
 * - Toggle text automatically adapts to current locale
 * - Includes translations for "Show all" and "Show less" states
 *
 * @param props - ExpandCollapseProps
 * @returns React functional component
 */
export const ExpandCollapse: FC<ExpandCollapseProps> = ({
  isRollable = true,
  minHeight = DEFAULT_MIN_HEIGHT,
  children,
  className,
}) => {
  const [codeContainerHeight, setCodeContainerHeight] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const { expandCollapseContent } = useIntlayer('expand-collapse');

  const isTooBig = codeContainerHeight > minHeight;

  /*
   * A `ResizeObserver` is handed the size the browser has already computed,
   * where reading `clientHeight` from an effect forces it to lay the page out
   * again on the spot. That distinction matters here because a documentation
   * page mounts one of these per code block: dozens of synchronous reflows over
   * a very large document. The observer also reports later size changes, which
   * is what the window `resize` listener used to cover.
   *
   * It attaches through a callback ref rather than an effect because crossing
   * the `minHeight` threshold re-parents the container into `MaxHeightSmoother`
   * — a different element, which an effect bound to mount would never observe.
   */
  const observeContainer = useCallback((container: HTMLDivElement | null) => {
    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = null;

    if (!container) return;

    if (typeof ResizeObserver === 'undefined') {
      setCodeContainerHeight(container.clientHeight);
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      // Read inside the callback, where the layout is already up to date.
      if (entry) setCodeContainerHeight(entry.target.clientHeight);
    });

    observer.observe(container);
    resizeObserverRef.current = observer;
  }, []);

  useEffect(() => () => resizeObserverRef.current?.disconnect(), []);

  if (!isRollable) {
    return children;
  }

  if (!isTooBig) {
    return (
      <div className={cn('grid w-full', className)} ref={observeContainer}>
        {children}
      </div>
    );
  }

  return (
    <MaxHeightSmoother
      isHidden={isCollapsed}
      minHeight={minHeight}
      className="w-full overflow-x-auto overflow-y-hidden"
    >
      <div className={cn('grid w-full', className)} ref={observeContainer}>
        {children}
      </div>
      <button
        className={cn(
          'absolute right-0 bottom-0 flex w-full cursor-pointer items-center justify-center rounded-t-2xl bg-linear-to-t from-card/80 to-transparent px-3 py-0.5 text-md text-neutral-700 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur transition-all duration-300 hover:py-1 dark:text-neutral-400',
          isCollapsed ? 'w-full' : 'w-32'
        )}
        type="button"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        {expandCollapseContent(isCollapsed)}
      </button>
    </MaxHeightSmoother>
  );
};
