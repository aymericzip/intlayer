export const BUILD_MODE = 'auto';

export const OPTIMIZE = undefined;

export const TRAVERSE_PATTERN = [
  '**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}',

  '!**/node_modules/**',
  '!**/dist/**',
  '!**/build/**',
  '!**/.intlayer/**',
  '!**/.next/**',
  '!**/.nuxt/**',
  '!**/.expo/**',
  '!**/.vercel/**',
  '!**/.turbo/**',
  '!**/.tanstack/**',

  '!**/*.config.*',
  '!**/*.test.*',
  '!**/*.spec.*',
  '!**/*.stories.*',
  '!**/*.d.ts',
  '!**/*.d.ts.map',
  '!**/*.map',
];

export const OUTPUT_FORMAT: ('cjs' | 'esm')[] = ['esm', 'cjs'];

export const CACHE = true;

export const TYPE_CHECKING = false;

export const MINIFY = false;

export const PURGE = false;
