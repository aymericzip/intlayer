import { extname } from 'node:path';
import type { ParserPlugin } from '@babel/parser';

/** TypeScript extensions where `<T>` is a generic or a type assertion, never JSX. */
const NON_JSX_TYPESCRIPT_EXTENSIONS = new Set(['.ts', '.mts', '.cts']);

/**
 * Babel parser plugins for a source file. `.ts` files are parsed without
 * `jsx`, which would read `<T>(value: T) => value` as an unclosed element.
 */
export const getParserPlugins = (filePath?: string): ParserPlugin[] =>
  filePath && NON_JSX_TYPESCRIPT_EXTENSIONS.has(extname(filePath))
    ? ['typescript']
    : ['jsx', 'typescript'];
