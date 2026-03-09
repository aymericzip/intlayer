'use client';

import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import { useEditorLocale } from '@intlayer/editor-react';
import type { ContentNode, KeyPath, LocalesValues } from '@intlayer/types';
import type { FC, ReactNode } from 'react';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import type { HTMLComponents } from '../html/HTMLComponentTypes';
import {
  type MarkdownProviderOptions,
  useMarkdownContext,
} from './MarkdownProvider';

type MarkdownRendererPluginProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  options?: MarkdownProviderOptions;
  components?: HTMLComponents<'permissive', {}>;
};

export const MarkdownRendererPlugin: FC<MarkdownRendererPluginProps> = (
  props
): ReactNode => {
  const { dictionaryKey, keyPath, children, options, components } = props;
  const context = useMarkdownContext();
  const renderMarkdown = context?.renderMarkdown ?? ((md) => md);
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey,
    keyPath,
    children,
  });

  const contentToRender =
    typeof editedContentContext === 'string' ? editedContentContext : children;

  return renderMarkdown(contentToRender, options, {
    ...(context?.components ?? {}),
    ...(components ?? {}),
  });
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
