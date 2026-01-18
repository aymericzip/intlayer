export const FILE_EXTENSIONS = [
  '.content.ts',
  '.content.js',
  '.content.cjs',
  '.content.cjx',
  '.content.mjs',
  '.content.mjx',
  '.content.json',
  '.content.json5',
  '.content.jsonc',
  '.content.tsx',
  '.content.jsx',
];
export const EXCLUDED_PATHS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.intlayer/**',
  '**/.next/**',
  '**/.nuxt/**',
  '**/.expo/**',
  '**/.vercel/**',
  '**/.turbo/**',
  '**/.tanstack/**',
];

export const CONTENT_DIR = ['.'];

export const I18NEXT_DICTIONARIES_DIR = 'i18next_resources';

export const REACT_INTL_MESSAGES_DIR = 'intl_messages';

export const WATCH = process.env.NODE_ENV === 'development';
