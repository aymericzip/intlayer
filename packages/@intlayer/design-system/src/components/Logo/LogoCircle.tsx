import type { FC } from 'react';
import type { LogoBaseProps } from '.';

export const LogoCircle: FC<LogoBaseProps> = ({ bgColor, ...props }) => (
  <svg
    width="700"
    height="700"
    viewBox="0 0 700 700"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {bgColor && <circle cx="350" cy="350" r="350" fill={bgColor} />}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M350 700C543.3 700 700 543.3 700 350C700 156.7 543.3 0 350 0C156.7 0 0 156.7 0 350C0 543.3 156.7 700 350 700ZM180 305C155.147 305 135 325.147 135 350C135 374.853 155.147 395 180 395H560C584.853 395 605 374.853 605 350C605 325.147 584.853 305 560 305H180ZM135 523C135 498.147 155.147 478 180 478H360C384.853 478 405 498.147 405 523C405 547.853 384.853 568 360 568H180C155.147 568 135 547.853 135 523ZM180 130C155.147 130 135 150.147 135 175C135 199.853 155.147 220 180 220H425C449.853 220 470 199.853 470 175C470 150.147 449.853 130 425 130H180Z"
      fill="currentColor"
    />
  </svg>
);
