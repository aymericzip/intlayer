import type { ReactNode } from 'react';
import {
  ContentSelectorWrapper,
  type ContentSelectorWrapperProps,
} from './ContentSelectorWrapper';

export type IntlayerNode<T = string> = ReactNode & {
  value: T;
};

export type RenderIntlayerEditorProps = Omit<
  ContentSelectorWrapperProps,
  'children'
> & {
  content: string;
};

export const renderIntlayerEditor = (
  props: RenderIntlayerEditorProps
): IntlayerNode => {
  const Result = (
    <ContentSelectorWrapper {...props}>{props.content}</ContentSelectorWrapper>
  );

  return { ...Result, value: props.content };
};
