'use client';

import { getLocaleName } from '@intlayer/core';
import {
  KeyPathBreadcrumb,
  Loader,
  LocaleSwitcherContent,
  LocaleSwitcherContentProvider,
  SearchInput,
  TextEditor,
  useLocaleSwitcherContent,
} from '@intlayer/design-system';
import {
  useInfiniteGetDictionaries,
  useSearch,
} from '@intlayer/design-system/hooks';
import { useConfiguration } from '@intlayer/editor-react';
import { type Dictionary, type LocalesValues, NodeType } from '@intlayer/types';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, Suspense, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import {
  type FlattenedDictionaryNode,
  flattenDictionary,
} from '@/utils/flattenDictionary';

const TranslateRow: FC<{
  node: FlattenedDictionaryNode;
  selectedLocales: LocalesValues[];
}> = ({ node, selectedLocales }) => {
  const { dictionary, keyPath, content, nodeType } = node;

  if (nodeType === NodeType.Translation) {
    return (
      <div className="flex w-full flex-col items-start gap-2 border-white/5 border-b p-4 px-10 last:border-none">
        <div className="shrink-0 pt-2">
          <KeyPathBreadcrumb
            dictionaryKey={dictionary.key}
            keyPath={keyPath}
            onClickKeyPath={() => {}}
          />
        </div>
        <div className="flex w-full flex-1 gap-2">
          {selectedLocales.map((locale) => {
            const translationContent = (content as any)?.[nodeType]?.[locale];
            return (
              <div key={locale} className="min-w-md flex-1">
                <TextEditor
                  section={translationContent}
                  keyPath={[...keyPath, { type: nodeType, key: locale } as any]}
                  dictionary={dictionary}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start gap-2 border-white/5 border-b p-4 last:border-none">
      <div className="w-1/4 min-w-64 shrink-0 pt-2">
        <KeyPathBreadcrumb
          dictionaryKey={dictionary.key}
          keyPath={keyPath}
          onClickKeyPath={() => {}}
        />
      </div>
      <div className="flex-1">
        <TextEditor
          section={content}
          keyPath={keyPath}
          dictionary={dictionary}
        />
      </div>
    </div>
  );
};

const TranslateDashboardList: FC = () => {
  const { searchPlaceholder } = useIntlayer('dictionary-list');
  const { setSearch } = useSearch({});
  const { locale: currentLocale } = useLocale();
  const [search, setInternalSearch] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteGetDictionaries({ search, pageSize: 3 });

  const { selectedLocales } = useLocaleSwitcherContent();

  const flattenedNodes =
    data?.pages.flatMap((page: any) =>
      (page.data as Dictionary[]).flatMap((dict) => flattenDictionary(dict))
    ) ?? [];

  return (
    // "h-screen" or a fixed height is crucial for the parent of a virtual list if not using WindowScroll.
    // "min-h-0" prevents flex child from growing indefinitely.
    <div className="flex size-full flex-1 flex-col gap-6 overflow-hidden">
      <div className="flex w-full shrink-0 items-center justify-between gap-4 px-10 pt-6">
        <SearchInput
          placeholder={searchPlaceholder.value}
          onChange={(e) => {
            setSearch(e.target.value);
            setInternalSearch(e.target.value);
          }}
          className="max-w-md"
        />
        <div className="flex items-center gap-2">
          <LocaleSwitcherContent />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {/* Header Row - Keep this outside Virtuoso so it sticks to top */}
        <div className="flex shrink-0 gap-2 border-neutral/40 border-b px-10">
          {selectedLocales.map((locale) => (
            <div
              key={locale}
              className="min-w-md flex-1 py-2 font-medium text-white/60"
            >
              {getLocaleName(locale, currentLocale)}
            </div>
          ))}
        </div>

        {/* Virtualized List Container */}
        <div className="flex-1">
          <Loader isLoading={isPending}>
            {flattenedNodes.length > 0 && (
              <Virtuoso
                className="h-full"
                data={flattenedNodes}
                // Increase overscan to pre-render items off-screen for smoother scrolling
                overscan={500}
                endReached={() => {
                  if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                  }
                }}
                components={{
                  Footer: () =>
                    isFetchingNextPage ? (
                      <div className="flex justify-center p-4">
                        <Loader />
                      </div>
                    ) : (
                      <div className="h-4" /> // Spacer at bottom
                    ),
                }}
                itemContent={(index, node) => (
                  <TranslateRow node={node} selectedLocales={selectedLocales} />
                )}
              />
            )}
          </Loader>
        </div>
      </div>
    </div>
  );
};

export const TranslateDashboard: FC = () => {
  const configuration = useConfiguration();
  const availableLocales = configuration.internationalization.locales;

  return (
    <Suspense fallback={<Loader />}>
      <LocaleSwitcherContentProvider availableLocales={availableLocales}>
        <TranslateDashboardList />
      </LocaleSwitcherContentProvider>
    </Suspense>
  );
};
