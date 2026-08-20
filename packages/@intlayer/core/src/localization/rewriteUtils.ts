import { internationalization } from '@intlayer/config/built';
import type {
  RewriteObject,
  RewriteRules,
  RoutingConfig,
} from '@intlayer/types/config';
import type {
  LocalesValues,
  ResolvedDefaultLocale,
} from '@intlayer/types/module_augmentation';

/**
 * Outcome of resolving a canonical path against the rewrite rules.
 *
 * Discriminated on `isRewritten`: when no rule matched, `path` is the very
 * input that was passed in, so a literal input keeps its literal type. Only a
 * rewritten path is computed at runtime and therefore widens to `string`.
 */
export type LocalizedPathResult<CanonicalPath extends string = string> =
  | { path: CanonicalPath; isRewritten: false }
  | { path: string; isRewritten: true };

/** Adds the leading slash a path may be missing. */
type WithLeadingSlash<Path extends string> = Path extends `/${string}`
  ? Path
  : `/${Path}`;

/**
 * Computes the locale-prefixed internal path for a path and a locale, mirroring
 * `getInternalPath`'s runtime behaviour: an already-prefixed path is returned
 * untouched, the root collapses to `/${Locale}` (never a trailing slash), and
 * anything else gets the prefix prepended.
 *
 * Falls back to `string` for a non-literal path, where the prefixed and
 * already-prefixed cases cannot be told apart.
 *
 * @example
 * type A = InternalPath<'/about', 'fr'>;    // '/fr/about'
 * type B = InternalPath<'/', 'fr'>;         // '/fr'
 * type C = InternalPath<'/fr/about', 'fr'>; // '/fr/about' (already prefixed)
 */
export type InternalPath<
  Path extends string,
  Locale extends string,
> = string extends Path
  ? string
  : WithLeadingSlash<Path> extends infer Prefixed extends string
    ? Prefixed extends `/${Locale}` | `/${Locale}/${string}`
      ? Prefixed
      : Prefixed extends '/'
        ? `/${Locale}`
        : `/${Locale}${Prefixed}`
    : never;

/**
 * Normalizes legacy Record format or extracts specialized rules from RewriteObject.
 *
 * Idempotent: already-normalized rules are handed back untouched, so a caller
 * holding resolved rules can pass them on without re-normalizing.
 */
export const getRewriteRules = <
  const Context extends keyof RewriteObject = 'url',
>(
  rewrite: RoutingConfig['rewrite'] | RewriteRules,
  context: Context = 'url' as Context
): RewriteRules | undefined => {
  if (
    !rewrite ||
    (process.env.INTLAYER_ROUTING_REWRITE_RULES &&
      process.env.INTLAYER_ROUTING_REWRITE_RULES === 'false')
  )
    return undefined;

  if (Array.isArray((rewrite as RewriteRules).rules)) {
    return rewrite as RewriteRules;
  }

  if ('url' in rewrite) {
    return (rewrite as RewriteObject)[context];
  }

  // Normalize legacy format
  const legacyRules = rewrite as Record<string, Record<string, string>>;

  return {
    rules: Object.entries(legacyRules).map(([canonical, localized]) => ({
      // Normalize canonical path
      canonical: canonical.startsWith('/')
        ? canonical.replace(/\[([^\]]+)\]/g, ':$1')
        : `/${canonical.replace(/\[([^\]]+)\]/g, ':$1')}`,

      // Normalize localized path
      localized: Object.fromEntries(
        Object.entries(localized).map(([locale, pattern]) => {
          const normalizedPattern = pattern?.startsWith('/')
            ? pattern.replace(/\[([^\]]+)\]/g, ':$1')
            : `/${(pattern || '').replace(/\[([^\]]+)\]/g, ':$1')}`;
          return [locale, normalizedPattern];
        })
      ),
    })),
  };
};

/**
 * Converts normalized pattern to Regex.
 * Internal syntax supports:
 * - :param -> ([^/]+) (one segment)
 * - :param* -> (.*) (zero or more segments)
 * - :param+ -> (.+) (one or more segments)
 * - :param? -> ([^/]*) (zero or one segment)
 */
const patternToRegex = (pattern: string) => {
  const regexString = pattern
    .replace(/\//g, '\\/') // Escape slashes
    .replace(/\\\/:(?:[^/\\*+?]+)\*/g, '(?:\\/(.*))?') // /:param*
    .replace(/\\\/:(?:[^/\\*+?]+)\?/g, '(?:\\/([^\\/]+))?') // /:param?
    .replace(/:([^/\\*+?]+)\*/g, '(.*)') // :param* (if no leading slash)
    .replace(/:([^/\\*+?]+)\?/g, '([^\\/]*)') // :param? (if no leading slash)
    .replace(/:([^/\\*+?]+)\+/g, '(.+)') // :param+
    .replace(/:([^/\\*+?]+)/g, '([^\\/]+)'); // :param

  return new RegExp(`^${regexString}$`);
};

/**
 * Replaces route parameters in a path with provided values.
 */
const fillPath = (pattern: string, params: string[]) => {
  let index = 0;
  return (
    pattern
      .replace(/:([^/\\*+?]+)[*+?]?/g, () => params[index++] ?? '')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '') || '/'
  );
};

