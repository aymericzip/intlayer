import type { DictionaryOutput } from '../types/config';

export const FILE_EXTENSIONS = [
  '.content.ts',
  '.content.js',
  '.content.cjs',
  '.content.mjs',
  '.content.json',
  '.content.tsx',
  '.content.jsx',
];
export const EXCLUDED_PATHS = ['node_modules'];

export const CONTENT_DIR_NAME = 'src';

export const RESULT_DIR_NAME = '.intlayer';

export const MODULE_AUGMENTATION_DIR_NAME = 'types';

export const DICTIONARY_OUTPUT: DictionaryOutput[] = ['intlayer'];

export const DICTIONARIES_DIR_NAME = 'dictionary';

export const I18N_DICTIONARIES_DIR_NAME = 'i18n_dictionary';

export const TYPES_DIR_NAME = 'types';

export const MAIN_DIR_NAME = 'main';
