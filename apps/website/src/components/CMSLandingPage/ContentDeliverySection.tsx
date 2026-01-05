'use client';

import { Container, Tag } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { m, type Variants } from 'framer-motion';
import { RefreshCw, Server, Zap } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

// New, cleaner variants using Spring physics
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster stagger for a snappier feel
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30, // Start slightly lower
    scale: 0.95, // Start slightly smaller
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring', // Spring makes it feel physical, not linear
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98], // Custom ease-out cubic
    },
  },
};

const iconMap: Record<string, ReactNode> = {
  server: <Server className="size-6" />,
  refresh: <RefreshCw className="size-6" />,
  zap: <Zap className="size-6" />,
};

const MotionContainer = m.create(Container);

export const ContentDeliverySection: FC = () => {
  const { deliveryTitle, deliveryDescription, deliveryModes } = useIntlayer(
    'cms-landing-content-delivery'
  );

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Header Section */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }} // Triggers slightly before element hits center
          variants={headerVariants}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-3xl text-text sm:text-4xl">
            {deliveryTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral">
            {deliveryDescription}
          </p>
        </m.div>

        {/* Card Grid */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid justify-center gap-6 lg:grid-cols-3"
        >
          {deliveryModes.map((mode) => (
            <MotionContainer
              key={mode.id.value}
              variants={cardVariants}
              roundedSize="3xl"
              padding="lg"
              background="with"
              border={true}
              className="relative max-w-xl"
              color={mode.id.value === 'live-sync' ? 'text' : 'neutral'}
            >
              {mode.badge && (
                <Tag
                  color={mode.id.value === 'live-sync' ? 'primary' : 'text'}
                  className="absolute top-4 right-4 rounded-full px-3 py-1 font-medium text-xs"
                >
                  {mode.badge}
                </Tag>
              )}

              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-neutral/10 text-text">
                {iconMap[mode.icon.value] ?? <Zap className="size-6" />}
              </div>

              <h3 className="mb-3 font-semibold text-text text-xl">
                {mode.title}
              </h3>

              <p className="text-neutral leading-relaxed">{mode.description}</p>
            </MotionContainer>
          ))}
        </m.div>
      </div>
    </section>
  );
};
