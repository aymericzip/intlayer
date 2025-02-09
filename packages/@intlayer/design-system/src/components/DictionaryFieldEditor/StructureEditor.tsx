'use client';

import { Dictionary } from '@intlayer/core';
import { useEditedContent } from '@intlayer/editor-react';
import { type FC } from 'react';
import { Container } from '../Container';
import { StructureView } from './StructureView/StructureView';

type NodeEditorProps = {
  dictionary: Dictionary;
};

export const StructureEditor: FC<NodeEditorProps> = ({ dictionary }) => {
  const { content: dictionaryContent, key } = dictionary;
  const { editedContent } = useEditedContent();
  const initialSection = editedContent?.[key]?.content ?? dictionaryContent;

  return (
    <Container
      background="none"
      border
      roundedSize="2xl"
      className="w-full overflow-scroll p-3"
    >
      <StructureView
        keyPath={[]}
        section={initialSection}
        dictionaryKey={key}
      />
    </Container>
  );
};
