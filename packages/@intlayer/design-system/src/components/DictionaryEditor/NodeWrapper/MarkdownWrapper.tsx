import { type KeyPath, NodeType, type MarkdownContent } from '@intlayer/core';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type MarkdownWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: MarkdownContent;
};

export const MarkdownWrapper: FC<MarkdownWrapperProps> = (props) => {
  const { keyPath, section } = props;

  const newKeyPathEl: KeyPath = {
    type: NodeType.Markdown,
  };
  const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

  const subSection = section[NodeType.Markdown];

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />
    </div>
  );
};
