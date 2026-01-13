'use client';

import {
  Container,
  ContainerBackground,
  ContainerBorderColor,
  ContainerPadding,
  ContainerRoundedSize,
  ContainerTransparency,
} from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, GitBranch, Layers, Sparkles } from 'lucide-react';
import { type IntlayerNode, useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

type IconMap = {
  [key: string]: FC<{ className?: string }>;
};

const iconMap: IconMap = {
  '1': CheckCircle2,
  '2': Layers,
  '3': Sparkles,
  '4': GitBranch,
};

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const Pill: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border-[1.3px] border-text/15 bg-card/30 px-3 py-1 text-text text-xs backdrop-blur supports-[corner-shape:squircle]:rounded-full',
        className
      )}
    >
      {children}
    </span>
  );
};

export const HowItWorksSection: FC = () => {
  const { title, description, steps } = useIntlayer('how-it-works-section');

  return (
    <section className="mx-auto max-w-6xl px-8 py-20 md:py-28">
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h2 className="font-semibold text-2xl text-text md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-text/70">{description}</p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4"
      >
        {steps.map(
          (s: {
            step: IntlayerNode;
            title: IntlayerNode;
            description: IntlayerNode;
          }) => {
            const IconComponent = iconMap[s.step.value] || CheckCircle2;
            return (
              <motion.div key={s.step.value} variants={sectionFade}>
                <Container
                  roundedSize={ContainerRoundedSize['3xl']}
                  transparency={ContainerTransparency.MD}
                  padding={ContainerPadding.LG}
                  className="flex h-full flex-col items-center gap-3 text-center"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full border-4 border-lime-300 text-2xl text-lime-800 dark:border-lime-900 dark:text-lime-600">
                      {s.step}
                    </span>
                    <IconComponent className="size-6 text-neutral" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-lg">
                    {s.title}
                  </h3>
                  <p className="text-neutral text-xs leading-5">
                    {s.description}
                  </p>
                </Container>
              </motion.div>
            );
          }
        )}
      </motion.div>
    </section>
  );
};
