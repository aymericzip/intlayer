import {
  type Component,
  createContext,
  type JSXElement,
  type ParentProps,
  useContext,
} from 'solid-js';

type RenderMarkdownOptions = {
  components?: any;
  wrapper?: any;
  forceBlock?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
};

type MarkdownProviderValue = {
  renderMarkdown: (
    content: string,
    overrides?: any | RenderMarkdownOptions
  ) => JSXElement;
};

export const MarkdownContext = createContext<MarkdownProviderValue>();

export type MarkdownProviderProps = ParentProps<{
  components?: any;
  wrapper?: any;
  forceBlock?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
  renderMarkdown?: (
    content: string,
    overrides?: any | RenderMarkdownOptions
  ) => JSXElement;
}>;

export const MarkdownProvider: Component<MarkdownProviderProps> = (props) => {
  const defaultRenderMarkdown = (content: string, overrides?: any) => {
    // If props.renderMarkdown is provided, it handles the logic
    if (props.renderMarkdown) {
      return props.renderMarkdown(content, overrides);
    }

    const isOptionsObject =
      overrides &&
      typeof overrides === 'object' &&
      ('components' in overrides ||
        'wrapper' in overrides ||
        'forceBlock' in overrides ||
        'preserveFrontmatter' in overrides ||
        'tagfilter' in overrides);

    const {
      components: overrideComponents,
      wrapper: localWrapper,
      forceBlock: localForceBlock,
      preserveFrontmatter: localPreserveFrontmatter,
      tagfilter: localTagfilter,
      ...componentsFromRest
    } = isOptionsObject ? overrides : { components: overrides };

    const actualComponents = overrideComponents || componentsFromRest;

    const mergedOptions = {
      forceBlock: localForceBlock ?? props.forceBlock,
      preserveFrontmatter:
        localPreserveFrontmatter ?? props.preserveFrontmatter,
      tagfilter: localTagfilter ?? props.tagfilter,
      wrapper: localWrapper || props.wrapper,
      components: {
        ...props.components,
        ...actualComponents,
      },
    };

    // Note: In solid-intlayer, we need a compiler that returns JSX elements.
    // If it's missing, we just return content.
    // Assuming there is a compiler available or it's handled by props.renderMarkdown
    return content;
  };

  return (
    <MarkdownContext.Provider
      value={{
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
