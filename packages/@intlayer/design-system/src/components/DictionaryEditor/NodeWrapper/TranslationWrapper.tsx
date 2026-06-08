import type { TranslationContent } from '@intlayer/core/transpiler';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type TranslationWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: TranslationContent<ContentNode>;
};

export const TranslationWrapper: FC<TranslationWrapperProps> = (props) => {
  const { keyPath, section, locale } = props;

  const newKeyPathEl: KeyPath = {
    type: NodeTypes.TRANSLATION,
    key: locale,
  };

  const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

  const subSection =
    section[NodeTypes.TRANSLATION][
      locale as unknown as keyof (typeof section)[typeof NodeTypes.TRANSLATION]
    ]!;

  return <NodeWrapper {...props} keyPath={newKeyPath} section={subSection} />;
};
