'use client';

import { motion } from 'framer-motion';
import { Banknote, EyeOff, RefreshCcw } from 'lucide-react';
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
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: true, amount: 0.2 },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const iconMap: Record<string, ReactNode> = {
  wallet: <Banknote className="size-6" />,
  'refresh-alert': <RefreshCcw className="size-6" />,
  'eye-off': <EyeOff className="size-6" />,
};

export const PainPointsSection: FC = () => {
  const { painPointsTitle, painPoints } = useIntlayer('tms-landing');

  return (
    <section className="bg-neutral-50 py-24 dark:bg-neutral-900/30">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <motion.h2
          {...fadeUp}
          className="mb-16 text-center font-bold text-3xl text-text sm:text-4xl"
        >
          {painPointsTitle}
        </motion.h2>

        <motion.div {...staggerContainer} className="grid gap-8 md:grid-cols-3">
          {painPoints.map((point) => (
            <motion.div
              key={point.id}
              {...staggerItem}
              className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-background p-8 transition-all dark:border-neutral-800"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {iconMap[point.icon.value]}
              </div>
              <h3 className="mb-3 font-semibold text-text text-xl">
                {point.title}
              </h3>
              <p className="text-neutral leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
