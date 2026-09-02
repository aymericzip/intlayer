import type {
  RewriteObject,
  RewriteRules,
  RoutingConfig,
} from '@intlayer/types/config';

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
export const fillPath = (pattern: string, params: string[]) => {
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
export const extractParams = (
  url: string,
  pattern: string
): string[] | null => {
  const regex = patternToRegex(pattern);
  const match = url.match(regex);
  return match ? match.slice(1) : null;
};
