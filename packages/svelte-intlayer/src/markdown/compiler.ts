import {
  compileWithOptions,
  parseMarkdown as coreParseMarkdown,
  renderMarkdownAst as coreRenderMarkdownAst,
  type MarkdownContext,
  type ParsedMarkdown,
} from '@intlayer/core/markdown';
import { svelteHtmlRuntime } from './runtime';

/**
 * Compile markdown to HTML strings for Svelte.
 */
export type { ParsedMarkdown };

export const parseMarkdown = (
  markdown: string = '',
  options: any = {}
): ParsedMarkdown => {
  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: svelteHtmlRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreParseMarkdown(markdown, ctx, compilerOptions);
};

export const compileMarkdown = (
  input: string | ParsedMarkdown = '',
  options: any = {}
) => {
  if (typeof input === 'string') {
    return compileWithOptions(input, svelteHtmlRuntime, options);
  }

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: svelteHtmlRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreRenderMarkdownAst(input, ctx, compilerOptions);
};
