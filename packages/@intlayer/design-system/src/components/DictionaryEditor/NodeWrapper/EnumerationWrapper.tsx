import {
  type KeyPath,
  NodeType,
  type EnumerationContent,
  type DictionaryValue,
} from '@intlayer/core';
import type { FC } from 'react';
import { NodeWrapper, traceKeys, type NodeWrapperProps } from './index';

interface EnumerationWrapperProps extends Omit<NodeWrapperProps, 'section'> {
  section: EnumerationContent<DictionaryValue>;
}

export const EnumerationWrapper: FC<EnumerationWrapperProps> = (props) => {
  const { keyPath, section } = props;

  return (
    <>
      {Object.keys(section)
        .filter((key) => !traceKeys.includes(key))
        .map((key) => {
          const newKeyPathEl: KeyPath = {
            type: NodeType.Enumeration,
            key,
          };
          const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

          const subSection: DictionaryValue =
            section[key as keyof typeof section]!;

          return (
            <NodeWrapper
              {...props}
              key={key}
              keyPath={newKeyPath}
              section={subSection}
            />
          );
        })}
    </>
  );
};
