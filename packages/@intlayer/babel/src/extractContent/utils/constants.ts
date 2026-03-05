/**
 * Attributes that should be extracted as translatable strings from JSX/HTML elements.
 * This is the single source of truth shared across all Intlayer compiler packages
 * (@intlayer/babel, @intlayer/vue-compiler, @intlayer/svelte-compiler, @intlayer/chokidar).
 */
export const ATTRIBUTES_TO_EXTRACT = [
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'label',
] as const;

/**
 * The list of supported Intlayer integration packages.
 * This is the single source of truth for package name validation.
 */
export const packageList = [
  'next-intlayer',
  'react-intlayer',
  'vue-intlayer',
  'svelte-intlayer',
  'preact-intlayer',
  'solid-intlayer',
  'angular-intlayer',
  'express-intlayer',
  'hono-intlayer',
  'fastify-intlayer',
  'adonis-intlayer',
] as const;

export type PackageName = (typeof packageList)[number];
