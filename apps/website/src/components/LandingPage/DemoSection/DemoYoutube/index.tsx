import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

const videoIdEN = 'e_PPG7PTqGU';

export const DemoYoutube: FC = () => {
  const { howToInternationalize } = useIntlayer('demo-youtube');

  return (
    <div className="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0">
      <iframe
        title={howToInternationalize.value}
        className="size-full"
        allow="autoplay; gyroscope;"
        loading="lazy"
        src={`https://www.youtube.com/embed/${videoIdEN}`}
      />
    </div>
  );
};
