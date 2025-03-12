import { type KeyPath, NodeType, type MarkdownContent } from '@intlayer/core';
import type { FC } from 'react';
import { type NodeWrapperProps } from './index';
import { StringWrapper } from './StringWrapper';

type MarkdownWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: MarkdownContent;
};

export const MarkdownWrapper: FC<MarkdownWrapperProps> = (props) => {
  const { keyPath, section } = props;

  const newKeyPath: KeyPath[] = [
    ...keyPath,
    {
      type: NodeType.Markdown,
    },
  ];

  const subSection = section[NodeType.Markdown];

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      <StringWrapper {...props} keyPath={newKeyPath} section={subSection} />
    </div>
  );
};
