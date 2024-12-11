import { getConfiguration } from '@intlayer/config/client';
import type { KeyPath } from '@intlayer/core';
import type { FC, ReactNode } from 'react';
import { ContentSelectorConnector } from './ContentSelectorConnector';

const {
  editor: { enabled },
} = getConfiguration();

export type IntlayerEditorElementProps = {
  content: string;
  dictionaryId: string;
  dictionaryPath: string;
  keyPath: KeyPath[];
  isContentSelectable: boolean;
};

const IntlayerEditorElement: FC<IntlayerEditorElementProps> = ({
  content,
  isContentSelectable,
  ...props
}) => {
  if (enabled && isContentSelectable) {
    return (
      <ContentSelectorConnector {...props}>{content}</ContentSelectorConnector>
    );
  }
  return content;
};

export type IntlayerNode<T = string> = ReactNode & {
  value: T;
};

export const renderIntlayerEditor = (
  data: IntlayerEditorElementProps,
  isContentSelectable = true
): IntlayerNode => {
  const Result = (
    <IntlayerEditorElement
      {...data}
      isContentSelectable={isContentSelectable}
    />
  );

  return { ...Result, value: data.content };
};
