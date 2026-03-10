import type { FilePathPattern } from '@intlayer/types/filePathPattern';

export const COMPILER_ENABLED = true;

export const COMPILER_DICTIONARY_KEY_PREFIX = 'comp-';

export const COMPILER_TRANSFORM_PATTERN = [
  '**/*.{ts,tsx,jsx,js,cjs,mjs,svelte,vue}',
];
export const COMPILER_EXCLUDE_PATTERN = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.next/**',
  '**/.nuxt/**',
  '**/.expo/**',
  '**/.vercel/**',
  '**/.turbo/**',
  '**/.tanstack/**',
  '**/*.stories.ts',
  '**/*.test.ts',
];

export const COMPILER_OUTPUT: FilePathPattern = ({ key, extension }) =>
  `/compiler/${key}${extension.split('.')[1]}.json`;

export const COMPILER_NO_METADATA = false;

export const COMPILER_SAVE_COMPONENTS = false;
