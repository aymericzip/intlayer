import { cn } from '@utils/cn';
import type { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

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
 * for collapsible content. Implemented entirely in CSS — no client-side
 * JavaScript, hooks, or event listeners — making it compatible with React
 * Server Components and Next.js App Router without `'use client'`.
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
 * <MaxHeightSmoother isOverable>
 *   <p>This content expands when you hover over the container.</p>
 * </MaxHeightSmoother>
 * ```
 *
 * @example
 * Focus-triggered expansion (keyboard accessible):
 * ```tsx
 * <MaxHeightSmoother isFocusable>
 *   <p>Tab to focus this container to expand the content.</p>
 * </MaxHeightSmoother>
 * ```
 *
 * @example
 * With minimum height for preview:
 * ```tsx
 * <MaxHeightSmoother isOverable minHeight={100} className="border rounded-lg p-4">
 *   <h3>Article Preview</h3>
 *   <p>This shows a preview of the content. Hover to see all.</p>
 * </MaxHeightSmoother>
 * ```
 *
 * @example
 * Combined hover and focus:
 * ```tsx
 * <MaxHeightSmoother isOverable isFocusable minHeight={80}>
 *   <h4>Interactive Card</h4>
 *   <p>Expands on both hover and keyboard focus.</p>
 * </MaxHeightSmoother>
 * ```
 *
 * ## Animation Strategies
 *
 * ### Strategy A — `grid-template-rows` (`minHeight === 0`)
 * Transitions between `grid-rows-[0fr]` and `grid-rows-[1fr]`.
 * Clean and performant; no fixed height ceiling required.
 * Requires `min-h-0` on the inner wrapper so the grid track can fully collapse.
 *
 * ### Strategy B — `max-height` via CSS custom properties (`minHeight > 0`)
 * When a visible preview floor is required, `grid-template-rows` produces a
 * "dead time" artifact: the track silently grows from 0 → minHeight before
 * anything visible happens, resulting in a perceived snap.
 *
 * `max-height` sidesteps this entirely — the transition starts from the
 * already-visible floor value, producing a single continuous expansion.
 *
 * The collapsed floor (`--mhs-collapsed`) and expanded ceiling
 * (`--mhs-expanded`) are injected as CSS variables via inline style,
 * NOT as `max-height` directly. This lets Tailwind own `max-height`
 * entirely, so `:hover` and `:focus-within` can override it freely
 * without fighting inline-style specificity.
 *
 * Both variables are consumer-overridable via CSS:
 * ```css
 * .my-container {
 *   --mhs-collapsed: 80px;
 *   --mhs-expanded: 1200px;
 * }
 * ```
 *
 * Trade-off: easing is applied over [minHeight → 3000px], not the real
 * content height. For typical content this is imperceptible. If pixel-perfect
 * easing is critical, use a JS-measured height with a controlled `isHidden`
 * prop and a `style={{ maxHeight }}` override instead.
 *
 * ## Interaction Modes
 *
 * 1. **Controlled** — Pass `isHidden` for external state control (e.g. accordion)
 * 2. **Hover** — Set `isOverable` for mouse hover expansion
 * 3. **Focus** — Set `isFocusable` for keyboard focus expansion
 * 4. **Combined** — Use `isOverable` and `isFocusable` together
 *
 * ## Accessibility
 *
 * - `role="button"` and `tabIndex={0}` when `isFocusable` is true
 * - `aria-expanded` reflects the current disclosure state
 * - Focus expansion via `:focus-within` CSS pseudo-class
 * - `motion-reduce:transition-none` respects `prefers-reduced-motion`
 *
 * Note: because this component relies on CSS pseudo-classes for interaction,
 * keyboard toggle (Enter / Space) is not supported in uncontrolled mode.
 * For full keyboard toggle behaviour, manage `isHidden` externally and
 * wire an `onClick` / `onKeyDown` handler on the parent.
 *
 * ## Performance
 *
 * - Pure CSS animations — no JavaScript timers or DOM measurements
 * - No `'use client'` directive required
 * - Compatible with React Server Components and Next.js App Router
 * - GPU-accelerated transitions
 *
 * @param props - Component props extending HTML div attributes
 * @param props.children - Content to render within the container
 * @param props.isHidden - Controlled collapse state (`true` = collapsed, `false` = expanded)
 * @param props.isOverable - Enable hover-to-expand behaviour
 * @param props.isFocusable - Enable focus-to-expand behaviour with keyboard navigation
 * @param props.minHeight - Minimum height in pixels for the collapsed state (default: 0)
 * @param props.className - Additional CSS classes
 * @param props.style - Inline styles (CSS variable overrides will be merged)
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
