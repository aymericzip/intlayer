import type { FC, SVGProps } from 'react';

export const GrokLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="currentColor"
    role="img"
    aria-label="Grok logo"
    height="1em"
    viewBox="0 0 24 24"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm2 4v2h-4v4h4v2h-6v-8h6zm2 0v8h-1.5v-8h1.5zm2 5v3h-1.5v-3h1.5z" />
  </svg>
);
