'use client';

import { useLocale } from 'next-intlayer';
import type { FC } from 'react';

const videoIdEN = 'W2G7KxuSD4c';
const videoIdFF = '4DVFoim54Ko';

export const DemoYoutube: FC = () => {
  const { locale } = useLocale();

  const videoId = locale === 'fr' ? videoIdFF : videoIdEN;

  return (
    <iframe
      title="Demo YouTube - How to Internationalize your application using Intlayer"
      className="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0"
      allow="autoplay; gyroscope;"
      loading="lazy"
      width={1080}
      height="auto"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
    />
  );
};
