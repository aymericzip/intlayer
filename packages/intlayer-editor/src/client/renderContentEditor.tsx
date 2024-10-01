import { getConfiguration } from '@intlayer/config/client';
import type { KeyPath } from '@intlayer/core';
import type { FC, ReactNode } from 'react';
import { ContentSelectorWrapper } from './ContentSelectorWrapper';

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
      <ContentSelectorWrapper {...props}>{content}</ContentSelectorWrapper>
    );
  }
  return <>{content}</>;
};

export type RenderIntlayerEditorResult = ReactNode & { value: string };

export const renderIntlayerEditor = (
  data: IntlayerEditorElementProps,
  isContentSelectable: boolean
): RenderIntlayerEditorResult => {
  const Result = (
    <IntlayerEditorElement
      {...data}
      isContentSelectable={isContentSelectable}
    />
  );

  return { ...Result, value: data.content };
};
