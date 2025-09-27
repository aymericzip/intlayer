import type { FC, SVGProps } from 'react';
import { cn } from '../../utils/cn';

/**
 * Props for the GridPattern component
 * Extends SVGProps to inherit all standard SVG attributes
 */
type GridPatternProps = {
  /** Width of each grid cell in pixels */
  width?: number;
  /** Height of each grid cell in pixels */
  height?: number;
  /** Horizontal offset of the pattern */
  x?: number;
  /** Vertical offset of the pattern */
  y?: number;
  /** Array of grid coordinates to highlight as filled squares */
  squares?: [x: number, y: number][];
  /** Dash pattern for grid lines (0 = solid, positive = dashed) */
  strokeDasharray?: number;
} & SVGProps<SVGSVGElement>;

/**
 * Unique identifier for the grid pattern definition
 * Static to ensure consistent referencing across instances
 */
const id = 'grid-pattern';

/**
 * Grid Pattern Component
 *
 * A versatile SVG component that generates a repeating grid pattern background with
 * optional highlighted squares. Ideal for technical layouts, dashboards, design mockups,
 * and any interface requiring structured visual organization.
 *
 * Features:
 * - Scalable vector-based grid that renders crisp at any zoom level
 * - Customizable cell dimensions and spacing
 * - Optional square highlighting for emphasis or data visualization
 * - Configurable stroke patterns (solid or dashed lines)
 * - Theme-aware styling with automatic dark mode support
 * - Accessibility-friendly with screen reader exclusion
 * - Performance optimized with pointer events disabled
 * - Full container coverage with responsive sizing
 *
 * Technical Architecture:
 * - Uses SVG `<pattern>` for memory-efficient repetition
 * - Grid lines drawn with path elements for precision
 * - Highlighted squares rendered as separate rect elements
 * - Pattern coordinates use userSpaceOnUse for consistency
 * - Static pattern ID prevents conflicts between instances
 *
 * Visual Design:
 * - Default: 40x40px grid cells with subtle neutral strokes
 * - Light mode: 10% fill opacity, 15% stroke opacity
 * - Dark mode: Enhanced 30% stroke opacity for visibility
 * - Slight offset (-1px) for optimal line rendering
 * - Optional dashed lines for more subtle appearance
 *
 * Highlighted Squares:
 * - Defined by coordinate arrays [x, y] where x,y are grid positions
 * - Automatically sized to fit within grid cells (width-1, height-1)
 * - Positioned with 1px offset for visual separation from grid lines
 * - Inherit theme-based fill colors for consistency
 *
 * @example
 * Basic grid background:
 * ```tsx
 * <div className="relative min-h-screen">
 *   <GridPattern />
 *   <div className="relative z-10">
 *     <h1>Content over grid</h1>
 *   </div>
 * </div>
 * ```
 *
 * @example
 * Custom grid size with dashed lines:
 * ```tsx
 * <GridPattern
 *   width={60}
 *   height={60}
 *   strokeDasharray={2}
 *   className="stroke-primary/20"
 * />
 * ```
 *
 * @example
 * Data visualization with highlighted squares:
 * ```tsx
 * <GridPattern
 *   width={30}
 *   height={30}
 *   squares={[
 *     [0, 1], [1, 1], [2, 1],
 *     [1, 2], [3, 0], [4, 2]
 *   ]}
 *   className="fill-accent/20 stroke-accent/30"
 * />
 * ```
 *
 * @example
 * Fine grid for technical layouts:
 * ```tsx
 * <GridPattern
 *   width={20}
 *   height={20}
 *   strokeDasharray={1}
 *   className="stroke-neutral/8 fill-neutral/5"
 * />
 * ```
 *
 * Styling Guidelines:
 * - Use low opacity values (5-30%) for background subtlety
 * - Consider theme contrast when customizing colors
 * - Dashed patterns work well for secondary grids
 * - Match grid colors with overall design system
 *
 * Performance Notes:
 * - Pattern definition reused efficiently across large areas
 * - Highlighted squares rendered individually for flexibility
 * - Pointer events disabled to prevent interaction blocking
 * - SVG optimized for browser rendering performance
 *
 * Accessibility:
 * - Hidden from screen readers with aria-hidden="true"
 * - Purely decorative - doesn't convey essential information
 * - Maintains sufficient contrast with overlaid content
 *
 * @param props - GridPattern component props
 * @returns SVG element with repeating grid pattern and optional highlights
 */
export const GridPattern: FC<GridPatternProps> = ({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  squares,
  className,
  ...props
}) => (
  <svg
    aria-hidden="true"
    className={cn(
      'fill-neutral/10 stroke-neutral/15 dark:stroke-neutral/30 pointer-events-none absolute inset-0 h-full max-h-full w-full',
      className
    )}
    {...props}
  >
    <defs>
      <pattern
        id={id}
        width={width}
        height={height}
        patternUnits="userSpaceOnUse"
        x={x}
        y={y}
      >
        <path
          d={`M.5 ${height}V.5H${width}`}
          fill="none"
          strokeDasharray={strokeDasharray}
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    {squares && (
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(([x, y]) => (
          <rect
            strokeWidth="0"
            key={`${x}-${y}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
          />
        ))}
      </svg>
    )}
  </svg>
);
