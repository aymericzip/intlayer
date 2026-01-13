'use client';

import { Link } from '@components/Link/Link';
import {
  CodeBlock,
  Container,
  ContainerBackground,
  ContainerBorderColor,
  ContainerPadding,
  ContainerRoundedSize,
  ContainerTransparency,
  LinkColor,
  LinkVariant,
} from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  CheckCircle2,
  CreditCard,
  FileJson,
  FileText,
  Globe,
  Languages,
  Server,
  Sparkles,
} from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';
import { PagesRoutes } from '@/Routes';

type CodeBlockWrapperProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export const CodeBlockWrapper: FC<CodeBlockWrapperProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <Container
      roundedSize={ContainerRoundedSize['2xl']}
      padding={ContainerPadding.MD}
      border
      borderColor={ContainerBorderColor.NEUTRAL}
      background={ContainerBackground.NONE}
      className={cn('relative overflow-hidden text-text-dark', className)}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-text-dark/70 text-xs">{title}</span>
        <span className="text-text-dark/40 text-xs">CLI</span>
      </div>
      {children}
    </Container>
  );
};

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

export const Pill: FC<{ children: ReactNode; className?: string }> = ({
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

export const HeroSection: FC = () => {
  const reduced = useReducedMotion();
  const { pills, title, description, seeCLICommands, getStartedForFree, card } =
    useIntlayer('hero-section');

  return (
    <>
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -top-24 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
          animate={reduced ? undefined : { y: [0, 18, 0], scale: [1, 1.03, 1] }}
          transition={
            reduced
              ? undefined
              : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          aria-hidden
          className="absolute -top-12 right-[-120px] h-[360px] w-[360px] rounded-full bg-success/10 blur-3xl"
          animate={reduced ? undefined : { x: [0, -22, 0], y: [0, 10, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          aria-hidden
          className="absolute top-[520px] left-[-140px] h-[420px] w-[420px] rounded-full bg-secondary/12 blur-3xl"
          animate={reduced ? undefined : { x: [0, 20, 0], y: [0, -16, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 11, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </div>

      {/* Content */}
      <section className="relative mx-auto flex h-screen max-w-6xl items-center px-8">
        <motion.div
          variants={sectionFade}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-start gap-8 md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <div className="mb-4 flex flex-wrap gap-2">
              <Pill>
                <CreditCard className="size-3 text-text" />
                {pills.freeOpenSource}
              </Pill>
              <Pill>
                <FileJson className="size-3 text-text" />
                {pills.jsonTranslation}
              </Pill>
              <Pill>
                <FileText className="size-3 text-text" />
                {pills.docsTranslation}
              </Pill>
              <Pill>
                <Server className="size-3 text-text" />
                {pills.localLLM}
              </Pill>
            </div>

            <h1 className="text-balance font-semibold text-4xl text-text leading-tight md:text-5xl">
              {title}
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base text-text/70 md:text-lg">
              {description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#commands"
                variant={LinkVariant.BUTTON_OUTLINED}
                color={LinkColor.TEXT}
                className="w-full sm:w-auto"
                label={seeCLICommands}
              >
                {seeCLICommands}
              </Link>

              <Link
                href={PagesRoutes.Doc_CLI_Fill}
                variant={LinkVariant.BUTTON}
                color={LinkColor.PRIMARY}
                className="w-full sm:w-auto"
                label={getStartedForFree}
              >
                {getStartedForFree}
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <Container
              roundedSize={ContainerRoundedSize['3xl']}
              transparency={ContainerTransparency.MD}
              padding={ContainerPadding.LG}
              border
              borderColor={ContainerBorderColor.TEXT}
              background={ContainerBackground.WITH}
              className="relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-text/10 p-2">
                    <Globe className="size-5 text-text" />
                  </div>
                  <div className="font-medium text-sm text-text">
                    {card.title}
                  </div>
                </div>
                <Pill className="bg-card/10">{pills.freeCLI}</Pill>
              </div>

              <div className="mt-4">
                <CodeBlockWrapper title={card.codeBlockTitle}>
                  <CodeBlock lang="bash" isDarkMode className="text-sm">
                    {card.code.value}
                  </CodeBlock>
                </CodeBlockWrapper>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-text/70 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-text" />
                  {card.features.noMonthlyFees}
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="size-4 text-text" />
                  {card.features.multiLanguage}
                </div>
                <div className="flex items-center gap-2">
                  <Server className="size-4 text-text" />
                  {card.features.runsLocally}
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-text" />
                  {card.features.byoKeysLLM}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_30%_0%,rgba(203,235,64,0.10),transparent_45%)]" />
            </Container>
          </div>
        </motion.div>
      </section>
    </>
  );
};
