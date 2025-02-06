import type { ReactNode } from 'react';
import {
  ContentSelectorWrapper,
  type ContentSelectorWrapperProps,
} from './ContentSelectorWrapper';
import { type NodeProps } from '@intlayer/core';

export type IntlayerNode<T = NodeProps['content']> = ReactNode & {
  value: T;
};

export type RenderIntlayerEditorProps = Omit<
  ContentSelectorWrapperProps,
  'children' | 'content'
> &
  NodeProps;

export const renderIntlayerEditor = (
  props: RenderIntlayerEditorProps
): IntlayerNode => {
  const Result = (
    <ContentSelectorWrapper {...props}>{props.content}</ContentSelectorWrapper>
  );

  return { ...Result, value: props.content };
};
