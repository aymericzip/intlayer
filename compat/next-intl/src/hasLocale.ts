import { internationalization } from '@intlayer/config/built';
import type { hasLocale as _hasLocale } from 'next-intl';

/**
 * Drop-in for next-intl's `hasLocale`.
 *
 * Checks that a locale candidate is part of the given locales list (or, when
 * the list is read from routing, the locales configured in intlayer).
 *
 * @example
 * ```ts
 * import { routing } from '@/i18n/routing';
 *
 * if (hasLocale(routing.locales, requested)) { … }
 * ```
 */
export const hasLocale: typeof _hasLocale = ((
  locales: readonly string[],
  candidate: string | undefined | null
): boolean => {
  const availableLocales =
    locales ?? internationalization?.locales?.map(String) ?? [];
  return availableLocales.includes(candidate as string);
}) as typeof _hasLocale;
