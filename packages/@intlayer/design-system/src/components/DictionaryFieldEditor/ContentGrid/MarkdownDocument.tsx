'use client';

import { Accordion } from '@components/Accordion';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Loader } from '@components/Loader';
import { useLocaleSwitcherContent } from '@components/LocaleSwitcherContentDropDown';
import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@components/SwitchSelector';
import { TabSelector } from '@components/TabSelector';
import { AutoSizedTextArea } from '@components/TextArea';
import { cn } from '@utils/cn';
import { Columns2 } from 'lucide-react';
import { type FC, lazy, Suspense, useMemo, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useContentGrid } from './ContentGridContext';
import { SHARED_CELL_KEY } from './flattenContentRows';
import {
  countMarkdownWords,
  getMarkdownOutline,
  splitFrontMatter,
} from './markdownOutline';

// Lazy so the Tiptap bundle only loads when a document is opened
const LazyMarkdownEditor = lazy(() =>
  import('@components/MarkdownEditor').then((module) => ({
    default: module.MarkdownEditor,
  }))
);

const LazyMarkdownRenderer = lazy(() =>
  import('@components/MarkDownRender').then((module) => ({
    default: module.MarkdownRenderer,
  }))
);

type DocumentViewMode = 'edit' | 'raw' | 'preview';

type FrontMatter = Record<string, unknown>;

const formatFrontMatterValue = (value: unknown): string =>
  typeof value === 'string' ? value : JSON.stringify(value);

/**
 * Document mode for markdown dictionaries (`.content.md`): the content is
 * one long text, so it is edited like a writing app rather than a grid.
 */
