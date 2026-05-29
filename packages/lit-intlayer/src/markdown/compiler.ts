/**
 * Lit adapter for the framework-agnostic markdown processor.
 *
 * Compiles markdown to an HTML string for use with Lit's `unsafeHTML` directive
 * or the `<intlayer-markdown-renderer>` custom element.
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
import { litRuntime } from './runtime';

// Re-export utilities for compatibility
export { defaultSanitizer as sanitizer, defaultSlugify as slugify, RuleType };

export type MarkdownCompilerOptions = CompileOptions;

/**
 * Compile markdown to an HTML string.
 *
 * The resulting string can be rendered in a Lit template using the
 * `unsafeHTML` directive or the `<intlayer-markdown-renderer>` element.
 *
 * @example
 * ```ts
 * import { compileMarkdown } from 'lit-intlayer/markdown';
 * import { unsafeHTML } from 'lit/directives/unsafe-html.js';
 *
 * class MyElement extends LitElement {
 *   render() {
 *     const html = compileMarkdown('# Hello **World**');
 *     return html`${unsafeHTML(html)}`;
 *   }
 * }
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
    runtime: litRuntime,
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
    return compileWithOptions(input, litRuntime, options) as string;
  }

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: litRuntime,
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
