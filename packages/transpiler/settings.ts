import { join, resolve } from 'path';

export const FILE_EXTENSION = ['.content.ts', '.content.js', '.content.json'];
export const CONTENT_DIR = join(process.cwd(), 'src');
export const PATH_EXCLUSIONS = ['node_modules'];

export const RESULT_DIR_NAME = '.intlayer';
export const ENTRY_FILE_NAME = 'main.ts';
export const OUTPUT_FILE_NAME = 'result.json';
export const BUNDLE_DIR_NAME = 'bundle';
export const DICTIONARY_DIR_NAME = 'dictionary';

export const ENTRY_PATH = resolve('../../examples/file');
export const RESULT_DIR = resolve(__dirname, ENTRY_PATH, RESULT_DIR_NAME);

export const BUNDLE_DIR = resolve(RESULT_DIR, BUNDLE_DIR_NAME);
export const DICTIONARIES_DIR = resolve(RESULT_DIR, DICTIONARY_DIR_NAME);
