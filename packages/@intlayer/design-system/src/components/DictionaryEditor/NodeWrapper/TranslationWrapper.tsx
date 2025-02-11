import {
  type KeyPath,
  NodeType,
  type TranslationContent,
  type ContentNode,
} from '@intlayer/core';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type TranslationWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: TranslationContent<ContentNode>;
};

export const TranslationWrapper: FC<TranslationWrapperProps> = (props) => {
  const { keyPath, section, locale } = props;

  const newKeyPathEl: KeyPath = {
    type: NodeType.Translation,
    key: locale,
  };

  const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

  const subSection =
    section.translation[
      locale as unknown as keyof (typeof section)['translation']
    ]!;

  return <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />;
};
