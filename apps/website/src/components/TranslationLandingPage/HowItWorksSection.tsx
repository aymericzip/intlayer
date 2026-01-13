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
import type { FC, ReactNode } from 'react';

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

const steps = [
  {
    step: '01',
    title: 'Detect',
    desc: 'Find missing locales, structural mismatches, and type issues.',
    icon: CheckCircle2,
  },
  {
    step: '02',
    title: 'Chunk',
    desc: 'Split content safely for the model context window.',
    icon: Layers,
  },
  {
    step: '03',
    title: 'Translate / Review',
    desc: 'Apply context, retry on format mismatch, keep existing keys.',
    icon: Sparkles,
  },
  {
    step: '04',
    title: 'Write back',
    desc: 'Update files deterministically and keep diffs clean.',
    icon: GitBranch,
  },
];

export const HowItWorksSection: FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-8 py-10 md:py-14">
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h2 className="font-semibold text-2xl text-text md:text-3xl">
          How it works under the hood
        </h2>
        <p className="mt-2 max-w-2xl text-base text-text/70">
          A provider-agnostic pipeline designed for structured content and
          predictable results.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4"
      >
        {steps.map((s) => (
          <motion.div key={s.step} variants={sectionFade}>
            <Container
              roundedSize={ContainerRoundedSize['3xl']}
              transparency={ContainerTransparency.MD}
              padding={ContainerPadding.LG}
              border
              borderColor={ContainerBorderColor.TEXT}
              background={ContainerBackground.HOVERABLE}
              className="h-full"
            >
              <div className="flex items-center justify-between">
                <Pill className="bg-card/10">{s.step}</Pill>
                <s.icon className="size-5 text-text/80" />
              </div>
              <div className="mt-3 font-semibold text-base text-text">
                {s.title}
              </div>
              <div className="mt-1 text-sm text-text/70">{s.desc}</div>
            </Container>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
