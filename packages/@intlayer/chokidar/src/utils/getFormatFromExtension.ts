export type Format = 'ts' | 'cjs' | 'esm' | 'json';
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
  | '.json5';

export const getFormatFromExtension = (extension: Extension): Format => {
  switch (extension) {
    case '.ts':
    case '.tsx':
      return 'ts';
    case '.cjs':
    case '.cjsx':
      return 'cjs';
    case '.mjs':
      return 'esm';
    case '.json':
    case '.json5':
      return 'json';
  }

  return 'ts';
};

export const getExtensionFromFormat = (format: Format): Extension => {
  switch (format) {
    case 'ts':
      return '.ts';
    case 'cjs':
      return '.cjs';
    case 'json':
      return '.json';
    case 'esm':
      return '.mjs';
  }

  return '.ts';
};
