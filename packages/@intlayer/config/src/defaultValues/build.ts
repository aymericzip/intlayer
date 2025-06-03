export const OPTIMIZE = process.env.NODE_ENV === 'production';

export const ACTIVATE_DYNAMIC_IMPORT = false;

export const TRAVERSE_PATTERN = [
  '**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx,vue,svelte,svte}',
  '!**/node_modules/**',
];
