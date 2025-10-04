import {
  type Component,
  createContext,
  type JSXElement,
  type ParentProps,
  useContext,
} from 'solid-js';

type MarkdownProviderValue = {
  renderMarkdown: (content: string) => JSXElement;
};

export const MarkdownContext = createContext<MarkdownProviderValue>();

export type MarkdownProviderProps = ParentProps<{
  renderMarkdown?: (content: string) => JSXElement;
}>;

export const MarkdownProvider: Component<MarkdownProviderProps> = (props) => {
  const defaultRenderMarkdown = (content: string) => content; // Default implementation

  return (
    <MarkdownContext.Provider
      value={{
        renderMarkdown: props.renderMarkdown ?? defaultRenderMarkdown,
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
