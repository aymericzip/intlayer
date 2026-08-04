import { InjectionToken, type Signal, signal } from '@angular/core';
import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';

export class IntlayerProvider {
  isCookieEnabled = signal(true);
  private _locale = signal<LocalesValues>(
    internationalization.defaultLocale as LocalesValues
  );

  private _variant = signal<ProviderVariant | undefined>(undefined);

  readonly locale: Signal<LocalesValues> = this._locale.asReadonly();

  /**
   * Ambient variant applied to every dictionary read in the app, the same way
   * `locale` is. Overridden per call by an explicit selector.
   */
  readonly variant: Signal<ProviderVariant | undefined> =
    this._variant.asReadonly();

  constructor() {
    setIntlayerIdentifier();
  }

  setLocale = (locale: LocalesValues) => {
    this._locale.set(locale);
  };

  setVariant = (variant: ProviderVariant | undefined) => {
    this._variant.set(variant);
  };
}

export const INTLAYER_TOKEN = new InjectionToken<IntlayerProvider>('intlayer');

/**
 * Singleton instance
 */
let instance: IntlayerProvider | null = null;

/**
 * Create and return a single IntlayerProvider instance
 */
export const createIntlayerClient = (
  locale?: LocalesValues,
  isCookieEnabled = true,
  variant?: ProviderVariant
): IntlayerProvider => {
  if (instance) return instance;

  instance = new IntlayerProvider();

  if (locale) {
    instance.setLocale(locale);
  }
  if (variant !== undefined) {
    instance.setVariant(variant);
  }
  instance.isCookieEnabled.set(isCookieEnabled);

  return instance;
};
