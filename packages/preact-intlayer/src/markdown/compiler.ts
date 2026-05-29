/**
 * Preact adapter for the framework-agnostic markdown processor.
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
import { preactRuntime } from './runtime';

// Re-export RuleType and utilities for compatibility
export { defaultSanitizer as sanitizer, defaultSlugify as slugify, RuleType };

export type MarkdownCompilerOptions = CompileOptions;

/**
 * Compile markdown to Preact VNodes.
 * This is the primary export - use this for new code.
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
    runtime: preactRuntime,
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

// Aliases for consistency with React adapter
export const compiler = compileMarkdown;
export const compile = compileMarkdown;
