'use client';

import { Container } from '@intlayer/design-system';
import { m, type Variants } from 'framer-motion';
import { GitBranch, Sparkles, Users, Webhook } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

// Consistent Spring Animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
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
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const iconMap: Record<string, ReactNode> = {
  users: <Users className="size-6" />,
  sparkles: <Sparkles className="size-6" />,
  'git-branch': <GitBranch className="size-6" />,
  webhook: <Webhook className="size-6" />,
};

const MotionContainer = m.create(Container);

export const FeaturesSection: FC = () => {
  const { featuresTitle, features } = useIntlayer('features-section');

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={headerVariants}
          className="mb-16 text-center"
        >
          <h2 className="font-bold text-3xl text-text sm:text-4xl">
            {featuresTitle}
          </h2>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2"
        >
          {features.map((feature) => (
            <MotionContainer
              key={feature.id.value}
              variants={cardVariants}
              roundedSize="3xl"
              padding="lg"
              background="with"
              border={true}
              className="group flex flex-col gap-4"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-neutral/10 text-text transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                {iconMap[feature.icon.value] ?? <Sparkles className="size-6" />}
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-text text-xl">
                  {feature.title}
                </h3>
                <p className="text-neutral leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </MotionContainer>
          ))}
        </m.div>
      </div>
    </section>
  );
};
