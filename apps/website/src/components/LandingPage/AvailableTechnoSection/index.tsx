'use client';

import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { motion, useInView } from 'framer-motion';
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
  const { availableOn, commingSoon, react, vite, nextjs } = useIntlayer(
    'available-techno-section'
  );
  const ref = useRef(null);
  const [scroll, setScroll] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [direction, setDirection] = useState('down');

  // 1. Detect when the element is in view with a 500px top offset
  const inView = useInView(ref, {
    margin: '-500px 0px -100% 0px',
    once: false,
  });
  // 2. Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setDirection(currentY > lastY ? 'down' : 'up');
      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  // Trigger scroll state change ONLY at the -500px point
  useEffect(() => {
    if (inView && direction === 'down' && !scroll) {
      setScroll(true);
    } else if (inView && direction === 'up' && scroll) {
      setScroll(false);
    }
  }, [inView, direction]);

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

  return (
    <section
      ref={ref}
      className="z-10 flex w-full flex-col items-center justify-center"
    >
      {/*-------------------- AvailableOn Logos Icon --------------------*/}
      <h2 className="text-neutral-500 font-bold text-2xl">
        {scroll ? availableOn : null}
      </h2>
      <div
        className={`flex flex-row justify-evenly gap-6 p-6 flex-wrap border ${scroll ? 'w-1/3' : 'w-3/4 h-76 md:h-96'}`}
      >
        {/* 1-ViteLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className={
            scroll ? 'basis-1/4 flex-shrink-0 flex justify-center' : null
          }
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndReact}
            color="custom"
            label={vite.label.value}
          >
            <ViteLogo
              className={`${scroll ? 'h-20' : 'mt-[-50px] h-20 sm:h-35'}`}
            />
          </Link>
        </motion.div>

        {/* 2-NextJSLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatDown}
          className={
            scroll ? 'basis-1/4 flex-shrink-0 flex justify-center' : null
          }
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_NextJS_15}
            color="custom"
            label={nextjs.label.value}
          >
            <NextJSLogo
              className={`${scroll ? 'h-20' : 'mt-[100px] h-15 sm:h-20'}`}
            />
          </Link>
        </motion.div>

        {/* 3-ReactLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className={
            scroll ? 'basis-1/4 flex-shrink-0 flex justify-center' : null
          }
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_CRA}
            color="custom"
            label={react.label.value}
          >
            <ReactLogo
              className={`${scroll ? 'h-20' : 'mt-[-100px] md:mt-[-50px] h-20 sm:h-30 md:h-35'}`}
            />
          </Link>
        </motion.div>

        {/* 4-PreactLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className={
            scroll ? 'basis-1/4 flex-shrink-0 flex justify-center' : null
          }
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndPreact}
            color="custom"
            label={vite.label.value}
          >
            <PreactLogo className={`h-20 ${scroll ? null : 'mt-[100px]'}`} />
          </Link>
        </motion.div>

        {/* 5-VuejsLogo  */}
        <motion.div
          animate={scroll ? { y: 0 } : floatDown}
          className={
            scroll ? 'basis-1/4 flex-shrink-0 flex justify-center' : null
          }
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndVue}
            color="custom"
            label={vite.label.value}
          >
            <VuejsLogo
              className={`${scroll ? 'h-20' : 'mt-[-70px] md:mt-[-50px] h-20'}`}
            />
          </Link>
        </motion.div>

        {/* 6-NuxtLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatDown}
          className={
            scroll ? 'basis-1/4 flex-shrink-0 flex justify-center' : null
          }
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndPreact}
            color="custom"
            label={vite.label.value}
          >
            <NuxtLogo className={`h-20 ${scroll ? null : 'mt-[120px]'}`} />
          </Link>
        </motion.div>
      </div>

      {/*-------------------- Comming Soon Logos Icon --------------------*/}
      <h2 className="text-neutral-500 font-bold text-2xl mt-5">
        {scroll ? commingSoon : null}
      </h2>
      <div
        className={`flex flex-row justify-evenly gap-6 p-6 flex-wrap border ${scroll ? 'w-1/3 md:w-1/2' : 'w-3/4'}`}
      >
        {/* 7-SolidLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className={
            scroll ? 'basis-1/4 flex-shrink-0 flex justify-center' : null
          }
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndSolid}
            className="grow-0 hover:scale-108 transition-all duration-100"
            color="custom"
            label={vite.label.value}
          >
            <SolidLogo className="grayscale-60 max-h-full opacity-50 h-20" />
          </Link>
        </motion.div>

        {/* 8-SvelteLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatDown}
          className={
            scroll ? 'basis-1/4 flex-shrink-0 flex justify-center' : null
          }
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndSvelte}
            className="grow-0 hover:scale-108 transition-all duration-100"
            color="custom"
            label={vite.label.value}
          >
            <SvelteLogo
              className={`grayscale-60 max-h-full opacity-50 ${scroll ? 'h-20' : 'mt-[-100px] md:mt-[-50px] h-20 sm:h-25 md:h-30'}`}
            />
          </Link>
        </motion.div>

        {/* 9-AngularLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className={
            scroll ? 'basis-1/4 flex-shrink-0 flex justify-center' : null
          }
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_Angular}
            className="grow-0 hover:scale-108 transition-all duration-100"
            color="custom"
            label={vite.label.value}
          >
            <AngularLogo
              className={`grayscale-60 max-h-full opacity-50 h-20 ${scroll ? null : 'mr-[100px]'}`}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
