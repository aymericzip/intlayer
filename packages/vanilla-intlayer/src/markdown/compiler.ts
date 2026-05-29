/**
 * Vanilla JS adapter for the framework-agnostic markdown processor.
 *
 * Compiles markdown to an HTML string for use with `innerHTML` or the
 * `renderMarkdown` utility.
 */

import {
  type CompileOptions,
  compileWithOptions,
  parseMarkdown as coreParseMarkdown,
  renderMarkdownAst as coreRenderMarkdownAst,
  sanitizer as defaultSanitizer,
  slugify as defaultSlugify,
  type MarkdownContext,
  type ParsedMarkdown,
  RuleType,
} from '@intlayer/core/markdown';
import { vanillaRuntime } from './runtime';

// Re-export utilities for compatibility
export { defaultSanitizer as sanitizer, defaultSlugify as slugify, RuleType };

export type MarkdownCompilerOptions = CompileOptions;

/**
 * Compile markdown to an HTML string.
 *
 * The resulting string can be inserted into the DOM via `element.innerHTML`
 * or the `renderMarkdown` helper.
 *
 * @example
 * ```ts
 * import { compileMarkdown } from 'vanilla-intlayer/markdown';
 *
 * document.querySelector('#content').innerHTML = compileMarkdown('# Hello **World**');
 * ```
 */
export type { ParsedMarkdown };

export const parseMarkdown = (
  markdown: string = '',
  options: MarkdownCompilerOptions = {}
): ParsedMarkdown => {
  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: vanillaRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreParseMarkdown(markdown, ctx, compilerOptions);
};

export const compileMarkdown = (
  input: string | ParsedMarkdown = '',
  options: MarkdownCompilerOptions = {}
): string => {
  if (typeof input === 'string') {
    return compileWithOptions(input, vanillaRuntime, options) as string;
  }

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: vanillaRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreRenderMarkdownAst(input, ctx, compilerOptions) as string;
};

// Aliases for consistency with other adapters
export const compiler = compileMarkdown;
export const compile = compileMarkdown;
