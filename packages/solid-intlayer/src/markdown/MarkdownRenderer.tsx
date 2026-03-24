import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  type Component,
  createMemo,
  createResource,
  type JSX,
  Suspense,
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
): Promise<JSX.Element> => {
  return compileMarkdown(content, options as any);
};

export const useMarkdownRenderer = (options: RenderMarkdownOptions = {}) => {
  const context = useContext(MarkdownContext);

  return (content: string): Promise<JSX.Element> => {
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

export const MarkdownRenderer = (props: MarkdownRendererProps): JSX.Element => {
  const context = useContext(MarkdownContext);
  const { renderMarkdown } = useMarkdown();

  const [rendered] = createResource(
    () =>
      [
        props.children,
        props.forceBlock,
        props.preserveFrontmatter,
        props.tagfilter,
        props.components,
        props.wrapper,
      ] as const,
    ([
      content,
      forceBlock,
      preserveFrontmatter,
      tagfilter,
      components,
      wrapper,
    ]) =>
      renderMarkdown(
        content,
        { forceBlock, preserveFrontmatter, tagfilter },
        { ...(context?.components ?? {}), ...(components ?? {}) },
        wrapper
      )
  );

  return <Suspense fallback={null}>{rendered()}</Suspense>;
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
