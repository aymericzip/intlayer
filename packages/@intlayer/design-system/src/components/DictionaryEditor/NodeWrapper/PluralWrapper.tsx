import type { PluralContent } from '@intlayer/core/transpiler';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { type FC, Fragment } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type PluralWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: PluralContent<ContentNode>;
};

export const PluralWrapper: FC<PluralWrapperProps> = (props) => {
  const { keyPath, section } = props;

  const categories = section[NodeTypes.PLURAL] as Record<string, ContentNode>;

  return (
    <div className="ms-2 grid grid-cols-[auto,1fr] gap-2">
      {Object.keys(categories).map((category) => {
        const newKeyPathEl: KeyPath = {
          type: NodeTypes.PLURAL,
          key: category,
        };
        const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

        return (
          <Fragment key={category}>
            <span className="flex items-center font-bold">{category}</span>
            <NodeWrapper
              {...props}
              keyPath={newKeyPath}
              section={categories[category]}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
