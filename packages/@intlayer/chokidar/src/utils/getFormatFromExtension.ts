export type Format = 'ts' | 'cjs' | 'esm' | 'json' | 'jsonc' | 'json5';
export type Extension =
  | '.ts'
  | '.tsx'
  | '.js'
  | '.jsx'
  | '.cjs'
  | '.cjsx'
  | '.mjs'
  | '.mjsx'
  | '.json'
  | '.jsonc'
  | '.json5';

export const getFormatFromExtension = (
  extension: Extension | (string & {})
): Format => {
  switch (extension) {
    case '.ts':
    case '.tsx':
      return 'ts';
    case '.cjs':
    case '.cjsx':
      return 'cjs';
    case '.js':
    case '.jsx':
    case '.mjs':
    case '.mjsx':
      return 'esm';
    case '.json':
    case '.jsonc':
    case '.json5':
      return 'json';
  }

  return 'ts';
};

export const getExtensionFromFormat = (
  format: Format | (string & {})
): Extension => {
  switch (format) {
    case 'ts':
      return '.ts';
    case 'cjs':
      return '.cjs';
    case 'json':
      return '.json';
    case 'jsonc':
      return '.jsonc';
    case 'json5':
      return '.json5';
    case 'esm':
      return '.mjs';
  }

  return '.ts';
};
