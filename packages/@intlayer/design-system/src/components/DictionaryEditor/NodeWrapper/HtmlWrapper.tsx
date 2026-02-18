import type { HTMLContent } from '@intlayer/core/transpiler';
import { type ContentNode, type KeyPath, NodeType } from '@intlayer/types';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type HtmlWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: HTMLContent<ContentNode>;
};

export const HtmlWrapper: FC<HtmlWrapperProps> = (props) => {
  const { keyPath, section } = props;

  const newKeyPath: KeyPath[] = [
    ...keyPath,
    {
      type: NodeType.HTML,
    },
  ];

  const subSection = section[NodeType.HTML] as ContentNode;

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />
    </div>
  );
};
