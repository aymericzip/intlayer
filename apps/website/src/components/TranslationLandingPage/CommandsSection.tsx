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
import type { FC } from 'react';

type Command = {
  title: string;
  description: string;
  code: string;
  icon: FC<{ className?: string }>;
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

const commands: Command[] = [
  {
    title: 'Translate JSON / JS',
    description:
      'Find missing keys in your locale files and fill them using AI.',
    code: `npx intlayer fill`,
    icon: Braces,
  },
  {
    title: 'Translate Markdown',
    description: 'Generate localized documentation files automatically.',
    code: `npx intlayer doc translate`,
    icon: FileText,
  },
  {
    title: 'Review Translations',
    description: 'Interactive CLI to approve or reject AI-generated content.',
    code: `npx intlayer doc review`,
    icon: Languages,
  },
];

export const CommandsSection: FC = () => {
  return (
    <section
      id="commands"
      className="mx-auto mt-6 max-w-6xl px-8 py-10 md:py-14"
    >
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h2 className="font-semibold text-2xl text-text md:text-3xl">
          Automate translation for JSON & Docs.
        </h2>
        <p className="mt-2 max-w-2xl text-base text-text/70">
          Keep your UI consistent and your documentation accessible. Run these
          commands locally or in your CI pipeline, completely free with local
          models or your own API key.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {commands.map((cmd) => (
          <motion.div key={cmd.title} variants={sectionFade}>
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
                    <cmd.icon className="size-5 text-text" />
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
                <div className="relative overflow-hidden rounded-2xl border-[1.3px] border-text/15 bg-neutral-950/90 p-4 text-text-dark supports-[corner-shape:squircle]:rounded-3xl">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-text-dark/70 text-xs">
                      {cmd.title}
                    </span>
                    <span className="text-text-dark/40 text-xs">CLI</span>
                  </div>
                  <CodeBlock lang="bash" isDarkMode className="text-sm">
                    {cmd.code}
                  </CodeBlock>
                </div>
              </div>
            </Container>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
