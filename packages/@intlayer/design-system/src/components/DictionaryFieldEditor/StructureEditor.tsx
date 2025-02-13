'use client';

import type { Dictionary } from '@intlayer/core';
import { useEditedContent } from '@intlayer/editor-react';
import { type FC } from 'react';
import { NodeView } from './StructureView/StructureView';

type NodeEditorProps = {
  dictionary: Dictionary;
};

export const StructureEditor: FC<NodeEditorProps> = ({ dictionary }) => {
  const { content, key } = dictionary;

  const { editedContent } = useEditedContent();
  const initialSection =
    typeof editedContent?.[key]?.content === 'undefined'
      ? content
      : editedContent?.[key]?.content;

  return (
    <NodeView
      section={initialSection}
      keyPath={[]}
      dictionaryKey={dictionary.key}
    />
  );
};
