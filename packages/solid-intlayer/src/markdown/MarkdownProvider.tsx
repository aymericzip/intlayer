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
  options?: any;
};

type MarkdownProviderValue = {
  renderMarkdown: (
    content: string,
    overrides?: any | RenderMarkdownOptions
  ) => JSXElement;
};

export const MarkdownContext = createContext<MarkdownProviderValue>();

export type MarkdownProviderProps = ParentProps<{
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
