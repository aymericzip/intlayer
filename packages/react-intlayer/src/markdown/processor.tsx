/**
 * React adapter for the framework-agnostic markdown processor.
 *
 * Provides a backward-compatible compiler and MarkdownProcessor component.
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
 * Backward-compatible MarkdownProcessorOptions type.
 * Maps to the core library's options while maintaining the existing API.
 */
export type MarkdownProcessorOptions = Partial<{
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
  overrides: CoreOverrides;

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
}>;

/**
 * Create the React runtime with optional custom createElement.
 */
const createReactRuntime = (
  customCreateElement?: MarkdownProcessorOptions['createElement']
): MarkdownRuntime => ({
  createElement: customCreateElement ?? createElement,
  cloneElement,
  Fragment,
  normalizeProps: (_tag, props) => props,
});

/**
 * Compile markdown to React elements.
 * This is the primary export - use this for new code.
 */
export const compileMarkdown = (
  markdown: string = '',
  options: MarkdownProcessorOptions = {}
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
    overrides,
    renderRule,
    sanitizer,
    slugify,
    wrapper,
  } = options;

  const runtime = createReactRuntime(customCreateElement);

  const ctx: MarkdownContext = {
    runtime,
    overrides,
    namedCodesToUnicode,
    sanitizer,
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
  };

  return coreCompile(markdown, ctx, compilerOptions) as JSX.Element;
};

// Backward compatibility aliases
export const compiler = compileMarkdown;
export const compile = compileMarkdown;

/**
 * React component that renders markdown to JSX.
 */
export const MarkdownProcessor: FC<
  Omit<HTMLAttributes<Element>, 'children'> & {
    children: string;
    options?: MarkdownProcessorOptions;
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
