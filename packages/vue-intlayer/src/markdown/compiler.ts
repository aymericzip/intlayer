/**
 * Vue adapter for the framework-agnostic markdown processor.
 */

import {
  type CompileOptions,
  compileWithOptions,
  sanitizer as defaultSanitizer,
  slugify as defaultSlugify,
  RuleType,
} from '@intlayer/core';
import { vueRuntime } from './runtime';

// Re-export RuleType and utilities for compatibility
export { RuleType };
export { defaultSlugify as slugify, defaultSanitizer as sanitizer };

export type MarkdownCompilerOptions = CompileOptions;

export const compileMarkdown = (
  markdown: string = '',
  options: MarkdownCompilerOptions = {}
) => compileWithOptions(markdown, vueRuntime, options);

export const compile = compileMarkdown;
