import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type { ContentNode, KeyPath, LocalesValues } from '@intlayer/types';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useLocale } from '../client/useLocale';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useMarkdownContext } from './MarkdownProvider';

type MarkdownRendererPluginProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  [key: string]: any;
};

export const MarkdownRendererPlugin: FunctionComponent<
  MarkdownRendererPluginProps
> = (props) => {
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

  return renderMarkdown(contentToRender, components) as ComponentChildren;
};

type MarkdownMetadataRendererProps = MarkdownRendererPluginProps & {
  metadataKeyPath: KeyPath[];
};

export const MarkdownMetadataRenderer: FunctionComponent<
  MarkdownMetadataRendererProps
> = ({ dictionaryKey, keyPath, children, metadataKeyPath }) => {
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey,
    keyPath,
    children,
  });
  const { locale: currentLocale } = useLocale();

  const metadata = getMarkdownMetadata(editedContentContext as string);

  const metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    metadataKeyPath,
    currentLocale as any
  );

  return metadataEl as ComponentChildren;
};
