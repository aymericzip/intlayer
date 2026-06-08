import type { PluralContent } from '@intlayer/core/transpiler';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps, traceKeys } from './index';

type PluralWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: PluralContent<ContentNode>;
};

export const PluralWrapper: FC<PluralWrapperProps> = (props) => {
  const { keyPath, section } = props;

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      {Object.keys(section)
        .filter((key) => !traceKeys.includes(key))
        .map((key) => {
          const newKeyPathEl: KeyPath = {
            type: NodeTypes.PLURAL,
            key,
          };
          const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

          const subSection =
            section[NodeTypes.PLURAL][
              key as keyof (typeof section)[typeof NodeTypes.PLURAL]
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
