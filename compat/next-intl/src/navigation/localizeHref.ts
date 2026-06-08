import { getLocalizedUrl } from '@intlayer/core/localization';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * A `next-intl` navigation href: either a pathname string or an object with a
 * `pathname` and optional `query`. The `pathnames` (typed routes) feature is
 * accepted for API compatibility but not interpolated.
 */
export type NextIntlHref =
  | string
  | {
      pathname: string;
      query?: Record<string, string | number | (string | number)[]>;
      params?: Record<string, string | number | (string | number)[]>;
    };

/**
 * Prefix a `next-intl` href with the given locale using Intlayer's
 * `getLocalizedUrl`, preserving any query parameters.
 *
 * @param href - The target href (string or `{ pathname, query }`).
 * @param locale - The locale to localize the href for.
 * @returns The localized URL string.
 */
export const localizeHref = (href: NextIntlHref, locale: string): string => {
  const pathname = typeof href === 'string' ? href : href.pathname;
  const localizedPathname = getLocalizedUrl(pathname, locale as LocalesValues);

  if (typeof href === 'string' || !href.query) {
    return localizedPathname;
  }

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(href.query)) {
    if (Array.isArray(value)) {
      for (const entry of value) {
        searchParams.append(key, String(entry));
      }
    } else {
      searchParams.append(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString
    ? `${localizedPathname}?${queryString}`
    : localizedPathname;
};
