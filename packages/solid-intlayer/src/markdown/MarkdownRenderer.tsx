import { getContentNodeByKeyPath, getMarkdownMetadata } from '@intlayer/core';
import type { ContentNode, KeyPath, LocalesValues } from '@intlayer/types';
import { type Component, createMemo, type JSX } from 'solid-js';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import type { HTMLComponents } from '../html/types';
import { useMarkdown } from './MarkdownProvider';

type MarkdownRendererProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: any;
  forceBlock?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
  [key: string]: any;
};

export const MarkdownRenderer: Component<MarkdownRendererProps> = (props) => {
  const { renderMarkdown } = useMarkdown();
  const editedContentContext = createMemo(() =>
    useEditedContentRenderer({
      dictionaryKey: props.dictionaryKey,
      keyPath: props.keyPath,
      children: props.children,
    })
  );

  const contentToRender = () =>
    typeof editedContentContext() === 'string'
      ? (editedContentContext() as string)
      : props.children;

  const {
    dictionaryKey,
    keyPath,
    locale,
    children,
    components,
    wrapper,
    forceBlock,
    preserveFrontmatter,
    tagfilter,
    ...rest
  } = props;

  return renderMarkdown(contentToRender(), {
    components,
    wrapper,
    forceBlock,
    preserveFrontmatter,
    tagfilter,
    ...rest,
  });
};

type MarkdownMetadataRendererProps = MarkdownRendererProps & {
  metadataKeyPath: KeyPath[];
};

export const MarkdownMetadataRenderer: Component<
  MarkdownMetadataRendererProps
> = (props) => {
  const editedContentContext = createMemo(() =>
    useEditedContentRenderer({
      dictionaryKey: props.dictionaryKey,
      keyPath: props.keyPath,
      children: props.children,
    })
  );
  const metadata = createMemo(() =>
    getMarkdownMetadata(editedContentContext() as string)
  );

  const metadataEl = createMemo(() =>
    getContentNodeByKeyPath(metadata() as ContentNode, props.metadataKeyPath)
  );

  return metadataEl() as JSX.Element;
};
