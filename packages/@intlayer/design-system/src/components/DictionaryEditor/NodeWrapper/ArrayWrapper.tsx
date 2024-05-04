import type { DictionaryValue, KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

interface ArrayWrapperProps extends Omit<NodeWrapperProps, 'section'> {
  section: DictionaryValue[];
}

export const ArrayWrapper: FC<ArrayWrapperProps> = (props) => {
  const { keyPath, section } = props;

  return section.map((subSection, key) => {
    const newKeyPathEl: KeyPath = {
      key,
      type: 'ArrayExpression',
    };
    const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

    return (
      <NodeWrapper
        {...props}
        key={key}
        keyPath={newKeyPath}
        section={subSection}
      />
    );
  });
};
