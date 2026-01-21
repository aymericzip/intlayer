'use client';

import type { Overrides } from '@intlayer/core';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useContext,
} from 'react';
import { compiler, type MarkdownProcessorOptions } from './processor';

type RenderMarkdownOptions = {
  components?: Overrides;
  wrapper?: FC;
  options?: MarkdownProviderOptions;
};

type MarkdownContextValue = {
  renderMarkdown: (
    markdown: string,
    components?: Overrides | RenderMarkdownOptions
  ) => ReactNode;
};

/**
 * Refined options for the MarkdownProvider.
 */
export type MarkdownProviderOptions = {
  /**
   * Forces the compiler to always output content with a block-level wrapper.
   */
  forceBlock?: boolean;
  /**
   * Whether to preserve frontmatter in the markdown content.
   */
  preserveFrontmatter?: boolean;
  /**
   * Whether to use the GitHub Tag Filter.
   */
  tagfilter?: boolean;
};

type MarkdownProviderProps = PropsWithChildren<{
  /**
   * Component overrides for HTML tags.
   */
  components?: Overrides;
  /**
   * Wrapper element or component to be used when there are multiple children.
   */
  wrapper?: any;
  /**
   * Markdown processor options.
   */
  options?: MarkdownProviderOptions;
  /**
   * Custom render function for markdown.
   * If provided, it will overwrite all rules and default rendering.
   */
  renderMarkdown?: (markdown: string, overrides?: Overrides) => ReactNode;
}>;

const MarkdownContext = createContext<MarkdownContextValue | undefined>(
  undefined
);

export const useMarkdownContext = () => useContext(MarkdownContext);

export const MarkdownProvider: FC<MarkdownProviderProps> = ({
  children,
  components,
  wrapper,
  options = {},
  renderMarkdown,
}) => {
  const { forceBlock, preserveFrontmatter, tagfilter } = options;

  // Map public options to internal processor options
  const internalOptions: MarkdownProcessorOptions = {
    components,
    forceBlock,
    wrapper,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  const finalRenderMarkdown =
    renderMarkdown ||
    ((
      markdown: string,
      componentsOverride?: Overrides | RenderMarkdownOptions
    ) => {
      const isOptionsObject =
        componentsOverride &&
        (typeof (componentsOverride as RenderMarkdownOptions).components ===
          'object' ||
          typeof (componentsOverride as RenderMarkdownOptions).wrapper ===
            'function' ||
          typeof (componentsOverride as RenderMarkdownOptions).options ===
            'object');

      const localComponents = isOptionsObject
        ? (componentsOverride as RenderMarkdownOptions).components
        : (componentsOverride as Overrides);
      const localWrapper = isOptionsObject
        ? (componentsOverride as RenderMarkdownOptions).wrapper
        : undefined;
      const localOptions = isOptionsObject
        ? (componentsOverride as RenderMarkdownOptions).options
        : {};

      const mergedOptions = {
        ...options,
        ...localOptions,
      };

      return compiler(markdown, {
        ...internalOptions,
        ...mergedOptions,
        wrapper: localWrapper || wrapper || internalOptions.wrapper,
        forceWrapper: !!(localWrapper || wrapper),
        components: {
          ...internalOptions.components,
          ...localComponents,
        },
      });
    });

  return (
    <MarkdownContext.Provider value={{ renderMarkdown: finalRenderMarkdown }}>
      {children}
    </MarkdownContext.Provider>
  );
};
