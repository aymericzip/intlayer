'use client';

import {
  getContentNodeByKeyPath,
  getEmptyNode,
} from '@intlayer/core/dictionaryManipulator';
import { getLocaleName } from '@intlayer/core/localization';
import {
  Button,
  KeyboardShortcut,
  KeyPathBreadcrumb,
  Loader,
  LocaleSwitcherContent,
  LocaleSwitcherContentProvider,
  PopoverStatic,
  SearchInput,
  TextEditor,
  useLocaleSwitcherContent,
} from '@intlayer/design-system';
import {
  useInfiniteGetDictionaries,
  usePersistedStore,
  useSearch,
} from '@intlayer/design-system/hooks';
import {
  useConfiguration,
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import { type Dictionary, type LocalesValues, NodeType } from '@intlayer/types';
import { ArrowUp, Plus } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { GroupedVirtuoso, type GroupedVirtuosoHandle } from 'react-virtuoso';
import {
  type FlattenedDictionaryNode,
  flattenDictionary,
} from './flattenDictionary';
import { SaveAllButton } from './SaveAllButton';

const TranslateRow: FC<{
  nodes: FlattenedDictionaryNode[];
  selectedLocales: LocalesValues[];
}> = ({ nodes, selectedLocales }) => {
  const { editedContent, addEditedContent } = useEditedContent();
  const configuration = useConfiguration();
  const { defaultLocale } = configuration.internationalization;
  const { addTranslation } = useIntlayer('dictionary-list');

  if (!nodes || nodes.length === 0) {
    return <></>;
  }

  // Assume all nodes have the same keyPath and dictionary.key (by grouping definition)
  // We use the first node for shared metadata like breadcrumbs
  const referenceNode = nodes[0];
  const { dictionary, keyPath, nodeType } = referenceNode;

  if (nodeType === NodeType.Translation) {
    return (
      <div className="flex w-full flex-col items-start gap-2 px-10 py-4">
        <div className="shrink-0 pt-2">
          <KeyPathBreadcrumb
            showDictionaryKey={false}
            dictionaryKey={dictionary.key}
            keyPath={keyPath}
            color="neutral"
          />
        </div>
        <div className="flex w-full flex-1 gap-2">
          {selectedLocales.map((locale) => (
            <div key={locale} className="flex min-w-md flex-1 flex-col gap-2">
              {nodes.map((node, index) => {
                const { dictionary: dict, content: originalContent } = node;
                const editedDictionaryContent =
                  editedContent?.[dict.localId!]?.content;
                const content =
                  typeof editedDictionaryContent === 'undefined'
                    ? originalContent
                    : getContentNodeByKeyPath(editedDictionaryContent, keyPath);

                const translationContent = (content as any)?.[nodeType]?.[
                  locale
                ];

                if (typeof translationContent === 'undefined') {
                  return (
                    <div
                      key={dict.localId || index}
                      className="mt-5 mb-auto flex w-full justify-center"
                    >
                      <Button
                        label={addTranslation.value}
                        variant="fade"
                        Icon={Plus}
                        color="neutral"
                        onClick={() => {
                          const contentMap = (content as any)?.[nodeType] ?? {};
                          const referenceContent =
                            contentMap[defaultLocale] ??
                            contentMap[Object.keys(contentMap)[0]];

                          const newContent = {
                            ...((editedContent as Record<string, any>) ?? {}),
                            [nodeType]: {
                              ...contentMap,
                              [locale]: getEmptyNode(referenceContent),
                            },
                          };

                          addEditedContent(dict.localId!, newContent, keyPath);
                        }}
                      >
                        {addTranslation}
                      </Button>
                    </div>
                  );
                }

                return (
                  <div key={dict.localId || index} className="w-full">
                    <TextEditor
                      section={translationContent}
                      keyPath={[
                        ...keyPath,
                        { type: nodeType, key: locale } as any,
                      ]}
                      dictionary={dict}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-start gap-2 px-10 py-4">
      <div className="shrink-0 pt-2">
        <KeyPathBreadcrumb
          showDictionaryKey={false}
          dictionaryKey={dictionary.key}
          keyPath={keyPath}
          color="neutral"
        />
      </div>
      <div className="flex w-full flex-1 flex-col gap-2">
        {nodes.map((node, index) => {
          const { dictionary: dict, content: originalContent } = node;
          const editedDictionaryContent =
            editedContent?.[dict.localId!]?.content;
          const content =
            typeof editedDictionaryContent === 'undefined'
              ? originalContent
              : getContentNodeByKeyPath(editedDictionaryContent, keyPath);

          return (
            <TextEditor
              key={dict.localId || index}
              section={content}
              keyPath={keyPath}
              dictionary={dict}
            />
          );
        })}
      </div>
    </div>
  );
};

const mergeFlattenedNodes = (nodes: FlattenedDictionaryNode[]) => {
  const groupedMap = new Map<string, FlattenedDictionaryNode[]>();
  const result: FlattenedDictionaryNode[][] = [];

  nodes.forEach((node) => {
    // Group by dictionary Key + KeyPath + NodeType
    const groupKey = JSON.stringify({
      dKey: node.dictionary.key,
      path: node.keyPath,
      type: node.nodeType,
    });

    if (!groupedMap.has(groupKey)) {
      const group: FlattenedDictionaryNode[] = [];
      groupedMap.set(groupKey, group);
      result.push(group);
    }
    groupedMap.get(groupKey)!.push(node);
  });

  return result;
};

const TranslateDashboardList: FC = () => {
  const { searchPlaceholder, noDictionaries, scrollToTop } =
    useIntlayer('dictionary-list');
  const { setSearch } = useSearch({});
  const { locale: currentLocale } = useLocale();
  const [search, setInternalSearch] = useState('');
  const { setLocaleDictionaries } = useDictionariesRecordActions() ?? {};
  const [currentDictionaryKey, setCurrentDictionaryKey] = useState<string>('');

  const [initialTopIndex, setInitialTopIndex] = usePersistedStore(
    'intlayer-dashboard-scroll-index',
    0
  );

  // Refs for syncing scroll
  const virtuosoRef = useRef<GroupedVirtuosoHandle>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteGetDictionaries({ search, pageSize: 3 });

  const { selectedLocales } = useLocaleSwitcherContent();

  const allLoadedDictionaries: Record<string, Dictionary> = useMemo(() => {
    const result: Record<string, Dictionary> = {};
    data?.pages.forEach((page: any) => {
      (page.data as Dictionary[]).forEach((dict) => {
        if (dict.localId) {
          result[dict.localId] = dict;
        }
      });
    });
    return result;
  }, [data?.pages]);

  useEffect(() => {
    if (
      setLocaleDictionaries &&
      Object.keys(allLoadedDictionaries).length > 0
    ) {
      setLocaleDictionaries((prev) => ({
        ...prev,
        ...allLoadedDictionaries,
      }));
    }
  }, [allLoadedDictionaries, setLocaleDictionaries]);

  const flattenedNodes: FlattenedDictionaryNode[] =
    data?.pages.flatMap((page: any) =>
      (page.data as Dictionary[]).flatMap(flattenDictionary)
    ) ?? [];

  const mergedNodes = useMemo(
    () => mergeFlattenedNodes(flattenedNodes),
    [flattenedNodes]
  );

  // though rangeChanged usually handles this once the list mounts.
  useEffect(() => {
    if (mergedNodes.length > 0 && initialTopIndex < mergedNodes.length) {
      setCurrentDictionaryKey(mergedNodes[initialTopIndex][0]?.dictionary.key);
    }
  }, [mergedNodes, initialTopIndex]);

  const { groupCounts } = useMemo(() => {
    if (!mergedNodes || mergedNodes.length === 0) {
      return { groupCounts: [], groupKeys: [] };
    }

    const counts: number[] = [];
    const keys: string[] = [];

    let currentKey: string | null = null;
    let currentCount = 0;

    mergedNodes.forEach((nodes) => {
      const key = nodes[0].dictionary.key;

      if (key !== currentKey) {
        if (currentKey !== null) {
          counts.push(currentCount);
          keys.push(currentKey);
        }
        currentKey = key;
        currentCount = 1;
      } else {
        currentCount++;
      }
    });

    if (currentKey !== null) {
      counts.push(currentCount);
      keys.push(currentKey);
    }

    return { groupCounts: counts, groupKeys: keys };
  }, [mergedNodes]);

  return (
    <div className="relative flex size-full flex-1 flex-col gap-2 overflow-hidden">
      <SaveAllButton dictionaries={allLoadedDictionaries} />
      <div className="flex w-full shrink-0 items-center justify-between gap-4 px-10 pt-6">
        <SearchInput
          placeholder={searchPlaceholder.value}
          onChange={(e) => {
            setSearch(e.target.value);
            setInternalSearch(e.target.value);
          }}
          className="max-w-md flex-1"
        />
        <LocaleSwitcherContent />
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex w-full items-center gap-6 border-card border-b px-10 py-2">
          <PopoverStatic identifier="scroll-to-top">
            <Button
              label={scrollToTop.value}
              variant="hoverable"
              color="text"
              size="icon-xl"
              Icon={ArrowUp}
            />
            <PopoverStatic.Detail identifier="scroll-to-top">
              <span className="flex gap-4 text-nowrap py-2 pr-2 pl-4 text-neutral">
                {scrollToTop}
                <KeyboardShortcut
                  shortcut="Alt + ArrowUp"
                  onTriggered={() => {
                    setInitialTopIndex(0);

                    virtuosoRef.current?.scrollToIndex({
                      index: 0,
                      align: 'start',
                    });
                  }}
                  size="sm"
                />
              </span>
            </PopoverStatic.Detail>
          </PopoverStatic>

          <span className="ml-4">{currentDictionaryKey}</span>
        </div>

        <div
          ref={headerRef}
          className="flex w-full shrink-0 items-center overflow-x-hidden bg-background px-10 py-2"
        >
          {/* Matches TranslateRow Structure (flex-1 gap-2) */}
          <div className="flex w-full flex-1 gap-2">
            {selectedLocales.map((locale) => (
              <div
                key={locale}
                className="ml-4 min-w-md flex-1 font-medium text-neutral"
                suppressHydrationWarning
              >
                {getLocaleName(locale, currentLocale)}
              </div>
            ))}
          </div>
        </div>
        <Loader isLoading={isPending}>
          {mergedNodes.length > 0 ? (
            <GroupedVirtuoso
              ref={virtuosoRef}
              groupCounts={groupCounts}
              initialTopMostItemIndex={initialTopIndex}
              onScroll={(e) => {
                if (headerRef.current) {
                  headerRef.current.scrollLeft = (
                    e.target as HTMLElement
                  ).scrollLeft;
                }
              }}
              rangeChanged={({ startIndex }) => {
                setInitialTopIndex(startIndex);
              }}
              groupContent={() => <div className="my-4 border-card border-b" />}
              itemContent={(index) => (
                <TranslateRow
                  nodes={mergedNodes[index]}
                  selectedLocales={selectedLocales}
                />
              )}
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
                    <div className="h-4" />
                  ),
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-10">
              <p className="text-center text-neutral">{noDictionaries}</p>
            </div>
          )}
        </Loader>
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
