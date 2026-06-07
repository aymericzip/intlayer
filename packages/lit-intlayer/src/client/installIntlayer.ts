import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { useEditor } from '../editor/useEditor';
import { createIntlayerClient, type IntlayerClient } from './IntlayerClient';

/**
 * Install Intlayer into your Lit application.
 *
 * Call this once at application startup before any Lit elements are rendered.
 *
 * When called with a `config` argument, `window.INTLAYER_CONFIG` is set so
 * that `@intlayer/config/built` resolves the correct values in the browser
 * without requiring module aliasing in the bundler configuration.
 *
 * @param locale - Initial locale (defaults to config defaultLocale).
 * @param isCookieEnabled - Whether to persist locale in cookies/localStorage.
 * @param config - Optional Intlayer configuration. When provided, sets
 *   `window.INTLAYER_CONFIG` with the browser-safe subset of the config so
 *   the application works without a Vite/webpack plugin alias.
 * @returns The IntlayerClient singleton.
 *
 * @example
 * ```ts
 * import { installIntlayer } from 'lit-intlayer';
 *
 * // With explicit config (no build plugin alias needed):
 * installIntlayer('en', true, {
 *   internationalization: { locales: ['en', 'fr'], defaultLocale: 'en' },
 * });
 *
 * // With build plugin (alias handles config automatically):
 * installIntlayer('en');
 * ```
 */
export const installIntlayer = ({
  locale,
  isCookieEnabled,
}: {
  locale?: LocalesValues;
  isCookieEnabled?: boolean;
} = {}): IntlayerClient => {
  const client = createIntlayerClient(locale, isCookieEnabled);

  useEditor();

  return client;
};
