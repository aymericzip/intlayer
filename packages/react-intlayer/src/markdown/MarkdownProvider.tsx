'use client';

import {
  createContext,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useContext,
} from 'react';
import type { HTMLComponents } from '../html/HTMLComponentTypes';
import { compiler, type MarkdownRendererOptions } from './processor';

export type MarkdownProviderOptions = {
  /** Forces the compiler to always output content with a block-level wrapper. */
  forceBlock?: boolean;
  /** Forces the compiler to always output content with an inline wrapper. */
  forceInline?: boolean;
  /** Whether to preserve frontmatter in the markdown content. */
  preserveFrontmatter?: boolean;
  /** Whether to use the GitHub Tag Filter for security. */
  tagfilter?: boolean;
};

type MarkdownContextValue = {
  renderMarkdown: (
    markdown: string,
    options?: MarkdownProviderOptions,
    components?: HTMLComponents<'permissive', {}>,
    wrapper?: FC<HTMLAttributes<HTMLElement>>
  ) => ReactNode;
};

type MarkdownProviderProps = PropsWithChildren<
  MarkdownProviderOptions & {
    components?: HTMLComponents<'permissive', {}>;
    wrapper?: FC<HTMLAttributes<HTMLElement>>;
    renderMarkdown?: (
      markdown: string,
      options?: MarkdownProviderOptions,
      components?: HTMLComponents<'permissive', {}>,
      wrapper?: FC<HTMLAttributes<HTMLElement>>
    ) => ReactNode;
  }
>;

const MarkdownContext = createContext<MarkdownContextValue | undefined>(
  undefined
);

export const useMarkdownContext = () => useContext(MarkdownContext);

const mergeOptions = (
  baseOptions: MarkdownRendererOptions,
  options: MarkdownProviderOptions = {},
  components: HTMLComponents<'permissive', {}> = {},
  wrapper?: FC<HTMLAttributes<HTMLElement>>
): MarkdownRendererOptions => {
  return {
    ...baseOptions,
    ...options,
    forceBlock: options.forceBlock ?? baseOptions.forceBlock,
    forceInline: options.forceInline ?? baseOptions.forceInline,
    preserveFrontmatter:
      options.preserveFrontmatter ?? baseOptions.preserveFrontmatter,
    tagfilter: options.tagfilter ?? baseOptions.tagfilter,
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
  forceBlock,
  forceInline,
  preserveFrontmatter,
  tagfilter,
  renderMarkdown: customRenderFn,
}) => {
  const baseOptions: MarkdownRendererOptions = {
    components,
    forceBlock,
    forceInline,
    wrapper,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  // Standard internal renderer
  const defaultRenderMarkdown = (
    markdown: string,
    options?: MarkdownProviderOptions,
    components?: HTMLComponents<'permissive', {}>,
    wrapper?: FC<HTMLAttributes<HTMLElement>>
  ) => {
    const mergedOptions = mergeOptions(
      baseOptions,
      options,
      components,
      wrapper
    );

    return compiler(markdown, mergedOptions);
  };

  // Wrapper for user-provided custom renderer
  // Note: We wrap in a clean Provider to prevent infinite recursion
  const customRenderMarkdownWrapper = (
    markdown: string,
    options?: MarkdownProviderOptions,
    components?: HTMLComponents<'permissive', {}>,
    wrapper?: FC<HTMLAttributes<HTMLElement>>
  ) => (
    <MarkdownContext.Provider value={undefined}>
      {customRenderFn?.(markdown, options, components, wrapper)}
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
