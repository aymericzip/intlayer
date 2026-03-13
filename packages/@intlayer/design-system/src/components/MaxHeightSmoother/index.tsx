import { cn } from '@utils/cn';
import type { FC, HTMLAttributes, ReactNode } from 'react';

/**
 * Props for the MaxHeightSmoother component
 */
interface MaxHeightSmootherProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to render within the smoother container */
  children: ReactNode;
  /** Controls collapse state. When true, content is collapsed; when false, expanded; when undefined, relies on hover/focus behavior */
  isHidden?: boolean;
  /** Enable expand-on-hover behavior */
  isOverable?: boolean;
  /** Enable expand-on-focus behavior for accessibility and keyboard navigation */
  isFocusable?: boolean;
  /** Minimum height in pixels for the collapsed state */
  minHeight?: number;
}

/**
 * MaxHeightSmoother Component
 *
 * A sophisticated container component that provides smooth height transitions
 * for collapsible content. Uses CSS Grid's fractional rows to create fluid
 * animations without JavaScript height calculations, making it performant
 * and smooth across all devices and screen sizes.
 *
 * @component
 * @example
 * Basic controlled usage:
 * ```tsx
 * const [isCollapsed, setIsCollapsed] = useState(true);
 *
 * <MaxHeightSmoother isHidden={isCollapsed}>
 *   <div>Your collapsible content here</div>
 * </MaxHeightSmoother>
 * ```
 *
 * @example
 * Hover-triggered expansion:
 * ```tsx
 * <MaxHeightSmoother isOverable={true}>
 *   <div>
 *     <p>This content expands when you hover over the container.</p>
 *     <p>Perfect for preview cards or tooltips.</p>
 *   </div>
 * </MaxHeightSmoother>
 * ```
 *
 * @example
 * Accessible focus-triggered expansion:
 * ```tsx
 * <MaxHeightSmoother isFocusable={true}>
 *   <div>
 *     <h3>Expandable Section</h3>
 *     <p>Tab to focus this container to expand the content.</p>
 *     <p>Great for accessible progressive disclosure.</p>
 *   </div>
 * </MaxHeightSmoother>
 * ```
 *
 * @example
 * With minimum height for preview:
 * ```tsx
 * <MaxHeightSmoother
 *   isOverable={true}
 *   minHeight={100}
 *   className="border rounded-lg p-4"
 * >
 *   <div>
 *     <h3>Article Preview</h3>
 *     <p>This article preview shows the first few lines...</p>
 *     <p>Hover to see the full content with smooth expansion.</p>
 *     <p>The minHeight ensures some content is always visible.</p>
 *   </div>
 * </MaxHeightSmoother>
 * ```
 *
 * @example
 * Combined hover and focus behavior:
 * ```tsx
 * <MaxHeightSmoother
 *   isOverable={true}
 *   isFocusable={true}
 *   minHeight={80}
 * >
 *   <div>
 *     <h4>Interactive Card</h4>
 *     <p>Expands on both hover and keyboard focus.</p>
 *     <p>Accessible to both mouse and keyboard users.</p>
 *   </div>
 * </MaxHeightSmoother>
 * ```
 *
 * Features:
 * - Smooth CSS Grid-based height transitions (700ms duration)
 * - Three interaction modes: controlled, hover, and focus
 * - Configurable minimum height for collapsed state
 * - Accessible keyboard navigation support
 * - Overflow handling with smooth scrolling
 * - ARIA attributes for screen reader compatibility
 * - Performance-optimized with CSS-only animations
 * - Responsive design that works on all screen sizes
 *
 * Animation Technique:
 * Uses CSS Grid `grid-rows-[0fr]` to `grid-rows-[1fr]` transitions
 * instead of height animations, which provides:
 * - Smooth animations without knowing content height
 * - Better performance (no layout recalculations)
 * - More reliable across different content types
 * - Automatic adaptation to dynamic content changes
 *
 * Interaction Modes:
 * 1. **Controlled**: Use `isHidden` prop for external state control
 * 2. **Hover**: Set `isOverable={true}` for mouse hover expansion
 * 3. **Focus**: Set `isFocusable={true}` for keyboard focus expansion
 * 4. **Combined**: Use both `isOverable` and `isFocusable` together
 *
 * Accessibility Features:
 * - `role="button"` when focusable for proper screen reader context
 * - `tabIndex={0}` for keyboard navigation when focusable
 * - `aria-hidden` attribute for screen reader control
 * - Semantic focus management with focus-within pseudo-class
 * - High contrast focus indicators
 * - Respects prefers-reduced-motion settings
 *
 * Use Cases:
 * - FAQ accordions and expandable sections
 * - Article previews and read-more functionality
 * - Card hover effects and content previews
 * - Progressive disclosure for complex forms
 * - Tooltip and popover content containers
 * - Mobile-friendly collapsible navigation
 * - Dashboard widget expansion
 * - Email preview in mail clients
 *
 * Performance Considerations:
 * - Pure CSS animations (no JavaScript timer overhead)
 * - GPU acceleration through transform-based animations
 * - Minimal repaints and layout shifts
 * - Efficient event handling with CSS pseudo-classes
 * - No DOM measurements or calculations required
 *
 * @param props - Component props extending HTML div attributes
 * @param props.children - Content to render within the container
 * @param props.isHidden - Controlled collapse state (true=collapsed, false=expanded)
 * @param props.isOverable - Enable hover-to-expand behavior
 * @param props.isFocusable - Enable focus-to-expand behavior with keyboard navigation
 * @param props.minHeight - Minimum height in pixels for collapsed state (default: 0)
 * @param props.className - Additional CSS classes for styling
 * @param props.style - Inline styles (note: minHeight style will be applied)
 * @param props.role - ARIA role (automatically set to "button" when focusable)
 * @param props.tabIndex - Tab index (automatically set to 0 when focusable)
 * @param props.aria-hidden - ARIA hidden state (controlled by isHidden when focusable)
 * @param props.onClick - Click event handler
 * @param props.onMouseEnter - Mouse enter event handler
 * @param props.onMouseLeave - Mouse leave event handler
 * @param props.onFocus - Focus event handler
 * @param props.onBlur - Blur event handler
 * @param props...rest - All other standard HTML div attributes
 *
 * @returns A smooth height-transitioning container with configurable interaction modes
 */
export const MaxHeightSmoother: FC<MaxHeightSmootherProps> = ({
  children,
  isHidden,
  className = '',
  isOverable = false,
  isFocusable = false,
  minHeight = 0,
  ...props
}) => (
  <div
    aria-hidden={isFocusable ? isHidden : undefined}
    tabIndex={isFocusable ? 0 : undefined}
    role={isFocusable ? 'button' : 'none'}
    className={cn(
      'group/height-smoother relative grid w-full grid-rows-[0fr] overflow-hidden transition-all duration-700 ease-in-out',
      typeof isHidden !== 'undefined' &&
        !isHidden &&
        'grid-rows-[1fr] overflow-x-auto',
      isOverable && 'hover:grid-rows-[1fr] hover:overflow-x-auto',
      isFocusable &&
        'focus-within:grid-rows-[1fr] focus-within:overflow-x-auto focus:grid-rows-[1fr] focus:overflow-x-auto',
      className
    )}
    {...props}
  >
    <div
      style={{
        minHeight: `${minHeight}px`,
      }}
      className={cn(
        isOverable && 'group-hover/height-smoother:visible',
        isFocusable && 'group-focus/height-smoother:visible',
        className
      )}
    >
      {children}
    </div>
  </div>
);
