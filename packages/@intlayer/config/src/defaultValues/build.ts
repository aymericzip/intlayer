export const BUILD_MODE = 'auto';

export const OPTIMIZE = undefined;

export const TRAVERSE_PATTERN = [
  '**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}',
  '!**/node_modules/**',
];

export const OUTPUT_FORMAT: ('cjs' | 'esm')[] = ['esm', 'cjs'];

export const CACHE = true;
