import Link from 'next/link';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import Nextjs from './nextjs.svg';
import React from './reactjs.svg';
import Vite from './vitejs.svg';
import { PagesRoutes } from '@/Routes';

export const AvailableTechnoSection: FC = () => {
  const { text, react, vite, nextjs } = useIntlayer('available-techno-section');

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <h2 className="text-neutral dark:text-neutral-dark">{text}</h2>
      <div className="flex h-28 w-3/4 flex-row justify-evenly gap-6 p-6">
        <Link
          href={PagesRoutes.Doc_Environment_CRA}
          className="grow-0"
          aria-label={react.label.value}
        >
          <React className="size-full max-h-full" />
        </Link>
        <Link
          href={PagesRoutes.Doc_Environment_NextJS}
          className="grow-0"
          aria-label={nextjs.label.value}
        >
          <Nextjs className="size-full max-h-full" />
        </Link>
        <Link
          href={PagesRoutes.Doc_Environment_ViteAndReact}
          className="grow-0"
          aria-label={vite.label.value}
        >
          <Vite className="size-full max-h-full" />
        </Link>
      </div>
    </section>
  );
};
