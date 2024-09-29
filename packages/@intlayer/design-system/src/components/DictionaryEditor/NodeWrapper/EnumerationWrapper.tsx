import {
  type KeyPath,
  NodeType,
  type EnumerationContent,
  type DictionaryValue,
} from '@intlayer/core';
import type { FC } from 'react';
import { NodeWrapper, traceKeys, type NodeWrapperProps } from './index';

type EnumerationWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: EnumerationContent<DictionaryValue>;
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
            section.enumeration[key as keyof (typeof section)['enumeration']]!;

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
