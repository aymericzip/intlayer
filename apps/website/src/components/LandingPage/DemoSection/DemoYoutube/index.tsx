import type { FC } from 'react';

const videoIdEN = 'e_PPG7PTqGU';

export const DemoYoutube: FC = () => {
  return (
    <iframe
      title="Demo YouTube - How to Internationalize your application using Intlayer"
      className="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0"
      allow="autoplay; gyroscope;"
      loading="lazy"
      width={1080}
      height="auto"
      src={`https://www.youtube.com/embed/${videoIdEN}?autoplay=0&origin=http://intlayer.org&controls=0&rel=1`}
    />
  );
};
