import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

type LocaleListener = (locale: LocalesValues) => void;

export class IntlayerClient {
  private _locale: LocalesValues;
  private _listeners: Set<LocaleListener> = new Set();
  isCookieEnabled: boolean;

  constructor(locale?: LocalesValues, isCookieEnabled = true) {
    const { defaultLocale } = configuration.internationalization ?? {};
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

  /**
   * Fire all listeners with the current locale without changing it.
   * Used to trigger re-renders after async data loads.
   */
  notify(): void {
    for (const listener of this._listeners) {
      listener(this._locale);
    }
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
 * Install Intlayer into your vanilla JS application.
 *
 * Call this once at application startup.
 *
 * @param locale - Initial locale (defaults to config defaultLocale).
 * @param isCookieEnabled - Whether to persist locale in cookies/localStorage.
 * @returns The IntlayerClient singleton.
 *
 * @example
 * ```ts
 * import { installIntlayer } from 'vanilla-intlayer';
 *
 * installIntlayer('en');
 * ```
 */
export const installIntlayer = (
  locale?: LocalesValues,
  isCookieEnabled = true
): IntlayerClient => createIntlayerClient(locale, isCookieEnabled);
