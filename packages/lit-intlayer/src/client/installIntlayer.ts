import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { useEditor } from '../editor/useEditor';

type LocaleListener = (locale: LocalesValues) => void;

export class IntlayerClient {
  private _locale: LocalesValues;
  private _listeners: Set<LocaleListener> = new Set();
  isCookieEnabled: boolean;

  constructor(locale?: LocalesValues, isCookieEnabled = true) {
    const { defaultLocale } = internationalization ?? {};

    this._locale =
      (locale as LocalesValues) ?? (defaultLocale as LocalesValues);
    this.isCookieEnabled = isCookieEnabled;
  }

  get locale(): LocalesValues {
    return this._locale;
  }

  setLocale(newLocale: LocalesValues): void {
    this._locale = newLocale;
    for (const listener of this._listeners) {
      listener(newLocale);
    }
  }

  subscribe(listener: LocaleListener): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }
}

/**
 * Singleton instance
 */
let instance: IntlayerClient | null = null;

/**
 * Create and return a single IntlayerClient instance.
 */
export const createIntlayerClient = (
  locale?: LocalesValues,
  isCookieEnabled = true
): IntlayerClient => {
  if (instance) return instance;
  setIntlayerIdentifier();
  instance = new IntlayerClient(locale, isCookieEnabled);
  return instance;
};

/**
 * Get the current IntlayerClient instance, creating one with defaults if needed.
 */
export const getIntlayerClient = (): IntlayerClient => {
  if (!instance) {
    instance = new IntlayerClient();
  }
  return instance;
};

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
