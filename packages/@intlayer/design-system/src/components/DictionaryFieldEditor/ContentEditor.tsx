'use client';

import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import {
  useEditedContent,
  useEditorLocale,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { type FC, useDeferredValue, useEffect, useTransition } from 'react';
import { Container } from '../Container';
import { LocaleSwitcherContent } from '../LocaleSwitcherContentDropDown';
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
  const { content, key, localId } = dictionary;
  const { editedContent } = useEditedContent();
  const {
    focusedContent,
    setFocusedContentKeyPath: _setFocusedContentKeyPath,
  } = useFocusUnmergedDictionary();
  const [, startTransition] = useTransition();
  const setFocusedContentKeyPath: typeof _setFocusedContentKeyPath = (
    keyPath
  ) => startTransition(() => _setFocusedContentKeyPath(keyPath));

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

  // Defer the expensive right-panel render so navigation clicks feel instant.
  // The stale section stays visible while React computes the new one in background.
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
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};
