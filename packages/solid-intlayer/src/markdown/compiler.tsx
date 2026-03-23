import type { CompileOptions } from '@intlayer/core/markdown';

let _compileWithOptions:
  | typeof import('@intlayer/core/markdown')['compileWithOptions']
  | null = null;
void import('@intlayer/core/markdown').then((module) => {
  _compileWithOptions = module.compileWithOptions;
});

import type { JSX } from 'solid-js';
import { solidRuntime } from './runtime';

/**
 * Compile markdown to Solid JSX elements.
 */
export const compileMarkdown = (
  markdown: string = '',
  options: CompileOptions = {}
): JSX.Element => {
  return _compileWithOptions?.(markdown, solidRuntime, options) as JSX.Element;
};

/**
 * Solid component that renders markdown to JSX.
 */
export const compiler = compileMarkdown;
export const compile = compileMarkdown;
