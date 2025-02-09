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
};

export const EditorView: FC<EditorViewProps> = ({
  dictionaryKey,
  dictionary,
}) => {
  const { focusedContent } = useFocusDictionary();
  const keyPath = focusedContent?.keyPath ?? [];

  const { editedContent } = useEditedContent();

  const editedSection = editedContent?.[dictionaryKey]?.content
    ? getContentNodeByKeyPath(editedContent?.[dictionaryKey].content, keyPath)
    : undefined;

  const dictionarySection = getContentNodeByKeyPath(
    dictionary.content,
    keyPath
  );
  const section = editedSection ?? dictionarySection;
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
          />
        </Container>
      )}
    </>
  );
};
