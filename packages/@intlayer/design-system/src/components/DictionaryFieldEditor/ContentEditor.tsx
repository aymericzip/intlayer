'use client';

import { useGetDictionaries } from '@api/index';
import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import {
  useEditedContent,
  useEditorLocale,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import {
  type FC,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { Container } from '../Container';
import { LocaleSwitcherContent } from '../LocaleSwitcherContentDropDown';
import { Pagination } from '../Pagination';
import { TextEditorContainer } from './ContentEditorView/TextEditor';
import { getIsEditableSection } from './getIsEditableSection';
import { KeyPathBreadcrumb } from './KeyPathBreadcrumb';
import { NavigationViewNode } from './NavigationView/NavigationViewNode';

type NodeEditorProps = {
  dictionary: Dictionary;
  isDarkMode?: boolean;
};

export const ContentEditor: FC<NodeEditorProps> = ({
  dictionary,
  isDarkMode,
}) => {
  const { itemPagination, variantSwitcher, metaSwitcher } =
    useIntlayer('content-editor');
  const { editedContent } = useEditedContent();
  const {
    focusedContent,
    setFocusedContentKeyPath: _setFocusedContentKeyPath,
  } = useFocusUnmergedDictionary();
  const [, startTransition] = useTransition();
  const setFocusedContentKeyPath: typeof _setFocusedContentKeyPath = (
    keyPath
  ) => startTransition(() => _setFocusedContentKeyPath(keyPath));

  const [activeDictionary, setActiveDictionary] =
    useState<Dictionary>(dictionary);

  useEffect(() => {
    setActiveDictionary(dictionary);
  }, [dictionary.localId]);

  const hasQualifier =
    dictionary.item !== undefined ||
    dictionary.variant !== undefined ||
    dictionary.meta !== undefined;

  const { data: siblingsData } = useGetDictionaries(
    { keys: [dictionary.key] },
    { enabled: hasQualifier && !!dictionary.key }
  );

  const allSiblings = useMemo<Dictionary[]>(
    () => (siblingsData?.data ?? []) as unknown as Dictionary[],
    [siblingsData]
  );

  const itemDicts = useMemo<Dictionary[]>(() => {
    if (dictionary.item === undefined) return [];
    return allSiblings
      .filter((d) => d.item !== undefined)
      .sort((a, b) => (a.item ?? 0) - (b.item ?? 0));
  }, [dictionary, allSiblings]);

  const variantDicts = useMemo<Dictionary[]>(() => {
    if (dictionary.variant === undefined) return [];
    return allSiblings.filter((d) => d.variant !== undefined);
  }, [dictionary, allSiblings]);

  const metaDicts = useMemo<Dictionary[]>(() => {
    if (dictionary.meta === undefined) return [];
    return allSiblings.filter((d) => d.meta !== undefined);
  }, [dictionary, allSiblings]);

  const switchSibling = useCallback(
    (sibling: Dictionary) => {
      setActiveDictionary(sibling);
      setFocusedContentKeyPath([]);
    },
    [setFocusedContentKeyPath]
  );

  const { content, key, localId } = activeDictionary;
  const focusedKeyPath = focusedContent?.keyPath;
  const section =
    typeof editedContent?.[localId as LocalDictionaryId]?.content ===
    'undefined'
      ? content
      : editedContent?.[localId as LocalDictionaryId]?.content;

  const currentLocale = useEditorLocale();
  const focusedSection = getContentNodeByKeyPath(
    section,
    focusedKeyPath ?? [],
    currentLocale
  );

  const deferredKeyPath = useDeferredValue(focusedKeyPath);
  const deferredSection = useDeferredValue(focusedSection);
  const isStale = deferredSection !== focusedSection;

  const isEditableBaseSection = getIsEditableSection(section);
  const isEditableFocusedSection = getIsEditableSection(deferredSection);

  useEffect(() => {
    if (typeof focusedSection === 'undefined') {
      setFocusedContentKeyPath(focusedContent?.keyPath?.slice(0, -1) ?? []);
    }
  }, []);

  const currentItemIndex = itemDicts.findIndex(
    (dictionary) => dictionary.localId === activeDictionary.localId
  );
  const currentVariant = activeDictionary.variant;
  const currentMetaId = activeDictionary.meta?.id;

  return (
    <div>
      {/* Qualifier navigation controls */}
      {hasQualifier && (
        <div className="mb-4 flex flex-wrap items-center gap-4">
          {itemDicts.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-muted text-xs">
                {itemPagination.label}
              </span>
              <Pagination
                currentPage={currentItemIndex >= 0 ? currentItemIndex + 1 : 1}
                totalPages={itemDicts.length}
                onPageChange={(page) => {
                  const target = itemDicts[page - 1];
                  if (target) switchSibling(target);
                }}
                size="sm"
              />
            </div>
          )}

          {variantDicts.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-muted text-xs">
                {variantSwitcher.label}:
              </span>
              {variantDicts.map((sibling) => {
                const isActive = sibling.localId === activeDictionary.localId;
                return (
                  <button
                    key={sibling.localId}
                    type="button"
                    onClick={() => !isActive && switchSibling(sibling)}
                    className={`rounded-lg px-3 py-1 text-xs transition-colors ${
                      isActive
                        ? 'bg-text font-semibold text-text-opposite'
                        : 'cursor-pointer border border-border hover:bg-text/10'
                    }`}
                  >
                    {sibling.variant}
                  </button>
                );
              })}
              {currentVariant !== undefined &&
                !variantDicts.some((d) => d.localId === dictionary.localId) && (
                  <span className="rounded-lg bg-text px-3 py-1 font-semibold text-text-opposite text-xs">
                    {currentVariant}
                  </span>
                )}
            </div>
          )}

          {metaDicts.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-muted text-xs">
                {metaSwitcher.label}:
              </span>
              {metaDicts.map((sibling) => {
                const isActive = sibling.localId === activeDictionary.localId;
                return (
                  <button
                    key={sibling.localId}
                    type="button"
                    onClick={() => !isActive && switchSibling(sibling)}
                    className={`rounded-lg px-3 py-1 text-xs transition-colors ${
                      isActive
                        ? 'bg-text font-semibold text-text-opposite'
                        : 'cursor-pointer border border-border hover:bg-text/10'
                    }`}
                  >
                    {sibling.meta?.id}
                  </button>
                );
              })}
              {currentMetaId !== undefined &&
                !metaDicts.some((d) => d.localId === dictionary.localId) && (
                  <span className="rounded-lg bg-text px-3 py-1 font-semibold text-text-opposite text-xs">
                    {currentMetaId}
                  </span>
                )}
            </div>
          )}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between gap-2">
        <KeyPathBreadcrumb
          dictionaryKey={key}
          keyPath={focusedKeyPath ?? []}
          onClickKeyPath={setFocusedContentKeyPath}
        />
        <div className="flex items-center gap-2">
          <LocaleSwitcherContent />
        </div>
      </div>
      <div className="flex flex-1 gap-2 overflow-visible max-md:flex-col">
        {typeof section === 'object' &&
          section &&
          !isEditableBaseSection &&
          Object.keys(section).length > 0 && (
            <Container
              border
              background="none"
              className="top-10 flex h-full flex-col items-start gap-0.5 overflow-auto p-2 md:sticky md:max-w-[50%]"
              roundedSize="2xl"
              transparency="xs"
            >
              <NavigationViewNode
                keyPath={[]}
                section={section}
                dictionary={activeDictionary}
              />
            </Container>
          )}
        {(isEditableFocusedSection || (deferredKeyPath ?? []).length > 0) && (
          <div
            className={
              isStale
                ? 'pointer-events-none flex-1 opacity-50 transition-opacity'
                : 'flex-1 transition-opacity'
            }
          >
            <TextEditorContainer
              keyPath={deferredKeyPath ?? []}
              section={deferredSection}
              dictionary={activeDictionary}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};
