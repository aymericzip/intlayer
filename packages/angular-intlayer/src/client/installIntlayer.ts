import type { LocalesValues } from '@intlayer/types/module_augmentation';
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
  isCookieEnabled = true
) => {
  const client = installIntlayer(locale, isCookieEnabled);

  return [
    { provide: INTLAYER_TOKEN, useValue: client },
    provideIntlayerEditor(client),
  ];
};

/**
 * Helper to install the Intlayer provider.
 */
export const installIntlayer = (
  locale?: LocalesValues,
  isCookieEnabled = true
) => {
  return createIntlayerClient(locale, isCookieEnabled);
};
