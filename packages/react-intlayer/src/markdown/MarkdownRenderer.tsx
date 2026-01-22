import type { Overrides } from '@intlayer/core';
import type { FC } from 'react';
import {
  type MarkdownProviderOptions,
  useMarkdownContext,
} from './MarkdownProvider';
import { compiler, type MarkdownRendererOptions } from './processor';

type MarkdownRendererProps = {
  /**
   * The markdown content to render.
   */
  children: string;
  /**
   * Component overrides for HTML tags.
   * Only used if not wrapped in a MarkdownProvider.
   */
  components?: Overrides;
  /**
   * Wrapper element or component to be used when there are multiple children.
   * Only used if not wrapped in a MarkdownProvider.
   */
  wrapper?: FC;
  /**
   * Markdown processor options.
   * Only used if not wrapped in a MarkdownProvider.
   */
  options?: MarkdownProviderOptions;
};

/**
 * React component that renders markdown to JSX.
 *
 * It uses the renderMarkdown function from the MarkdownProvider context if available.
 * Otherwise, it falls back to the default compiler with provided components and options.
 */
export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children = '',
  components,
  wrapper,
  options = {},
}) => {
  const context = useMarkdownContext();

  if (context) {
    return (
      <>{context.renderMarkdown(children, { components, wrapper, options })}</>
    );
  }

  const { forceBlock, preserveFrontmatter, tagfilter } = options;

  // Map public options to internal processor options
  const internalOptions: MarkdownRendererOptions = {
    components,
    forceBlock,
    wrapper,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  return <>{compiler(children, internalOptions)}</>;
};
