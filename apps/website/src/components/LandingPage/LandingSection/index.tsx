'use client';

import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';

import {
  LinkColor,
  LinkVariant,
  Tag,
  TagBorder,
  TagColor,
  TagSize,
} from '@intlayer/design-system';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, SVGProps } from 'react';
import packageJSON from '../../../../package.json' with { type: 'json' };
import { LynxLogo } from '../AvailableTechnoSection/Lynx';
import { NextJSLogo } from '../AvailableTechnoSection/Nextjs';
import { NuxtLogo } from '../AvailableTechnoSection/Nuxt';
import { PreactLogo } from '../AvailableTechnoSection/Preact';
import { ReactLogo } from '../AvailableTechnoSection/Reactjs';
import { ViteLogo } from '../AvailableTechnoSection/Vitejs';
import { VuejsLogo } from '../AvailableTechnoSection/Vuejs';
// import { AngularLogo } from '../AvailableTechnoSection/Angular';
// import { SolidLogo } from '../AvailableTechnoSection/Solid';
// import { SvelteLogo } from '../AvailableTechnoSection/Svelte';

const SHOW_WHATS_NEW = false;
// Animated Technology logos
const TechLogos: FC = () => {
  const { icons } = useIntlayer('available-techno-section');

  const logos: Array<{
    Logo: FC<SVGProps<SVGSVGElement>>;
    key: keyof typeof icons;
  }> = [
    { Logo: ReactLogo, key: 'react' },
    { Logo: NextJSLogo, key: 'nextjs' },
    { Logo: PreactLogo, key: 'preact' },
    { Logo: VuejsLogo, key: 'vue' },
    { Logo: NuxtLogo, key: 'nuxt' },
    { Logo: ViteLogo, key: 'vite' },
    { Logo: LynxLogo, key: 'lynx' },
    // { Logo: AstroLogo, key: 'astro' },
    // { Logo: AngularLogo, key: 'angular' },
    // { Logo: SvelteLogo, key: 'svelte' },
    // { Logo: SolidLogo, key: 'solid' }
  ];

  // Duplicate logos for seamless infinite scroll
  // const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden relative [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          x: [0, -(logos.length * 100)],
        }}
        transition={{
          opacity: { duration: 0.7 },
          y: { duration: 0.7 },
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
            delay: 1,
          },
        }}
        style={{ willChange: 'transform' }}
        className="flex gap-16 sm:gap-20 md:gap-24 lg:gap-28 items-center py-6 transform-gpu"
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={`${logo.key}-${index}`} className="flex-shrink-0">
            <logo.Logo className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-70 hover:opacity-100 transition-opacity duration-200" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const BlurInText: FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const LandingSection: FC = () => {
  const {
    whatsNew,
    version,
    title,
    subheading,
    description,
    supportButton,
    getStartedButton,
    availableFor,
  } = useIntlayer('landing-section');

  return (
    <section className="relative flex flex-col min-h-[calc(100vh-64px)] w-full px-4 md:px-8 lg:px-12">
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        {/* Centered Content */}
        <div className="w-full max-w-4xl mx-auto mb-8 lg:mb-0">
          {/* What's New Tag */}
          {SHOW_WHATS_NEW && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex justify-center items-center gap-2"
            >
              <Tag
                size={TagSize.SM}
                border={TagBorder.WITH}
                color={TagColor.NEUTRAL}
                className="border text-text rounded-full text-sm font-medium"
              >
                {whatsNew}
              </Tag>
              <Link
                href={PagesRoutes.Changelog}
                color="custom"
                label="What's new"
              >
                <span className="flex items-center gap-1 text-sm sm:text-lg font-semibold text-neutral-500 dark:text-neutral-400">
                  {version} v{packageJSON.version}{' '}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          )}

          {/* Title */}
          <BlurInText
            delay={0.3}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 lg:mb-6 text-center"
          >
            {title}
          </BlurInText>

          {/* Subtitle */}
          <BlurInText
            delay={0.5}
            className="text-xl sm:text-3xl md:text-4xl font-semibold text-black dark:text-white mb-6 lg:mb-8 text-center"
          >
            {subheading}
          </BlurInText>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-200 font-medium mb-8 lg:mb-12 leading-relaxed text-center max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 lg:mb-10 justify-center"
          >
            <Link
              href="https://github.com/aymericzip/intlayer"
              variant={LinkVariant.BUTTON}
              // color={LinkColor.DARK}
              label={supportButton.value}
              className="hover:scale-105 px-4 py-2 rounded-full border-2 border-neutral-300 dark:border-neutral-600 bg-transparent hover:bg-transparent"
              isExternalLink
            >
              <span className="flex items-center justify-center gap-2 text-black dark:text-white">
                {/* <span className="block">
                <Github width={20} height={20} />
              </span> */}
                <span className="block text-lg">{supportButton}</span>
              </span>
            </Link>

            <Link
              href={PagesRoutes.Doc}
              variant={LinkVariant.BUTTON}
              color={LinkColor.CUSTOM}
              label={getStartedButton.value}
              className="hover:scale-105 px-4 py-2 rounded-full"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg">{getStartedButton}</span>
                <ArrowRight width={20} height={20} />
              </span>
            </Link>
          </motion.div>

          {/* Available For Section - Full Viewport Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-8"
          >
            <p className="text-sm sm:text-base text-black dark:text-white mb-6 font-medium tracking-wider">
              {availableFor}
            </p>
            <TechLogos />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
