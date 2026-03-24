import type { CompileOptions } from '@intlayer/core/markdown';
import type { JSX } from 'solid-js';
import { solidRuntime } from './runtime';

/**
 * Compile markdown to Solid JSX elements.
 * Lazily imports the heavy markdown library to enable code splitting.
 */
export const compileMarkdown = async (
  markdown: string = '',
  options: CompileOptions = {}
): Promise<JSX.Element> => {
  const { compileWithOptions } = await import('@intlayer/core/markdown');
  return compileWithOptions(markdown, solidRuntime, options) as JSX.Element;
};

/**
 * Solid component that renders markdown to JSX.
 */
export const compiler = compileMarkdown;
export const compile = compileMarkdown;
