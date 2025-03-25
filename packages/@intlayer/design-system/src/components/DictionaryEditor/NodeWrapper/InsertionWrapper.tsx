import {
  NodeType,
  type ContentNode,
  type InsertionContent,
  type KeyPath,
} from '@intlayer/core';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type InsertionWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: InsertionContent<ContentNode>;
};

export const InsertionWrapper: FC<InsertionWrapperProps> = (props) => {
  const { keyPath, section } = props;

  const newKeyPath: KeyPath[] = [
    ...keyPath,
    {
      type: NodeType.Insertion,
    },
  ];

  const subSection = section[NodeType.Insertion];

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />
    </div>
  );
};
