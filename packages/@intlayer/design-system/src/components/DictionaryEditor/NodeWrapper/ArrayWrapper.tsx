import {
  type ContentNode,
  isSameKeyPath,
  type KeyPath,
  NodeType,
} from '@intlayer/core';
import type { FC } from 'react';
import { ItemLayout } from '../ItemLayout';
import { NodeWrapper, type NodeWrapperProps } from './index';

type ArrayWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: ContentNode[];
};

export const ArrayWrapper: FC<ArrayWrapperProps> = (props) => {
  const { keyPath, section, onFocusKeyPath, focusedKeyPath = [] } = props;

  return section.map((subSection, key) => {
    const newKeyPathEl: KeyPath = {
      key,
      type: NodeType.Array,
    };
    const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

    return (
      <ItemLayout
        level={keyPath.length}
        key={JSON.stringify(subSection)}
        title={`${key}`}
        description=""
        isSelected={isSameKeyPath(newKeyPath, focusedKeyPath)}
        onClick={(e) => {
          e.stopPropagation();
          onFocusKeyPath(newKeyPath);
        }}
      >
        <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />
      </ItemLayout>
    );
  });
};