/**
 * Extract values from a URL based on a pattern.
 */
const extractParams = (url: string, pattern: string): string[] | null => {
  const regex = patternToRegex(pattern);
  const match = url.match(regex);
  return match ? match.slice(1) : null;
};

/**
 * Given a localized URL (e.g., "/produits/123"), finds the canonical internal path (e.g., "/products/123").
 * If locale is provided, only check for that locale. Otherwise, check for all locales.
 */
export const getCanonicalPath = <
  const Path extends string,
  const Locale extends LocalesValues = LocalesValues,
>(
  localizedPath: Path,
  locale?: Locale,
  rewriteRules?: RewriteRules
): string => {
  if (
    !rewriteRules ||
    (process.env.INTLAYER_ROUTING_REWRITE_RULES &&
      process.env.INTLAYER_ROUTING_REWRITE_RULES === 'false')
  )
    return localizedPath;

  for (const rule of rewriteRules.rules) {
    const { canonical, localized } = rule;
    const localesToCheck = locale ? [locale] : Object.keys(localized);

    for (const loc of localesToCheck) {
      const localizedPattern = localized[loc as keyof typeof localized];

      if (!localizedPattern) continue;

      const params = extractParams(localizedPath, localizedPattern);

      if (params) {
        return fillPath(canonical, params);
      }
    }
  }

  return localizedPath;
};

/**
 * Given a canonical path (e.g., "/products/123"), finds the localized URL pattern
 * (e.g., "/produits/123") and reports whether a rule actually matched.
 *
 * Takes already-normalized rules, so callers that resolve the rules once (proxies,
 * static emitters) can reuse them. {@link getLocalizedPath} is the user-facing
 * counterpart: it accepts the raw `routing.rewrite` configuration, defaults to the
 * project configuration, and returns the path alone.
 *
 * @param canonicalPath - The internal application path (e.g. `/product/:id`, `/about`).
 * @param locale - The target locale. Defaults to the configured default locale.
 * @param rewriteRules - Normalized rules, as returned by {@link getRewriteRules}.
 * @returns The localized path, discriminated on whether a rewrite rule matched.
 */
export const resolveLocalizedPath = <
  const CanonicalPath extends string,
  const Locale extends LocalesValues = ResolvedDefaultLocale,
>(
  canonicalPath: CanonicalPath,
  locale?: Locale,
  rewriteRules?: RewriteRules
): LocalizedPathResult<CanonicalPath> => {
  if (
    !rewriteRules ||
    (process.env.INTLAYER_ROUTING_REWRITE_RULES &&
      process.env.INTLAYER_ROUTING_REWRITE_RULES === 'false')
  )
    return { path: canonicalPath, isRewritten: false };

  for (const rule of rewriteRules.rules) {
    const { canonical, localized } = rule;

    // Check if the input path matches a configured canonical pattern
    const params = extractParams(canonicalPath, canonical);

    if (params) {
      const targetLocale = locale ?? internationalization.defaultLocale;
      const targetPattern = localized[targetLocale as keyof typeof localized];

      if (targetPattern) {
        return {
          path: fillPath(targetPattern, params),
          isRewritten: true,
        };
      }
    }
  }

  return { path: canonicalPath, isRewritten: false };
};

/**
 * Returns the internal path for a given canonical path and locale.
 * Ensures the locale prefix is present exactly once.
 */
export const getInternalPath = <
  const Path extends string,
  const Locale extends LocalesValues,
>(
  canonicalPath: Path,
  locale: Locale
): InternalPath<Path, Locale> => {
  const pathWithLeadingSlash = canonicalPath.startsWith('/')
    ? canonicalPath
    : `/${canonicalPath}`;

  if (
    pathWithLeadingSlash.startsWith(`/${locale}/`) ||
    pathWithLeadingSlash === `/${locale}`
  ) {
    return pathWithLeadingSlash as InternalPath<Path, Locale>;
  }

  return `/${locale}${
    pathWithLeadingSlash === '/' ? '' : pathWithLeadingSlash
  }` as InternalPath<Path, Locale>;
};

/**
 * Given a current pathname and locale, returns the pretty localized path if a rewrite rule exists and the path is not already localized.
 */
export const getRewritePath = <
  const Path extends string,
  const Locale extends LocalesValues = ResolvedDefaultLocale,
>(
  pathname: Path,
  locale: Locale,
  rewrite?: RoutingConfig['rewrite']
): string | undefined => {
  if (
    process.env.INTLAYER_ROUTING_REWRITE_RULES &&
    process.env.INTLAYER_ROUTING_REWRITE_RULES === 'false'
  )
    return undefined;
  const rules = getRewriteRules(rewrite, 'url');
  if (!rules) return undefined;

  // Identify canonical path (relative to root, no locale prefix expected in 'url' context)
  const canonicalPath = getCanonicalPath(pathname, undefined, rules);

  // Get the localized path for the current locale
  const { path: localizedPath, isRewritten } = resolveLocalizedPath(
    canonicalPath,
    locale,
    rules
  );

  if (isRewritten && localizedPath !== pathname) {
    return localizedPath;
  }

  return undefined;
};
