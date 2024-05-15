import Link from 'next/link';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import Nextjs from './nextjs.svg';
import React from './reactjs.svg';
import Vite from './vitejs.svg';

export const AvailableTechnoSection: FC = () => {
  const { text, react, vite, nextjs } = useIntlayer('available-techno-section');

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <span className="text-neutral">{text}</span>
      <div className="flex h-28 w-3/4 flex-row justify-evenly gap-6 p-6">
        <Link href={react.href} className="grow-0" aria-label={react.label}>
          <React className="size-full max-h-full" />
        </Link>
        <Link href={nextjs.href} className="grow-0" aria-label={nextjs.label}>
          <Nextjs className="size-full max-h-full" />
        </Link>
        <Link href={vite.href} className="grow-0" aria-label={vite.label}>
          <Vite className="size-full max-h-full" />
        </Link>
      </div>
    </div>
  );
};
