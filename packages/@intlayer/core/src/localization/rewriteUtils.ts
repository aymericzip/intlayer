import type {
  Locale,
  RewriteObject,
  RewriteRules,
  RoutingConfig,
} from '@intlayer/types';

export type LocalizedPathResult = {
  path: string;
  isRewritten: boolean;
};

/**
 * Normalizes legacy Record format or extracts specialized rules from RewriteObject.
 */
export const getRewriteRules = (
  rewrite: RoutingConfig['rewrite'],
  context: keyof RewriteObject = 'url'
): RewriteRules | undefined => {
  if (!rewrite) return undefined;

  if ('url' in rewrite) {
    return (rewrite as RewriteObject)[context];
  }

  // Normalize legacy format
  return {
    rules: Object.entries(rewrite).map(([canonical, localized]) => ({
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
export const getCanonicalPath = (
  localizedPath: string,
  locale?: Locale,
  rewriteRules?: RewriteRules
): string => {
  if (!rewriteRules) return localizedPath;

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
 * Given a canonical path (e.g., "/products/123"), finds the localized URL pattern (e.g., "/produits/123").
 */
export const getLocalizedPath = (
  canonicalPath: string,
  locale: Locale,
  rewriteRules?: RewriteRules
): LocalizedPathResult => {
  if (!rewriteRules) return { path: canonicalPath, isRewritten: false };

  for (const rule of rewriteRules.rules) {
    const { canonical, localized } = rule;

    // Check if the input path matches a configured canonical pattern
    const params = extractParams(canonicalPath, canonical);

    if (params) {
      const targetPattern = localized[locale as keyof typeof localized];

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
export const getInternalPath = (
  canonicalPath: string,
  locale: Locale
): string => {
  const pathWithLeadingSlash = canonicalPath.startsWith('/')
    ? canonicalPath
    : `/${canonicalPath}`;

  if (
    pathWithLeadingSlash.startsWith(`/${locale}/`) ||
    pathWithLeadingSlash === `/${locale}`
  ) {
    return pathWithLeadingSlash;
  }

  return `/${locale}${pathWithLeadingSlash === '/' ? '' : pathWithLeadingSlash}`;
};

/**
 * Given a current pathname and locale, returns the pretty localized path if a rewrite rule exists and the path is not already localized.
 */
export const getRewritePath = (
  pathname: string,
  locale: Locale,
  rewrite?: RoutingConfig['rewrite']
): string | undefined => {
  const rules = getRewriteRules(rewrite, 'url');
  if (!rules) return undefined;

  // Identify canonical path (relative to root, no locale prefix expected in 'url' context)
  const canonicalPath = getCanonicalPath(pathname, undefined, rules);

  // Get the localized path for the current locale
  const { path: localizedPath, isRewritten } = getLocalizedPath(
    canonicalPath,
    locale,
    rules
  );

  if (isRewritten && localizedPath !== pathname) {
    return localizedPath;
  }

  return undefined;
};
