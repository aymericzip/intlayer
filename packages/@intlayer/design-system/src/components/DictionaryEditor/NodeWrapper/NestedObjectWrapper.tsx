/* eslint-disable import/no-cycle */

import {
  type KeyPath,
  isSameKeyPath,
  type DictionaryValue,
  NodeType,
} from '@intlayer/core';
import { Edit } from 'lucide-react';
import type { FC } from 'react';
import { Button } from '../../Button';
import { ItemLayout } from '../ItemLayout';
import { NodeWrapper, traceKeys, type NodeWrapperProps } from './index';

type NestedObjectWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: Record<string, DictionaryValue>;
};

export const NestedObjectWrapper: FC<NestedObjectWrapperProps> = (props) => {
  const {
    keyPath,
    section,
    focusedKeyPath = [],
    onClickEdit,
    onFocusKeyPath,
  } = props;

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
          <NodeWrapper {...props} keyPath={newKeyPath} section={section[key]} />
        </ItemLayout>
      );
    });
};
