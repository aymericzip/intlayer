'use client';

import {
  getContentNodeByKeyPath,
  getEmptyNode,
  getLocaleName,
  getNodeType,
} from '@intlayer/core';
import {
  Button,
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
import {
  useConfiguration,
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import { type Dictionary, type LocalesValues, NodeType } from '@intlayer/types';
import { Plus } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, Suspense, useEffect, useMemo, useState } from 'react';
import { GroupedVirtuoso } from 'react-virtuoso';
import {
  type FlattenedDictionaryNode,
  flattenDictionary,
} from './flattenDictionary';
import { SaveAllButton } from './SaveAllButton';

const TranslateRow: FC<{
  node: FlattenedDictionaryNode;
  selectedLocales: LocalesValues[];
}> = ({ node, selectedLocales }) => {
  const { dictionary, keyPath, content: originalContent, nodeType } = node;
  const { editedContent, addEditedContent } = useEditedContent();
  const configuration = useConfiguration();
  const { defaultLocale } = configuration.internationalization;
  const { addTranslation } = useIntlayer('dictionary-list');

  // Use edited content if available, otherwise fall back to original content from node
  const editedDictionaryContent = editedContent?.[dictionary.localId!]?.content;
  const content =
    typeof editedDictionaryContent === 'undefined'
      ? originalContent
      : getContentNodeByKeyPath(editedDictionaryContent, keyPath);

  const isMultilingual =
    nodeType === NodeType.Translation ||
    (nodeType === NodeType.Insertion &&
      getNodeType((originalContent as any).content) === NodeType.Translation);

  if (isMultilingual) {
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
          {selectedLocales.map((locale) => {
            const translationContent = (content as any)?.[nodeType]?.[locale];

            if (typeof translationContent === 'undefined') {
              return (
                <div
                  key={locale}
                  className="mt-5 mb-auto flex min-w-md flex-1 justify-center"
                >
                  <Button
                    label={addTranslation.value}
                    variant="fade"
                    Icon={Plus}
                    color="neutral"
                    onClick={() => {
                      // Get content from default locale or the first available key as a reference
                      const contentMap = (content as any)?.[nodeType] ?? {};
                      const referenceContent =
                        contentMap[defaultLocale] ??
                        contentMap[Object.keys(contentMap)[0]];

                      // Create an empty node based on the reference structure
                      const newContent = {
                        ...((editedContent as Record<string, any>) ?? {}),
                        [nodeType]: {
                          ...contentMap,
                          [locale]: getEmptyNode(referenceContent),
                        },
                      };

                      addEditedContent(
                        dictionary.localId!,
                        newContent,
                        keyPath
                      );
                    }}
                  >
                    {addTranslation}
                  </Button>
                </div>
              );
            }

            return (
              <div key={locale} className="min-w-md flex-1">
                <TextEditor
                  section={translationContent}
                  keyPath={[...keyPath, { type: nodeType, key: locale } as any]}
                  dictionary={
                    editedContent?.[dictionary.localId!] ?? dictionary
                  }
                />
              </div>
            );
          })}
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
      <div className="w-full flex-1">
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
  const { searchPlaceholder, noDictionaries } = useIntlayer('dictionary-list');
  const { setSearch } = useSearch({});
  const { locale: currentLocale } = useLocale();
  const [search, setInternalSearch] = useState('');
  const { setLocaleDictionaries } = useDictionariesRecordActions() ?? {};

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

  // Populate localeDictionaries context so addEditedContent can work properly
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

  // Transform flat nodes into groups structure
  const { groupCounts, groupKeys } = useMemo(() => {
    if (!flattenedNodes || flattenedNodes.length === 0) {
      return { groupCounts: [], groupKeys: [] };
    }

    const counts: number[] = [];
    const keys: string[] = [];

    let currentKey: string | null = null;
    let currentCount = 0;

    flattenedNodes.forEach((node) => {
      const key = node.dictionary.key;

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

    // Push the final group
    if (currentKey !== null) {
      counts.push(currentCount);
      keys.push(currentKey);
    }

    return { groupCounts: counts, groupKeys: keys };
  }, [flattenedNodes]);

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
          className="max-w-md"
        />
        <div className="flex items-center gap-2">
          <LocaleSwitcherContent />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {/* Header Row - Keep this outside Virtuoso so it sticks to top */}
        <div className="flex shrink-0 gap-2 border-card border-b px-10">
          {selectedLocales.map((locale) => (
            <div
              key={locale}
              className="min-w-md flex-1 py-2 font-medium text-neutral"
            >
              {getLocaleName(locale, currentLocale)}
            </div>
          ))}
        </div>

        {/* Virtualized List Container */}
        <div className="flex-1">
          <Loader isLoading={isPending}>
            {flattenedNodes.length > 0 ? (
              <GroupedVirtuoso
                className="h-full"
                groupCounts={groupCounts}
                groupContent={(index) => (
                  <div
                    className={`flex w-full ${
                      // Add border and spacing for all groups except the first one
                      index > 0 ? 'border-card border-t' : ''
                    }`}
                  >
                    <div className="flex w-auto justify-center overflow-hidden rounded-br-2xl bg-background/80 px-16 pt-2 pb-1 text-neutral backdrop-blur">
                      {groupKeys[index]}
                    </div>
                  </div>
                )}
                itemContent={(index) => (
                  // GroupedVirtuoso handles the global index mapping for you automatically
                  <TranslateRow
                    node={flattenedNodes[index]}
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
