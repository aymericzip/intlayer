import { getContext, setContext } from 'svelte';
import type { HTMLComponents } from './types';

const INTLAYER_HTML_CONTEXT_KEY = Symbol('intlayer-html-context');

export type RenderHTMLOptions = {
  components?: HTMLComponents<'permissive', {}>;
};

export type HTMLContextValue = {
  renderHTML: (
    html: string,
    overrides?: HTMLComponents<'permissive', {}> | RenderHTMLOptions
  ) => string;
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
