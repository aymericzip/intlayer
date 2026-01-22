/**
 * React adapter for the framework-agnostic markdown processor.
 *
 * Provides a backward-compatible compiler and LegacyMarkdownRenderer component.
 */

import {
  type Overrides as CoreOverrides,
  compile as coreCompile,
  sanitizer as defaultSanitizer,
  slugify as defaultSlugify,
  type MarkdownContext,
  type MarkdownOptions,
  type MarkdownRuntime,
  type ParserResult,
  type ParseState,
  type RenderRuleHook,
  type RuleOutput,
  RuleType,
} from '@intlayer/core';
import {
  cloneElement,
  createElement,
  type FC,
  Fragment,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from 'react';

// Re-export RuleType for compatibility
export { RuleType };

// Re-export utilities for compatibility
export { defaultSlugify as slugify, defaultSanitizer as sanitizer };

type HTMLTags = keyof JSX.IntrinsicElements;

type State = ParseState;

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
  components: CoreOverrides;

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
 * Compile markdown to React elements.
 * This is the primary export - use this for new code.
 */
export const compileMarkdown = (
  markdown: string = '',
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

  const ctx: MarkdownContext = {
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

  return coreCompile(markdown, ctx, compilerOptions) as JSX.Element;
};

// Backward compatibility aliases
export const compiler = compileMarkdown;
export const compile = compileMarkdown;

/**
 * React component that renders markdown to JSX (legacy).
 */
export const LegacyMarkdownRenderer: FC<
  Omit<HTMLAttributes<Element>, 'children'> & {
    children: string;
    options?: MarkdownRendererOptions;
  }
> = ({ children = '', options, ...props }) => {
  if (process.env.NODE_ENV !== 'production' && typeof children !== 'string') {
    console.error(
      'intlayer: <Markdown> component only accepts a single string as a child, received:',
      children
    );
  }

  return cloneElement(
    compiler(children, options),
    props as JSX.IntrinsicAttributes
  );
};

export type {
  State,
  ParseState,
  ParserResult,
  RuleOutput,
  CoreOverrides as Overrides,
};
