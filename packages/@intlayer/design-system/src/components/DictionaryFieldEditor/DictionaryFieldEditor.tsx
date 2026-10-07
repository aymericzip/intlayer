'use client';

import { useGetDictionaries } from '@api/index';
import { Container } from '@components/Container';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { usePersistedStore } from '@hooks/usePersistedStore';
import {
  useConfiguration,
  useDictionariesRecordActions,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import { ArrowLeft } from 'lucide-react';
import { type FC, type ReactNode, useEffect, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Button } from '../Button';
import { LocaleSwitcherContentProvider } from '../LocaleSwitcherContentDropDown';
import { TabSelector } from '../TabSelector';
import { ContentGrid } from './ContentGrid/ContentGrid';
import {
  ContentGridProvider,
  useContentGrid,
} from './ContentGrid/ContentGridContext';
import { getIsMarkdownDocument } from './ContentGrid/flattenContentRows';
import { MarkdownDocument } from './ContentGrid/MarkdownDocument';
import { useIsNarrowContainer } from './ContentGrid/useIsNarrowContainer';
import { DictionaryDetailsForm } from './DictionaryDetails/DictionaryDetailsForm';
import { JSONEditor } from './JSONEditor';
import { NodeEditor } from './NodeEditor';
import { SaveForm } from './SaveForm/SaveForm';
import { DictionarySiblingSwitcher } from './SiblingSwitcher/DictionarySiblingSwitcher';
import {
  findSiblingForSelection,
  getBaseSibling,
  getSelectionOfSibling,
  type SiblingSelection,
} from './SiblingSwitcher/siblingSelection';
import { StructureEditor } from './StructureEditor';
import { useUnsavedChangesGuard } from './useUnsavedChangesGuard';

/** Ways to look at the content of a dictionary. */
export type DictionaryEditorView =
  | 'document'
  | 'grid'
  | 'tree'
  | 'structure'
  | 'json';

type DictionaryEditorTab = 'content' | 'details';

const VIEW_STORAGE_KEY = 'intlayer:dictionary-editor:view';

const STORABLE_VIEWS: DictionaryEditorView[] = [
  'grid',
  'tree',
  'structure',
  'json',
];

/** Prompts before unload while the dictionary has unsaved changes. */
const UnsavedChangesGuard: FC = () => {
  const { changeSet } = useContentGrid();
  useUnsavedChangesGuard(changeSet.length > 0);

  return null;
};

type DictionaryFieldEditorProps = {
  dictionary: Dictionary;
  onClickDictionaryList?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  isDarkMode?: boolean;
  mode: ('local' | 'remote')[];
  showReturnButton?: boolean;
  rightContent?: ReactNode;
  /** Locales the current user cannot edit (per-member restrictions). */
  lockedLocales?: string[];
  /**
   * Dictionaries sharing the key (collection items, variants). Fetched from
   * the CMS when omitted.
   */
  siblings?: Dictionary[];
};

export const DictionaryFieldEditor: FC<DictionaryFieldEditorProps> = ({
  dictionary,
  onClickDictionaryList,
  isDarkMode,
  mode,
  onDelete,
  onSave,
  showReturnButton = true,
  rightContent,
  lockedLocales,
  siblings: siblingsProp,
}) => {
  const config = useConfiguration();
  const {
    returnToDictionaryList,
    contentTab,
    detailsTab,
    viewSwitcherLabel,
    documentView,
    gridView,
    treeView,
    structureView,
    jsonView,
  } = useIntlayer('dictionary-field-editor');
  const { focusedContent, setFocusedContent } = useFocusUnmergedDictionary();
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const [activeTab, setActiveTab] = useState<DictionaryEditorTab>('content');
  const { containerRef, isNarrow } = useIsNarrowContainer();
  const isRemote = mode.includes('remote');

  // Sibling selection (collection item / variant) applies to every view
  const [activeDictionary, setActiveDictionary] =
    useState<Dictionary>(dictionary);

  // Follow the prop: after a save the query hands back fresh content
  useEffect(() => {
    setActiveDictionary(dictionary);
  }, [dictionary]);

  const hasQualifier =
    dictionary.item !== undefined || dictionary.variant !== undefined;
  const { data: siblingsResult } = useGetDictionaries(
    { keys: [dictionary.key] },
    {
      enabled:
        !siblingsProp && Boolean(dictionary.key) && (isRemote || hasQualifier),
    }
  );
  const siblings = useMemo<Dictionary[]>(
    () =>
      siblingsProp ?? ((siblingsResult?.data ?? []) as unknown as Dictionary[]),
    [siblingsProp, siblingsResult]
  );

  const activeSelection = getSelectionOfSibling(activeDictionary);

  /** Switches every view to the sibling at the selected coordinates. */
  const selectSibling = (selection: SiblingSelection) => {
    const target =
      selection.item === null && selection.variant === null
        ? (getBaseSibling(siblings) ?? dictionary)
        : findSiblingForSelection(siblings, selection);

    if (!target || target.localId === activeDictionary.localId) return;

    setActiveDictionary(target);
    setFocusedContent({
      dictionaryKey: target.key,
      dictionaryLocalId: target.localId,
      keyPath: [],
    });
    setLocaleDictionary(target);
  };

  const isMarkdownDocument = getIsMarkdownDocument(activeDictionary.content);
  const [storedView, setStoredView] = usePersistedStore<
    DictionaryEditorView | undefined
  >(VIEW_STORAGE_KEY, undefined);
  // The document view is chosen by the dictionary itself, never remembered
  const rememberedView = STORABLE_VIEWS.find((view) => view === storedView);
  const [documentViewOverride, setDocumentViewOverride] =
    useState<DictionaryEditorView>();
  const activeView: DictionaryEditorView = isMarkdownDocument
    ? (documentViewOverride ?? 'document')
    : (rememberedView ?? 'grid');

  useEffect(() => {
    setFocusedContent({
      ...(focusedContent ?? {}),
      dictionaryKey: dictionary.key,
      dictionaryLocalId: dictionary.localId,
    });
    setLocaleDictionary(dictionary);
  }, []);

  const selectView = (view: DictionaryEditorView) => {
    if (isMarkdownDocument) setDocumentViewOverride(view);
    else setStoredView(view);
  };

  const viewChoices: { content: string; value: DictionaryEditorView }[] = [
    ...(isMarkdownDocument
      ? [{ content: documentView.value, value: 'document' as const }]
      : []),
    { content: gridView.value, value: 'grid' },
    { content: treeView.value, value: 'tree' },
    { content: structureView.value, value: 'structure' },
    { content: jsonView.value, value: 'json' },
  ];

  const tabClassName =
    'cursor-pointer whitespace-nowrap rounded-md px-4 py-1 font-medium text-sm transition-colors focus:outline-none';

  return (
    <LocaleSwitcherContentProvider
      availableLocales={config?.internationalization?.locales ?? []}
    >
      <ContentGridProvider
        dictionary={activeDictionary}
        lockedLocales={lockedLocales}
      >
        <UnsavedChangesGuard />
        <div
          ref={containerRef}
          className="relative flex h-full min-h-0 w-full flex-1 flex-col md:overflow-hidden"
        >
          {showReturnButton && (
            <Button
              onClick={onClickDictionaryList}
              variant="hoverable"
              className="z-10 ms-5 me-auto mb-6 shrink-0"
              color="text"
              Icon={ArrowLeft}
              label={returnToDictionaryList.label.value}
            >
              {returnToDictionaryList.text}
            </Button>
          )}

          <DictionarySiblingSwitcher
            className="mx-3 mb-3 shrink-0"
            dictionaryKey={dictionary.key}
            siblings={siblings}
            selectedItem={activeSelection.item}
            selectedVariant={activeSelection.variant}
            onSelect={selectSibling}
            isCompact={isNarrow}
          />

          <div className="mb-22 flex min-h-0 flex-1 flex-col overflow-hidden">
            {/* Tab headers */}
            <div className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center gap-x-16 gap-y-3 rounded-xl bg-background/20 p-3 pb-4">
              {isRemote && (
                <TabSelector
                  selectedChoice={activeTab}
                  tabs={[
                    <button
                      key="content"
                      className={tabClassName}
                      data-active={activeTab === 'content'}
                      onClick={() => setActiveTab('content')}
                      type="button"
                    >
                      {contentTab}
                    </button>,
                    <button
                      key="details"
                      className={tabClassName}
                      data-active={activeTab === 'details'}
                      onClick={() => setActiveTab('details')}
                      type="button"
                    >
                      {detailsTab}
                    </button>,
                  ]}
                  hoverable
                  color="text"
                  className="w-auto"
                />
              )}

              {activeTab === 'content' && (
                <div
                  title={viewSwitcherLabel.value}
                  className="overflow-x-auto"
                >
                  <TabSelector
                    selectedChoice={activeView}
                    tabs={viewChoices.map(({ content: viewLabel, value }) => (
                      <button
                        key={value}
                        className={tabClassName}
                        data-active={activeView === value}
                        onClick={() => selectView(value)}
                        type="button"
                      >
                        {viewLabel}
                      </button>
                    ))}
                    hoverable
                    color="text"
                    className="w-auto"
                  />
                </div>
              )}

              <div className="ms-auto flex items-center justify-end">
                {rightContent}
              </div>
            </div>

            {/* Tab content — only the active panel is mounted */}
            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="flex w-full min-w-0 flex-col items-stretch gap-6">
                {isRemote && activeTab === 'details' && (
                  <DictionaryDetailsForm
                    dictionary={activeDictionary}
                    mode={mode}
                  />
                )}
                {activeTab === 'content' && (
                  <>
                    {activeView === 'document' && <MarkdownDocument />}
                    {activeView === 'grid' && (
                      <ContentGrid dictionary={activeDictionary} />
                    )}
                    {activeView === 'tree' && (
                      <NodeEditor dictionary={activeDictionary} />
                    )}
                    {activeView === 'structure' && (
                      <StructureEditor dictionary={activeDictionary} />
                    )}
                    {activeView === 'json' && (
                      <JSONEditor
                        dictionary={activeDictionary}
                        isDarkMode={isDarkMode}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 z-20 w-full p-2">
            <Container
              color="card"
              roundedSize="2xl"
              padding="sm"
              className="w-full shrink-0 flex-row flex-wrap items-center justify-end gap-x-10 gap-y-2 bg-background/20 md:bottom-0"
            >
              {activeDictionary.id && (
                <CopyToClipboard
                  text={activeDictionary.id}
                  className="text-nowrap font-mono text-muted-foreground text-sm"
                  size={9}
                >
                  {activeDictionary.id}
                </CopyToClipboard>
              )}
              <SaveForm
                dictionary={activeDictionary}
                mode={mode}
                className="flex-1"
                onDelete={() => {
                  setFocusedContent(null);
                  onDelete?.();
                }}
                onSave={onSave}
              />
            </Container>
          </div>
        </div>
      </ContentGridProvider>
    </LocaleSwitcherContentProvider>
  );
};
