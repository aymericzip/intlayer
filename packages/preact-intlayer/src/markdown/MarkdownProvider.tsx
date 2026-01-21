import type { Overrides } from '@intlayer/core';
import {
  createContext,
  type FunctionComponent,
  type PropsWithChildren,
  type ReactNode,
} from 'preact';
import { useContext } from 'preact/hooks';
import { compileMarkdown } from './compiler';

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

type RenderMarkdownOptions = {
  components?: Overrides;
  wrapper?: any;
  options?: MarkdownProviderOptions;
};

type MarkdownContextValue = {
  renderMarkdown: (
    markdown: string,
    overrides?: Overrides | RenderMarkdownOptions
  ) => ReactNode;
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

export const MarkdownProvider: FunctionComponent<MarkdownProviderProps> = ({
  children,
  components,
  wrapper,
  options = {},
  renderMarkdown,
}) => {
  const { forceBlock, preserveFrontmatter, tagfilter } = options;

  // Map public options to internal processor options
  const internalOptions: any = {
    components,
    forceBlock,
    wrapper,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  const finalRenderMarkdown =
    renderMarkdown ||
    ((markdown: string, overrides?: Overrides | RenderMarkdownOptions) => {
      const isOptionsObject =
        overrides &&
        (typeof (overrides as RenderMarkdownOptions).components === 'object' ||
          typeof (overrides as RenderMarkdownOptions).wrapper === 'function' ||
          typeof (overrides as RenderMarkdownOptions).options === 'object');

      const localComponents = isOptionsObject
        ? (overrides as RenderMarkdownOptions).components
        : (overrides as Overrides);
      const localWrapper = isOptionsObject
        ? (overrides as RenderMarkdownOptions).wrapper
        : undefined;
      const localOptions = isOptionsObject
        ? (overrides as RenderMarkdownOptions).options
        : {};

      const mergedOptions = {
        ...options,
        ...localOptions,
      };

      return compileMarkdown(markdown, {
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
