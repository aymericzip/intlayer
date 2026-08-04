import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import { provideIntlayerAnalytics } from '../analytics/useAnalytics';
import { provideIntlayerEditor } from '../editor/useEditor';
import {
  createIntlayerClient,
  INTLAYER_TOKEN,
  IntlayerProvider,
} from './intlayerToken';

export { createIntlayerClient, INTLAYER_TOKEN, IntlayerProvider };

/**
 * Provides Intlayer to your Angular application.
 *
 * Registers the Intlayer locale token **and** automatically starts the Intlayer
 * editor client (when the editor is enabled) via `provideAppInitializer`.
 *
 * This is the recommended way to set up Intlayer in `app.config.ts`.
 *
 * @param locale - Initial locale to use.
 * @param isCookieEnabled - Whether to store the locale in cookies.
 * @param variant - Ambient variant applied to every dictionary read in the app
 *   — for a dimension fixed for the whole session (tenant, school type, plan
 *   tier…) that no component should have to pass by hand. Accepts a name
 *   (`'school1'`), an ordered preference chain (`['school1', 'default']`), or a
 *   per-key map (`{ key1: 'school1', default: 'base' }`). A plain object is
 *   always the per-key map; nest a structured variant as
 *   `{ default: { id: 'prod_abc' } }`. A call-site selector always wins.
 * @returns An array of Angular providers for Intlayer.
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { ApplicationConfig } from '@angular/core';
 * import { provideIntlayer } from 'angular-intlayer';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideIntlayer()],
 * };
 * ```
 */
export const provideIntlayer = (
  locale?: LocalesValues,
  isCookieEnabled = true,
  variant?: ProviderVariant
) => {
  const client = installIntlayer(locale, isCookieEnabled, variant);

  return [
    { provide: INTLAYER_TOKEN, useValue: client },
    provideIntlayerEditor(client),
    provideIntlayerAnalytics(client),
  ];
};

/**
 * Helper to install the Intlayer provider.
 */
export const installIntlayer = (
  locale?: LocalesValues,
  isCookieEnabled = true,
  variant?: ProviderVariant
) => {
  return createIntlayerClient(locale, isCookieEnabled, variant);
};
