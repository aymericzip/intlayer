import {
  getContent,
  getContentNodeByKeyPath,
  getMarkdownMetadata,
} from '@intlayer/core';
import type { ContentNode, KeyPath, LocalesValues } from '@intlayer/types';
import type { FunctionComponent, ReactNode } from 'preact';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useMarkdownContext } from './MarkdownProvider';

type MarkdownRendererProps = {
  dictionaryKey?: string;
  keyPath?: KeyPath[];
  locale?: LocalesValues;
  children: string;
  [key: string]: any;
};

export const MarkdownRenderer: FunctionComponent<MarkdownRendererProps> = ({
  dictionaryKey,
  keyPath,
  children,
  locale,
  ...overrides
}): ReactNode => {
  const context = useMarkdownContext();
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey: dictionaryKey as string,
    keyPath: keyPath as KeyPath[],
    children,
  });

  const contentToRender =
    dictionaryKey && keyPath && typeof editedContentContext === 'string'
      ? editedContentContext
      : children;

  const result = context
    ? context.renderMarkdown(contentToRender, overrides)
    : contentToRender;

  return result as ReactNode;
};

type MarkdownMetadataRendererProps = MarkdownRendererProps & {
  metadataKeyPath: KeyPath[];
};

export const MarkdownMetadataRenderer: FunctionComponent<
  MarkdownMetadataRendererProps
> = ({ dictionaryKey, keyPath, children, metadataKeyPath }): ReactNode => {
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey: dictionaryKey as string,
    keyPath: keyPath as KeyPath[],
    children,
  });
  const metadata = getMarkdownMetadata(editedContentContext);

  const metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    metadataKeyPath
  );

  return metadataEl as ReactNode;
};
