import type { InsertionContent } from '@intlayer/core/transpiler';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
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
      type: NodeTypes.INSERTION,
    },
  ];

  const subSection = section[NodeTypes.INSERTION];

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />
    </div>
  );
};
