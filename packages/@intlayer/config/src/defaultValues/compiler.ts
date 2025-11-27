export const COMPILER_ENABLED = true;
export const COMPILER_TRANSFORM_PATTERN = [
  '**/*.{ts,tsx,jsx,js,cjs,mjs,mjx,cjx,svelte,vue}',
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
export const COMPILER_OUTPUT_DIR = './compiler';
