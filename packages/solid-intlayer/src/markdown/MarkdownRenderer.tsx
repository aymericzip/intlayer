'use client';

import { LocalesValues } from '@intlayer/config/client';
import {
  ContentNode,
  getContent,
  getContentNodeByKeyPath,
  getMarkdownMetadata,
  KeyPath,
} from '@intlayer/core';
import type { Component, JSX } from 'solid-js';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useMarkdown } from './MarkdownProvider';

type MarkdownRendererProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
};

export const MarkdownRenderer: Component<MarkdownRendererProps> = (props) => {
  const { renderMarkdown } = useMarkdown();
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey: props.dictionaryKey,
    keyPath: props.keyPath,
    children: props.children,
  });

  if (typeof editedContentContext !== 'string') {
    const transformedEditedContent = getContent(
      editedContentContext,
      {
        dictionaryKey: props.dictionaryKey,
        keyPath: props.keyPath,
      },
      props.locale
    );

    if (typeof transformedEditedContent !== 'string') {
      console.error(
        `Incorrect Markdown content. Edited Markdown content type: ${typeof transformedEditedContent}. Expected string. Value ${JSON.stringify(transformedEditedContent)}`
      );

      return renderMarkdown(props.children);
    }

    return renderMarkdown(transformedEditedContent);
  }

  return renderMarkdown(editedContentContext);
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
