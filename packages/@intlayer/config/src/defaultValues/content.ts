import type { DictionaryOutput } from '../types/config';

export const FILE_EXTENSIONS = [
  '.content.ts',
  '.content.js',
  '.content.cjs',
  '.content.cjx',
  '.content.mjs',
  '.content.mjx',
  '.content.json',
  '.content.tsx',
  '.content.jsx',
];
export const EXCLUDED_PATHS = [
  'node_modules',
  '.intlayer',
  '.next',
  '.nuxt',
  '.expo',
  'dist',
];

export const CONTENT_DIR = ['.'];

export const MAIN_DIR = '.intlayer/main';

export const DICTIONARIES_DIR = '.intlayer/dictionary';

export const UNMERGED_DICTIONARIES_DIR = '.intlayer/unmerged_dictionary';

export const DYNAMIC_DICTIONARIES_DIR = '.intlayer/dynamic_dictionary';

export const FETCH_DICTIONARIES_DIR = '.intlayer/fetch_dictionary';

export const TYPES_DIR = '.intlayer/types';

export const MODULE_AUGMENTATION_DIR = '.intlayer/types';

export const DICTIONARY_OUTPUT: DictionaryOutput[] = ['intlayer'];

export const I18NEXT_DICTIONARIES_DIR = 'i18next_resources';

export const REACT_INTL_MESSAGES_DIR = 'intl_messages';

export const CONFIG_DIR = '.intlayer/config';

export const WATCH = process.env.NODE_ENV === 'development';
