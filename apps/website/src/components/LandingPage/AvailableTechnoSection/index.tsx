'use client';

import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { cn } from '@utils/cn';
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
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
  const { availableOn, commingSoon, react, vite, nextjs, vue, nuxt, angular } =
    useIntlayer('available-techno-section');
  const ref = useRef(null);
  const inView = useInView(ref, {
    margin: '-500px 0px -100% 0px',
    once: false,
  });
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [scroll, setScroll] = useState(false);

  // Track the scroll direction
  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    setDirection(latest > lastScrollY.current ? 'down' : 'up');
    lastScrollY.current = latest;
  });

  // Trigger scroll state change ONLY at the -500px point.
  //keep it (true) until the scrolling move up again to the same point
  useEffect(() => {
    if (inView) {
      if (direction === 'down' && !scroll) setScroll(true);
      else if (direction === 'up' && scroll) setScroll(false);
    }
  }, [inView, direction, scroll]);

  // Floating movement when the scroll state is false
  const floatUp = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  };
  const floatDown = {
    y: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  };

  // Motion className content
  const motionItemClass = 'w-[70px] h-[70px] flex justify-center flex-shrink-0';

  // Logo configurations for supported and coming-soon technologies.
  // Includes component, link route, animation, label, and initial styling.
  const logos = [
    {
      Logo: ViteLogo,
      route: PagesRoutes.Doc_Environment_ViteAndReact,
      style: 'h-20',
      motion: floatUp,
      label: vite.label.value,
      initialStyle: 'sm:scale-150',
    },
    {
      Logo: ReactLogo,
      route: PagesRoutes.Doc_Environment_CRA,
      style: 'h-20',
      motion: floatUp,
      label: react.label.value,
      initialStyle: 'sm:scale-200 sm:mt-[-50px]',
    },
    {
      Logo: VuejsLogo,
      route: PagesRoutes.Doc_Environment_ViteAndVue,
      style: 'h-17',
      motion: floatDown,
      label: vue.label.value,
      initialStyle: 'sm:mt-[-30px] sm:scale-150',
    },
    {
      Logo: NextJSLogo,
      route: PagesRoutes.Doc_Environment_NextJS_15,
      style: 'h-15',
      motion: floatDown,
      label: nextjs.label.value,
      initialStyle: 'sm:scale-125 sm:ml-[100px]',
    },
    {
      Logo: PreactLogo,
      route: PagesRoutes.Doc_Environment_ViteAndPreact,
      style: 'h-17',
      motion: floatUp,
      label: vite.label.value,
      initialStyle: 'sm:ml-[100px] sm:mt-[60px]',
    },
    {
      Logo: NuxtLogo,
      route: PagesRoutes.Doc_Environment_ViteAndPreact,
      style: 'h-17',
      motion: floatDown,
      label: nuxt.label.value,
    },
  ];

  const comingSoon = [
    {
      Logo: SolidLogo,
      route: PagesRoutes.Doc_Environment_ViteAndSolid,
      style: 'grayscale-60 max-h-full opacity-50 h-20',
      motion: floatUp,
      label: vite.label.value,
      initialStyle: 'sm:mt-[30px]',
    },
    {
      Logo: SvelteLogo,
      route: PagesRoutes.Doc_Environment_ViteAndSvelte,
      style: 'grayscale-60 max-h-full opacity-50 h-20',
      motion: floatDown,
      label: vite.label.value,
      initialStyle: 'sm:scale-150',
    },
    {
      Logo: AngularLogo,
      route: PagesRoutes.Doc_Environment_Angular,
      style: 'grayscale-60 max-h-full opacity-50 h-20',
      motion: floatUp,
      label: angular.label.value,
      initialStyle: 'sm:mt-[30px]',
    },
  ];

  return (
    <section
      ref={ref}
      className="z-10 flex w-full flex-col items-center justify-center"
    >
      <h2 className="text-neutral-500 font-bold text-2xl">
        {scroll ? availableOn : null}
      </h2>
      <div
        className={cn(
          'mt-[30px] grid justify-items-center grid-cols-3  w-2/3 h-76',
          scroll ? 'gap-0 p-0 sm:w-1/3' : 'gap-2 p-2 md:h-96'
        )}
      >
        {logos.map(
          ({ Logo, route, style, motion: anim, label, initialStyle }, i) => (
            <motion.div
              key={i}
              animate={scroll ? { y: 0 } : anim}
              className={motionItemClass}
              layout
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              <Link href={route} color="custom" label={label}>
                <Logo className={cn(style, scroll ? '' : initialStyle)} />
              </Link>
            </motion.div>
          )
        )}
      </div>

      <h2 className="text-neutral-500 font-bold text-2xl mt-5">
        {scroll ? commingSoon : null}
      </h2>
      <div
        className={cn(
          'mt-[30px] grid justify-items-center grid-cols-3 w-2/3 h-56',
          scroll ? 'gap-0 p-0 sm:w-1/3' : 'gap-2 p-2 md:h-56'
        )}
      >
        {comingSoon.map(
          ({ Logo, route, style, motion: anim, label, initialStyle }, i) => (
            <motion.div
              key={i}
              animate={scroll ? { y: 0 } : anim}
              className={motionItemClass}
              layout
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              <Link
                href={route}
                className="grow-0 hover:scale-108 transition-all duration-100"
                color="custom"
                label={label}
              >
                <Logo className={cn(style, scroll ? '' : initialStyle)} />
              </Link>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};
