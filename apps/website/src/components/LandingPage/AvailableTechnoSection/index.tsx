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
        className={`mt-[30px] grid justify-items-center grid-cols-3  w-2/3 h-76 
        ${scroll ? 'gap-0 p-0 sm:w-1/3' : 'gap-2 p-2 md:h-96'}`}
      >
        {/* 1-ViteLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className="w-[70px] h-[70px] flex-shrink-0 flex justify-center"
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndReact}
            color="custom"
            label={vite.label.value}
          >
            <ViteLogo className={`h-20 ${scroll ? '' : 'sm:scale-150'}`} />
          </Link>
        </motion.div>

        {/* 2-ReactLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className="w-[70px] h-[70px] flex-shrink-0 flex justify-center"
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_CRA}
            color="custom"
            label={react.label.value}
          >
            <ReactLogo
              className={`h-20 ${scroll ? '' : 'sm:scale-200 sm:mt-[-50px]'}`}
            />
          </Link>
        </motion.div>

        {/* 3-VuejsLogo  */}
        <motion.div
          animate={scroll ? { y: 0 } : floatDown}
          className="w-[70px] h-[70px] flex-shrink-0 flex justify-center"
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndVue}
            color="custom"
            label={vite.label.value}
          >
            <VuejsLogo
              className={`h-17 ${scroll ? '' : 'sm:mt-[-30px] sm:scale-150'}`}
            />
          </Link>
        </motion.div>

        {/* 4-NextJSLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatDown}
          className="w-[70px] h-[70px] flex-shrink-0 flex justify-center"
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_NextJS_15}
            color="custom"
            label={nextjs.label.value}
          >
            <NextJSLogo
              className={`h-15 ${scroll ? '' : 'sm:scale-125 sm:ml-[100px]'}`}
            />
          </Link>
        </motion.div>

        {/* 5-PreactLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className="w-[70px] h-[70px] flex-shrink-0 flex justify-center"
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndPreact}
            color="custom"
            label={vite.label.value}
          >
            <PreactLogo
              className={`h-17 ${scroll ? '' : 'sm:ml-[100px] sm:mt-[60px]'}`}
            />
          </Link>
        </motion.div>

        {/* 6-NuxtLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatDown}
          className="w-[70px] h-[70px] flex-shrink-0 flex justify-center"
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndPreact}
            color="custom"
            label={vite.label.value}
          >
            <NuxtLogo className={`h-17`} />
          </Link>
        </motion.div>
      </div>

      {/*-------------------- Comming Soon Logos Icon --------------------*/}
      <h2 className="text-neutral-500 font-bold text-2xl mt-5">
        {scroll ? commingSoon : null}
      </h2>
      <div
        className={`mt-[30px] grid justify-items-center grid-cols-3 w-2/3 h-56
         ${scroll ? 'gap-0 p-0 sm:w-1/3' : 'gap-2 p-2 md:h-56'}`}
      >
        {/* 7-SolidLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className="w-[70px] h-[70px] flex justify-center flex-shrink-0"
          layout
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Link
            href={PagesRoutes.Doc_Environment_ViteAndSolid}
            className="grow-0 hover:scale-108 transition-all duration-100"
            color="custom"
            label={vite.label.value}
          >
            <SolidLogo
              className={`grayscale-60 max-h-full opacity-50 h-20 ${scroll ? '' : 'sm:mt-[30px]'}`}
            />
          </Link>
        </motion.div>

        {/* 8-SvelteLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatDown}
          className="w-[70px] h-[70px] flex justify-center flex-shrink-0"
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
              className={`grayscale-60 max-h-full opacity-50 h-20 ${scroll ? '' : 'sm:scale-150'}`}
            />
          </Link>
        </motion.div>

        {/* 9-AngularLogo */}
        <motion.div
          animate={scroll ? { y: 0 } : floatUp}
          className="w-[70px] h-[70px] flex justify-center flex-shrink-0"
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
              className={`grayscale-60 max-h-full opacity-50 h-20 ${scroll ? '' : 'sm:mt-[30px]'}`}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
