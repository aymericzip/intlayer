'use client';

import { BackgroundLayout } from '@components/BackgroundLayout';
import { ContributorSection } from '@components/LandingPage/ContributorSection';
import { Link } from '@components/Link/Link';
import {
  LinkColor,
  LinkVariant,
  Tag,
  TagBorder,
  TagColor,
  TagSize,
} from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Building,
  Code2,
  GitMerge,
  Globe,
  Layout,
  Puzzle,
  RefreshCw,
  Rocket,
  Server,
  Sparkles,
  ToggleLeft,
  Users,
  Webhook,
  Zap,
} from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import { AppRoutes, PagesRoutes } from '@/Routes';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true, amount: 0.2 },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const iconMap: Record<string, ReactNode> = {
  code: <Code2 className="size-6" />,
  puzzle: <Puzzle className="size-6" />,
  rocket: <Rocket className="size-6" />,
  server: <Server className="size-6" />,
  refresh: <RefreshCw className="size-6" />,
  zap: <Zap className="size-6" />,
  'git-merge': <GitMerge className="size-6" />,
  globe: <Globe className="size-6" />,
  webhook: <Webhook className="size-6" />,
  layout: <Layout className="size-6" />,
  toggle: <ToggleLeft className="size-6" />,
  users: <Users className="size-6" />,
  sparkles: <Sparkles className="size-6" />,
  building: <Building className="size-6" />,
};

export const CMSLandingPage: FC = () => {
  const {
    heroTag,
    heroTitle,
    heroSubtitle,
    heroDescription,
    primaryCta,
    secondaryCta,
    valuePropsTitle,
    valueProps,
    deliveryTitle,
    deliveryDescription,
    deliveryModes,
    featuresTitle,
    features,
    comingSoonTitle,
    comingSoonFeatures,
    integrationTitle,
    integrationDescription,
    integrationCta,
    finalCtaTitle,
    finalCtaDescription,
    finalCtaPrimary,
    finalCtaSecondary,
  } = useIntlayer('cms-landing');

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <BackgroundLayout>
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
                  color={TagColor.NEUTRAL}
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
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
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
      </BackgroundLayout>

      {/* Value Props Section */}
      <section className="relative overflow-hidden bg-neutral-50 py-24 dark:bg-neutral-900/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <motion.h2
            {...fadeUp}
            className="mb-16 text-center font-bold text-3xl text-text sm:text-4xl"
          >
            {valuePropsTitle}
          </motion.h2>

          <motion.div
            {...staggerContainer}
            className="grid gap-8 md:grid-cols-3"
          >
            {valueProps.map((prop) => (
              <motion.div
                key={prop.id}
                {...staggerItem}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-background p-8 transition-all hover:border-neutral-300 hover:shadow-xl dark:border-neutral-800 dark:hover:border-neutral-700"
              >
                <div className="relative">
                  <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 shadow-sm dark:bg-neutral-800 dark:text-neutral-300">
                    {iconMap[prop.icon.value]}
                  </div>
                  <h3 className="mb-3 font-semibold text-text text-xl">
                    {prop.title}
                  </h3>
                  <p className="text-neutral leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Delivery Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-3xl text-text sm:text-4xl">
              {deliveryTitle}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral">
              {deliveryDescription}
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid gap-6 lg:grid-cols-3"
          >
            {deliveryModes.map((mode) => (
              <motion.div
                key={mode.id}
                {...staggerItem}
                className={cn(
                  'group relative overflow-hidden rounded-3xl p-8 transition-all',
                  mode.id === 'live-sync'
                    ? 'border-2 border-primary bg-primary/70 shadow-lg'
                    : 'border border-neutral-200 bg-background hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:hover:border-neutral-700'
                )}
              >
                {mode.badge && (
                  <div
                    className={cn(
                      'absolute top-4 right-4 rounded-full px-3 py-1 font-medium text-xs',
                      mode.id === 'live-sync'
                        ? 'bg-primary/20 text-text'
                        : 'bg-neutral-100 text-neutral dark:bg-neutral-800'
                    )}
                  >
                    {mode.badge}
                  </div>
                )}
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  {iconMap[mode.icon.value]}
                </div>
                <h3 className="mb-3 font-semibold text-text text-xl">
                  {mode.title}
                </h3>
                <p className="text-neutral leading-relaxed">
                  {mode.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="relative overflow-hidden bg-neutral-50/50 py-24 dark:bg-neutral-900/20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <motion.h2
            {...fadeUp}
            className="mb-16 text-center font-bold text-3xl text-text sm:text-4xl"
          >
            {featuresTitle}
          </motion.h2>

          <motion.div
            {...staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                {...staggerItem}
                className="group flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-background p-6 transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:hover:border-neutral-700"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover:bg-neutral-700">
                  {iconMap[feature.icon.value]}
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-base text-text">
                    {feature.title}
                  </h3>
                  <p className="text-neutral text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1.5 font-medium text-sm text-text">
              {comingSoonTitle}
            </span>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid gap-6 md:grid-cols-2"
          >
            {comingSoonFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                {...staggerItem}
                className="relative overflow-hidden rounded-2xl border border-neutral-300 border-dashed bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-900/50"
              >
                <div className="absolute top-4 right-4 rounded-full bg-secondary/20 px-2.5 py-1 font-medium text-text text-xs">
                  {feature.badge}
                </div>
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-secondary/20 text-text">
                  {iconMap[feature.icon.value]}
                </div>
                <h3 className="mb-2 font-semibold text-lg text-text">
                  {feature.title}
                </h3>
                <p className="text-neutral text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
          <motion.div
            {...fadeUp}
            className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16"
          >
            {/* Left side - Icon and visual */}
            <div className="flex items-center justify-center rounded-full bg-neutral-100 p-5 text-neutral-700 transition-colors group-hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover:bg-neutral-700">
              <Globe className="size-16" />
            </div>

            {/* Right side - Content */}
            <div className="flex flex-col gap-6 text-center md:text-left">
              <h2 className="font-bold text-3xl text-text sm:text-4xl">
                {integrationTitle}
              </h2>
              <p className="max-w-xl text-lg text-neutral leading-relaxed">
                {integrationDescription}
              </p>
              <div>
                <Link
                  href={PagesRoutes.Home}
                  variant={LinkVariant.BUTTON}
                  color={LinkColor.TEXT}
                  label={integrationCta.value}
                  size="lg"
                  roundedSize="full"
                  className="group inline-flex items-center gap-2"
                >
                  <span className="flex flex-row flex-nowrap items-center gap-2 text-sm sm:text-lg">
                    {integrationCta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24">
        <ContributorSection />
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-text" />

        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8 lg:px-12">
          <motion.div {...fadeUp}>
            <h2 className="mb-6 font-bold text-3xl text-text-opposite sm:text-4xl md:text-5xl">
              {finalCtaTitle}
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-300">
              {finalCtaDescription}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Link
                href={AppRoutes.Pricing}
                variant={LinkVariant.BUTTON_OUTLINED}
                color={LinkColor.TEXT_INVERSE}
                label={finalCtaSecondary.value}
                size="lg"
                roundedSize="full"
              >
                {finalCtaSecondary}
              </Link>

              <Link
                href={AppRoutes.Onboarding}
                variant={LinkVariant.BUTTON}
                color={LinkColor.TEXT_INVERSE}
                label={finalCtaPrimary.value}
                size="xl"
                roundedSize="full"
                className="flex flex-row items-center justify-center gap-2"
              >
                <span className="flex flex-row flex-nowrap items-center gap-2 text-sm text-text sm:text-lg">
                  {finalCtaPrimary}
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
