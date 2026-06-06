/**
 * Preact adapter for the framework-agnostic markdown processor.
 */

import {
  type CompileOptions,
  compileWithOptions,
  parseMarkdown as coreParseMarkdown,
  renderMarkdownAst as coreRenderMarkdownAst,
  type MarkdownContext,
  type ParsedMarkdown,
} from '@intlayer/core/markdown';
import { preactRuntime } from './runtime';

/**
 * Options accepted by `compileMarkdown` and `parseMarkdown` to customise
 * rendering behaviour (custom components, sanitizer, slugify, rule hooks, …).
 */
export type MarkdownCompilerOptions = CompileOptions;

/**
 * Intermediate AST produced by `parseMarkdown`.
 * Pass this to `compileMarkdown` to skip re-parsing when the same content is
 * rendered multiple times.
 */
export type { ParsedMarkdown };

/**
 * **Step 1 of 2 — parse only.**
 * Converts a raw markdown string into a `ParsedMarkdown` AST without rendering
 * any Preact elements. Use this when you need to:
 * - Cache the parsed result and render it several times with different options.
 * - Inspect or transform the AST before rendering.
 * - Defer the render step to a later point.
 *
 * @param markdown - The markdown source string.
 * @param options - Options that affect parsing (sanitizer, slugify, …).
 * @returns A `ParsedMarkdown` AST ready to be passed to `compileMarkdown`.
 *
 * @example
 * ```tsx
 * const ast = parseMarkdown('# Hello **world**');
 * const element = compileMarkdown(ast, { forceBlock: true });
 * ```
 */
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
    runtime: preactRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreParseMarkdown(markdown, ctx, compilerOptions);
};

/**
 * **Steps 1 + 2 — parse and render in one shot.**
 * Accepts a raw markdown string or a pre-parsed `ParsedMarkdown` AST and
 * returns a Preact element. Use `parseMarkdown` first when you need to reuse
 * the same AST with different options.
 *
 * @param input - Markdown string or pre-parsed AST.
 * @param options - Rendering options (custom components, sanitizer, slugify, …).
 * @returns A Preact element representing the rendered markdown.
 *
 * @example
 * ```tsx
 * const element = compileMarkdown('# Hello **world**', { forceBlock: true });
 * ```
 */
export const compileMarkdown = (
  input: string | ParsedMarkdown = '',
  options: MarkdownCompilerOptions = {}
) => {
  if (typeof input === 'string') {
    return compileWithOptions(input, preactRuntime, options);
  }

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: preactRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreRenderMarkdownAst(input, ctx, compilerOptions);
};
