import {
  ContentSelectorWrapper,
  type ContentSelectorWrapperProps,
} from './ContentSelectorWrapper';
import { type NodeProps } from '@intlayer/core';
import { IntlayerNode, rendererIntlayerNode } from '../IntlayerNode';

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
