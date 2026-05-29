import type {
  CompileOptions,
  MarkdownContext,
  ParsedMarkdown,
} from '@intlayer/core/markdown';
import type { JSX } from 'solid-js';
import { solidRuntime } from './runtime';

/**
 * Compile markdown to Solid JSX elements.
 * Lazily imports the heavy markdown library to enable code splitting.
 */
export type { ParsedMarkdown };

export const parseMarkdown = async (
  markdown: string = '',
  options: CompileOptions = {}
): Promise<ParsedMarkdown> => {
  const { parseMarkdown: coreParseMarkdown } = await import(
    '@intlayer/core/markdown'
  );

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: solidRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return coreParseMarkdown(markdown, ctx, compilerOptions);
};

export const compileMarkdown = async (
  input: string | ParsedMarkdown = '',
  options: CompileOptions = {}
): Promise<JSX.Element> => {
  if (typeof input === 'string') {
    const { compileWithOptions } = await import('@intlayer/core/markdown');
    return compileWithOptions(input, solidRuntime, options) as JSX.Element;
  }

  const { renderMarkdownAst } = await import('@intlayer/core/markdown');

  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext<any> = {
    runtime: solidRuntime,
    components,
    namedCodesToUnicode,
    sanitizer: sanitizer as any,
    slugify,
  };

  return renderMarkdownAst(input, ctx, compilerOptions) as JSX.Element;
};

/**
 * Solid component that renders markdown to JSX.
 */
export const compiler = compileMarkdown;
export const compile = compileMarkdown;
