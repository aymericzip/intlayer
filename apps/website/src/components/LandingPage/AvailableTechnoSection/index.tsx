import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { AngularLogo } from './Angular';
import { NextJSLogo } from './Nextjs';
import { NuxtLogo } from './Nuxt';
import { PreactLogo } from './Preact';
import { ReactLogo } from './Reactjs';
import { SolidLogo } from './Solid';
import { SvelteLogo } from './Svelte';
import { ViteLogo } from './Vitejs';
import { VuejsLogo } from './Vuejs';

export const AvailableTechnoSection: FC = () => {
  const { availableOn, commingSoon, react, vite, nextjs } = useIntlayer(
    'available-techno-section'
  );

  return (
    <section className="z-10 flex w-full flex-col items-center justify-center">
      <h2 className="text-neutral">{availableOn}</h2>
      <div className="flex w-3/4 flex-row justify-evenly gap-6 p-6 flex-wrap">
        <Link
          href={PagesRoutes.Doc_Environment_CRA}
          className="grow-0"
          color="custom"
          label={react.label.value}
        >
          <ReactLogo className="size-full max-h-full h-20" />
        </Link>
        <Link
          href={PagesRoutes.Doc_Environment_NextJS_15}
          className="grow-0"
          color="custom"
          label={nextjs.label.value}
        >
          <NextJSLogo className="size-full max-h-full h-20" />
        </Link>
        <Link
          href={PagesRoutes.Doc_Environment_ViteAndReact}
          className="grow-0"
          color="custom"
          label={vite.label.value}
        >
          <ViteLogo className="size-full max-h-full h-20" />
        </Link>
      </div>
      <h2 className="text-neutral">{commingSoon}</h2>
      <div className="flex w-3/4 flex-row justify-evenly flex-wrap gap-6 p-6">
        <Link
          href={PagesRoutes.Doc_Environment_ViteAndVue}
          className="grow-0"
          color="custom"
          label={vite.label.value}
        >
          <VuejsLogo className="grayscale-60 max-h-full opacity-50 h-20" />
        </Link>
        <NuxtLogo className="grayscale-60 max-h-full opacity-50 h-20" />
        <Link
          href={PagesRoutes.Doc_Environment_Angular}
          className="grow-0"
          color="custom"
          label={vite.label.value}
        >
          <AngularLogo className="grayscale-60 max-h-full opacity-50 h-20" />
        </Link>
        <Link
          href={PagesRoutes.Doc_Environment_ViteAndSvelte}
          className="grow-0"
          color="custom"
          label={vite.label.value}
        >
          <SvelteLogo className="grayscale-60 max-h-full opacity-50 h-20" />
        </Link>
        <Link
          href={PagesRoutes.Doc_Environment_ViteAndPreact}
          className="grow-0"
          color="custom"
          label={vite.label.value}
        >
          <PreactLogo className="grayscale-60 max-h-full opacity-50 h-20" />
        </Link>
        <Link
          href={PagesRoutes.Doc_Environment_ViteAndSolid}
          className="grow-0"
          color="custom"
          label={vite.label.value}
        >
          <SolidLogo className="grayscale-60 max-h-full opacity-50 h-20" />
        </Link>
      </div>
    </section>
  );
};
