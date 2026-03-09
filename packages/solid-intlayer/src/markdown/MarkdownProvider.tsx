import {
  type Component,
  createContext,
  type JSXElement,
  type ParentProps,
  useContext,
} from 'solid-js';
import type { HTMLComponents } from '../html/types';
import { compileMarkdown } from './compiler';

export type MarkdownProviderOptions = {
  /** Forces the compiler to always output content with a block-level wrapper. */
  forceBlock?: boolean;
  /** Whether to preserve frontmatter in the markdown content. */
  preserveFrontmatter?: boolean;
  /** Whether to use the GitHub Tag Filter. */
  tagfilter?: boolean;
};

type RenderMarkdownOptions = MarkdownProviderOptions & {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: any;
};

type MarkdownProviderValue = {
  components?: HTMLComponents<'permissive', {}>;
  renderMarkdown: (
    content: string,
    options?: MarkdownProviderOptions,
    components?: HTMLComponents<'permissive', {}>,
    wrapper?: any
  ) => JSXElement;
};

export const MarkdownContext = createContext<MarkdownProviderValue>();

export type MarkdownProviderProps = ParentProps<{
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: any;
  forceBlock?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
  renderMarkdown?: (
    content: string,
    options?: MarkdownProviderOptions,
    components?: HTMLComponents<'permissive', {}>,
    wrapper?: any
  ) => JSXElement;
}>;

export const MarkdownProvider: Component<MarkdownProviderProps> = (props) => {
  const defaultRenderMarkdown = (
    content: string,
    options?: MarkdownProviderOptions,
    componentsOverride?: HTMLComponents<'permissive', {}>,
    wrapperOverride?: any
  ): JSXElement => {
    if (props.renderMarkdown) {
      return props.renderMarkdown(
        content,
        options,
        componentsOverride,
        wrapperOverride
      );
    }

    const mergedOptions: RenderMarkdownOptions = {
      forceBlock: options?.forceBlock ?? props.forceBlock,
      preserveFrontmatter:
        options?.preserveFrontmatter ?? props.preserveFrontmatter,
      tagfilter: options?.tagfilter ?? props.tagfilter,
      wrapper: wrapperOverride || props.wrapper,
      forceWrapper: !!(wrapperOverride || props.wrapper),
      components: {
        ...props.components,
        ...(componentsOverride ?? {}),
      },
    };

    return compileMarkdown(content, mergedOptions);
  };

  return (
    <MarkdownContext.Provider
      value={{
        components: props.components,
        renderMarkdown: defaultRenderMarkdown,
      }}
    >
      {props.children}
    </MarkdownContext.Provider>
  );
};

export const useMarkdown = () => {
  const context = useContext(MarkdownContext);

  if (!context) {
    throw new Error(
      'useMarkdown must be used within a MarkdownProvider. To fix this error, wrap your component with <MarkdownProvider>.'
    );
  }

  return context;
};
