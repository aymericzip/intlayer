'use client';

import { Link } from '@components/Link/Link';
import { useDevice, useScreenWidth } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useIntlayer } from 'next-intlayer';
import type { CSSProperties, FC, SVGProps } from 'react';
import { useRef, useState } from 'react';
import { PagesRoutes } from '@/Routes';
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
  initialPost: {
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
  initialPost,
  animationProgress,
  outputRange,
  label,
  logoClassName,
  getXPosition,
  isMobile,
  animationDelay,
}) => {
  const x = useTransform(animationProgress, outputRange, [
    getXPosition(initialPost.x),
    0,
  ]);
  const y = useTransform(animationProgress, outputRange, [initialPost.y, 0]);
  const scale = useTransform(animationProgress, outputRange, [
    initialPost.scale,
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
            'size-14 transition-transform duration-200 hover:scale-110',
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

const logosRow1 = [
  {
    Logo: ReactLogo,
    route: PagesRoutes.Doc_Environment_ViteAndReact,
    initialPost: {
      scale: 1.5,
      x: -200,
      y: -60,
    },
    label: 'react',
  },
  {
    Logo: PreactLogo,
    route: PagesRoutes.Doc_Environment_ViteAndPreact,
    initialPost: {
      scale: 1.4,
      x: 200,
      y: -60,
    },
    label: 'preact',
  },
] as const;

const logosRow2 = [
  {
    Logo: VuejsLogo,
    route: PagesRoutes.Doc_Environment_ViteAndVue,
    initialPost: {
      scale: 1.5,
      x: -350,
      y: -30,
    },
    label: 'vue',
  },
  {
    Logo: NuxtLogo,
    route: PagesRoutes.Doc_Environment_NuxtAndVue,
    initialPost: {
      scale: 1.3,
      x: 0,
      y: 60,
    },
    label: 'nuxt',
  },
  {
    Logo: SvelteLogo,
    route: PagesRoutes.Doc_Environment_ViteAndSvelte,
    initialPost: {
      scale: 1.3,
      x: 350,
      y: -30,
    },
    label: 'svelte',
  },
] as const;

const logosRow3 = [
  {
    Logo: NextJSLogo,
    route: PagesRoutes.Doc_Environment_NextJS_15,
    initialPost: {
      scale: 1.5,
      x: -250,
      y: 60,
    },
    label: 'nextjs',
  },
  {
    Logo: ViteLogo,
    route: PagesRoutes.Doc_Environment_ViteAndReact,
    initialPost: {
      scale: 1.5,
      x: 250,
      y: 60,
    },
    label: 'vite',
  },
] as const;

const comingSoonData = [
  {
    Logo: SolidLogo,
    route: PagesRoutes.Doc_Environment_ViteAndSolid,
    initialPost: {
      scale: 1.2,
      x: -80,
      y: 40,
    },
    label: 'solid',
  },
  {
    Logo: AngularLogo,
    route: PagesRoutes.Doc_Environment_Angular,
    initialPost: {
      scale: 1.2,
      x: 80,
      y: 40,
    },
    label: 'angular',
  },
] as const;

export const AvailableTechnoSection: FC = () => {
  const { comingSoon, availableOn, icons } = useIntlayer(
    'available-techno-section'
  );

  const { isMobile } = useDevice();
  const { screenWidth } = useScreenWidth();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Animation progress that starts at 50% scroll
  const animationProgress = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  const getXPosition = (index: number) =>
    index * (screenWidth / BASE_SCREEN_WIDTH);

  return (
    <section
      ref={containerRef}
      className="z-10 flex w-full flex-col items-center justify-center"
    >
      <h2 className="mb-3 text-lg text-neutral-500">{availableOn}</h2>
      <div className="mt-4 flex flex-col items-center gap-6">
        {/* Row 1 */}
        <motion.div className="flex justify-center gap-x-12">
          {logosRow1.map((logoConfig, index) => (
            <LogoItem
              key={logoConfig.label}
              {...logoConfig}
              animationProgress={animationProgress}
              outputRange={[0, 0.1]}
              animationDelay={index * 0.15}
              label={icons[logoConfig.label].label.value}
              getXPosition={getXPosition}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        {/* Row 2 */}
        <motion.div className="flex justify-center gap-x-12">
          {logosRow2.map((logoConfig, index) => (
            <LogoItem
              key={logoConfig.label}
              {...logoConfig}
              animationProgress={animationProgress}
              outputRange={[0.05, 0.15]}
              animationDelay={index * 0.15}
              label={icons[logoConfig.label].label.value}
              getXPosition={getXPosition}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        {/* Row 3 */}
        <motion.div className="flex justify-center gap-x-12">
          {logosRow3.map((logoConfig, index) => (
            <LogoItem
              key={logoConfig.label}
              {...logoConfig}
              animationProgress={animationProgress}
              outputRange={[0.1, 0.2]}
              animationDelay={index * 0.15}
              label={icons[logoConfig.label].label.value}
              getXPosition={getXPosition}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>

      <h2 className="mt-8 mb-3 text-lg text-neutral-500">{comingSoon}</h2>
      <motion.div className="mt-4 flex justify-center gap-x-12">
        {comingSoonData.map((logoConfig, index) => (
          <LogoItem
            key={logoConfig.label}
            {...logoConfig}
            animationProgress={animationProgress}
            outputRange={[0.15, 0.25]}
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
