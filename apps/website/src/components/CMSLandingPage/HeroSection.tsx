'use client';

import { Link } from '@components/Link/Link';
import {
  LinkColor,
  LinkVariant,
  Tag,
  TagBorder,
  TagColor,
  TagSize,
} from '@intlayer/design-system';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useRef } from 'react';
import { AppRoutes, PagesRoutes } from '@/Routes';

export const HeroSection: FC = () => {
  const {
    heroTag,
    heroTitle,
    heroSubtitle,
    heroDescription,
    primaryCta,
    secondaryCta,
  } = useIntlayer('cms-landing-hero');

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[calc(100vh-64px)] w-full flex-col px-4 pt-10 md:px-8 lg:px-12"
    >
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="flex flex-1 flex-col items-center justify-center text-center"
      >
        <div className="mx-auto mt-12 mb-10 w-full max-w-5xl">
          {/* Tag */}
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

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-6 font-extrabold text-5xl text-text leading-[1.1] sm:text-6xl md:text-7xl"
          >
            {heroTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 font-medium text-neutral text-xl sm:text-2xl md:text-3xl"
          >
            {heroSubtitle}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-12 max-w-3xl text-balance text-lg text-neutral leading-relaxed"
          >
            {heroDescription}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link
              href={PagesRoutes.Doc_IntlayerCMS}
              variant={LinkVariant.BUTTON_OUTLINED}
              color={LinkColor.TEXT}
              label={secondaryCta.value}
              size="lg"
              roundedSize="full"
            >
              {secondaryCta}
            </Link>

            <Link
              href={AppRoutes.Dashboard_Editor}
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-neutral-300 p-1.5 dark:border-neutral-600"
        >
          <motion.div className="size-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
