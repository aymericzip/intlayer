import { internationalization } from '@intlayer/config/built';
import type { I18n } from '@lingui/core';
import { I18nClass, type I18nProps } from './I18nClass';
import { createRegistryResolver } from './registryLookup';

/**
 * Drop-in for `@lingui/core`'s `setupI18n`.
 *
 * Creates a new intlayer-backed `I18n` instance. `variables` and `formatters`
 * behave as in lingui; `messages` is only a runtime fallback, since messages
 * are served by intlayer's compiled dictionaries.
 *
 * @example
 * ```ts
 * import { setupI18n } from '@lingui/core';
 *
 * const i18n = setupI18n({ locale: 'en' });
 * i18n.activate('fr');
 * ```
 */
export const setupI18n = (params?: Omit<I18nProps, 'registry'>): I18n =>
  new I18nClass({
    ...params,
    // Unoptimized entry point: resolution must reach the dictionary registry.
    registry: createRegistryResolver(),
  }) as unknown as I18n;

/**
 * Global `i18n` singleton — drop-in for `@lingui/core`'s `i18n`.
 *
 * Call `i18n.activate(locale)` to set the active locale before rendering.
 * In React apps, prefer using `useLingui()` inside components so that
 * locale updates are handled reactively via `I18nProvider`.
 */
export const i18n: I18n = setupI18n({
  locale: internationalization.defaultLocale,
});
