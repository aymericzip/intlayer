import type { EnumerationContent } from '@intlayer/core/transpiler';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
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
            type: NodeTypes.ENUMERATION,
            key,
          };
          const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

          const subSection =
            section[NodeTypes.ENUMERATION][
              key as keyof (typeof section)[typeof NodeTypes.ENUMERATION]
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
