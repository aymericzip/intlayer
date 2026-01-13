'use client';

import {
  CodeBlock,
  Container,
  ContainerBackground,
  ContainerBorderColor,
  ContainerPadding,
  ContainerRoundedSize,
  ContainerTransparency,
} from '@intlayer/design-system';
import { motion, type Variants } from 'framer-motion';
import { Braces, FileText, Languages } from 'lucide-react';
import { type IntlayerNode, useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

type IconMap = {
  [key: string]: FC<{ className?: string }>;
};

const iconMap: IconMap = {
  'translate-json': Braces,
  'translate-markdown': FileText,
  'review-translations': Languages,
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

export const CommandsSection: FC = () => {
  const { title, description, commands } = useIntlayer(
    'translation-commands-section'
  );

  return (
    <section id="commands" className="mx-auto max-w-6xl px-8 py-20 md:py-28">
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
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {commands.map(
          (cmd: {
            id: IntlayerNode;
            title: IntlayerNode;
            description: IntlayerNode;
            code: string;
          }) => {
            const IconComponent = iconMap[cmd.id.value] || Braces;
            return (
              <motion.div key={cmd.id.value} variants={sectionFade}>
                <Container
                  roundedSize={ContainerRoundedSize['3xl']}
                  transparency={ContainerTransparency.MD}
                  padding={ContainerPadding.LG}
                  border
                  borderColor={ContainerBorderColor.TEXT}
                  background={ContainerBackground.HOVERABLE}
                  className="h-full"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-2xl bg-card/40 p-2">
                        <IconComponent className="size-5 text-text" />
                      </div>
                      <div>
                        <div className="font-semibold text-base text-text">
                          {cmd.title}
                        </div>
                        <div className="mt-1 text-sm text-text/70">
                          {cmd.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Container
                      roundedSize="2xl"
                      border
                      transparency="none"
                      padding="md"
                      className="relative overflow-hidden text-text-dark"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-text-dark/70 text-xs">
                          {cmd.title}
                        </span>
                        <span className="text-text-dark/40 text-xs">CLI</span>
                      </div>
                      <CodeBlock lang="bash" isDarkMode className="text-sm">
                        {cmd.code.value}
                      </CodeBlock>
                    </Container>
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
