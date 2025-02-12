'use client';

import type { Dictionary } from '@intlayer/core';
import { useEditedContent } from '@intlayer/editor-react';
import { type FC } from 'react';
import { NodeView } from './StructureView/StructureView';

type NodeEditorProps = {
  dictionary: Dictionary;
};

export const StructureEditor: FC<NodeEditorProps> = ({ dictionary }) => {
  const { content: dictionaryContent, key } = dictionary;
  const { editedContent } = useEditedContent();
  const initialSection = editedContent?.[key]?.content ?? dictionaryContent;

  return (
    <div className="w-full overflow-scroll p-5">
      <NodeView
        section={initialSection}
        keyPath={[]}
        dictionaryKey={dictionary.key}
      />
    </div>
  );
};
