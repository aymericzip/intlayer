import { getContext, setContext } from 'svelte';
import type { HTMLComponents } from '../html/types';
import { compileMarkdown } from './compiler';

export const MARKDOWN_CONTEXT_KEY = Symbol('INTLAYER_MARKDOWN_CONTEXT');

export type RenderMarkdownOptions = {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: any;
  forceBlock?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
};

export interface MarkdownContext {
  renderMarkdown: (
    markdown: string,
    overrides?: HTMLComponents<'permissive', {}> | RenderMarkdownOptions
  ) => string;
}

export const getMarkdownContext = (): MarkdownContext => {
  return (
    getContext<MarkdownContext>(MARKDOWN_CONTEXT_KEY) || {
      renderMarkdown: (md, overrides) => compileMarkdown(md, overrides),
    }
  );
};

export const setMarkdownContext = (context: MarkdownContext) => {
  setContext(MARKDOWN_CONTEXT_KEY, context);
};
