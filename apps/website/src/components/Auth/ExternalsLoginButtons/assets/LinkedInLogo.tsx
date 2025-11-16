import type { FC, SVGProps } from 'react';

export const LinkedInLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    role="img"
    aria-label="LinkedIn logo"
    xmlns="http://www.w3.org/2000/svg"
    width="72"
    height="72"
    viewBox="0 0 72 72"
    {...props}
  >
    {/* MASK DEFINES THE CUT-OUT */}
    <mask id="linkedin-mask">
      {/* Full white rectangle = fully visible */}
      <rect width="72" height="72" fill="white" />

      {/* Black paths = areas to REMOVE (transparent) */}
      <path
        d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
        fill="black"
      />
    </mask>

    {/* BLUE SQUARE WITH THE HOLE CUT OUT */}
    <rect
      width="72"
      height="72"
      rx="8"
      fill="currentColor"
      mask="url(#linkedin-mask)"
    />
  </svg>
);
