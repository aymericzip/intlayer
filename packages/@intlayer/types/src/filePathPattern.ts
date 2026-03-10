import type { DictionaryKey } from './dictionary';
import type { DeclaredLocales } from './module_augmentation';

type Extension =
  `${string}.${'json' | 'js' | 'ts' | 'jsx' | 'tsx' | 'cjs' | 'mjs'}`;

export type FilePathPatternContext = {
  locale?: DeclaredLocales;
  key: DictionaryKey;
  dirPath: string;
  fileName: string;
  extension: Extension;
  componentExtension?:
    | '.json'
    | '.js'
    | '.ts'
    | '.jsx'
    | '.tsx'
    | '.cjs'
    | '.mjs';
  format: 'ts' | 'cjs' | 'esm' | 'json' | 'jsonc' | 'json5';
  componentFormat?: 'ts' | 'cjs' | 'esm' | 'json' | 'jsonc' | 'json5';
  componentFileName?: string;
};

/**
 * Global syntax for defining file paths and patterns.
 * Can be a static string, a templated string (e.g. `path/{{locale}}/{{key}}{{extension}}`),
 * or a function evaluating the path dynamically.
 */
export type FilePathPattern =
  | string
  | ((context: FilePathPatternContext) => string | Promise<string>);
