'use client';

import { Container } from '@intlayer/design-system';
import { m, type Variants } from 'framer-motion';
import { Banknote, EyeOff, RefreshCcw } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const iconMap: Record<string, ReactNode> = {
  wallet: <Banknote className="size-6" />,
  'refresh-alert': <RefreshCcw className="size-6" />,
  'eye-off': <EyeOff className="size-6" />,
};

const MotionContainer = m.create(Container);

export const PainPointsSection: FC = () => {
  const { painPointsTitle, painPoints } = useIntlayer('pain-points-section');

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <m.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-bold text-3xl text-text sm:text-4xl"
        >
          {painPointsTitle}
        </m.h2>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-3"
        >
          {painPoints.map((point) => (
            <MotionContainer
              key={point.id.value}
              variants={cardVariants}
              roundedSize="3xl"
              padding="lg"
              background="with"
              border={true}
              className="relative"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-neutral/10 text-text">
                {iconMap[point.icon.value]}
              </div>
              <h3 className="mb-3 font-semibold text-text text-xl">
                {point.title}
              </h3>
              <p className="text-neutral leading-relaxed">
                {point.description}
              </p>
            </MotionContainer>
          ))}
        </m.div>
      </div>
    </section>
  );
};
