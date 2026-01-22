import type { Overrides } from '@intlayer/core';
import {
  type ComponentChildren,
  createContext,
  type FunctionComponent,
} from 'preact';
import { useContext } from 'preact/hooks';
import { compileMarkdown } from './compiler';

type PropsWithChildren<P = {}> = P & { children?: ComponentChildren };

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
  ) => ComponentChildren;
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
  renderMarkdown?: (
    markdown: string,
    overrides?: Overrides
  ) => ComponentChildren;
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

  const finalRenderMarkdown = renderMarkdown
    ? (
        markdown: string,
        componentsOverride?: Overrides | RenderMarkdownOptions
      ) => (
        <MarkdownContext.Provider value={undefined}>
          {renderMarkdown(markdown, componentsOverride)}
        </MarkdownContext.Provider>
      )
    : (
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

        return compileMarkdown(markdown, {
          ...internalOptions,
          ...mergedOptions,
          wrapper: localWrapper || wrapper || internalOptions.wrapper,
          forceWrapper: !!(localWrapper || wrapper),
          components: {
            ...internalOptions.components,
            ...localComponents,
          },
        }) as ComponentChildren;
      };

  return (
    <MarkdownContext.Provider value={{ renderMarkdown: finalRenderMarkdown }}>
      {children}
    </MarkdownContext.Provider>
  );
};
