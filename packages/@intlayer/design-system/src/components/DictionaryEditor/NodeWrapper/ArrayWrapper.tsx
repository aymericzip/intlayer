import { isSameKeyPath } from '@intlayer/core/utils';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
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
      type: NodeTypes.ARRAY,
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
