/**
 * Attributes that should be extracted as translatable strings from JSX/HTML elements.
 * This is the single source of truth shared across all Intlayer compiler packages
 * (@intlayer/babel, @intlayer/vue-compiler, @intlayer/svelte-compiler, @intlayer/engine)
 * and the `eslint-plugin-intlayer` `no-raw-text` rule.
 */
export const ATTRIBUTES_TO_EXTRACT = [
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'label',
] as const;
