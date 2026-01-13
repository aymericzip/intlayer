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
  return (
    <section className="mx-auto max-w-6xl px-8 py-10 md:py-14">
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h2 className="font-semibold text-2xl text-text md:text-3xl">
          Run locally for free, or scale with Intlayer Cloud.
        </h2>
        <p className="mt-2 max-w-2xl text-base text-text/70">
          We provide a flexible architecture. Run the translation pipeline on
          your own machine for zero cost, or use our server for team
          collaboration.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid grid-cols-1 justify-evenly gap-4 md:grid-cols-2"
      >
        <motion.div variants={sectionFade}>
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
              <div className="rounded-2xl bg-text/15 p-2">
                <Laptop className="size-5 text-text" />
              </div>
              <div>
                <div className="font-semibold text-base text-text">
                  Local Execution (Free)
                </div>
                <div className="mt-1 text-sm text-text/70">
                  Run the CLI on your machine. Bring your own keys (OpenAI,
                  etc.) or use Ollama for free offline translation.
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-text/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-text" /> No subscription
                fees
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-text" /> 100% Privacy &
                Control
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-text" /> Unlimited usage
              </div>
            </div>
          </Container>
        </motion.div>

        <motion.div variants={sectionFade}>
          <Container
            roundedSize={ContainerRoundedSize['3xl']}
            transparency={ContainerTransparency.MD}
            padding={ContainerPadding.LG}
            border
            borderColor={ContainerBorderColor.TEXT}
            background={ContainerBackground.HOVERABLE}
            className="h-full"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-text/20 p-2">
                <Server className="size-5 text-text" />
              </div>
              <div>
                <div className="font-semibold text-base text-text">
                  Intlayer Server (Optional)
                </div>
                <div className="mt-1 text-sm text-text/70">
                  Centralize provider configuration and run translations from a
                  shared environment/CMS.
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-text/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-text" /> Shared API
                configuration
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-text" /> Visual Editor
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-text" /> CMS features
              </div>
            </div>
          </Container>
        </motion.div>
      </motion.div>
    </section>
  );
};
