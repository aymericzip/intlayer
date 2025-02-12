'use client';

import { type Dictionary, getContentNodeByKeyPath } from '@intlayer/core';
import { useFocusDictionary, useEditedContent } from '@intlayer/editor-react';
import { type FC } from 'react';
import { Container } from '../../Container';
import { getIsEditableSection } from '../getIsEditableSection';
import { TextEditor } from './TextEditor';

type EditorViewProps = {
  dictionaryKey: string;
  dictionary: Dictionary;
  isDarkMode?: boolean;
};

export const EditorView: FC<EditorViewProps> = ({
  dictionaryKey,
  dictionary,
  isDarkMode,
}) => {
  const { focusedContent } = useFocusDictionary();
  const keyPath = focusedContent?.keyPath ?? [];

  const { editedContent } = useEditedContent();

  const editedSection =
    typeof editedContent?.[dictionaryKey]?.content === 'undefined'
      ? undefined
      : getContentNodeByKeyPath(
          editedContent?.[dictionaryKey].content,
          keyPath
        );

  const dictionarySection = getContentNodeByKeyPath(
    dictionary.content,
    keyPath
  );
  const section =
    typeof editedSection === 'undefined' ? dictionarySection : editedSection;
  const isEditableSection = getIsEditableSection(section);

  return (
    <>
      {isEditableSection && (
        <Container
          border
          background="none"
          className="h-full flex-1 overflow-hidden"
          roundedSize="xl"
        >
          <TextEditor
            key={keyPath.join('.')}
            keyPath={keyPath}
            section={section}
            dictionary={dictionary}
            isDarkMode={isDarkMode}
          />
        </Container>
      )}
    </>
  );
};
