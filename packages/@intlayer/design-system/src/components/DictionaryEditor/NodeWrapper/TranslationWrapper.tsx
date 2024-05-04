import {
  type KeyPath,
  NodeType,
  type TranslationContent,
  type DictionaryValue,
} from '@intlayer/core';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

interface TranslationWrapperProps extends Omit<NodeWrapperProps, 'section'> {
  section: TranslationContent<DictionaryValue>;
}

export const TranslationWrapper: FC<TranslationWrapperProps> = (props) => {
  const { keyPath, section, locale } = props;

  const newKeyPathEl: KeyPath = {
    type: NodeType.Translation,
    key: locale,
  };

  const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

  const subSection: DictionaryValue = section[locale as keyof typeof section]!;

  return <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />;
};
