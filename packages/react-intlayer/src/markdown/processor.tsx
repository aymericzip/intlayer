/**
 * it's a fork
 * [markdown-to-jsx v7.7.14](https://github.com/quantizor/markdown-to-jsx) from quantizor
 * [simple-markdown v0.2.2](https://github.com/Khan/simple-markdown) from Khan Academy.
 */

import {
  compile as coreCompile,
  parseMarkdown as coreParseMarkdown,
  renderMarkdownAst as coreRenderMarkdownAst,
  sanitizer as defaultSanitizer,
  slugify as defaultSlugify,
  type MarkdownContext,
  type MarkdownOptions,
  type MarkdownRuntime,
  type ParsedMarkdown,
  type RenderRuleHook,
  RuleType,
} from '@intlayer/core/markdown';
import {
  cloneElement,
  createElement,
  Fragment,
  type JSX,
  type ReactNode,
} from 'react';
import type { HTMLComponents } from '../html/HTMLComponentTypes';

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

type HTMLTags = keyof JSX.IntrinsicElements;

/**
 * Refined MarkdownRendererOptions type.
 */
export type MarkdownRendererOptions = Partial<{
  /**
   * Ultimate control over the output of all rendered JSX.
   */
  createElement: (
    tag: Parameters<typeof createElement>[0],
    props: JSX.IntrinsicAttributes,
    ...children: ReactNode[]
  ) => ReactNode;

  /**
   * The library automatically generates an anchor tag for bare URLs included in the markdown
   * document, but this behavior can be disabled if desired.
   */
  disableAutoLink: boolean;

  /**
   * Disable the compiler's best-effort transcription of provided raw HTML
   * into JSX-equivalent.
   */
  disableParsingRawHTML: boolean;

  /**
   * Forces the compiler to have space between hash sign and the header text.
   */
  enforceAtxHeadings: boolean;

  /**
   * Forces the compiler to always output content with a block-level wrapper.
   */
  forceBlock: boolean;

  /**
   * Forces the compiler to always output content with an inline wrapper.
   */
  forceInline: boolean;

  /**
   * Forces the compiler to wrap results, even if there is only a single child.
   */
  forceWrapper: boolean;

  /**
   * Supply additional HTML entity: unicode replacement mappings.
   */
  namedCodesToUnicode: {
    [key: string]: string;
  };

  /**
   * Selectively control the output of particular HTML tags.
   */
  components: HTMLComponents;

  /**
   * Allows for full control over rendering of particular rules.
   */
  renderRule: RenderRuleHook;

  /**
   * Override the built-in sanitizer function for URLs.
   */
  sanitizer: (value: string, tag: HTMLTags, attribute: string) => string | null;

  /**
   * Override normalization of non-URI-safe characters for anchor linking.
   */
  slugify: (input: string) => string;

  /**
   * Declare the type of the wrapper to be used when there are multiple children.
   */
  wrapper: any | null;

  /**
   * Whether to preserve frontmatter in the markdown content.
   */
  preserveFrontmatter: boolean;

  /**
   * Whether to use the GitHub Tag Filter.
   */
  tagfilter: boolean;
}>;

/**
 * Default React runtime for markdown rendering.
 */
const DEFAULT_RUNTIME: MarkdownRuntime = {
  createElement: createElement as any,
  cloneElement,
  Fragment,
  normalizeProps: (_tag, props) => props,
};

/**
 * Intermediate AST produced by `parseMarkdown`.
 * Pass this to `compileMarkdown` or `<MarkdownRenderer>` to skip re-parsing
 * when the same content is rendered multiple times.
 */
export type { ParsedMarkdown };

/**
 * **Step 1 of 2 — parse only.**
 * Converts a raw markdown string into a `ParsedMarkdown` AST without rendering
 * any React elements. Use this when you need to:
 * - Cache the parsed result and render it several times with different options.
 * - Inspect or transform the AST before rendering.
 * - Defer the render step to a later point in the pipeline.
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
  options: MarkdownRendererOptions = {}
): ParsedMarkdown => {
  const {
    disableAutoLink,
    disableParsingRawHTML,
    enforceAtxHeadings,
    forceBlock,
    forceInline,
    forceWrapper,
    namedCodesToUnicode,
    components,
    sanitizer,
    slugify,
    wrapper,
    preserveFrontmatter,
    tagfilter,
  } = options;

  const ctx: MarkdownContext<HTMLComponents> = {
    runtime: DEFAULT_RUNTIME,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  const compilerOptions: MarkdownOptions = {
    disableAutoLink,
    disableParsingRawHTML,
    enforceAtxHeadings,
    forceBlock,
    forceInline,
    forceWrapper,
    wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  return coreParseMarkdown(markdown, ctx, compilerOptions);
};

/**
 * **Steps 1 + 2 — parse and render in one shot.**
 * Accepts a raw markdown string or a pre-parsed `ParsedMarkdown` AST and
 * returns a React element. Use `parseMarkdown` first when you need to reuse
 * the same AST with different options.
 *
 * @param input - Markdown string or pre-parsed AST.
 * @param options - Rendering options (custom components, sanitizer, slugify, …).
 * @returns A React JSX element representing the rendered markdown.
 *
 * @example
 * ```tsx
 * const element = compileMarkdown('# Hello **world**', { forceBlock: true });
 * ```
 */
export const compileMarkdown = (
  input: string | ParsedMarkdown = '',
  options: MarkdownRendererOptions = {}
): JSX.Element => {
  const {
    createElement: customCreateElement,
    disableAutoLink,
    disableParsingRawHTML,
    enforceAtxHeadings,
    forceBlock,
    forceInline,
    forceWrapper,
    namedCodesToUnicode,
    components,
    renderRule,
    sanitizer,
    slugify,
    wrapper,
    preserveFrontmatter,
    tagfilter,
  } = options;

  const runtime = customCreateElement
    ? { ...DEFAULT_RUNTIME, createElement: customCreateElement as any }
    : DEFAULT_RUNTIME;

  const ctx: MarkdownContext<HTMLComponents> = {
    runtime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  const compilerOptions: MarkdownOptions = {
    disableAutoLink,
    disableParsingRawHTML,
    enforceAtxHeadings,
    forceBlock,
    forceInline,
    forceWrapper,
    renderRule,
    wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  if (typeof input === 'string') {
    return coreCompile(input, ctx, compilerOptions) as JSX.Element;
  }

  return coreRenderMarkdownAst(input, ctx, compilerOptions) as JSX.Element;
};
