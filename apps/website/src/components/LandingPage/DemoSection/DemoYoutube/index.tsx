import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

const videoIdEN = 'e_PPG7PTqGU';

export const DemoYoutube: FC = () => {
  const content = useIntlayer('demo-youtube');

  return (
    <div className="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0">
      <iframe
        title={content.demoYoutubeHowToInternationalize.value}
        className="h-full w-full"
        allow="autoplay; gyroscope;"
        loading="lazy"
        src={`https://www.youtube.com/embed/${videoIdEN}?autoplay=1&origin=${encodeURIComponent(
          window.location.origin
        )}&controls=0&rel=1`}
      />
    </div>
  );
};
