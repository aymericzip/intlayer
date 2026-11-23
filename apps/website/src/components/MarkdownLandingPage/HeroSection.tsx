import { CodeBlock } from '@intlayer/design-system/ide';
import { Website_Doc_Markdown_Path } from '@intlayer/design-system/routes';
import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system/switch-selector';
import { cn } from '@intlayer/design-system/utils';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown, Blocks, Layers, PackageMinus, Server } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { WindowFrame } from '~/components/ProductLanding/layout';
import { ProductHero } from '~/components/ProductLanding/ProductHero';
import { useTabTimer } from './useTabTimer';

export type TabKey = 'monolingual' | 'multilingual' | 'contentFile';

const TABS: TabKey[] = ['monolingual', 'multilingual', 'contentFile'];

/** Tabbed preview of the three ways to declare Markdown content. */
const DeclarationPreview: FC = () => {
  const reduced = useReducedMotion();
  const { card } = useIntlayer('hero-section-markdown');
  const { selectedTab, setSelectedTab } = useTabTimer<TabKey>({
    tabs: TABS,
    initialTab: 'monolingual',
    intervalMs: 4000,
  });

  const tabChoices: SwitchSelectorChoices<TabKey> = TABS.map((tabKey) => ({
    content: card.switchSelector[tabKey],
    value: tabKey,
  }));

  return (
    <WindowFrame title={card[selectedTab].codeBlockTitle}>
      <div className="flex flex-col gap-4 p-4">
        <SwitchSelector
          choices={tabChoices}
          value={selectedTab}
          onChange={setSelectedTab}
          size="sm"
          color="text"
          itemClassName="text-nowrap text-xs m-auto"
        />

        {/* Equal-height carousel track: panels share the tallest height */}
        <div className="relative w-full min-w-0 overflow-x-clip [-webkit-clip-path:inset(0)] [clip-path:inset(0)]">
          <div
            className={cn(
              'grid w-full min-w-0',
              !reduced &&
                'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'
            )}
            style={{
              gridTemplateColumns: `repeat(${TABS.length}, 100%)`,
              transform: `translateX(-${TABS.indexOf(selectedTab) * 100}%)`,
            }}
          >
            {TABS.map((tabKey) => {
              const tabData = card[tabKey];
              const isActive = tabKey === selectedTab;

              return (
                <div
                  key={tabKey}
                  role="tabpanel"
                  inert={!isActive}
                  className={cn(
                    'flex w-full min-w-0 flex-col gap-4 transition-opacity duration-300',
                    !isActive && 'pointer-events-none opacity-0'
                  )}
                >
                  <div className="overflow-x-auto rounded-xl border border-text/10 bg-background px-4 py-3">
                    <CodeBlock
                      lang={
                        tabKey === 'contentFile' ? 'typescript' : 'markdown'
                      }
                      className="text-sm"
                    >
                      {tabData.code.value}
                    </CodeBlock>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tabData.description}
                  </p>

                  <div className="flex flex-col gap-2 rounded-xl border border-text/10 px-4 py-3">
                    <span className="text-xs text-muted-foreground">
                      {tabData.fileStructureTitle}
                    </span>
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">
                      {tabData.fileStructure.value}
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export const HeroSection: FC = () => {
  const { pills, title, description, readTheDocs, seeBenchmark } = useIntlayer(
    'hero-section-markdown'
  );

  return (
    <ProductHero
      title={title}
      description={description}
      actions={
        <>
          <Link
            to={Website_Doc_Markdown_Path}
            variant="button"
            color="text"
            size="lg"
            label={readTheDocs.value}
          >
            {readTheDocs}
          </Link>
          <Link
            to="#benchmark"
            variant="button-outlined"
            color="text"
            size="lg"
            label={seeBenchmark.value}
          >
            <span className="flex items-center gap-2">
              {seeBenchmark}
              <ArrowDown className="size-4" />
            </span>
          </Link>
        </>
      }
      meta={[
        {
          key: 'zero-dependency',
          icon: <PackageMinus />,
          label: pills.zeroDependency,
        },
        { key: 'mdx', icon: <Blocks />, label: pills.mdx },
        { key: 'ssr', icon: <Server />, label: pills.ssr },
        {
          key: 'cross-framework',
          icon: <Layers />,
          label: pills.crossFramework,
        },
      ]}
      visual={<DeclarationPreview />}
    />
  );
};
