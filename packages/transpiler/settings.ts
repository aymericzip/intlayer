import { join, resolve } from 'path';

export const FILE_EXTENSION = ['.content.ts', '.content.js', '.content.json'];
export const CONTENT_DIR = join(process.cwd(), 'src');
export const PATH_EXCLUSIONS = ['node_modules'];

export const RESULT_DIR_NAME = '.intlayer';
export const ENTRY_FILE_NAME = 'main.ts';
export const OUTPUT_FILE_NAME = 'result.json';
export const BUNDLE_DIR_NAME = 'bundle';
export const DICTIONARY_DIR_NAME = 'dictionary';

export const DIR_PATH = resolve('../../examples/cli');
export const ENTRY_PATH = resolve(DIR_PATH, 'src');
export const RESULT_DIR = resolve(__dirname, DIR_PATH, RESULT_DIR_NAME);

export const BUNDLE_DIR = resolve(RESULT_DIR, BUNDLE_DIR_NAME);
export const DICTIONARIES_DIR = resolve(RESULT_DIR, DICTIONARY_DIR_NAME);

export const WATCHED_FILES_PATTERN = FILE_EXTENSION.map((ext) => `/**/*${ext}`);
export const WATCHED_FILES_PATTERN_WITH_PATH = FILE_EXTENSION.map(
  (ext) => `${ENTRY_PATH}/**/*${ext}`
);

export const OUTPUT_FILES_PATTERN_WITH_PATH = `${RESULT_DIR}/**/*.json`;
