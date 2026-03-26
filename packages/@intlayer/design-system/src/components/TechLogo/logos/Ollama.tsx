import type { FC, SVGProps } from 'react';

export const OllamaLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 256"
    role="img"
    aria-label="Ollama logo"
  >
    <path d="M128 0c70.692 0 128 57.308 128 128s-57.308 128-128 128S0 198.692 0 128 57.308 0 128 0zm0 32c-53.019 0-96 42.981-96 96s42.981 96 96 96 96-42.981 96-96-42.981-96-96-96zm0 32c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64zm0 32c17.673 0 32 14.327 32 32s-14.327 32-32 32-32-14.327-32-32 14.327-32 32-32z" />
  </svg>
);
