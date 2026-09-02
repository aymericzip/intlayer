import { routing } from '@intlayer/config/built';
import type { RewriteRules, RoutingConfig } from '@intlayer/types/config';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { extractParams, fillPath, getRewriteRules } from './rewriteMatch';

/**
 * Decodes percent-encoding so an encoded pathname
 * (`/doc/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9/v8`, as `URL.pathname` and the
 * router hand it over) matches a rewrite pattern written with its literal
 * characters (`/doc/リリース/v8`). Reserved delimiters stay encoded, and a path
 * with no escape — or a malformed one — is returned untouched.
 */
const decodePath = (path: string): string => {
  if (!path.includes('%')) return path;

  try {
    return decodeURI(path);
  } catch {
    return path;
  }
};

/**
 * Given a localized URL (e.g., "/produits/123"), finds the canonical internal path (e.g., "/products/123").
 * If locale is provided, only check for that locale. Otherwise, check for all locales.
 *
 * The lookup is encoding-insensitive: a percent-encoded path matches a pattern
 * written with literal (non-ASCII) characters.
 *
 * @param localizedPath - The path as seen in the browser, without locale prefix.
 * @param locale - Restricts the lookup to that locale's rules. Defaults to every locale.
 * @param rewriteRules - Raw `routing.rewrite` configuration or already-normalized
 *   rules. Defaults to the project configuration's `routing.rewrite`.
 */
export const getCanonicalPath = <
  const Path extends string,
  const Locale extends LocalesValues = LocalesValues,
>(
  localizedPath: Path,
  locale?: Locale,
  rewriteRules?: RoutingConfig['rewrite'] | RewriteRules
): string => {
  const rules = getRewriteRules(rewriteRules ?? routing?.rewrite, 'url');

  if (
    !rules ||
    (process.env.INTLAYER_ROUTING_REWRITE_RULES &&
      process.env.INTLAYER_ROUTING_REWRITE_RULES === 'false')
  )
    return localizedPath;

  const pathToMatch = decodePath(localizedPath);

  for (const rule of rules.rules) {
    const { canonical, localized } = rule;
    const localesToCheck = locale ? [locale] : Object.keys(localized);

    for (const locale of localesToCheck) {
      const localizedPattern = localized[locale as keyof typeof localized];

      if (!localizedPattern) continue;

      const params = extractParams(pathToMatch, localizedPattern);

      if (params) {
        return fillPath(canonical, params);
      }
    }
  }

  return localizedPath;
};
