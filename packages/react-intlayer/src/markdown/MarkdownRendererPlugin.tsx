'use client';

import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import { useEditorLocale } from '@intlayer/editor-react';
import type { ContentNode, KeyPath, LocalesValues } from '@intlayer/types';
import type { FC, ReactNode } from 'react';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useMarkdownContext } from './MarkdownProvider';

type MarkdownRendererPluginProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  [key: string]: any;
};

export const MarkdownRendererPlugin: FC<MarkdownRendererPluginProps> = (
  props
): ReactNode => {
  const { dictionaryKey, keyPath, children, locale, ...components } = props;
  const context = useMarkdownContext();
  const renderMarkdown = context?.renderMarkdown ?? ((md) => md);
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey,
    keyPath,
    children,
  });

  const contentToRender =
    typeof editedContentContext === 'string' ? editedContentContext : children;

  return renderMarkdown(contentToRender, components);
};

type MarkdownMetadataRendererProps = MarkdownRendererPluginProps & {
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
  const currentLocale = useEditorLocale();

  const metadata = getMarkdownMetadata(editedContentContext);

  const metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    metadataKeyPath,
    currentLocale
  );

  return metadataEl as ReactNode;
};
