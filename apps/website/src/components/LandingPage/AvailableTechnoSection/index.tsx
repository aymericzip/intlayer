'use client';

import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { useDevice, useScreenWidth } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useIntlayer } from 'next-intlayer';
import type { CSSProperties, FC, SVGProps } from 'react';
import { useRef, useState } from 'react';
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

type LogoConfig = {
  Logo: FC<SVGProps<SVGSVGElement>>;
  route: string;
  intitialPost: {
    scale: number;
    x: number;
    y: number;
  };
  label: string;
};

type LogoItemProps = LogoConfig & {
  animationProgress: MotionValue<number>;
  outputRange: [number, number];
  label: string;
  logoClassName?: string;
  getXPosition: (value: number) => number;
  isMobile?: boolean;
  animationDelay: number;
};

const LogoItem: FC<LogoItemProps> = ({
  Logo,
  route,
  intitialPost,
  animationProgress,
  outputRange,
  label,
  logoClassName,
  getXPosition,
  isMobile,
  animationDelay,
}) => {
  const x = useTransform(animationProgress, outputRange, [
    getXPosition(intitialPost.x),
    0,
  ]);
  const y = useTransform(animationProgress, outputRange, [intitialPost.y, 0]);
  const scale = useTransform(animationProgress, outputRange, [
    intitialPost.scale,
    1,
  ]);
  const isEnabled = useTransform(animationProgress, outputRange, [true, false]);

  const [isFloating, setIsFloating] = useState(isEnabled.get());

  useMotionValueEvent(isEnabled, 'change', (latest) => {
    setIsFloating(latest);
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale: isMobile ? 1 : scale,
      }}
    >
      <Link href={route} color="custom" label={label}>
        <Logo
          className={cn(
            'size-14 hover:scale-110 transition-transform duration-200',
            isFloating && 'animate-float',
            logoClassName
          )}
          style={
            {
              animationDelay: `${animationDelay}s`,
            } as CSSProperties
          }
        />
      </Link>
    </motion.div>
  );
};

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
      y: 30,
    },
    label: 'preact',
  },
  {
    Logo: NuxtLogo,
    route: PagesRoutes.Doc_Environment_NuxtAndVue,
    intitialPost: {
      scale: 1.2,
      x: 200,
      y: -100,
    },
    label: 'nuxt',
  },
] as const;

const comingSoonData = [
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
  const { comingSoon, availableOn, icons } = useIntlayer(
    'available-techno-section'
  );

  const { isMobile } = useDevice();
  const { screenWith } = useScreenWidth();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Animation progress that starts at 50% scroll
  const animationProgress = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  const getXPosition = (index: number) =>
    index * (screenWith / BASE_SCREEN_WIDTH);

  return (
    <section
      ref={containerRef}
      className="z-10 flex w-full flex-col items-center justify-center"
    >
      <h2 className="text-neutral-500 mb-3 text-lg">{availableOn}</h2>
      <motion.div className="mt-[30px] grid justify-items-center grid-cols-3  w-2/3 h-76 gap-0 p-0 sm:w-1/3">
        {logos.map((logoConfig, index) => (
          <LogoItem
            key={index}
            {...logoConfig}
            animationProgress={animationProgress}
            outputRange={[0, 0.15]}
            animationDelay={index * 0.15}
            label={icons[logoConfig.label].label.value}
            getXPosition={getXPosition}
            isMobile={isMobile}
          />
        ))}
      </motion.div>

      <h2 className="text-neutral-500 mb-3 text-lg mt-5">{comingSoon}</h2>
      <motion.div className="mt-[30px] grid justify-items-center grid-cols-3 w-2/3 h-56 gap-0 p-0 sm:w-1/3">
        {comingSoonData.map((logoConfig, index) => (
          <LogoItem
            key={index}
            {...logoConfig}
            animationProgress={animationProgress}
            outputRange={[0.15, 0.3]}
            animationDelay={index * 0.15}
            label={icons[logoConfig.label].label.value}
            logoClassName="grayscale-70"
            getXPosition={getXPosition}
            isMobile={isMobile}
          />
        ))}
      </motion.div>
    </section>
  );
};
