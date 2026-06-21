import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { cache } from 'react';

/**
 * Request-scoped holder for the locale provided through {@link setRequestLocale}.
 *
 * next-intl resolves the active locale per request from the `[locale]` route
 * segment, which the app forwards via `setRequestLocale(locale)`. React's
 * `cache()` gives a per-request singleton (the same trick next-intl uses in its
 * own `RequestLocaleCache`), so the value set in the layout/page is readable by
 * the other server APIs (`getLocale`, `getTranslations`, …) during the same
 * render.
 *
 * @see https://github.com/vercel/next.js/discussions/58862
 */
const getRequestLocaleHolder = cache((): { locale?: LocalesValues } => ({
  locale: undefined,
}));

/**
 * Read the locale stored for the current request, or `undefined` when
 * `setRequestLocale` has not been called.
 */
export const getCachedRequestLocale = (): LocalesValues | undefined =>
  getRequestLocaleHolder().locale;

/**
 * Store the locale for the current request. Called by `setRequestLocale`.
 *
 * @param locale - The locale resolved from the `[locale]` route segment.
 */
export const setCachedRequestLocale = (locale: LocalesValues): void => {
  getRequestLocaleHolder().locale = locale;
};
