'use client';

import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { useScreenWidth } from '@intlayer/design-system/hooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useRef } from 'react';
import { AngularLogo } from './Angular';
import { NextJSLogo } from './Nextjs';
import { NuxtLogo } from './Nuxt';
import { PreactLogo } from './Preact';
import { ReactLogo } from './Reactjs';
import { SolidLogo } from './Solid';
import { SvelteLogo } from './Svelte';
import { ViteLogo } from './Vitejs';
import { VuejsLogo } from './Vuejs';

const BASE_SCREEN_WIDTH = 1500;

const logos = [
  {
    Logo: ViteLogo,
    route: PagesRoutes.Doc_Environment_ViteAndReact,
    intitialPost: {
      scale: 1.7,
      x: -200,
      y: -100,
    },
    label: 'vite',
  },
  {
    Logo: ReactLogo,
    route: PagesRoutes.Doc_Environment_CRA,
    scale: 1.1,
    intitialPost: {
      scale: 2,
      x: 0,
      y: 0,
    },
    label: 'react',
  },
  {
    Logo: VuejsLogo,
    route: PagesRoutes.Doc_Environment_ViteAndVue,
    intitialPost: {
      scale: 1.7,
      x: 200,
      y: -100,
    },
    label: 'vue',
  },
  {
    Logo: NextJSLogo,
    route: PagesRoutes.Doc_Environment_NextJS_15,
    intitialPost: {
      scale: 1.9,
      x: -200,
      y: -100,
    },
    label: 'nextjs',
  },
  {
    Logo: PreactLogo,
    route: PagesRoutes.Doc_Environment_ViteAndPreact,
    intitialPost: {
      scale: 1.2,
      x: 0,
      y: 0,
    },
    label: 'preact',
  },
  {
    Logo: NuxtLogo,
    route: PagesRoutes.Doc_Environment_ViteAndPreact,
    intitialPost: {
      scale: 1.2,
      x: 200,
      y: -100,
    },
    label: 'nuxt',
  },
] as const;

const comingSoon = [
  {
    Logo: SolidLogo,
    route: PagesRoutes.Doc_Environment_ViteAndSolid,
    intitialPost: {
      scale: 1,
      x: -200,
      y: 0,
    },
    label: 'solid',
  },
  {
    Logo: SvelteLogo,
    route: PagesRoutes.Doc_Environment_ViteAndSvelte,
    intitialPost: {
      scale: 1,
      x: 0,
      y: 50,
    },
    label: 'svelte',
  },
  {
    Logo: AngularLogo,
    route: PagesRoutes.Doc_Environment_Angular,
    intitialPost: {
      scale: 1,
      x: 200,
      y: 0,
    },
    label: 'angular',
  },
] as const;

export const AvailableTechnoSection: FC = () => {
  const content = useIntlayer('available-techno-section');

  const { screenWith } = useScreenWidth();
  const ref = useRef(null);
  // Scroll progress for the whole section.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Animation progress that starts at 50% scroll
  const animationProgress = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  const getXPosition = (index: number) => {
    return index * (screenWith / BASE_SCREEN_WIDTH);
  };

  return (
    <section
      ref={ref}
      className="z-10 flex w-full flex-col items-center justify-center"
    >
      <h2 className="text-neutral-500 mb-3 text-lg">{content.availableOn}</h2>
      <motion.div className="mt-[30px] grid justify-items-center grid-cols-3  w-2/3 h-76 gap-0 p-0 sm:w-1/3">
        {logos.map(({ Logo, route, label, intitialPost }, i) => {
          const x = useTransform(
            animationProgress,
            [0, 0.05],
            [getXPosition(intitialPost.x), 0]
          );
          const y = useTransform(
            animationProgress,
            [0, 0.05],
            [intitialPost.y, 0]
          );
          const scale = useTransform(
            animationProgress,
            [0, 0.05],
            [intitialPost.scale, 1]
          );

          return (
            <motion.div
              key={i}
              style={{
                x,
                y,
                scale,
              }}
            >
              <Link
                href={route}
                color="custom"
                label={content[label]?.label.value}
              >
                <Logo className="size-14" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <h2 className="text-neutral-500 mb-3 text-lg mt-5">
        {content.commingSoon}
      </h2>
      <motion.div className="mt-[30px] grid justify-items-center grid-cols-3 w-2/3 h-56 gap-0 p-0 sm:w-1/3">
        {comingSoon.map(({ Logo, route, label, intitialPost }, i) => {
          const x = useTransform(
            animationProgress,
            [0.05, 0.1],
            [getXPosition(intitialPost.x), 0]
          );
          const y = useTransform(
            animationProgress,
            [0.05, 0.1],
            [intitialPost.y, 0]
          );
          const scale = useTransform(
            animationProgress,
            [0.05, 0.1],
            [intitialPost.scale, 1]
          );

          return (
            <motion.div
              key={i}
              style={{
                x,
                y,
                scale,
              }}
            >
              <Link
                href={route}
                color="custom"
                label={content[label]?.label.value}
              >
                <Logo className="size-14 grayscale-70" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
