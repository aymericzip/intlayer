import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { setRequestLocale as _setRequestLocale } from 'next-intl/server';
import { setCachedRequestLocale } from './requestLocaleCache';

/**
 * Drop-in for next-intl's `setRequestLocale`.
 *
 * In next-intl this stores the locale (typically the `[locale]` route segment)
 * in a request-scoped cache so the rest of the request can render in that
 * locale and opt into static rendering. The compat keeps the same contract:
 * the locale is stored per-request and read back by `getLocale()` (and, through
 * it, `getTranslations` / `getDictionary` / metadata). This is what makes the
 * per-request locale — and therefore the locale switcher — work without relying
 * on a cookie.
 *
 * @param locale - The locale resolved from the `[locale]` route segment.
 *
 * @example
 * ```ts
 * export default async function LocaleLayout({ params }) {
 *   const { locale } = await params;
 *   setRequestLocale(locale);
 *   // …
 * }
 * ```
 */
export const setRequestLocale: typeof _setRequestLocale = (locale): void => {
  setCachedRequestLocale(locale as LocalesValues);
};
