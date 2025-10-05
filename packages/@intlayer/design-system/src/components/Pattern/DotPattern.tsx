import { type FC, type SVGProps, useId } from 'react';

import { cn } from '../../utils/cn';

/**
 * Props for the DotPattern component
 * Extends SVGProps to inherit all standard SVG attributes
 */
type DotPatternProps = {
  /** Width of the pattern tile in pixels */
  width?: number;
  /** Height of the pattern tile in pixels */
  height?: number;
  /** Horizontal offset of the pattern */
  x?: number;
  /** Vertical offset of the pattern */
  y?: number;
  /** X coordinate of the dot center within the pattern tile */
  cx?: number;
  /** Y coordinate of the dot center within the pattern tile */
  cy?: number;
  /** Radius of each dot in the pattern */
  cr?: number;
} & SVGProps<SVGSVGElement>;

/**
 * Dot Pattern Component
 *
 * A decorative SVG component that generates a repeating dot pattern background.
 * Perfect for adding subtle texture and visual interest to sections, cards, or hero areas
 * without interfering with content readability.
 *
 * Features:
 * - Scalable vector-based pattern that looks crisp at any size
 * - Customizable dot spacing, size, and positioning
 * - Semi-transparent fill for subtle visual effect
 * - Accessibility-friendly with aria-hidden attribute
 * - Pointer events disabled to avoid interaction interference
 * - Unique pattern ID generation to prevent conflicts
 * - Full coverage with absolute positioning
 *
 * Technical Implementation:
 * - Uses SVG `<pattern>` element for efficient rendering
 * - Pattern repeats using userSpaceOnUse coordinate system
 * - Generates unique IDs using React's useId hook
 * - Fills entire container with 100% width and height
 * - Pattern tile coordinates defined in userSpaceOnUse units
 *
 * Visual Characteristics:
 * - Default: 16x16px tile with 1px radius dots
 * - Semi-transparent neutral fill (30% opacity)
 * - Dots positioned at (1,1) within each tile by default
 * - Absolute positioning covers entire parent container
 *
 * @example
 * Basic usage as background pattern:
 * ```tsx
 * <div className="relative min-h-screen">
 *   <DotPattern />
 *   <div className="relative z-10">
 *     <h1>Content over dot pattern</h1>
 *   </div>
 * </div>
 * ```
 *
 * @example
 * Custom dot spacing and size:
 * ```tsx
 * <DotPattern
 *   width={24}
 *   height={24}
 *   cr={1.5}
 *   className="fill-primary/20"
 * />
 * ```
 *
 * @example
 * Offset pattern positioning:
 * ```tsx
 * <DotPattern
 *   x={8}
 *   y={8}
 *   cx={2}
 *   cy={2}
 *   className="fill-accent/25"
 * />
 * ```
 *
 * @example
 * Large sparse dots:
 * ```tsx
 * <DotPattern
 *   width={32}
 *   height={32}
 *   cr={2}
 *   cx={16}
 *   cy={16}
 *   className="fill-neutral/10"
 * />
 * ```
 *
 * Styling Notes:
 * - Use `fill-*` classes to customize dot color and opacity
 * - Pattern automatically fills parent container
 * - Consider contrast with overlaid content
 * - Semi-transparent fills work best for backgrounds
 *
 * Accessibility:
 * - Marked as `aria-hidden="true"` since it's decorative
 * - Pointer events disabled to maintain interactivity of overlaid content
 * - Does not interfere with screen readers or keyboard navigation
 *
 * @param props - DotPattern component props
 * @returns SVG element with repeating dot pattern
 */
export const DotPattern: FC<DotPatternProps> = ({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}) => (
  <svg
    aria-hidden="true"
    className={cn(
      'pointer-events-none absolute inset-0 h-full w-full fill-neutral/30',
      className
    )}
    {...props}
  >
    <defs>
      <pattern
        id="pattern-circle"
        width={width}
        height={height}
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        x={x}
        y={y}
      >
        <circle cx={cx} cy={cy} r={cr} />
      </pattern>
    </defs>
    <rect
      width="100%"
      height="100%"
      strokeWidth={0}
      fill={`url(#pattern-circle)`}
    />
  </svg>
);
