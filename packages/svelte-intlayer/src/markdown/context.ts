import { getContext, setContext } from 'svelte';

export const MARKDOWN_CONTEXT_KEY = Symbol('INTLAYER_MARKDOWN_CONTEXT');

export interface MarkdownContext {
  renderMarkdown: (markdown: string) => string;
}

export const getMarkdownContext = (): MarkdownContext => {
  return (
    getContext<MarkdownContext>(MARKDOWN_CONTEXT_KEY) || {
      renderMarkdown: (md) => md,
    }
  );
};

export const setMarkdownContext = (context: MarkdownContext) => {
  setContext(MARKDOWN_CONTEXT_KEY, context);
};
