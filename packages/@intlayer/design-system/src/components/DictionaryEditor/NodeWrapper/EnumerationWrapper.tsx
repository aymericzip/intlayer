import type { EnumerationContent } from '@intlayer/core';
import { type ContentNode, type KeyPath, NodeType } from '@intlayer/types';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps, traceKeys } from './index';

type EnumerationWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: EnumerationContent<ContentNode>;
};

export const EnumerationWrapper: FC<EnumerationWrapperProps> = (props) => {
  const { keyPath, section } = props;

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      {Object.keys(section)
        .filter((key) => !traceKeys.includes(key))
        .map((key) => {
          const newKeyPathEl: KeyPath = {
            type: NodeType.Enumeration,
            key,
          };
          const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

          const subSection =
            section[NodeType.Enumeration][
              key as keyof (typeof section)[NodeType.Enumeration]
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
