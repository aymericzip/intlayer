import { Link } from '@components/Link/Link';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { NestJSLogo } from './Nextjs';
import { ReactLogo } from './Reactjs';
import { ViteLogo } from './Vitejs';
import { PagesRoutes } from '@/Routes';

export const AvailableTechnoSection: FC = () => {
  const { text, react, vite, nextjs } = useIntlayer('available-techno-section');

  return (
    <section className="z-10 flex w-full flex-col items-center justify-center">
      <h2 className="text-neutral dark:text-neutral-dark">{text}</h2>
      <div className="flex h-28 w-3/4 flex-row justify-evenly gap-6 p-6">
        <Link
          href={PagesRoutes.Doc_Environment_CRA}
          className="grow-0"
          color="custom"
          label={react.label.value}
        >
          <ReactLogo className="size-full max-h-full" />
        </Link>
        <Link
          href={PagesRoutes.Doc_Environment_NextJS_15}
          className="grow-0"
          color="custom"
          label={nextjs.label.value}
        >
          <NestJSLogo className="size-full max-h-full" />
        </Link>
        <Link
          href={PagesRoutes.Doc_Environment_ViteAndReact}
          className="grow-0"
          color="custom"
          label={vite.label.value}
        >
          <ViteLogo className="size-full max-h-full" />
        </Link>
      </div>
    </section>
  );
};
