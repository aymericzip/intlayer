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
import { CheckCircle2, Laptop, Server } from 'lucide-react';
import { type IntlayerNode, useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

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

export const LocalVsServerSection: FC = () => {
  const { title, description, local, server } = useIntlayer(
    'local-vs-server-section'
  );

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
        className="mt-20 grid grid-cols-1 justify-evenly gap-4 md:grid-cols-2"
      >
        <motion.div variants={sectionFade}>
          <Container
            roundedSize={ContainerRoundedSize['3xl']}
            transparency={ContainerTransparency.MD}
            padding={ContainerPadding.LG}
            className="h-full max-w-lg"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-text/15 p-2">
                <Laptop className="size-5 text-text" />
              </div>
              <div>
                <div className="font-semibold text-base text-text">
                  {local.title}
                </div>
                <div className="mt-1 text-sm text-text/70">
                  {local.description}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-text/70">
              {local.features.map((feature: IntlayerNode) => (
                <div key={feature.value} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-text" /> {feature}
                </div>
              ))}
            </div>
          </Container>
        </motion.div>

        <motion.div variants={sectionFade}>
          <Container
            roundedSize={ContainerRoundedSize['3xl']}
            transparency={ContainerTransparency.MD}
            padding={ContainerPadding.LG}
            className="h-full"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-text/20 p-2">
                <Server className="size-5 text-text" />
              </div>
              <div>
                <div className="font-semibold text-base text-text">
                  {server.title}
                </div>
                <div className="mt-1 text-sm text-text/70">
                  {server.description}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-text/70">
              {server.features.map((feature: IntlayerNode) => (
                <div key={feature.value} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-text" /> {feature}
                </div>
              ))}
            </div>
          </Container>
        </motion.div>
      </motion.div>
    </section>
  );
};
