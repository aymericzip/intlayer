import type { SVGProps } from 'react';
import { cn } from '../../utils/cn';

/**
 * Props for the Spinner component
 */
type SpinnerProps = SVGProps<SVGSVGElement> & {
  /** Stroke width for the spinner animation circles. Defaults to 4 */
  strokeWidth?: number;
};

/**
 * Spinner Component
 *
 * An animated SVG spinner that displays two expanding and fading circles
 * to indicate loading or processing states. Uses smooth CSS animations
 * with spline curves for natural motion.
 *
 * @component
 * @example
 * Basic usage:
 * ```tsx
 * <Spinner />
 * ```
 *
 * @example
 * Custom stroke width:
 * ```tsx
 * <Spinner strokeWidth={6} className="text-blue-500" />
 * ```
 *
 * @example
 * Custom size:
 * ```tsx
 * <Spinner className="size-8 text-red-500" strokeWidth={2} />
 * ```
 *
 * Features:
 * - Smooth expanding circle animation
 * - Customizable stroke width
 * - Inherits text color from parent (currentColor)
 * - Responsive sizing through className
 * - Infinite loop animation
 * - Two-phase animation with offset timing
 * - Optimized SVG with minimal DOM impact
 *
 * Animation Details:
 * - Duration: 1.8 seconds per cycle
 * - Two circles with 0.9s offset
 * - Radius expands from 1 to 20
 * - Opacity fades from 1 to 0
 * - Spline easing for natural motion
 *
 * @param props - SVG props with custom spinner options
 * @param props.className - CSS classes for styling and sizing
 * @param props.strokeWidth - Line thickness for the animated circles
 * @param props.color - SVG color (use className with text-color for easier styling)
 * @param props.width - SVG width (defaults to 44, use className for responsive sizing)
 * @param props.height - SVG height (defaults to 44, use className for responsive sizing)
 * @param props...rest - All other standard SVG element attributes
 *
 * @returns An animated SVG spinner element
 */
export const Spinner = ({ className, strokeWidth = 4 }: SpinnerProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 44 44"
    stroke="currentColor"
    role="img"
    aria-label="Spinner"
    className={cn('size-full', className)}
  >
    <g fill="none" fillRule="evenodd" strokeWidth={strokeWidth}>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);
