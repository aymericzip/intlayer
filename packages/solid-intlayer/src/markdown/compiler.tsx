import {
  type CompileOptions,
  compileWithOptions,
} from '@intlayer/core/markdown';
import type { JSX } from 'solid-js';
import { solidRuntime } from './runtime';

/**
 * Compile markdown to Solid JSX elements.
 */
export const compileMarkdown = (
  markdown: string = '',
  options: CompileOptions = {}
): JSX.Element => {
  return compileWithOptions(markdown, solidRuntime, options) as JSX.Element;
};

/**
 * Solid component that renders markdown to JSX.
 */
export const compiler = compileMarkdown;
export const compile = compileMarkdown;
