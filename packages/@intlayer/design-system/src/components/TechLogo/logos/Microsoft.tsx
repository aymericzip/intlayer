import type { FC, SVGProps } from 'react';

export const MicrosoftLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    role="img"
    aria-label="Microsoft logo"
    viewBox="0 0 21 21"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="0" y="0" width="10" height="10" fill="#F25022" />
    <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
    <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
    <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
  </svg>
);