export const MarkdownDocument: FC = () => {
  const { rows, dictionary, sourceLocale, getStatus, setCellValue } =
    useContentGrid();
  const { selectedLocales } = useLocaleSwitcherContent();
  const content = useIntlayer('markdown-document');
  const [viewMode, setViewMode] = useState<DocumentViewMode>('edit');
  const [isComparing, setIsComparing] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  const row = rows.find((candidate) => candidate.kind === 'leaf');

  const cellKeys = useMemo<string[]>(() => {
    if (!row) return [];
    if (!row.isLocalized) return [SHARED_CELL_KEY];

    const visibleLocales = selectedLocales
      .map(String)
      .filter((locale) => row.cells[locale]);

    return visibleLocales.length > 0 ? visibleLocales : Object.keys(row.cells);
  }, [row, selectedLocales]);

  const [selectedCellKey, setSelectedCellKey] = useState<string>();
  const activeCellKey =
    selectedCellKey && cellKeys.includes(selectedCellKey)
      ? selectedCellKey
      : (cellKeys[0] ?? SHARED_CELL_KEY);

  // Front matter stays out of the writing area and is re-attached on write
  const { frontMatter: frontMatterBlock, body: markdown } = splitFrontMatter(
    String(row?.cells[activeCellKey]?.value ?? '')
  );
  const { body: sourceMarkdown } = splitFrontMatter(
    String(row?.cells[sourceLocale]?.value ?? '')
  );
  const outline = useMemo(() => getMarkdownOutline(markdown), [markdown]);
  const wordCount = useMemo(() => countMarkdownWords(markdown), [markdown]);

  const frontMatter = (
    dictionary.content as unknown as { metadata?: FrontMatter }
  )?.metadata;

  const canCompare =
    Boolean(row?.isLocalized) && activeCellKey !== sourceLocale;
  const showSource = canCompare && isComparing;

  const viewChoices: SwitchSelectorChoices<DocumentViewMode> = [
    { content: content.editMode.value, value: 'edit' },
    { content: content.rawMode.value, value: 'raw' },
    { content: content.previewMode.value, value: 'preview' },
  ];

  /** Scrolls the rendered document to the heading with the given text. */
  const scrollToHeading = (headingText: string) => {
    const headingElement = Array.from(
      documentRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6') ?? []
    ).find((element) => element.textContent?.trim() === headingText);

    headingElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!row) return null;

  const updateMarkdown = (value: string) =>
    setCellValue(row, activeCellKey, `${frontMatterBlock}${value}`);

  return (
    <div className="@container flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {row.isLocalized ? (
          <div className="min-w-0 overflow-x-auto">
            <TabSelector
              selectedChoice={activeCellKey}
              hoverable
              color="text"
              tabs={cellKeys.map((cellKey) => {
                const isMissing = getStatus(row, cellKey) === 'missing';

                return (
                  <button
                    key={cellKey}
                    type="button"
                    data-active={cellKey === activeCellKey}
                    onClick={() => setSelectedCellKey(cellKey)}
                    title={
                      isMissing ? content.missing.value : content.complete.value
                    }
                    className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1 font-mono text-sm"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'inline-block size-2 rounded-full',
                        isMissing ? 'border border-error' : 'bg-text'
                      )}
                    />
                    {cellKey}
                  </button>
                );
              })}
            />
          </div>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2">
          {canCompare && (
            <Button
              label={content.compareWithSource.value}
              Icon={Columns2}
              variant={isComparing ? 'default' : 'hoverable'}
              color="text"
              size="icon-sm"
              aria-pressed={isComparing}
              onClick={() => setIsComparing((previous) => !previous)}
            />
          )}
          <SwitchSelector
            choices={viewChoices}
            value={viewMode}
            onChange={setViewMode}
            color="text"
            size="sm"
          />
        </div>
      </div>

      <div className="flex w-full gap-6">
        <aside className="sticky top-4 @4xl:flex hidden max-h-[70vh] w-52 shrink-0 flex-col gap-2 self-start overflow-y-auto">
          <span className="font-semibold text-muted-foreground text-xs uppercase">
            {content.outline}
          </span>
          {outline.length === 0 ? (
            <span className="text-muted-foreground text-xs">
              {content.noHeadings}
            </span>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {outline.map((heading) => (
                <li key={`${heading.lineIndex}-${heading.text}`}>
                  <button
                    type="button"
                    dir="auto"
                    onClick={() => scrollToHeading(heading.text)}
                    style={{
                      paddingInlineStart: `${(heading.level - 1) * 12}px`,
                    }}
                    className="w-full cursor-pointer truncate rounded-md py-0.5 text-start text-sm hover:bg-text/5"
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <span className="mt-2 text-muted-foreground text-xs">
            {content.wordCount({ count: wordCount })}
          </span>
        </aside>

        <div
          className={cn(
            'grid min-w-0 flex-1 gap-6',
            showSource && '@3xl:grid-cols-2'
          )}
        >
          {showSource && (
            <Container
              border
              background="none"
              roundedSize="2xl"
              className="flex flex-col gap-3 p-6 opacity-80"
            >
              <span className="font-mono text-muted-foreground text-xs">
                {content.sourceLabel({ locale: sourceLocale })}
              </span>
              <div dir="auto" className="text-base leading-relaxed">
                <Suspense fallback={<Loader />}>
                  <LazyMarkdownRenderer>{sourceMarkdown}</LazyMarkdownRenderer>
                </Suspense>
              </div>
            </Container>
          )}

          <div
            ref={documentRef}
            dir="auto"
            className="mx-auto flex w-full max-w-3xl flex-col gap-2 text-base leading-relaxed"
          >
            <Suspense fallback={<Loader />}>
              {viewMode === 'edit' && (
                <LazyMarkdownEditor
                  key={activeCellKey}
                  defaultValue={markdown}
                  onChange={updateMarkdown}
                />
              )}
              {viewMode === 'raw' && (
                <AutoSizedTextArea
                  key={activeCellKey}
                  value={markdown}
                  onChange={(event) =>
                    updateMarkdown(event.currentTarget.value)
                  }
                  className="font-mono text-sm"
                  aria-label={content.rawMode.value}
                />
              )}
              {viewMode === 'preview' && (
                <LazyMarkdownRenderer>{markdown}</LazyMarkdownRenderer>
              )}
            </Suspense>
            <span className="@4xl:hidden text-muted-foreground text-xs">
              {content.wordCount({ count: wordCount })}
            </span>
          </div>
        </div>
      </div>

      {frontMatter && Object.keys(frontMatter).length > 0 && (
        <Accordion
          header={
            <span className="text-muted-foreground text-sm">
              {content.frontMatter}
            </span>
          }
          label={content.frontMatter.value}
        >
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-2 py-2 font-mono text-xs">
            {Object.entries(frontMatter).map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="text-muted-foreground">{key}</dt>
                <dd dir="auto" className="truncate">
                  {formatFrontMatterValue(value)}
                </dd>
              </div>
            ))}
          </dl>
        </Accordion>
      )}
    </div>
  );
};
