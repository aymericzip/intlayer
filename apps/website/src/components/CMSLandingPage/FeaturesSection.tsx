'use client';

import { motion } from 'framer-motion';
import {
  GitMerge,
  Globe,
  Layout,
  ToggleLeft,
  Users,
  Webhook,
} from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

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
  'git-merge': <GitMerge className="size-6" />,
  globe: <Globe className="size-6" />,
  webhook: <Webhook className="size-6" />,
  layout: <Layout className="size-6" />,
  toggle: <ToggleLeft className="size-6" />,
  users: <Users className="size-6" />,
};

export const FeaturesSection: FC = () => {
  const { featuresTitle, features } = useIntlayer('cms-landing');

  return (
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
          {features.map((feature: (typeof features)[number]) => (
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
  );
};
