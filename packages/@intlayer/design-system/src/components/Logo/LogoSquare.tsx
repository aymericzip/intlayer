import type { FC } from 'react';
import type { LogoBaseProps } from '.';

export const LogoSquare: FC<LogoBaseProps> = ({ bgColor, ...props }) => (
  <svg
    width="700"
    height="700"
    viewBox="0 0 700 700"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {bgColor && <rect width="700" height="700" fill={bgColor} />}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M700 0H0V700H700V0ZM162 306C137.147 306 117 326.147 117 351C117 375.853 137.147 396 162 396H542C566.853 396 587 375.853 587 351C587 326.147 566.853 306 542 306H162ZM117 524C117 499.147 137.147 479 162 479H342C366.853 479 387 499.147 387 524C387 548.853 366.853 569 342 569H162C137.147 569 117 548.853 117 524ZM162 131C137.147 131 117 151.147 117 176C117 200.853 137.147 221 162 221H407C431.853 221 452 200.853 452 176C452 151.147 431.853 131 407 131H162Z"
      fill="currentColor"
    />
  </svg>
);
