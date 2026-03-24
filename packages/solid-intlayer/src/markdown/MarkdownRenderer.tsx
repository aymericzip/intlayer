import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  type Component,
  createMemo,
  type JSX,
  useContext,
  type ValidComponent,
} from 'solid-js';
import type { HTMLComponents } from '../html/types';
import { compileMarkdown } from './compiler';
import { MarkdownContext, useMarkdown } from './MarkdownProvider';

export type RenderMarkdownOptions = {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: ValidComponent;
  forceBlock?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
};

export const renderMarkdown = (
  content: string,
  options: RenderMarkdownOptions = {}
): JSX.Element | Promise<JSX.Element> => {
  return compileMarkdown(content, options as any);
};

export const useMarkdownRenderer = (options: RenderMarkdownOptions = {}) => {
  const context = useContext(MarkdownContext);

  return (content: string) => {
    if (context) {
      return context.renderMarkdown(
        content,
        {
          forceBlock: options.forceBlock,
          preserveFrontmatter: options.preserveFrontmatter,
          tagfilter: options.tagfilter,
        },
        options.components,
        options.wrapper
      );
    }
    return renderMarkdown(content, options);
  };
};

export type MarkdownRendererProps = RenderMarkdownOptions & {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
};

export const MarkdownRenderer = (
  props: MarkdownRendererProps
): JSX.Element | Promise<JSX.Element> => {
  const context = useContext(MarkdownContext);
  const { renderMarkdown } = useMarkdown();

  return renderMarkdown(
    props.children,
    {
      forceBlock: props.forceBlock,
      preserveFrontmatter: props.preserveFrontmatter,
      tagfilter: props.tagfilter,
    },
    {
      ...(context?.components ?? {}),
      ...(props.components ?? {}),
    },
    props.wrapper
  );
};

export type MarkdownMetadataRendererProps = MarkdownRendererProps & {
  metadataKeyPath: KeyPath[];
};

export const MarkdownMetadataRenderer: Component<
  MarkdownMetadataRendererProps
> = (props) => {
  const metadata = createMemo(() =>
    getMarkdownMetadata(props.children as string)
  );

  const metadataEl = createMemo(() =>
    getContentNodeByKeyPath(metadata() as ContentNode, props.metadataKeyPath)
  );

  return metadataEl() as JSX.Element;
};
