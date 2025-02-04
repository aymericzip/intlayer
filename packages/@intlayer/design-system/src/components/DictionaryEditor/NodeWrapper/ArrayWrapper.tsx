/* eslint-disable import/no-cycle */
import {
  isSameKeyPath,
  NodeType,
  type DictionaryValue,
  type KeyPath,
} from '@intlayer/core';
import { Edit } from 'lucide-react';
import type { FC } from 'react';
import { Button } from '../../Button';
import { ItemLayout } from '../ItemLayout';
import { NodeWrapper, type NodeWrapperProps } from './index';

type ArrayWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: DictionaryValue[];
};

export const ArrayWrapper: FC<ArrayWrapperProps> = (props) => {
  const {
    keyPath,
    section,
    onFocusKeyPath,
    onClickEdit,
    focusedKeyPath = [],
  } = props;

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
        rightParam={
          <Button
            Icon={Edit}
            size="icon-sm"
            variant="hoverable"
            color="text"
            label="Open the editor"
            onClick={(e) => {
              e.stopPropagation();

              onClickEdit?.(newKeyPath);
            }}
          />
        }
      >
        <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />
      </ItemLayout>
    );
  });
};
