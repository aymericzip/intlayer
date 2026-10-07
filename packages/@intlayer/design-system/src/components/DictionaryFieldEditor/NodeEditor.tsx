'use client';

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
  useTransition,
} from 'react';
import { Container } from '../Container';
import { LocaleSwitcherContent } from '../LocaleSwitcherContentDropDown';
import { TextEditorContainer } from './ContentEditorView/TextEditor';
import { getIsEditableSection } from './getIsEditableSection';
import { KeyPathBreadcrumb } from './KeyPathBreadcrumb';
import { NavigationViewNode } from './NavigationView/NavigationViewNode';

export type NodeEditorProps = {
  dictionary: Dictionary;
};

export const NodeEditor: FC<NodeEditorProps> = ({ dictionary }) => {
  const { editedContent } = useEditedContent();
  const {
    focusedContent,
    setFocusedContentKeyPath: _setFocusedContentKeyPath,
  } = useFocusUnmergedDictionary();
  const [, startTransition] = useTransition();
  const setFocusedContentKeyPath = useCallback<
    typeof _setFocusedContentKeyPath
  >(
    (keyPath) => startTransition(() => _setFocusedContentKeyPath(keyPath)),
    [_setFocusedContentKeyPath]
  );

  // Sibling selection (item / variant) is owned by DictionaryFieldEditor
  const { content, key, localId } = dictionary;
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

  return (
    <div>
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
                dictionary={dictionary}
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
              dictionary={dictionary}
            />
          </div>
        )}
      </div>
    </div>
  );
};
