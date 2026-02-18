/**
 * Preact adapter for the framework-agnostic markdown processor.
 */

import {
  type CompileOptions,
  compileWithOptions,
  sanitizer as defaultSanitizer,
  slugify as defaultSlugify,
  RuleType,
} from '@intlayer/core/markdown';
import { preactRuntime } from './runtime';

// Re-export RuleType and utilities for compatibility
export { RuleType };
export { defaultSlugify as slugify, defaultSanitizer as sanitizer };

export type MarkdownCompilerOptions = CompileOptions;

/**
 * Compile markdown to Preact VNodes.
 * This is the primary export - use this for new code.
 */
export const compileMarkdown = (
  markdown: string = '',
  options: MarkdownCompilerOptions = {}
) => compileWithOptions(markdown, preactRuntime, options);

// Aliases for consistency with React adapter
export const compiler = compileMarkdown;
export const compile = compileMarkdown;
