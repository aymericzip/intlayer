'use client';

import type { FC, ReactNode } from 'react';
import { useMarkdownContext } from './MarkdownProvider';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import {
  ContentNode,
  getContentNodeByKeyPath,
  getMarkdownMetadata,
  KeyPath,
} from '@intlayer/core';

type MarkdownRendererProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  children: string;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  dictionaryKey,
  keyPath,
  children,
}): ReactNode => {
  const { renderMarkdown } = useMarkdownContext();
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey,
    keyPath,
    children,
  });

  return renderMarkdown(editedContentContext);
};

type MarkdownMetadataRendererProps = MarkdownRendererProps & {
  metadataKeyPath: KeyPath[];
};

export const MarkdownMetadataRenderer: FC<MarkdownMetadataRendererProps> = ({
  dictionaryKey,
  keyPath,
  children,
  metadataKeyPath,
}): ReactNode => {
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey,
    keyPath,
    children,
  });
  const metadata = getMarkdownMetadata(editedContentContext);

  const metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    metadataKeyPath
  );

  return metadataEl as ReactNode;
};
