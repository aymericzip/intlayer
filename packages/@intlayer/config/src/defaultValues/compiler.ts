import type { FilePathPatternFunction } from '@intlayer/types/filePathPattern';

export const COMPILER_ENABLED = true;

export const COMPILER_DICTIONARY_KEY_PREFIX = 'comp-';

export const COMPILER_OUTPUT: FilePathPatternFunction = (options) =>
  `/compiler/${options.key}.${options.extension.split('.')[1]}.json`;

export const COMPILER_NO_METADATA = false;

export const COMPILER_SAVE_COMPONENTS = false;
