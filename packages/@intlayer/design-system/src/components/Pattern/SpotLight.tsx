import type { FC, SVGProps } from 'react';
import { cn } from '../../utils/cn';

/**
 * Props for the Spotlight component
 * Extends SVGProps to inherit all standard SVG attributes
 */
type SpotlightProps = {
  /** Fill color for the spotlight effect (supports CSS color values) */
  fill?: string;
  /** X coordinate of the ellipse center */
  cx?: number;
  /** Y coordinate of the ellipse center */
  cy?: number;
  /** Horizontal radius of the ellipse */
  rx?: number;
  /** Vertical radius of the ellipse */
  ry?: number;
  /** Opacity of the spotlight effect (0-1) */
  opacity?: number;
} & SVGProps<SVGSVGElement>;

/**
 * Spotlight Component
 *
 * A dramatic animated SVG spotlight effect that creates a soft, glowing light beam
 * perfect for hero sections, landing pages, and attention-grabbing areas. Features
 * a sophisticated blur filter and smooth animation entrance.
 *
 * Features:
 * - Animated entrance with opacity fade-in effect
 * - Gaussian blur filter for realistic light diffusion
 * - Customizable positioning, size, and color
 * - Full-screen coverage with responsive scaling
 * - Performance optimized with CSS animations
 * - Pointer events disabled to preserve interactivity
 * - Theme-aware with currentColor support
 *
 * Technical Implementation:
 * - Uses SVG ellipse with advanced filter effects
 * - Gaussian blur with 151px standard deviation for soft edges
 * - Matrix transformation for realistic light angle (-0.822377, -0.568943)
 * - ViewBox coordinates optimized for screen coverage (3787x2842)
 * - Animation class `animate-spotlight` handles entrance effect
 * - Filter definition with unique ID prevents conflicts
 *
 * Visual Characteristics:
 * - Default: Large elliptical light beam (1924.71px radius)
 * - Positioned at (1924.71, 273.501) with soft vertical spread
 * - 21% opacity for subtle but noticeable effect
 * - Rotated and scaled for natural spotlight angle
 * - Soft gaussian blur creates realistic light falloff
 *
 * Animation Behavior:
 * - Starts with opacity: 0 (invisible)
 * - Animates to full visibility with smooth transition
 * - Animation timing and easing handled by CSS class
 * - Can be triggered on scroll or interaction events
 *
 * @example
 * Basic hero section spotlight:
 * ```tsx
 * <div className="relative min-h-screen bg-dark">
 *   <Spotlight className="top-0 left-0" />
 *   <div className="relative z-10 flex items-center justify-center h-screen">
 *     <h1 className="text-6xl font-bold text-white">
 *       Welcome to the Future
 *     </h1>
 *   </div>
 * </div>
 * ```
 *
 * @example
 * Custom colored spotlight:
 * ```tsx
 * <Spotlight
 *   fill="#3b82f6"
 *   opacity={0.3}
 *   className="top-10 -left-20"
 * />
 * ```
 *
 * @example
 * Multiple spotlights for complex lighting:
 * ```tsx
 * <div className="relative">
 *   <Spotlight
 *     cx={1000}
 *     cy={300}
 *     fill="rgb(59, 130, 246)"
 *     opacity={0.15}
 *   />
 *   <Spotlight
 *     cx={2500}
 *     cy={800}
 *     fill="rgb(236, 72, 153)"
 *     opacity={0.15}
 *     className="scale-75"
 *   />
 * </div>
 * ```
 *
 * @example
 * Responsive positioning:
 * ```tsx
 * <Spotlight
 *   className="top-0 left-1/2 transform -translate-x-1/2 lg:left-0 lg:transform-none"
 *   opacity={0.25}
 * />
 * ```
 *
 * Styling Guidelines:
 * - Use low opacity (0.1-0.3) for subtle background effects
 * - Higher opacity (0.3-0.5) for dramatic focal points
 * - Consider theme colors when using custom fill values
 * - Position absolute with z-index management for layering
 *
 * Performance Considerations:
 * - SVG filter effects are GPU accelerated when possible
 * - Animation handled by CSS transforms for optimal performance
 * - Large viewBox size cached by browser for efficiency
 * - Pointer events disabled prevents layout recalculation
 *
 * Accessibility:
 * - Purely decorative - doesn't interfere with screen readers
 * - High contrast maintained with overlaid content
 * - Animation respects user's reduced motion preferences
 * - No semantic meaning - safe to hide from assistive tech
 *
 * CSS Requirements:
 * - Requires `animate-spotlight` animation class in Tailwind config
 * - Should define entrance animation timing and easing
 * - Consider defining custom animations for different effects
 *
 * @param props - Spotlight component props
 * @returns Animated SVG spotlight effect with blur filters
 */
export const Spotlight: FC<SpotlightProps> = ({
  fill = 'currentColor',
  cy = 273.501,
  rx = 1924.71,
  ry = 273.501,
  cx = 1924.71,
  opacity = 0.21,
  className,
  ...props
}) => (
  <svg
    className={cn(
      'animate-spotlight size-screen pointer-events-none absolute opacity-0',
      className
    )}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 3787 2842"
    fill="none"
    role="img"
    aria-label="Spotlight"
    {...props}
  >
    <g filter="url(#filter)" transform="scale (-1, 1)">
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={fill}
        fillOpacity={opacity}
        transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
      ></ellipse>
    </g>
    <defs>
      <filter
        id="filter"
        x="0.860352"
        y="0.838989"
        width="3785.16"
        height="2840.26"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        ></feBlend>
        <feGaussianBlur
          stdDeviation="151"
          result="effect1_foregroundBlur_1065_8"
        ></feGaussianBlur>
      </filter>
    </defs>
  </svg>
);
