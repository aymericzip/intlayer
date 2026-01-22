import { getContext, setContext } from 'svelte';

const INTLAYER_HTML_CONTEXT_KEY = Symbol('intlayer-html-context');

export type RenderHTMLOptions = {
  components?: Record<string, any>;
};

export type HTMLContextValue = {
  renderHTML: (html: string, overrides?: any) => string;
};

export const setHTMLContext = (value: HTMLContextValue) => {
  setContext(INTLAYER_HTML_CONTEXT_KEY, value);
};

export const getHTMLContext = (): HTMLContextValue => {
  const context = getContext<HTMLContextValue>(INTLAYER_HTML_CONTEXT_KEY);

  return (
    context || {
      renderHTML: (html) => html,
    }
  );
};
