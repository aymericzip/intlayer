'use client';

import { getContentNodeByKeyPath } from '@intlayer/core';
import {
  useEditedContent,
  useEditorLocale,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types';
import { type FC, useEffect } from 'react';
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
  const { focusedContent, setFocusedContentKeyPath } =
    useFocusUnmergedDictionary();

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
  const isEditableBaseSection = getIsEditableSection(section);
  const isEditableFocusedSection = getIsEditableSection(focusedSection);

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
      <div className="flex flex-1 gap-2 overflow-auto max-md:flex-col">
        {typeof section === 'object' &&
          section &&
          !isEditableBaseSection &&
          Object.keys(section).length > 0 && (
            <Container
              border
              background="none"
              className="top-6 flex h-full flex-col items-start gap-0.5 overflow-auto p-2 md:sticky md:max-w-[50%]"
              roundedSize="xl"
              transparency="sm"
            >
              <NavigationViewNode
                keyPath={[]}
                section={section}
                dictionary={dictionary}
              />
            </Container>
          )}
        {(isEditableFocusedSection || (focusedKeyPath ?? []).length > 0) && (
          <TextEditorContainer
            keyPath={focusedKeyPath ?? []}
            section={focusedSection}
            dictionary={dictionary}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
};
