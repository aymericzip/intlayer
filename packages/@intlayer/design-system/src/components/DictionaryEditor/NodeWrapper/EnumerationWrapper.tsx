import {
  type KeyPath,
  NodeType,
  type EnumerationContent,
  type DictionaryValue,
} from '@intlayer/core';
import type { FC } from 'react';
import tw from 'twin.macro';
import { NodeWrapper, traceKeys, type NodeWrapperProps } from './index';

interface EnumerationWrapperProps extends Omit<NodeWrapperProps, 'section'> {
  section: EnumerationContent<DictionaryValue>;
}

const StyledEnumerationWrapperContainer = tw.div`grid grid-cols-2 grid-cols-[auto,1fr] gap-2 ml-2`;
const StyledKey = tw.span`font-bold flex items-center`;

export const EnumerationWrapper: FC<EnumerationWrapperProps> = (props) => {
  const { keyPath, section } = props;

  return (
    <StyledEnumerationWrapperContainer>
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
              <StyledKey>{key}</StyledKey>
              <NodeWrapper
                {...props}
                key={key}
                keyPath={newKeyPath}
                section={subSection}
              />
            </>
          );
        })}
    </StyledEnumerationWrapperContainer>
  );
};
