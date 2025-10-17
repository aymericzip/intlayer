import type { MarkdownContent } from '@intlayer/core';
import { type ContentNode, type KeyPath, NodeType } from '@intlayer/types';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type MarkdownWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: MarkdownContent<ContentNode>;
};

export const MarkdownWrapper: FC<MarkdownWrapperProps> = (props) => {
  const { keyPath, section } = props;

  const newKeyPath: KeyPath[] = [
    ...keyPath,
    {
      type: NodeType.Markdown,
    },
  ];

  const subSection = section[NodeType.Markdown] as ContentNode;

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />
    </div>
  );
};
