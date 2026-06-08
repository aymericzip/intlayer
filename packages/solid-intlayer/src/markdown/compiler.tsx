import type {
  CompileOptions,
  MarkdownContext,
  ParsedMarkdown,
} from '@intlayer/core/markdown';
import type { JSX } from 'solid-js';
import { solidRuntime } from './runtime';

/**
 * Intermediate AST produced by `parseMarkdown`.
 * Pass this to `compileMarkdown` to skip re-parsing when the same content is
 * rendered multiple times.
 */
export type { ParsedMarkdown };

/**
 * **Step 1 of 2 — parse only (async).**
 * Lazily imports the markdown library (enabling code splitting), then converts
 * a raw markdown string into a `ParsedMarkdown` AST without rendering any Solid
 * JSX. Use this when you need to:
 * - Cache the parsed result and render it several times with different options.
 * - Inspect or transform the AST before rendering.
 * - Defer the render step to a later point.
 *
 * @param markdown - The markdown source string.
 * @param options - Options that affect parsing (sanitizer, slugify, …).
 * @returns A promise resolving to a `ParsedMarkdown` AST.
 *
 * @example
 * ```ts
 * const ast = await parseMarkdown('# Hello **world**');
 * const element = await compileMarkdown(ast, { forceBlock: true });
 * ```
 */
export const parseMarkdown = async (
  markdown: string = '',
  options: CompileOptions = {}
): Promise<ParsedMarkdown> => {
  const { parseMarkdown: coreParseMarkdown } = await import(
    '@intlayer/core/markdown'
  );

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: solidRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreParseMarkdown(markdown, ctx, compilerOptions);
};

/**
 * **Steps 1 + 2 — parse and render in one shot (async).**
 * Lazily imports the markdown library, then accepts a raw markdown string or a
 * pre-parsed `ParsedMarkdown` AST and returns a Solid JSX element.
 *
 * @param input - Markdown string or pre-parsed AST.
 * @param options - Rendering options (custom components, sanitizer, slugify, …).
 * @returns A promise resolving to a Solid JSX element.
 *
 * @example
 * ```ts
 * const element = await compileMarkdown('# Hello **world**');
 * ```
 */
export const compileMarkdown = async (
  input: string | ParsedMarkdown = '',
  options: CompileOptions = {}
): Promise<JSX.Element> => {
  if (typeof input === 'string') {
    const { compileWithOptions } = await import('@intlayer/core/markdown');
    return compileWithOptions(input, solidRuntime, options) as JSX.Element;
  }

  const { renderMarkdownAst } = await import('@intlayer/core/markdown');

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: solidRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return renderMarkdownAst(input, ctx, compilerOptions) as JSX.Element;
};
