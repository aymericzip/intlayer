import { compileWithOptions } from '@intlayer/core';
import { svelteHtmlRuntime } from './runtime';

/**
 * Compile markdown to HTML strings for Svelte.
 */
export const compileMarkdown = (markdown: string = '', options: any = {}) =>
  compileWithOptions(markdown, svelteHtmlRuntime, options);
