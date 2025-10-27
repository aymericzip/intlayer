import type { ConditionContent } from '@intlayer/core';
import { type ContentNode, type KeyPath, NodeType } from '@intlayer/types';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps, traceKeys } from './index';

type ConditionWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: ConditionContent<ContentNode>;
};

export const ConditionWrapper: FC<ConditionWrapperProps> = (props) => {
  const { keyPath, section } = props;

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      {Object.keys(section)
        .filter((key) => !traceKeys.includes(key))
        .map((key) => {
          const newKeyPathEl: KeyPath = {
            type: NodeType.Condition,
            key,
          };
          const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

          const subSection =
            section[NodeType.Condition][
              key as keyof (typeof section)[NodeType.Condition]
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
