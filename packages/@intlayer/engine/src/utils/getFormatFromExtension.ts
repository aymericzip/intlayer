export type Format =
  | 'ts'
  | 'cjs'
  | 'esm'
  | 'json'
  | 'jsonc'
  | 'json5'
  | 'md'
  | 'yaml';

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
  | '.json5'
  | '.md'
  | '.mdx'
  | '.yaml'
  | '.yml';

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
    case '.md':
    case '.mdx':
      return 'md';
    case '.yaml':
    case '.yml':
      return 'yaml';
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
    case 'md':
      return '.md';
    case 'yaml':
      return '.yaml';
  }

  return '.ts';
};
