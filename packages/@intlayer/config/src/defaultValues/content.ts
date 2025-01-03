import process from 'process';
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

export const I18NEXT_DICTIONARIES_DIR_NAME = 'i18next_resources';

export const REACT_INTL_MESSAGES_DIR_NAME = 'intl_messages';

export const TYPES_DIR_NAME = 'types';

export const MAIN_DIR_NAME = 'main';

export const WATCH = process.env.NODE_ENV === 'development';
