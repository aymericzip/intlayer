import { DEFAULT_LOCALE } from '@intlayer/config/defaultValues';
import {
  getContentNodeByKeyPath,
  getEmptyNode,
} from '@intlayer/core/dictionaryManipulator';
import { getLocaleName } from '@intlayer/core/localization';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import {
  KeyPathBreadcrumb,
  TextEditor,
} from '@intlayer/design-system/dictionary-field-editor';
import {
  useFillAllTranslations,
  useInfiniteGetDictionaries,
  usePersistedStore,
  useSearch,
  useSession,
} from '@intlayer/design-system/hooks';
import { SearchInput } from '@intlayer/design-system/input';
import { KeyboardShortcut } from '@intlayer/design-system/keyboard-shortcut';
import {
  LocaleSwitcherContent,
  LocaleSwitcherContentProvider,
  useLocaleSwitcherContent,
} from '@intlayer/design-system/locale-switcher-content-drop-down';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { useRightDrawer } from '@intlayer/design-system/right-drawer';
import { App_Dashboard_Dictionaries_Path } from '@intlayer/design-system/routes';
import {
  useConfiguration,
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import * as NodeTypes from '@intlayer/types/nodeType';
import { ArrowRight, ArrowUp, Filter, Plus, Zap } from 'lucide-react';
import { type FC, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { GroupedVirtuoso, type GroupedVirtuosoHandle } from 'react-virtuoso';
import { Link } from '#components/Link/Link';
import { Skeleton } from '#components/Skeleton';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { useDashboardScroll } from '../DashboardScrollContext';
import { FiltersModal } from '../DictionaryListDashboard/FiltersModal';
import {
  type FlattenedDictionaryNode,
  flattenDictionary,
} from './flattenDictionary';
import { SaveAllButton } from './SaveAllButton';
import { TranslateSkeleton } from './TranslateSkeleton';

const TranslateRow: FC<{
  nodes: FlattenedDictionaryNode[];
  selectedLocales: LocalesValues[];
}> = ({ nodes, selectedLocales }) => {
  const { editedContent, addEditedContent } = useEditedContent();
  const configuration = useConfiguration();
  const defaultLocale =
    configuration?.internationalization?.defaultLocale ?? DEFAULT_LOCALE;
  const { addTranslation } = useIntlayer('translate-dashboard');

  if (!nodes || nodes.length === 0) {
    return <></>;
  }

  // Assume all nodes have the same keyPath and dictionary.key (by grouping definition)
  // We use the first node for shared metadata like breadcrumbs
  const referenceNode = nodes[0];
  const { dictionary, keyPath, nodeType } = referenceNode;

  if (nodeType === NodeTypes.TRANSLATION) {
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

const searchParams = {
  search: { type: 'string', fallbackValue: '' },
  location: { type: 'string', fallbackValue: 'none' },
  tags: { type: 'string', fallbackValue: '' },
} as const;

const TranslateDashboardList: FC = () => {
  const {
    searchPlaceholder,
    noDictionaries,
    scrollToTop,
    filterLabels,
    translateDictionary,
    goToDictionary,
  } = useIntlayer('translate-dashboard');
  const { params, setParam, setParams } = useSearchParamState(searchParams);
  const { setSearch } = useSearch({
    onSearch: (val) => setParam('search', val),
    onClear: () => setParam('search', ''),
    defaultValue: params.search,
  });
  const { locale: currentLocale } = useLocale();
  const { setLocaleDictionaries } = useDictionariesRecordActions() ?? {};
  const { open: openDrawer } = useRightDrawer();
  const { mutateAsync: fillAll } = useFillAllTranslations();
  const { session } = useSession();
  const [currentDictionaryKey, setCurrentDictionaryKey] = useState<string>('');
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const projectLocales =
    session?.project?.configuration?.internationalization?.locales ?? [];
  const defaultLocale =
    session?.project?.configuration?.internationalization?.defaultLocale;
  const targetLocales = projectLocales.filter((l) => l !== defaultLocale);

  const handleTranslateCurrentDictionary = async () => {
    const dictionariesToTranslate = Object.values(allLoadedDictionaries).filter(
      (dict) => dict.key === currentDictionaryKey && dict.id
    );

    const dictionaryIds = dictionariesToTranslate.map((dict) => dict.id!);

    if (dictionaryIds.length > 0) {
      openDrawer('translation-status');
      await fillAll({
        targetLocales,
        mode: 'complete',
        dictionaryIds,
      });
    }
  };

  const [persistedTopIndex, setPersistedTopIndex] = usePersistedStore(
    'intlayer-dashboard-scroll-index',
    0
  );

  // Isolate mount-time Virtuoso index from reactive updates
  const [initialTopIndex] = useState(persistedTopIndex);
  // Track scroll position for breadcrumbs without interrupting Virtuoso
  const [currentTopIndex, setCurrentTopIndex] = useState(persistedTopIndex);

  // Debounce the persisted store write to prevent high-frequency I/O loops during scroll
  useEffect(() => {
    const handler = setTimeout(() => {
      setPersistedTopIndex(currentTopIndex);
    }, 500);
    return () => clearTimeout(handler);
  }, [currentTopIndex, setPersistedTopIndex]);

  const notifyScroll = useDashboardScroll();

  useEffect(() => {
    notifyScroll(0);
  }, [notifyScroll]);

  // Refs for syncing scroll
  const virtuosoRef = useRef<GroupedVirtuosoHandle>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteGetDictionaries({
      search: params.search,
      pageSize: 3,
      tags: params.tags,
      location:
        params.location !== 'none'
          ? (params.location as 'none' | 'remote' | 'local' | 'both')
          : undefined,
    });

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
      setLocaleDictionaries((prev) => {
        let hasChanges = false;
        const next = { ...prev };
        for (const [key, value] of Object.entries(allLoadedDictionaries)) {
          if (next[key] !== value) {
            next[key] = value;
            hasChanges = true;
          }
        }
        return hasChanges ? next : prev; // Bail out of render if identical
      });
    }
  }, [allLoadedDictionaries, setLocaleDictionaries]);

  const flattenedNodes: FlattenedDictionaryNode[] = useMemo(() => {
    return (
      data?.pages.flatMap((page: any) =>
        (page.data as Dictionary[]).flatMap(flattenDictionary)
      ) ?? []
    );
  }, [data?.pages]);

  const mergedNodes = useMemo(
    () => mergeFlattenedNodes(flattenedNodes),
    [flattenedNodes]
  );

  // though rangeChanged usually handles this once the list mounts.
  useEffect(() => {
    if (mergedNodes.length > 0 && currentTopIndex < mergedNodes.length) {
      setCurrentDictionaryKey(mergedNodes[currentTopIndex][0]?.dictionary.key);
    }
  }, [mergedNodes, currentTopIndex]);

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
        <div className="flex max-w-md flex-1 items-center gap-4">
          <SearchInput
            placeholder={searchPlaceholder.value}
            defaultValue={params.search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className="relative">
            <PopoverStatic identifier="dictionary-filters">
              <Button
                variant="hoverable"
                color="text"
                size="icon-lg"
                onClick={() => setIsFiltersModalOpen(true)}
                Icon={Filter}
                label={filterLabels.button.value}
              />
              <PopoverStatic.Detail identifier="dictionary-filters">
                <Container className="p-3" roundedSize="xl">
                  <p>{filterLabels.popover}</p>
                </Container>
              </PopoverStatic.Detail>
            </PopoverStatic>
            {(params.location !== 'none' || !!params.tags) && (
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-text text-[10px] text-card">
                {(params.tags ? params.tags.split(',').length : 0) +
                  (params.location === 'both'
                    ? 2
                    : params.location === 'none'
                      ? 0
                      : 1)}
              </span>
            )}
          </div>
        </div>
        <LocaleSwitcherContent />
      </div>

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        params={params}
        setParam={setParam}
        setParams={setParams}
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex w-full items-center gap-3 border-card border-b px-10 py-2">
          <PopoverStatic identifier="scroll-to-top">
            <Button
              label={scrollToTop.value}
              variant="hoverable"
              color="text"
              size="icon-xl"
              Icon={ArrowUp}
              onClick={() => {
                setCurrentTopIndex(0);

                virtuosoRef.current?.scrollToIndex({
                  index: 0,
                  align: 'start',
                  behavior: 'smooth',
                });
              }}
            />
            <PopoverStatic.Detail identifier="scroll-to-top">
              <span className="flex gap-4 text-nowrap py-2 pr-2 pl-4 text-neutral">
                {scrollToTop}
                <KeyboardShortcut
                  shortcut="Alt + ArrowUp"
                  onTriggered={() => {
                    setCurrentTopIndex(0);

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

          <span className="ml-10">{currentDictionaryKey}</span>

          {currentDictionaryKey && (
            <PopoverStatic identifier="go-to-dictionary">
              <Link
                label={goToDictionary.value}
                to={`${App_Dashboard_Dictionaries_Path}/${currentDictionaryKey}`}
              >
                <Button
                  label={goToDictionary.value}
                  variant="hoverable"
                  color="text"
                  size="icon-md"
                  Icon={ArrowRight}
                />
              </Link>
              <PopoverStatic.Detail identifier="go-to-dictionary">
                <span className="flex gap-4 text-nowrap py-2 pr-2 pl-4 text-neutral">
                  {goToDictionary}
                </span>
              </PopoverStatic.Detail>
            </PopoverStatic>
          )}

          <PopoverStatic identifier="translate-dictionary" className="ml-auto">
            <Button
              label={translateDictionary.value}
              variant="hoverable"
              color="text"
              size="icon-md"
              Icon={Zap}
              onClick={handleTranslateCurrentDictionary}
            />
            <PopoverStatic.Detail identifier="translate-dictionary">
              <span className="flex gap-4 text-nowrap py-2 pr-2 pl-4 text-neutral">
                {translateDictionary}
              </span>
            </PopoverStatic.Detail>
          </PopoverStatic>
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
        {isPending ? (
          <TranslateSkeleton showToolBar={false} />
        ) : mergedNodes.length > 0 ? (
          <GroupedVirtuoso
            ref={virtuosoRef}
            groupCounts={groupCounts}
            initialTopMostItemIndex={initialTopIndex}
            onScroll={(e) => {
              const target = e.target as HTMLElement;
              if (headerRef.current) {
                headerRef.current.scrollLeft = target.scrollLeft;
              }
              notifyScroll(target.scrollTop);
            }}
            rangeChanged={({ startIndex }) => {
              if (startIndex !== currentTopIndex) {
                setCurrentTopIndex(startIndex);
              }
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
                  <div className="flex flex-col gap-4 overflow-hidden px-10 py-6">
                    {[...Array(2)].map((_, i) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: Skeletons are static and don't change order
                        key={i}
                        className="flex flex-col gap-4 border-card/50 border-b py-6"
                      >
                        <Skeleton className="h-4 w-64" />
                        <div className="flex w-full gap-2">
                          <Skeleton className="h-32 flex-1 rounded-lg" />
                          <Skeleton className="h-32 flex-1 rounded-lg" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-4" />
                ),
            }}
          />
        ) : (
          <div className="flex min-h-60 items-center justify-center">
            <p className="text-center text-neutral">{noDictionaries}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const TranslateDashboard: FC = () => {
  const configuration = useConfiguration();

  const availableLocales = configuration?.internationalization?.locales;

  return (
    <Suspense fallback={<TranslateSkeleton />}>
      <LocaleSwitcherContentProvider availableLocales={availableLocales ?? []}>
        <TranslateDashboardList />
      </LocaleSwitcherContentProvider>
    </Suspense>
  );
};
