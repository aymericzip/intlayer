'use client';

import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
import { RefreshCw, Server, Zap } from 'lucide-react';
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
  server: <Server className="size-6" />,
  refresh: <RefreshCw className="size-6" />,
  zap: <Zap className="size-6" />,
};

export const ContentDeliverySection: FC = () => {
  const { deliveryTitle, deliveryDescription, deliveryModes } =
    useIntlayer('cms-landing');

  return (
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

        <motion.div {...staggerContainer} className="grid gap-6 lg:grid-cols-3">
          {deliveryModes.map((mode: (typeof deliveryModes)[number]) => (
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
              <p className="text-neutral leading-relaxed">{mode.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
