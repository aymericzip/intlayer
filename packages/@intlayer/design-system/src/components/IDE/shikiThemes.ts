/**
 * Themes every code block is highlighted with.
 *
 * Shiki is always asked for both, with `defaultColor: false`, so each token
 * carries its light and dark colour as the `--shiki-light` / `--shiki-dark`
 * custom properties rather than a resolved `color`. The markup is therefore
 * theme-agnostic: it can be produced once — at build time — and never has to be
 * recomputed in the browser when the resolved theme changes.
 */
export const SHIKI_THEMES = {
  light: 'github-light',
  dark: 'github-dark',
} as const;

export type ShikiThemes = typeof SHIKI_THEMES;

/** Every theme id the fine-grained Shiki bundle can resolve. */
export type ShikiThemeId = ShikiThemes[keyof ShikiThemes];
