import type { AllMessages, I18n, Locale, Locales } from '@lingui/core';
import { I18nClass } from './I18nClass';

/** Mirrors the unexported `I18nProps` type from `@lingui/core`. */
type I18nProps = {
  locale?: Locale;
  locales?: Locales;
  messages?: AllMessages;
  missing?: string | ((locale: string, id: string) => string);
};

/**
 * Drop-in for `@lingui/core`'s `setupI18n`.
 *
 * Creates a new intlayer-backed `I18n` instance. The `messages` and
 * `missing` properties from `params` are accepted for API compatibility
 * but are ignored — messages are served by intlayer's compiled dictionaries.
 *
 * @example
 * ```ts
 * import { setupI18n } from '@lingui/core';
 *
 * const i18n = setupI18n({ locale: 'en' });
 * i18n.activate('fr');
 * ```
 */
export const setupI18n = (params?: I18nProps): I18n =>
  new I18nClass(params) as unknown as I18n;

/**
 * Global `i18n` singleton — drop-in for `@lingui/core`'s `i18n`.
 *
 * Call `i18n.activate(locale)` to set the active locale before rendering.
 * In React apps, prefer using `useLingui()` inside components so that
 * locale updates are handled reactively via `I18nProvider`.
 */
export const i18n: I18n = setupI18n({ locale: 'en' });
