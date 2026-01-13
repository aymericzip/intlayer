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
} from 'lucide-react';
import { type IntlayerNode, useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

type IconMap = {
  [key: string]: FC<{ className?: string }>;
};

const iconMap: IconMap = {
  free: Coins,
  'json-markdown': FileCode,
  chunking: Layers,
  'context-aware': Sparkles,
  audits: CheckCircle2,
  'git-integrated': GitBranch,
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

export const KeyPointsSection: FC = () => {
  const { title, description, keyPoints } = useIntlayer('key-points-section');

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
        className="mt-6 flex flex-wrap justify-evenly gap-4 md:grid-cols-2"
      >
        {keyPoints.map(
          (feature: {
            id: IntlayerNode;
            title: IntlayerNode;
            description: IntlayerNode;
          }) => {
            const IconComponent = iconMap[feature.id.value] || Coins;
            return (
              <motion.div key={feature.id.value} variants={sectionFade}>
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
                      <IconComponent className="size-5 text-text" />
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
            );
          }
        )}
      </motion.div>
    </section>
  );
};
