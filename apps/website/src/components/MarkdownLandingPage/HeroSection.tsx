import { Container } from '@intlayer/design-system/container';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Website_Doc_Markdown_Path } from '@intlayer/design-system/routes';
import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system/switch-selector';
import { cn } from '@intlayer/design-system/utils';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Blocks, Layers, PackageMinus, Server, Tags, Zap } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { useTabTimer } from './useTabTimer';

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
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full border-[1.3px] border-text/15 bg-card/30 px-3 py-1 text-foreground text-xs backdrop-blur supports-[corner-shape:squircle]:rounded-full',
      className
    )}
  >
    {children}
  </span>
);

export type TabKey = 'monolingual' | 'multilingual' | 'contentFile';

const TABS: TabKey[] = ['monolingual', 'multilingual', 'contentFile'];

export const HeroSection: FC = () => {
  const reduced = useReducedMotion();
  const { pills, title, description, readTheDocs, seeBenchmark, card } =
    useIntlayer('hero-section-markdown');
  const { selectedTab, setSelectedTab } = useTabTimer<TabKey>({
    tabs: TABS,
    initialTab: 'monolingual',
    intervalMs: 4000,
  });

  const tabChoices: SwitchSelectorChoices<TabKey> = [
    {
      content: card.switchSelector.monolingual,
      value: 'monolingual',
    },
    {
      content: card.switchSelector.multilingual,
      value: 'multilingual',
    },
    {
      content: card.switchSelector.contentFile,
      value: 'contentFile',
    },
  ];

  return (
    <>
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -top-24 left-1/2 h-129 w-180 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
          animate={reduced ? undefined : { y: [0, 18, 0], scale: [1, 1.03, 1] }}
          transition={
            reduced
              ? undefined
              : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          aria-hidden
          className="absolute -top-12 -right-30 h-90 w-90 rounded-full bg-success/10 blur-3xl"
          animate={reduced ? undefined : { x: [0, -22, 0], y: [0, 10, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </div>

      {/* Content */}
      <section className="relative mx-auto flex min-h-[75vh] max-w-6xl flex-col justify-center gap-12 px-8 py-24">
        <div className="flex flex-wrap gap-2">
          <Pill>
            <PackageMinus className="size-3 text-foreground" />
            {pills.zeroDependency}
          </Pill>
          <Pill>
            <Blocks className="size-3 text-foreground" />
            {pills.mdx}
          </Pill>
          <Pill>
            <Server className="size-3 text-foreground" />
            {pills.ssr}
          </Pill>
          <Pill>
            <Layers className="size-3 text-foreground" />
            {pills.crossFramework}
          </Pill>
        </div>

        <motion.div
          variants={sectionFade}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-start gap-x-8 gap-y-16 md:grid-cols-12"
        >
          <div className="md:col-span-6">
            <h1 className="text-balance font-semibold text-4xl text-foreground leading-tight md:text-5xl">
              {title}
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base text-foreground/70 md:text-lg">
              {description}
            </p>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to={Website_Doc_Markdown_Path}
                variant="button"
                color="text"
                className="w-full sm:w-auto"
                label={readTheDocs.value}
              >
                {readTheDocs}
              </Link>

              <Link
                to="#benchmark"
                variant="button-outlined"
                color="text"
                className="w-full sm:w-auto"
                label={seeBenchmark.value}
              >
                {seeBenchmark}
              </Link>
            </div>
          </div>

          <Container
            roundedSize="3xl"
            transparency="md"
            padding="lg"
            className="relative flex w-full items-center overflow-hidden md:col-span-6"
          >
            <SwitchSelector
              choices={tabChoices}
              value={selectedTab}
              onChange={setSelectedTab}
              size="sm"
              color="text"
              itemClassName="text-nowrap text-xs m-auto"
            />

            {/* Equal-height panel carousel track: all panels share the height of the tallest panel */}
            <div className="relative mt-4 w-full min-w-0 overflow-x-clip [-webkit-clip-path:inset(0)] [clip-path:inset(0)]">
              <div
                className={cn(
                  'grid w-full min-w-0',
                  reduced
                    ? undefined
                    : 'transition-transform duration-300 ease-in-out'
                )}
                style={{
                  gridTemplateColumns: `repeat(${TABS.length}, 100%)`,
                  transform: `translateX(-${TABS.indexOf(selectedTab) * 100}%)`,
                }}
              >
                {TABS.map((tabKey) => {
                  const tabData = card[tabKey] ?? card.multilingual;
                  const lang =
                    tabKey === 'contentFile' ? 'typescript' : 'markdown';
                  const isActive = tabKey === selectedTab;

                  return (
                    <div
                      key={tabKey}
                      role="tabpanel"
                      inert={!isActive}
                      data-active={isActive}
                      className={cn(
                        'w-full min-w-0 opacity-100 transition-opacity duration-300 ease-in-out',
                        !isActive && 'pointer-events-none opacity-0'
                      )}
                    >
                      <div className="flex flex-col gap-3">
                        <Container
                          roundedSize="2xl"
                          padding="md"
                          className="relative text-foreground-dark"
                        >
                          <span className="font-mono text-foreground-dark/70 text-xs">
                            {tabData.codeBlockTitle}
                          </span>
                          <CodeBlock lang={lang} className="mt-2 text-sm">
                            {tabData.code.value}
                          </CodeBlock>
                        </Container>

                        <p className="text-foreground/75 text-xs leading-relaxed">
                          {tabData.description}
                        </p>

                        <div className="rounded-xl border border-text/10 bg-card/40 p-2.5 backdrop-blur">
                          <div className="mb-1 font-medium text-[11px] text-foreground/60">
                            {tabData.fileStructureTitle}
                          </div>
                          <pre className="overflow-x-auto font-mono text-[11px] text-foreground/80 leading-relaxed">
                            {tabData.fileStructure.value ??
                              tabData.fileStructure}
                          </pre>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-foreground/70 text-xs">
              <div className="flex items-center gap-2">
                <PackageMinus className="size-4 text-foreground" />
                {card.features.zeroDependency}
              </div>
              <div className="flex items-center gap-2">
                <Blocks className="size-4 text-foreground" />
                {card.features.mdxComponents}
              </div>
              <div className="flex items-center gap-2">
                <Tags className="size-4 text-foreground" />
                {card.features.typedFrontmatter}
              </div>
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-foreground" />
                {card.features.treeShaken}
              </div>
            </div>
          </Container>
        </motion.div>
      </section>
    </>
  );
};
