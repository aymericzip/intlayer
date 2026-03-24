/**
 * Vanilla JS adapter for the framework-agnostic markdown processor.
 *
 * Compiles markdown to an HTML string for use with `innerHTML` or the
 * `renderMarkdown` utility.
 */

import {
  type CompileOptions,
  compileWithOptions,
  sanitizer as defaultSanitizer,
  slugify as defaultSlugify,
  RuleType,
} from '@intlayer/core/markdown';
import { vanillaRuntime } from './runtime';

// Re-export utilities for compatibility
export { defaultSanitizer as sanitizer, defaultSlugify as slugify, RuleType };

export type MarkdownCompilerOptions = CompileOptions;

/**
 * Compile markdown to an HTML string.
 *
 * The resulting string can be inserted into the DOM via `element.innerHTML`
 * or the `renderMarkdown` helper.
 *
 * @example
 * ```ts
 * import { compileMarkdown } from 'vanilla-intlayer/markdown';
 *
 * document.querySelector('#content').innerHTML = compileMarkdown('# Hello **World**');
 * ```
 */
export const compileMarkdown = (
  markdown = '',
  options: MarkdownCompilerOptions = {}
): string => compileWithOptions(markdown, vanillaRuntime, options) as string;

// Aliases for consistency with other adapters
export const compiler = compileMarkdown;
export const compile = compileMarkdown;
