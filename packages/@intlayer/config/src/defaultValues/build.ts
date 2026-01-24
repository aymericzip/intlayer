export const BUILD_MODE = 'auto';

export const OPTIMIZE = undefined;

export const TRAVERSE_PATTERN = [
  '**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}',
  '!**/node_modules/**',
];

export const OUTPUT_FORMAT: ('cjs' | 'esm')[] = ['cjs', 'esm'];

export const CACHE = true;
