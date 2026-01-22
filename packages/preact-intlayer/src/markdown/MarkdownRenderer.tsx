import type { Overrides } from '@intlayer/core';
import type { ComponentChildren, FunctionComponent, JSX } from 'preact';
import { compileMarkdown, type MarkdownCompilerOptions } from './compiler';
import {
  type MarkdownProviderOptions,
  useMarkdownContext,
} from './MarkdownProvider';

export type RenderMarkdownProps = {
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
  /**
   * Markdown processor options.
   * Only used if not wrapped in a MarkdownProvider.
   */
  options?: MarkdownProviderOptions;
};

export const renderMarkdown = (
  content: string,
  { components, wrapper, options = {} }: RenderMarkdownProps = {}
): JSX.Element => {
  const { forceBlock, preserveFrontmatter, tagfilter } = options;

  // Map public options to internal processor options
  const internalOptions: MarkdownCompilerOptions = {
    components,
    forceBlock,
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
  options = {},
}: RenderMarkdownProps = {}) => {
  const context = useMarkdownContext();

  return (content: string) => {
    if (context) {
      return context.renderMarkdown(content, { components, wrapper, options });
    }

    return renderMarkdown(content, { components, wrapper, options });
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
      options?: MarkdownProviderOptions;
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
  options = {},
  renderMarkdown: customRenderMarkdown,
}) => {
  const context = useMarkdownContext();

  if (customRenderMarkdown) {
    return (
      <>{customRenderMarkdown(children, { components, wrapper, options })}</>
    );
  }

  if (context) {
    return (
      <>{context.renderMarkdown(children, { components, wrapper, options })}</>
    );
  }

  return renderMarkdown(children, { components, wrapper, options });
};
