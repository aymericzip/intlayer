'use client';

import {
  Container,
  ContainerBackground,
  ContainerBorderColor,
  ContainerPadding,
  ContainerRoundedSize,
  ContainerTransparency,
} from '@intlayer/design-system';
import { motion, type Variants } from 'framer-motion';
import {
  CheckCircle2,
  Coins,
  FileCode,
  GitBranch,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
import type { FC } from 'react';

type Feature = {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
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

const keyPoints: Feature[] = [
  {
    icon: Coins,
    title: '100% Free & No Subscription',
    description:
      'We do not mark up AI costs. Use your own API keys or local models. No credit card required.',
  },
  {
    icon: FileCode,
    title: 'Translates JSON & Markdown',
    description:
      'Perfect for UI locales (JSON/TS) and documentation files (MD/MDX). Preserves code structure.',
  },
  {
    icon: Layers,
    title: 'Smart Context Chunking',
    description:
      'Splits large documentation files into safe chunks so you never exceed the model context window.',
  },
  {
    icon: Sparkles,
    title: 'Context-Aware Accuracy',
    description:
      'Inject application-level context for consistent terminology across your entire app.',
  },
  {
    icon: CheckCircle2,
    title: 'Audits Existing Translations',
    description:
      "Detects missing keys or untranslated content. It only fills what's missing to save tokens.",
  },
  {
    icon: GitBranch,
    title: 'Git-Integrated Workflow',
    description:
      'Run translation only on modified files (git diff). ideal for CI/CD pipelines.',
  },
];

export const KeyPointsSection: FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-8 py-10 md:py-14">
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h2 className="font-semibold text-2xl text-text md:text-3xl">
          The best free tool to translate apps & docs.
        </h2>
        <p className="mt-2 max-w-2xl text-base text-text/70">
          Stop paying for expensive translation subscriptions. Intlayer is an
          open-source automation pipeline that gives you control over your i18n
          process.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 flex flex-wrap justify-evenly gap-4 md:grid-cols-2"
      >
        {keyPoints.map((feature) => (
          <motion.div key={feature.title} variants={sectionFade}>
            <Container
              roundedSize={ContainerRoundedSize['3xl']}
              transparency={ContainerTransparency.MD}
              padding={ContainerPadding.LG}
              border
              borderColor={ContainerBorderColor.TEXT}
              background={ContainerBackground.HOVERABLE}
              className="h-full max-w-lg"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-card/40 p-2">
                  <feature.icon className="size-5 text-text" />
                </div>
                <div>
                  <div className="font-semibold text-base text-text">
                    {feature.title}
                  </div>
                  <div className="mt-1 text-sm text-text/70">
                    {feature.description}
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
