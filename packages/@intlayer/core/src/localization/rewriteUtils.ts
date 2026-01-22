import configuration from '@intlayer/config/built';
import type { Locale, RoutingConfig } from '@intlayer/types';

/**
 * Helper to convert Next.js dynamic path "[param]" to Regex "([^/]+)"
 */
const pathFormatToRegex = (path: string) =>
  new RegExp(`^${path.replace(/\[([^\]]+)\]/g, '([^/]+)')}$`);

/**
 * Replaces route parameters in a path with provided values.
 * Ex: fillPath('/products/[id]', ['123']) -> '/products/123'
 */
const fillPath = (path: string, params: string[]) => {
  let index = 0;
  return path.replace(/\[([^\]]+)\]/g, () => params[index++] || '');
};

/**
 * Extract values from a URL based on a pattern.
 * Ex: extractParams('/products/123', '/products/[id]') -> ['123']
 */
const extractParams = (url: string, pattern: string): string[] | null => {
  const regex = pathFormatToRegex(pattern);
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
  rewriteRules?: RoutingConfig['rewrite']
): string => {
  const rewrite = rewriteRules ?? configuration?.routing?.rewrite;

  if (!rewrite) return localizedPath;

  for (const [canonicalPattern, rules] of Object.entries(rewrite)) {
    const localesToCheck = locale ? [locale] : Object.keys(rules);

    for (const loc of localesToCheck) {
      const localizedPattern = rules[loc as keyof typeof rules];

      if (!localizedPattern) continue;

      // Check if the current URL matches this localized pattern
      const params = extractParams(localizedPath, localizedPattern);

      if (params) {
        // Reconstruct the canonical URL using the extracted params
        return fillPath(canonicalPattern, params);
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
  rewriteRules?: RoutingConfig['rewrite']
): string => {
  const rewrite = rewriteRules ?? configuration?.routing?.rewrite;

  if (!rewrite) return canonicalPath;

  for (const [canonicalPattern, rules] of Object.entries(rewrite)) {
    // Check if the input path matches a configured canonical pattern
    const params = extractParams(canonicalPath, canonicalPattern);

    if (params) {
      const targetPattern = rules[locale as keyof typeof rules];
      if (targetPattern) {
        return fillPath(targetPattern, params);
      }
    }
  }

  return canonicalPath;
};
