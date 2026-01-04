'use client';

import { motion } from 'framer-motion';
import { Building, Sparkles } from 'lucide-react';
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
  sparkles: <Sparkles className="size-6" />,
  building: <Building className="size-6" />,
};

export const ComingSoonSection: FC = () => {
  const { comingSoonTitle, comingSoonFeatures } = useIntlayer('cms-landing');

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1.5 font-medium text-sm text-text">
            {comingSoonTitle}
          </span>
        </motion.div>

        <motion.div {...staggerContainer} className="grid gap-6 md:grid-cols-2">
          {comingSoonFeatures.map(
            (feature: (typeof comingSoonFeatures)[number]) => (
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
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};
