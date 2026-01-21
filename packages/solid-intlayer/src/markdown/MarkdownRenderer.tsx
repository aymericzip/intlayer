import {
  getContent,
  getContentNodeByKeyPath,
  getMarkdownMetadata,
} from '@intlayer/core';
import type { ContentNode, KeyPath, LocalesValues } from '@intlayer/types';
import type { Component, JSX } from 'solid-js';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useMarkdown } from './MarkdownProvider';

type MarkdownRendererProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  [key: string]: any;
};

export const MarkdownRenderer: Component<MarkdownRendererProps> = (props) => {
  const { renderMarkdown } = useMarkdown();
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey: props.dictionaryKey,
    keyPath: props.keyPath,
    children: props.children,
  });

  const contentToRender =
    typeof editedContentContext === 'string'
      ? editedContentContext
      : props.children;

  const { dictionaryKey, keyPath, locale, children, ...overrides } = props;

  return renderMarkdown(contentToRender, overrides);
};

type MarkdownMetadataRendererProps = MarkdownRendererProps & {
  metadataKeyPath: KeyPath[];
};

export const MarkdownMetadataRenderer: Component<
  MarkdownMetadataRendererProps
> = (props) => {
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey: props.dictionaryKey,
    keyPath: props.keyPath,
    children: props.children,
  });
  const metadata = getMarkdownMetadata(editedContentContext);

  const metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    props.metadataKeyPath
  );

  return metadataEl as JSX.Element;
};
