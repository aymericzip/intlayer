'use client';

import Image from 'next/image';
import { type FC, useMemo, useState } from 'react';

const videoIdEN = 'e_PPG7PTqGU';

export const DemoYoutube: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const origin = useMemo(() => {
    if (typeof window === 'undefined') return 'https://intlayer.org';
    return window.location.origin;
  }, []);

  // Use max resolution thumbnail when available; YouTube will fallback if missing.
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoIdEN}/maxresdefault.webp`;

  const iframeSrc = `https://www.youtube.com/embed/${videoIdEN}?autoplay=1&origin=${encodeURIComponent(
    origin
  )}&controls=0&rel=1`;

  return (
    <div className="m-auto aspect-video w-full overflow-hidden rounded-lg border-0">
      {isLoaded ? (
        <iframe
          title="Demo YouTube - How to Internationalize your application using Intlayer"
          className="h-full w-full"
          allow="autoplay; gyroscope;"
          loading="lazy"
          src={iframeSrc}
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          className="relative h-full w-full"
          aria-label="Play demo video"
        >
          <Image
            src={thumbnailUrl}
            alt="Demo video thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, 1080px"
            className="object-cover"
            priority={false}
          />
          <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/20">
            {/* biome-ignore lint/nursery/useSortedClasses: Tailwind class sorting differs across tooling presets */}
            <span className="rounded-full bg-white/90 px-5 py-3 shadow text-sm font-semibold text-black">
              Play
            </span>
          </span>
        </button>
      )}
    </div>
  );
};
