import { type NodeProps } from '@intlayer/core';
import { type IntlayerNode, rendererIntlayerNode } from '../IntlayerNode';
import {
  ContentSelectorWrapper,
  type ContentSelectorWrapperProps,
} from './ContentSelectorWrapper';

export type RenderIntlayerEditorProps = Omit<
  ContentSelectorWrapperProps,
  'children' | 'content'
> &
  NodeProps;

export const renderIntlayerEditor = (
  props: RenderIntlayerEditorProps
): IntlayerNode =>
  rendererIntlayerNode({
    value: props.content,
    children: (
      <ContentSelectorWrapper {...props}>
        {props.content}
      </ContentSelectorWrapper>
    ),
  });
