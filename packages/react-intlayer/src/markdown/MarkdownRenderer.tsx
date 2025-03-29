'use client';

import { LocalesValues } from '@intlayer/config/client';
import {
  ContentNode,
  getContent,
  getContentNodeByKeyPath,
  getMarkdownMetadata,
  KeyPath,
} from '@intlayer/core';
import type { FC, ReactNode } from 'react';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useMarkdownContext } from './MarkdownProvider';

type MarkdownRendererProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  dictionaryKey,
  keyPath,
  children,
  locale,
}): ReactNode => {
  const { renderMarkdown } = useMarkdownContext();
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey,
    keyPath,
    children,
  });

  if (typeof editedContentContext !== 'string') {
    const transformedEditedContent = getContent(
      editedContentContext,
      {
        dictionaryKey,
        keyPath,
      },
      locale
    );

    if (typeof transformedEditedContent !== 'string') {
      console.error(
        `Incorrect Markdown content. Edited Markdown content type: ${typeof transformedEditedContent}. Expected string. Value ${JSON.stringify(transformedEditedContent)}`
      );

      return renderMarkdown(children);
    }

    return renderMarkdown(transformedEditedContent);
  }

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
