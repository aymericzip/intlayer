import { internationalization } from '@intlayer/config/built';
import type { hasLocale as _hasLocale } from 'use-intl';

/**
 * Drop-in for use-intl's `hasLocale`.
 *
 * Narrows a locale candidate to the given locales list. When the list is
 * omitted, the locales configured in intlayer are used.
 *
 * @example
 * ```ts
 * if (hasLocale(['en', 'fr'], requested)) { … }
 * ```
 */
export const hasLocale: typeof _hasLocale = ((
  locales: readonly string[],
  candidate: unknown
): boolean => {
  const availableLocales =
    locales ?? internationalization?.locales?.map(String) ?? [];
  return availableLocales.includes(candidate as string);
}) as typeof _hasLocale;
