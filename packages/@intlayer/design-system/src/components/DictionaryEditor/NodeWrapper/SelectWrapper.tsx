import type { SelectContent } from '@intlayer/core/transpiler';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type SelectWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: SelectContent;
};

export const SelectWrapper: FC<SelectWrapperProps> = (props) => {
  const { keyPath, section } = props;

  const cases = section[NodeTypes.SELECT] as Record<string, ContentNode>;

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      {Object.keys(cases).map((caseKey) => {
        const newKeyPathEl: KeyPath = {
          type: NodeTypes.SELECT,
          key: caseKey,
        };
        const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

        return (
          <>
            <span className="flex items-center font-bold">{caseKey}</span>
            <NodeWrapper
              {...props}
              key={caseKey}
              keyPath={newKeyPath}
              section={cases[caseKey]}
            />
          </>
        );
      })}
    </div>
  );
};
