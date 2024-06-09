import {
  isSameKeyPath,
  type DictionaryValue,
  type KeyPath,
} from '@intlayer/core';
import type { FC } from 'react';
import { ItemLayout } from '../ItemLayout';
import { NodeWrapper, type NodeWrapperProps } from './index';

interface ArrayWrapperProps extends Omit<NodeWrapperProps, 'section'> {
  section: DictionaryValue[];
}

export const ArrayWrapper: FC<ArrayWrapperProps> = (props) => {
  const { keyPath, section, onFocusKeyPath, focusedKeyPath = [] } = props;

  return section.map((subSection, key) => {
    const newKeyPathEl: KeyPath = {
      key,
      type: 'ArrayExpression',
    };
    const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

    return (
      <ItemLayout
        level={keyPath.length}
        key={key}
        title={`${key}`}
        description=""
        isSelected={isSameKeyPath(newKeyPath, focusedKeyPath)}
        onClick={(e) => {
          e.stopPropagation();
          onFocusKeyPath(newKeyPath);
        }}
      >
        <NodeWrapper
          {...props}
          key={key}
          keyPath={newKeyPath}
          section={subSection}
        />
      </ItemLayout>
    );
  });
};
