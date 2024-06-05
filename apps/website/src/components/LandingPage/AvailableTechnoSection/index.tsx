import Link from 'next/link';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import Nextjs from './nextjs.svg';
import React from './reactjs.svg';
import Vite from './vitejs.svg';
import { ExternalLinks } from '@/Routes';

export const AvailableTechnoSection: FC = () => {
  const { text, react, vite, nextjs } = useIntlayer('available-techno-section');

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <span className="text-neutral">{text}</span>
      <div className="flex h-28 w-3/4 flex-row justify-evenly gap-6 p-6">
        <Link
          href={ExternalLinks.IntlayerWithReact}
          className="grow-0"
          aria-label={react.label.value}
        >
          <React className="size-full max-h-full" />
        </Link>
        <Link
          href={ExternalLinks.IntlayerWithNextjs}
          className="grow-0"
          aria-label={nextjs.label.value}
        >
          <Nextjs className="size-full max-h-full" />
        </Link>
        <Link
          href={ExternalLinks.IntlayerWithVite}
          className="grow-0"
          aria-label={vite.label.value}
        >
          <Vite className="size-full max-h-full" />
        </Link>
      </div>
    </div>
  );
};
