export const BUILD_MODE = 'auto';

export const OPTIMIZE = undefined;

export const TRAVERSE_PATTERN = [
  // Included files to parse
  '**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,astro}',

  // Excluded paths
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
  '!**/.output/**',
  '!**/.svelte-kit/**',
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
