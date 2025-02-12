'use client';

import type { Dictionary } from '@intlayer/core';
import { useEditedContent, useFocusDictionary } from '@intlayer/editor-react';
import { type FC } from 'react';
import { Container } from '../Container';
import { LocaleSwitcherContent } from '../LocaleSwitcherContentDropDown';
import { EditorView } from './ContentEditorView/EditorView';
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
  const { content: dictionaryContent, key } = dictionary;
  const { editedContent } = useEditedContent();
  const { focusedContent, setFocusedContentKeyPath } = useFocusDictionary();

  const focusedKeyPath = focusedContent?.keyPath;

  const section = editedContent?.[key]?.content ?? dictionaryContent;

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <KeyPathBreadcrumb
          dictionaryKey={key}
          keyPath={focusedKeyPath ?? []}
          onClickKeyPath={setFocusedContentKeyPath}
        />
        <div className="flex items-center gap-2">
          <LocaleSwitcherContent />
        </div>
      </div>

      <div className="flex gap-2 max-md:flex-col">
        {typeof section === 'object' &&
          section &&
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
                dictionaryKey={key}
              />
            </Container>
          )}
        <div className="top-6 flex h-full flex-1 flex-col gap-6 md:sticky">
          <EditorView
            dictionary={dictionary}
            dictionaryKey={key}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </>
  );
};
