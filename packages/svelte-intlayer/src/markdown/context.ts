import { getContext, setContext } from 'svelte';
import type { HTMLComponents } from '../html/types';
import { compileMarkdown } from './compiler';

export const MARKDOWN_CONTEXT_KEY = Symbol('INTLAYER_MARKDOWN_CONTEXT');

export type MarkdownProviderOptions = {
  forceBlock?: boolean;
  forceInline?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
};

export type RenderMarkdownOptions = MarkdownProviderOptions & {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: any;
};

export interface MarkdownContext {
  components?: HTMLComponents<'permissive', {}>;
  renderMarkdown: (
    markdown: string,
    options?: MarkdownProviderOptions,
    components?: HTMLComponents<'permissive', {}>,
    wrapper?: any
  ) => string;
}

export const getMarkdownContext = (): MarkdownContext => {
  return (
    getContext<MarkdownContext>(MARKDOWN_CONTEXT_KEY) || {
      renderMarkdown: (md, _options, components, wrapper) =>
        compileMarkdown(md, {
          components,
          wrapper,
          forceWrapper: !!wrapper,
        }),
    }
  );
};

export const setMarkdownContext = (context: MarkdownContext) => {
  setContext(MARKDOWN_CONTEXT_KEY, context);
};
