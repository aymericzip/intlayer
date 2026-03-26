import type { FC, SVGProps } from 'react';

export const GoogleAILogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Google AI logo"
    viewBox="0 0 440 440"
    height="1em"
    width="1em"
    {...props}
  >
    <path
      d="M394 220C394 124 316 46 220 46S46 124 46 220s78 174 174 174 174-78 174-174zM86 220c0-74 60-134 134-134s134 60 134 134-60 134-134 134-134-60-134-134zm191 1.7L233.1 127c-3.2-3.2-8.5-4-12.7-2l-77.9 36c-5.1 2.4-7.3 8.4-5 13.5l15.1 33.4 33.6 15c5.1 2.3 11.2 0 13.5-5l30-64.8L262 215.1l-65.7 65.6 16 35.5c2.3 5.2 8.4 7.4 13.6 5.1l77-34c4.3-1.9 6.2-7 4.2-11.4l-24.1-54.2z"
      fill="#4285F4"
    />
  </svg>
);
