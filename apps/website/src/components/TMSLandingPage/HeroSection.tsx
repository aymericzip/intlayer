'use client';

import { Link } from '@components/Link/Link';
import {
  Container,
  LinkColor,
  LinkVariant,
  Tag,
  TagBorder,
  TagColor,
  TagSize,
} from '@intlayer/design-system';
import { m, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useRef } from 'react';
import { AppRoutes } from '@/Routes';
import TMSScreenshot from './TMS_screenshot.png';

export const HeroSection: FC = () => {
  const {
    heroTag,
    heroTitle,
    heroSubtitle,
    heroDescription,
    primaryCta,
    secondaryCta,
    screenshotAlt,
  } = useIntlayer('hero-section');

  const heroRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: imageScrollProgress } = useScroll({
    target: imageContainerRef,
    // Adjusted offset: Starts when top of image hits bottom of screen, ends when center hits center
    offset: ['start end', 'center center'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // 3D Animation Fixes:
  // 1. Reduced angles: 200deg was flipping it upside down. 25deg provides a nice 3D tilt.
  const imageRotateX = useTransform(
    imageScrollProgress,
    [0, 1],
    [25, 0] // Starts tilted back 25 degrees, lands at 0
  );

  // 2. Added opacity fade-in linked to scroll for smoother entry
  const imageOpacity = useTransform(imageScrollProgress, [0, 0.5], [0.8, 1]);

  const imageScale = useTransform(imageScrollProgress, [0, 1], [0.9, 1]);

  const MotionContainer = m.create(Container);

  return (
    <section
      ref={heroRef}
      className="relative flex w-full flex-col px-4 pt-10 md:px-8 lg:px-12"
    >
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="flex flex-col items-center justify-start pt-10 text-center"
      >
        <div className="mx-auto mb-10 w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <Tag
              size={TagSize.MD}
              border={TagBorder.WITH}
              color={TagColor.TEXT}
              className="rounded-full border px-4 py-1.5 font-semibold text-sm backdrop-blur-sm"
            >
              {heroTag}
            </Tag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-6 font-extrabold text-5xl text-text leading-[1.1] sm:text-6xl md:text-7xl"
          >
            {heroTitle}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 font-medium text-neutral text-xl sm:text-2xl md:text-3xl"
          >
            {heroSubtitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-12 max-w-3xl text-balance text-lg text-neutral leading-relaxed"
          >
            {heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link
              href={AppRoutes.Pricing}
              variant={LinkVariant.BUTTON_OUTLINED}
              color={LinkColor.TEXT}
              label={secondaryCta.value}
              size="lg"
              roundedSize="full"
            >
              {secondaryCta}
            </Link>

            <Link
              href={AppRoutes.Dashboard_Projects}
              variant={LinkVariant.BUTTON}
              color={LinkColor.TEXT}
              label={primaryCta.value}
              size="xl"
              roundedSize="full"
              className="flex flex-row items-center justify-center gap-2"
            >
              <span className="flex flex-row flex-nowrap items-center gap-2 text-sm sm:text-lg">
                {primaryCta}
                <ArrowRight className="size-5 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Screenshot Preview */}

      {/* 3D WRAPPER 
        We add a wrapper div here to establish the "perspective".
        'perspective-[1200px]' is a Tailwind arbitrary value (or standard CSS perspective: 1200px).
        This creates the "vanishing point".
      */}
      <div
        ref={imageContainerRef}
        className="perspective-distant mx-auto mt-auto w-full max-w-4xl"
      >
        <MotionContainer
          border
          borderColor="text"
          roundedSize="2xl"
          transparency="full"
          padding="none"
          initial={{ opacity: 0, y: 60, rotateX: 20 }} // Start slightly tilted
          animate={{ opacity: 1, y: 0, rotateX: 0 }} // Animate to flat on load
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          style={{
            rotateX: imageRotateX, // Bind scroll rotation
            scale: imageScale,
            opacity: imageOpacity,
            transformStyle: 'preserve-3d', // Important for children (like the tab bar) to look 3D
          }}
          className="relative w-full overflow-hidden shadow-2xl"
        >
          {/* Tab bar */}
          <div className="flex w-full flex-row items-center justify-start gap-1 bg-neutral-200/20 text-neutral text-xs dark:bg-neutral-950/20">
            <div className="mx-2 flex items-center justify-start gap-2 p-1">
              <div className="size-3 rounded-full bg-red-500" />
              <div className="size-3 rounded-full bg-yellow-500" />
              <div className="size-3 rounded-full bg-green-500" />
            </div>
            <div className="flex size-full overflow-y-auto">
              <div className="flex h-8 min-w-20 items-center justify-between gap-2 bg-card/20 px-3 py-1">
                <span>Intlayer TMS</span>
              </div>
            </div>
          </div>

          {/* Screenshot */}
          <Image
            src={TMSScreenshot}
            alt={screenshotAlt}
            className="w-full"
            priority
            placeholder="blur"
          />
        </MotionContainer>
      </div>
    </section>
  );
};
