import type { FC, SVGProps } from 'react';

export const PreactLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Preact"
    role="img"
    viewBox="0 0 512 512"
    {...props}
  >
    <g transform="translate(256,256)">
      <path
        d="M0,-256 222,-128 222,128 0,256 -222,128 -222,-128z"
        fill="#673ab8"
      />

      <ellipse
        cx="0"
        cy="0"
        stroke-width="16"
        rx="75"
        ry="196"
        fill="none"
        stroke="#ffffff"
        transform="rotate(52.5)"
      />

      <ellipse
        cx="0"
        cy="0"
        stroke-width="16"
        rx="75"
        ry="196"
        fill="none"
        stroke="#ffffff"
        transform="rotate(-52.5)"
      />

      <circle cx="0" cy="0" r="34" fill="#ffffff" />
    </g>
  </svg>
);
