import { getConfiguration } from '@intlayer/config/client';
import type { KeyPath } from '@intlayer/core';
import type { ReactNode } from 'react';
import { ContentSelectorWrapper } from './ContentSelectorWrapper';

const {
  editor: { enabled },
} = getConfiguration();

export type IntlayerEditorElementProps = {
  content: string;
  dictionaryId: string;
  dictionaryPath: string;
  keyPath: KeyPath[];
};

type RenderIntlayerEditorResult = ReactNode & { value: string };

const IntlayerEditorElement = ({
  content,
  ...props
}: IntlayerEditorElementProps) => {
  if (enabled) {
    return (
      <ContentSelectorWrapper {...props}>{content}</ContentSelectorWrapper>
    );
  }
  return content;
};

IntlayerEditorElement.content = '';

export const renderIntlayerEditor = (
  data: IntlayerEditorElementProps
): RenderIntlayerEditorResult => {
  const Result = <IntlayerEditorElement {...data} />;

  return { ...Result, value: data.content };
};
