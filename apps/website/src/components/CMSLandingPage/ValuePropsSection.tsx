'use client';

import { motion } from 'framer-motion';
import { Code2, Puzzle, Rocket } from 'lucide-react';
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
  code: <Code2 className="size-6" />,
  puzzle: <Puzzle className="size-6" />,
  rocket: <Rocket className="size-6" />,
};

export const ValuePropsSection: FC = () => {
  const { valuePropsTitle, valueProps } = useIntlayer('cms-landing');

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-24 dark:bg-neutral-900/30">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <motion.h2
          {...fadeUp}
          className="mb-16 text-center font-bold text-3xl text-text sm:text-4xl"
        >
          {valuePropsTitle}
        </motion.h2>

        <motion.div {...staggerContainer} className="grid gap-8 md:grid-cols-3">
          {valueProps.map((prop) => (
            <motion.div
              key={prop.id}
              {...staggerItem}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-background p-8 transition-all dark:border-neutral-800"
            >
              <div className="relative">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
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
  );
};
