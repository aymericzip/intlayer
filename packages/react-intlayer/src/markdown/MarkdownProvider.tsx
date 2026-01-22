'use client';

import type { Overrides } from '@intlayer/core';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useContext,
} from 'react';
import { compiler, type MarkdownRendererOptions } from './processor';

export type MarkdownProviderOptions = {
  /** Forces the compiler to always output content with a block-level wrapper. */
  forceBlock?: boolean;
  /** Whether to preserve frontmatter in the markdown content. */
  preserveFrontmatter?: boolean;
  /** Whether to use the GitHub Tag Filter for security. */
  tagfilter?: boolean;
};

type RenderMarkdownOptions = {
  components?: Overrides;
  wrapper?: FC<any>;
  options?: MarkdownProviderOptions;
};

type MarkdownContextValue = {
  renderMarkdown: (
    markdown: string,
    components?: Overrides | RenderMarkdownOptions
  ) => ReactNode;
};

type MarkdownProviderProps = PropsWithChildren<{
  components?: Overrides;
  wrapper?: any;
  options?: MarkdownProviderOptions;
  renderMarkdown?: (
    markdown: string,
    overrides?: Overrides | RenderMarkdownOptions
  ) => ReactNode;
}>;

const MarkdownContext = createContext<MarkdownContextValue | undefined>(
  undefined
);

export const useMarkdownContext = () => useContext(MarkdownContext);

// Pure functions defined outside the component are easier for React Compiler to track
// and don't need to be recreated on every render.

const isRenderMarkdownOptions = (
  override: any
): override is RenderMarkdownOptions => {
  return (
    override &&
    typeof override === 'object' &&
    ('components' in override || 'wrapper' in override || 'options' in override)
  );
};

const mergeOptions = (
  baseOptions: MarkdownRendererOptions,
  overrides?: Overrides | RenderMarkdownOptions
): MarkdownRendererOptions => {
  if (!overrides) return baseOptions;

  if (!isRenderMarkdownOptions(overrides)) {
    // Overrides is just a component map
    return {
      ...baseOptions,
      components: { ...baseOptions.components, ...overrides },
    };
  }

  // Overrides is a full options object
  const { components, wrapper, options } = overrides;

  return {
    ...baseOptions,
    ...options,
    wrapper: wrapper || baseOptions.wrapper,
    forceWrapper: !!(wrapper || baseOptions.wrapper),
    components: { ...baseOptions.components, ...components },
  };
};

/**
 * Provider for the MarkdownRenderer component.
 *
 * It will provide the `renderMarkdown` function to the context, which can be used to render markdown.
 *
 * ```tsx
 * const content = useIntlayer('app');
 *
 * return (
 *   <div>
 *     {content.markdown} // Will be rendered with the components and options provided to the MarkdownProvider
 *   </div>
 * );
 * ```
 *
 * @example
 * ```tsx
 * <MarkdownProvider components={{ h1: CustomHeading }}>
 *   <MarkdownRenderer>
 *     {markdownContent}
 *   </MarkdownRenderer>
 * </MarkdownProvider>
 * ```
 */
export const MarkdownProvider: FC<MarkdownProviderProps> = ({
  children,
  components,
  wrapper,
  options = {},
  renderMarkdown: customRenderFn,
}) => {
  const { forceBlock, preserveFrontmatter, tagfilter } = options;

  const baseOptions: MarkdownRendererOptions = {
    components,
    forceBlock,
    wrapper,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  // Standard internal renderer
  const defaultRenderMarkdown = (
    markdown: string,
    overrides?: Overrides | RenderMarkdownOptions
  ) => {
    const mergedOptions = mergeOptions(baseOptions, overrides);
    return compiler(markdown, mergedOptions);
  };

  // Wrapper for user-provided custom renderer
  // Note: We wrap in a clean Provider to prevent infinite recursion
  const customRenderMarkdownWrapper = (
    markdown: string,
    overrides?: Overrides | RenderMarkdownOptions
  ) => (
    <MarkdownContext.Provider value={undefined}>
      {customRenderFn?.(markdown, overrides)}
    </MarkdownContext.Provider>
  );

  return (
    <MarkdownContext.Provider
      value={{
        renderMarkdown: customRenderFn
          ? customRenderMarkdownWrapper
          : defaultRenderMarkdown,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  );
};
