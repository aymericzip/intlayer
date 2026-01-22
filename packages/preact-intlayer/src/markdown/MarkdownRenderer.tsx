import type { Overrides } from '@intlayer/core';
import type { ComponentChildren, FunctionComponent, JSX } from 'preact';
import { compileMarkdown, type MarkdownCompilerOptions } from './compiler';
import {
  type MarkdownProviderOptions,
  useMarkdownContext,
} from './MarkdownProvider';

export type RenderMarkdownProps = MarkdownProviderOptions & {
  /**
   * Component overrides for HTML tags.
   * Only used if not wrapped in a MarkdownProvider.
   */
  components?: Overrides;
  /**
   * Wrapper element or component to be used when there are multiple children.
   * Only used if not wrapped in a MarkdownProvider.
   */
  wrapper?: FunctionComponent<any>;
};

export const renderMarkdown = (
  content: string,
  {
    components,
    wrapper,
    forceBlock,
    forceInline,
    preserveFrontmatter,
    tagfilter,
  }: RenderMarkdownProps = {}
): JSX.Element => {
  // Map public options to internal processor options
  const internalOptions: MarkdownCompilerOptions = {
    components,
    forceBlock,
    forceInline,
    wrapper: wrapper as any,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  return compileMarkdown(content, internalOptions) as JSX.Element;
};

export const useMarkdownRenderer = ({
  components,
  wrapper,
  forceBlock,
  forceInline,
  preserveFrontmatter,
  tagfilter,
}: RenderMarkdownProps = {}) => {
  const context = useMarkdownContext();

  return (content: string) => {
    if (context) {
      return context.renderMarkdown(content, {
        components,
        wrapper,
        forceBlock,
        forceInline,
        preserveFrontmatter,
        tagfilter,
      });
    }

    return renderMarkdown(content, {
      components,
      wrapper,
      forceBlock,
      forceInline,
      preserveFrontmatter,
      tagfilter,
    });
  };
};

type MarkdownRendererProps = RenderMarkdownProps & {
  /**
   * The markdown content to render.
   */
  children: string;
  /**
   * Custom render function for markdown.
   * If provided, it will overwrite context and default rendering.
   */
  renderMarkdown?: (
    markdown: string,
    options?: {
      components?: Overrides;
      wrapper?: FunctionComponent<any>;
      forceBlock?: boolean;
      forceInline?: boolean;
      preserveFrontmatter?: boolean;
      tagfilter?: boolean;
    }
  ) => ComponentChildren;
};

/**
 * Preact component that renders markdown to JSX.
 *
 * It uses the renderMarkdown function from the MarkdownProvider context if available.
 * Otherwise, it falls back to the default compiler with provided components and options.
 */
export const MarkdownRenderer: FunctionComponent<MarkdownRendererProps> = ({
  children = '',
  components,
  wrapper,
  forceBlock,
  forceInline,
  preserveFrontmatter,
  tagfilter,
  renderMarkdown: customRenderMarkdown,
}) => {
  const context = useMarkdownContext();

  if (customRenderMarkdown) {
    return (
      <>
        {customRenderMarkdown(children, {
          components,
          wrapper,
          forceBlock,
          forceInline,
          preserveFrontmatter,
          tagfilter,
        })}
      </>
    );
  }

  if (context) {
    return (
      <>
        {context.renderMarkdown(children, {
          components,
          wrapper,
          forceBlock,
          forceInline,
          preserveFrontmatter,
          tagfilter,
        })}
      </>
    );
  }

  return renderMarkdown(children, {
    components,
    wrapper,
    forceBlock,
    forceInline,
    preserveFrontmatter,
    tagfilter,
  });
};
