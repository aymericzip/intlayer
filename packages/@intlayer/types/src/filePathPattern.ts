import type { DictionaryKey } from './dictionary';
import type { DeclaredLocales } from './module_augmentation';

type ContentExtension =
  `.${string}.${'json' | 'js' | 'ts' | 'jsx' | 'tsx' | 'cjs' | 'mjs'}`;

export type FilePathPatternContext = {
  locale?: DeclaredLocales;
  key: DictionaryKey;
  fileName: string;
  extension: ContentExtension | (string & {});
  format: 'ts' | 'cjs' | 'esm' | 'json' | 'jsonc' | 'json5';
  componentExtension?:
    | '.json'
    | '.js'
    | '.ts'
    | '.jsx'
    | '.tsx'
    | '.cjs'
    | '.mjs';
  componentFormat?: 'ts' | 'cjs' | 'esm';

  componentFileName?: string;
  componentDirPath?: string;
};

/**
 * Syntax for resolving file paths.
 */
export type FilePathPatternFunction = (
  context: FilePathPatternContext
) => string | Promise<string>;

/**
 * Global syntax for defining file paths and patterns.
 * Can be a static string, a templated string (e.g. `path/{{locale}}/{{key}}{{extension}}`),
 * or a function evaluating the path dynamically.
 */
export type FilePathPattern = string | FilePathPatternFunction;
