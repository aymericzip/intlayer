import { isSameKeyPath } from '@intlayer/core';
import { type ContentNode, type KeyPath, NodeType } from '@intlayer/types';
import type { FC } from 'react';
import { ItemLayout } from '../ItemLayout';
import { NodeWrapper, type NodeWrapperProps, traceKeys } from './index';

type NestedObjectWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: Record<string, ContentNode>;
};

export const NestedObjectWrapper: FC<NestedObjectWrapperProps> = (props) => {
  const { keyPath, section, focusedKeyPath = [], onFocusKeyPath } = props;

  return Object.keys(section)
    .filter((key) => !traceKeys.includes(key))
    .map((key) => {
      const newKeyPathEl: KeyPath = { key, type: NodeType.Object };
      const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

      return (
        <ItemLayout
          level={keyPath.length}
          key={key}
          title={key}
          description=""
          isSelected={isSameKeyPath(newKeyPath, focusedKeyPath)}
          onClick={(e) => {
            e.stopPropagation();

            onFocusKeyPath(newKeyPath);
          }}
        >
          <NodeWrapper {...props} keyPath={newKeyPath} section={section[key]} />
        </ItemLayout>
      );
    });
};
