import type { ConditionContent } from '@intlayer/core/transpiler';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import type { FC } from 'react';
// fallow-ignore-next-line circular-dependency
import { NodeWrapper, type NodeWrapperProps } from './index';

type ConditionWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: ConditionContent<ContentNode>;
};

export const ConditionWrapper: FC<ConditionWrapperProps> = (props) => {
  const { keyPath, section } = props;

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      {Object.keys(section[NodeTypes.CONDITION]).map((key) => {
        const newKeyPathEl: KeyPath = {
          type: NodeTypes.CONDITION,
          key,
        };
        const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

        const subSection =
          section[NodeTypes.CONDITION][
            key as keyof (typeof section)[typeof NodeTypes.CONDITION]
          ]!;

        return (
          <>
            <span className="flex items-center font-bold">{key}</span>
            <NodeWrapper
              {...props}
              key={key}
              keyPath={newKeyPath}
              section={subSection}
            />
          </>
        );
      })}
    </div>
  );
};
