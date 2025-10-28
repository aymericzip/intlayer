import { isSameKeyPath } from '@intlayer/core';
import { type ContentNode, type KeyPath, NodeType } from '@intlayer/types';
import { type FC, memo, useMemo } from 'react';
import { ItemLayout } from '../ItemLayout';
import { NodeWrapper, type NodeWrapperProps, traceKeys } from './index';

type NestedObjectWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: Record<string, ContentNode>;
};

export const NestedObjectWrapper: FC<NestedObjectWrapperProps> = memo(
  (props) => {
    const { keyPath, section, focusedKeyPath = [], onFocusKeyPath } = props;

    const sectionKeys = useMemo(
      () => Object.keys(section).filter((key) => !traceKeys.includes(key)),
      [section]
    );

    return sectionKeys.map((key) => {
      const newKeyPathEl: KeyPath = { key, type: NodeType.Object };
      const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

      const isSelected = isSameKeyPath(newKeyPath, focusedKeyPath);

      return (
        <ItemLayout
          level={keyPath.length}
          key={key}
          title={key}
          description=""
          isSelected={isSelected}
          onClick={(e) => {
            e.stopPropagation();

            if (isSelected) {
              onFocusKeyPath([]);
            } else {
              onFocusKeyPath(newKeyPath);
            }
          }}
        >
          <NodeWrapper {...props} keyPath={newKeyPath} section={section[key]} />
        </ItemLayout>
      );
    });
  }
);
