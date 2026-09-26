import {
  type CompileOptions,
  compileWithOptions,
  parseMarkdown as coreParseMarkdown,
  renderMarkdownAst as coreRenderMarkdownAst,
  type HTMLTag,
  type MarkdownContext,
  type ParsedMarkdown,
} from '@intlayer/core/markdown';
import { svelteHtmlRuntime } from './runtime';

/**
 * Intermediate AST produced by `parseMarkdown`.
 * Pass this to `compileMarkdown` to skip re-parsing when the same content is
 * rendered multiple times.
 */
export type { ParsedMarkdown };

export type MarkdownCompilerOptions = CompileOptions;

/**
 * **Step 1 of 2 — parse only.**
 * Converts a raw markdown string into a `ParsedMarkdown` AST without rendering
 * any HTML. Use this when you need to:
 * - Cache the parsed result and render it several times with different options.
 * - Inspect or transform the AST before rendering.
 * - Defer the render step to a later point.
 *
 * @param markdown - The markdown source string.
 * @param options - Options that affect parsing (sanitizer, slugify, …).
 * @returns A `ParsedMarkdown` AST ready to be passed to `compileMarkdown`.
 *
 * @example
 * ```ts
 * const ast = parseMarkdown('# Hello **World**');
 * const html = compileMarkdown(ast);
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

  const ctx: MarkdownContext<unknown> = {
    runtime: svelteHtmlRuntime,
    components: components as Record<string, unknown> | undefined,
    namedCodesToUnicode,
    sanitizer: sanitizer as
      | ((value: string, tag: HTMLTag, attribute: string) => string | null)
      | undefined,
    slugify,
  };

  return coreParseMarkdown(markdown, ctx, compilerOptions);
};

/**
 * **Steps 1 + 2 — parse and render in one shot.**
 * Accepts a raw markdown string or a pre-parsed `ParsedMarkdown` AST and
 * returns an HTML string suitable for Svelte's `{@html}` tag.
 *
 * @param input - Markdown string or pre-parsed AST.
 * @param options - Rendering options (components, sanitizer, slugify, …).
 * @returns An HTML string representing the rendered markdown.
 *
 * @example
 * ```svelte
 * <div>{@html compileMarkdown('# Hello **World**')}</div>
 * ```
 */
export const compileMarkdown = (
  input: string | ParsedMarkdown = '',
  options: MarkdownCompilerOptions = {}
): string => {
  if (typeof input === 'string') {
    return compileWithOptions(input, svelteHtmlRuntime, options) as string;
  }

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<unknown> = {
    runtime: svelteHtmlRuntime,
    components: components as Record<string, unknown> | undefined,
    namedCodesToUnicode,
    sanitizer: sanitizer as
      | ((value: string, tag: HTMLTag, attribute: string) => string | null)
      | undefined,
    slugify,
  };

  return coreRenderMarkdownAst(input, ctx, compilerOptions) as string;
};
