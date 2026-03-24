import {
  type ComponentChildren,
  type ComponentType,
  createContext,
  type FunctionComponent,
  type JSX,
} from 'preact';
import { useContext } from 'preact/hooks';
import type { HTMLComponents } from '../html/types';
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
   * Forces the compiler to always output content with an inline wrapper.
   */
  forceInline?: boolean;
  /**
   * Whether to preserve frontmatter in the markdown content.
   */
  preserveFrontmatter?: boolean;
  /**
   * Whether to use the GitHub Tag Filter.
   */
  tagfilter?: boolean;
};

type RenderMarkdownOptions = MarkdownProviderOptions & {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: ComponentType<any> | keyof JSX.IntrinsicElements;
  forceWrapper?: boolean;
};

type MarkdownContextValue = {
  components?: HTMLComponents<'permissive', {}>;
  renderMarkdown: (
    markdown: string,
    options?: MarkdownProviderOptions,
    components?: HTMLComponents<'permissive', {}>,
    wrapper?: ComponentType<any> | keyof JSX.IntrinsicElements
  ) => ComponentChildren | Promise<ComponentChildren>;
};

type MarkdownProviderProps = PropsWithChildren<
  MarkdownProviderOptions & {
    /**
     * Component overrides for HTML tags.
     */
    components?: HTMLComponents<'permissive', {}>;
    /**
     * Wrapper element or component to be used when there are multiple children.
     */
    wrapper?: ComponentType<any> | keyof JSX.IntrinsicElements;
    /**
     * Custom render function for markdown.
     * If provided, it will overwrite all rules and default rendering.
     */
    renderMarkdown?: (
      markdown: string,
      options?: MarkdownProviderOptions,
      components?: HTMLComponents<'permissive', {}>,
      wrapper?: ComponentType<any> | keyof JSX.IntrinsicElements
    ) => ComponentChildren | Promise<ComponentChildren>;
  }
>;

const MarkdownContext = createContext<MarkdownContextValue | undefined>(
  undefined
);

export const useMarkdownContext = () => useContext(MarkdownContext);

const mergeOptions = (
  baseComponents: HTMLComponents<'permissive', {}> | undefined,
  baseOptions: Omit<RenderMarkdownOptions, 'components'>,
  options: MarkdownProviderOptions = {},
  components: HTMLComponents<'permissive', {}> = {},
  wrapper?: ComponentType<any> | keyof JSX.IntrinsicElements
): RenderMarkdownOptions => {
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
    components: { ...baseComponents, ...components },
  };
};

export const MarkdownProvider: FunctionComponent<MarkdownProviderProps> = ({
  children,
  components,
  wrapper,
  forceBlock,
  forceInline,
  preserveFrontmatter,
  tagfilter,
  renderMarkdown: customRenderFn,
}) => {
  const baseOptions: Omit<RenderMarkdownOptions, 'components'> = {
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
    componentsOverride?: HTMLComponents<'permissive', {}>,
    wrapperOverride?: ComponentType<any> | keyof JSX.IntrinsicElements
  ): ComponentChildren => {
    const mergedOptions = mergeOptions(
      components,
      baseOptions,
      options,
      componentsOverride ?? {},
      wrapperOverride
    );
    return compileMarkdown(markdown, mergedOptions) as ComponentChildren;
  };

  // Wrapper for user-provided custom renderer
  // Note: We wrap in a clean Provider to prevent infinite recursion
  const customRenderMarkdownWrapper = (
    markdown: string,
    options?: MarkdownProviderOptions,
    componentsOverride?: HTMLComponents<'permissive', {}>,
    wrapperOverride?: ComponentType<any> | keyof JSX.IntrinsicElements
  ): ComponentChildren => (
    <MarkdownContext.Provider value={undefined}>
      {customRenderFn?.(markdown, options, componentsOverride, wrapperOverride)}
    </MarkdownContext.Provider>
  );

  return (
    <MarkdownContext.Provider
      value={{
        components,
        renderMarkdown: customRenderFn
          ? customRenderMarkdownWrapper
          : defaultRenderMarkdown,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  );
};
