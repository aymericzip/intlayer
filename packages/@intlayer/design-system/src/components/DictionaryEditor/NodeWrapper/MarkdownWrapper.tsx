import type { MarkdownContent } from '@intlayer/core/transpiler';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';

import * as NodeTypes from '@intlayer/types/nodeType';
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
      type: NodeTypes.MARKDOWN,
    },
  ];

  const subSection = section[NodeTypes.MARKDOWN] as ContentNode;

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />
    </div>
  );
};
