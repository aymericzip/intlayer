import type {
  RewriteObject,
  RewriteRule,
  RewriteRules,
  StrictModeLocaleMap,
} from '@intlayer/types';

const buildRules = (
  rules: Record<string, StrictModeLocaleMap<string>>,
  processor: (pattern: string) => string
): RewriteRules => ({
  rules: Object.entries(rules).map(([canonical, localized]) => ({
    canonical: processor(canonical),
    localized: Object.fromEntries(
      Object.entries(localized).map(([locale, pattern]) => [
        locale,
        pattern ? processor(pattern) : pattern,
      ])
    ) as StrictModeLocaleMap<string>,
  })) as RewriteRule[],
});

const cleanPath = (pattern: string) =>
  pattern.startsWith('/') ? pattern : `/${pattern}`;

/**
 * Formatter for Next.js style rewrites.
 * Patterns use Next.js dynamic routing syntax:
 * - Slug: `[slug]`
 * - Optional slug: `[[slug]]`
 * - Catch-all: `[...slug]`
 * - Optional catch-all: `[[...slug]]`
 * - Locale: `[locale]`
 */
export const nextjsRewrite = <T extends string = string>(
  rules: Record<T, StrictModeLocaleMap<string>>
): RewriteObject => {
  const normalize = (pattern: string) =>
    pattern.replace(/\[([^\]]+)\]/g, ':$1');
  const strip = (pattern: string) =>
    pattern
      .replace(/\/?(:locale|\[locale\])\/?/g, '/')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '') || '/';

  return {
    url: buildRules(rules as any, (pattern) =>
      cleanPath(strip(normalize(pattern)))
    ),
    nextjs: buildRules(rules as any, (pattern) =>
      cleanPath(normalize(pattern))
    ),
  };
};

/**
 * Formatter for Vite style rewrites.
 * Patterns use Vite/Vue Router dynamic routing syntax:
 * - Slug: `:slug`
 * - Optional slug: `:slug?`
 * - Catch-all: `:slug*` (zero or more) or `:slug+` (one or more)
 * - Locale: `:locale`
 */
export const viteRewrite = <T extends string = string>(
  rules: Record<T, StrictModeLocaleMap<string>>
): RewriteObject => {
  const normalize = (pattern: string) => pattern; // Vite already uses :param
  const strip = (pattern: string) =>
    pattern
      .replace(/\/?(:locale)\/?/g, '/')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '') || '/';

  return {
    url: buildRules(rules as any, (pattern) =>
      cleanPath(strip(normalize(pattern)))
    ),
    vite: buildRules(rules as any, (pattern) => cleanPath(normalize(pattern))),
  };
};

/**
 * Formatter for React Router style rewrites.
 * Patterns use React Router dynamic routing syntax:
 * - Slug: `:slug`
 * - Optional slug: `:slug?`
 * - Catch-all: `*`
 * - Locale: `:locale`
 */
export const reactRouterRewrite = <T extends string = string>(
  rules: Record<T, StrictModeLocaleMap<string>>
): RewriteObject => {
  const normalize = (pattern: string) => pattern;
  const strip = (pattern: string) =>
    pattern
      .replace(/\/?(:locale)\/?/g, '/')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '') || '/';

  return {
    url: buildRules(rules as any, (pattern) =>
      cleanPath(strip(normalize(pattern)))
    ),
    vite: buildRules(rules as any, (pattern) => cleanPath(normalize(pattern))), // Vite proxy
  };
};

/**
 * Formatter for SvelteKit style rewrites.
 * Patterns use SvelteKit dynamic routing syntax:
 * - Slug: `[slug]`
 * - Catch-all: `[...slug]`
 * - Locale: `[locale]`
 */
export const svelteKitRewrite = <T extends string = string>(
  rules: Record<T, StrictModeLocaleMap<string>>
): RewriteObject => {
  const normalize = (pattern: string) =>
    pattern.replace(/\[([^\]]+)\]/g, ':$1');
  const strip = (pattern: string) =>
    pattern
      .replace(/\/?(:locale|\[locale\])\/?/g, '/')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '') || '/';

  return {
    url: buildRules(rules as any, (pattern) =>
      cleanPath(strip(normalize(pattern)))
    ),
    vite: buildRules(rules as any, (pattern) => cleanPath(normalize(pattern))), // SvelteKit uses Vite
  };
};

/**
 * Formatter for SolidJS style rewrites.
 * Patterns use SolidJS dynamic routing syntax:
 * - Slug: `:slug`
 * - Catch-all: `*slug`
 * - Locale: `:locale`
 */
export const solidjsRewrite = <T extends string = string>(
  rules: Record<T, StrictModeLocaleMap<string>>
): RewriteObject => {
  const normalize = (pattern: string) => pattern;
  const strip = (pattern: string) =>
    pattern
      .replace(/\/?(:locale)\/?/g, '/')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '') || '/';

  return {
    url: buildRules(rules as any, (pattern) =>
      cleanPath(strip(normalize(pattern)))
    ),
    vite: buildRules(rules as any, (pattern) => cleanPath(normalize(pattern))), // Solid uses Vite proxy
  };
};

/**
 * Formatter for Vue style rewrites.
 * Patterns use Vue Router 4 dynamic routing syntax:
 * - Slug: `:slug`
 * - Optional slug: `:slug?`
 * - Catch-all: `:slug*` (zero or more) or `:slug+` (one or more)
 * - Locale: `:locale`
 */
export const vueRewrite = <T extends string = string>(
  rules: Record<T, StrictModeLocaleMap<string>>
): RewriteObject => {
  const normalize = (pattern: string) => pattern;
  const strip = (pattern: string) =>
    pattern
      .replace(/\/?(:locale)\/?/g, '/')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '') || '/';

  return {
    url: buildRules(rules as any, (pattern) =>
      cleanPath(strip(normalize(pattern)))
    ),
    vite: buildRules(rules as any, (pattern) => cleanPath(normalize(pattern))), // Vue uses Vite proxy
  };
};

/**
 * Formatter for Nuxt style rewrites.
 * Patterns use Nuxt 3 dynamic routing syntax:
 * - Slug: `[slug]`
 * - Catch-all: `[...slug]`
 * - Locale: `[locale]`
 */
export const nuxtRewrite = <T extends string = string>(
  rules: Record<T, StrictModeLocaleMap<string>>
): RewriteObject => {
  const normalize = (pattern: string) =>
    pattern.replace(/\[([^\]]+)\]/g, ':$1');
  const strip = (pattern: string) =>
    pattern
      .replace(/\/?(:locale|\[locale\])\/?/g, '/')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '') || '/';

  return {
    url: buildRules(rules as any, (pattern) =>
      cleanPath(strip(normalize(pattern)))
    ),
    vite: buildRules(rules as any, (pattern) => cleanPath(normalize(pattern))), // Nuxt uses Vite
  };
};
