export const OPTIMIZE = process.env.NODE_ENV === 'production';

export const IMPORT_MODE = 'static';

export const TRAVERSE_PATTERN = [
  '**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx,vue,svelte,svte}',
  '!**/node_modules/**',
];

export const OUTPUT_FORMAT: ('cjs' | 'esm')[] = ['cjs', 'esm'];

export const CACHE = true;
