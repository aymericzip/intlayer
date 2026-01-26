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
 * Standardizes pattern to :param syntax.
 * Supports:
 * - Next.js/SvelteKit/Nuxt: [slug], [...slug], [[slug]]
 * - TanStack Router: $slug
 * - Solid Router: *slug
 * - React/Vue Router: :slug, *
 */
const normalizePattern = (pattern: string, framework?: string) => {
  let normalized = pattern;

  if (framework === 'nextjs') {
    normalized = normalized
      .replace(/\[\[\.\.\.([^\]]+)\]\]/g, ':$1*') // [[...slug]] -> :slug* (0+)
      .replace(/\[\.\.\.([^\]]+)\]/g, ':$1+') // [...slug] -> :slug+ (1+)
      .replace(/\[([^\]]+)\]/g, ':$1'); // [slug] -> :slug (1)
  } else if (framework === 'sveltekit') {
    normalized = normalized
      .replace(/\[\.\.\.([^\]]+)\]/g, ':$1*') // [...path] -> :path* (0+)
      .replace(/\[\[([^\]]+)\]\]/g, ':$1?') // [[optional]] -> :optional? (0-1)
      .replace(/\[([^\]]+)\]/g, ':$1'); // [slug] -> :slug (1)
  } else if (framework === 'nuxt') {
    normalized = normalized
      .replace(/\[\.\.\.([^\]]+)\]/g, ':$1*') // [...slug] -> :slug* (0+)
      .replace(/\[([^\]]+)\]/g, ':$1'); // [slug] -> :slug (1)
  } else {
    // Default / Generic (React Router, Vue Router, Solid Router, TanStack Router)
    normalized = normalized
      .replace(/\$([^/]+)/g, ':$1') // TanStack $slug -> :slug
      .replace(/\*([^/]+)/g, ':$1*') // Solid *slug -> :slug*
      .replace(/:([^/]+)\?/g, ':$1?') // Vue Router/React Router :slug? -> :slug?
      .replace(/\*/g, ':path*'); // React Router * -> :path*
  }

  return normalized;
};

/**
 * Removes locale markers from the pattern.
 */
const stripLocale = (pattern: string) =>
  pattern
    .replace(/\/?(:locale|\[locale\]|\$locale)\/?/g, '/')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') || '/';

/**
 * Factory to create formatters that populate 'url' and a specific proxy key.
 */
const createFormatter =
  (proxyKey: 'nextjs' | 'vite', framework?: string) =>
  <T extends string = string>(
    rules: Record<T, StrictModeLocaleMap<string>>
  ): RewriteObject => {
    const normalize = (pattern: string) => normalizePattern(pattern, framework);
    const strip = (pattern: string) => stripLocale(normalize(pattern));

    return {
      url: buildRules(rules as any, (pattern) => cleanPath(strip(pattern))),
      [proxyKey]: buildRules(rules as any, (pattern) =>
        cleanPath(normalize(pattern))
      ),
    } as RewriteObject;
  };

/**
 * Formatter for Next.js style rewrites.
 * Patterns use Next.js dynamic routing syntax:
 * - Slug: `[slug]`
 * - Catch-all: `[...slug]` (1+)
 * - Optional catch-all: `[[...slug]]` (0+)
 * - Locale: `[locale]`
 */
export const nextjsRewrite = createFormatter('nextjs', 'nextjs');

/**
 * Formatter for SvelteKit style rewrites.
 * Patterns use SvelteKit dynamic routing syntax:
 * - Slug: `[slug]`
 * - Catch-all: `[...slug]` (0+)
 * - Locale: `[locale]`
 */
export const svelteKitRewrite = createFormatter('vite', 'sveltekit');

/**
 * Formatter for React Router style rewrites.
 * Patterns use React Router dynamic routing syntax:
 * - Slug: `:slug`
 * - Optional slug: `:slug?`
 * - Catch-all: `*`
 * - Locale: `:locale`
 */
export const reactRouterRewrite = createFormatter('vite');

/**
 * Formatter for Vue style rewrites.
 * Patterns use Vue Router 4 dynamic routing syntax:
 * - Slug: `:slug`
 * - Optional slug: `:slug?`
 * - Catch-all: `:slug*` or `:slug+`
 * - Locale: `:locale`
 */
export const vueRouterRewrite = createFormatter('vite');

/**
 * Formatter for Solid Router style rewrites.
 * Patterns use Solid Router dynamic routing syntax:
 * - Slug: `:slug`
 * - Catch-all: `*slug`
 * - Locale: `:locale`
 */
export const solidRouterRewrite = createFormatter('vite');

/**
 * Formatter for Nuxt style rewrites.
 * Patterns use Nuxt 3 dynamic routing syntax:
 * - Slug: `[slug]`
 * - Catch-all: `[...slug]` (0+)
 * - Locale: `[locale]`
 */
export const nuxtRewrite = createFormatter('vite', 'nuxt');

/**
 * Formatter for TanStack Router style rewrites.
 * Patterns use TanStack Router dynamic routing syntax:
 * - Slug: `$slug`
 * - Catch-all: `*`
 * - Locale: `$locale`
 */
export const tanstackRouterRewrite = createFormatter('vite');

/**
 * Generic formatter for Vite-based projects.
 * Supports most dynamic routing syntaxes and normalizes them for the Vite proxy.
 */
export const viteRewrite = createFormatter('vite');
