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

/**
 * Utility re-exports from `@intlayer/core/markdown` for advanced customisation:
 * - `sanitizer` — default URL sanitizer applied to `href`/`src` attributes;
 *   guards against XSS by rejecting unsafe schemes (e.g. `javascript:`).
 *   Override via the `sanitizer` option of `compileMarkdown`.
 * - `slugify` — default heading anchor slug generator
 *   (e.g. `"My Heading"` → `"my-heading"`).
 *   Override via the `slugify` option of `compileMarkdown`.
 * - `RuleType` — enum of all parser rule types; use with the `renderRule`
 *   option to selectively override individual markdown constructs.
 */
export { defaultSanitizer as sanitizer, defaultSlugify as slugify, RuleType };

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

  const ctx: MarkdownContext<any> = {
    runtime: litRuntime,
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
 * returns an HTML string. Use with Lit's `unsafeHTML` directive or the
 * `<intlayer-markdown-renderer>` custom element.
 *
 * @param input - Markdown string or pre-parsed AST.
 * @param options - Rendering options (custom components, sanitizer, slugify, …).
 * @returns An HTML string representing the rendered markdown.
 *
 * @example
 * ```ts
 * import { unsafeHTML } from 'lit/directives/unsafe-html.js';
 *
 * class MyElement extends LitElement {
 *   render() {
 *     return html`${unsafeHTML(compileMarkdown('# Hello **World**'))}`;
 *   }
 * }
 * ```
 */
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
