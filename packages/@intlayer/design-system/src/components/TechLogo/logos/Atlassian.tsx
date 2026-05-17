import type { FC, SVGProps } from 'react';

export const AtlassianLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    role="img"
    aria-label="Atlassian logo"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.11 14.918c-.274-.34-.762-.29-.99.096L5.03 24.108a.584.584 0 00.514.862h7.29a.587.587 0 00.527-.329c1.587-3.33.693-7.513-2.252-9.723z"
      fill="#2684FF"
    />
    <path
      d="M15.763 5.125a13.27 13.27 0 00-.17 13.83l3.515 6.688a.586.586 0 00.527.327h7.29a.584.584 0 00.515-.862L16.753 5.22a.585.585 0 00-1.023-.032l.033-.063z"
      fill="#2684FF"
    />
  </svg>
);
