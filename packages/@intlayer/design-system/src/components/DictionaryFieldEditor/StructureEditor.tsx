'use client';

import type { Dictionary } from '@intlayer/core';
import { useEditedContent } from '@intlayer/editor-react';
import type { FC } from 'react';
import { NodeView } from './StructureView/StructureView';

type NodeEditorProps = {
  dictionary: Dictionary;
};

export const StructureEditor: FC<NodeEditorProps> = ({ dictionary }) => {
  const { content, localId } = dictionary;

  const { editedContent } = useEditedContent();
  const initialSection =
    typeof editedContent?.[localId!]?.content === 'undefined'
      ? content
      : editedContent?.[localId!]?.content;

  return (
    <NodeView
      section={initialSection}
      keyPath={[]}
      dictionaryLocalId={localId!}
    />
  );
};
