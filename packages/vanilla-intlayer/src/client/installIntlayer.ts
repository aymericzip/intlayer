import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import { useEditor } from '../editor/useEditor';

type LocaleListener = (locale: LocalesValues) => void;

export class IntlayerClient {
  private _locale: LocalesValues;
  private _variant: ProviderVariant | undefined;
  private _listeners: Set<LocaleListener> = new Set();
  isCookieEnabled: boolean;

  constructor(
    locale?: LocalesValues,
    isCookieEnabled = true,
    variant?: ProviderVariant
  ) {
    const { defaultLocale } = internationalization ?? {};

    setIntlayerIdentifier();

    this._locale =
      (locale as LocalesValues) ?? (defaultLocale as LocalesValues);
    this._variant = variant;
    this.isCookieEnabled = isCookieEnabled;
  }

  get locale(): LocalesValues {
    return this._locale;
  }

  /**
   * Ambient variant applied to every dictionary read, the same way `locale` is.
   * Overridden per call by an explicit selector.
   */
  get variant(): ProviderVariant | undefined {
    return this._variant;
  }

  setLocale(newLocale: LocalesValues): void {
    this._locale = newLocale;
    for (const listener of this._listeners) {
      listener(newLocale);
    }
  }

  setVariant(newVariant: ProviderVariant | undefined): void {
    this._variant = newVariant;
    this.notify();
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
  isCookieEnabled = true,
  variant?: ProviderVariant
): IntlayerClient => {
  if (instance) return instance;

  instance = new IntlayerClient(locale, isCookieEnabled, variant);
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
 * Call this once at application startup, before any Intlayer APIs are used.
 *
 * When called with a `config` argument, `window.INTLAYER_CONFIG` is set so
 * that `@intlayer/config/built` resolves the correct values in the browser
 * without requiring module aliasing in the bundler configuration.
 *
 * @param locale - Initial locale (defaults to config defaultLocale).
 * @param isCookieEnabled - Whether to persist locale in cookies/localStorage.
 * @param variant - Ambient variant applied to every dictionary read — for a
 *   dimension fixed for the whole session (tenant, school type, plan tier…)
 *   that no call site should have to pass by hand. Accepts a name
 *   (`'school1'`), an ordered preference chain (`['school1', 'default']`), or a
 *   per-key map (`{ key1: 'school1', default: 'base' }`). A plain object is
 *   always the per-key map; nest a structured variant as
 *   `{ default: { id: 'prod_abc' } }`. A call-site selector always wins.
 * @param config - Optional Intlayer configuration. When provided, sets
 *   `window.INTLAYER_CONFIG` with the browser-safe subset of the config so
 *   the application works without a Vite/webpack plugin alias.
 * @returns The IntlayerClient singleton.
 *
 * @example
 * ```ts
 * import { installIntlayer } from 'vanilla-intlayer';
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
  variant,
}: {
  locale?: LocalesValues;
  isCookieEnabled?: boolean;
  variant?: ProviderVariant;
} = {}): IntlayerClient => {
  const client = createIntlayerClient(locale, isCookieEnabled, variant);

  useEditor();

  return client;
};
