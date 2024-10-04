import type { FC, SVGProps } from 'react';
import { cn } from '../../utils/cn';

type SpotlightProps = {
  fill?: string;
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  opacity?: number;
} & SVGProps<SVGSVGElement>;

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
