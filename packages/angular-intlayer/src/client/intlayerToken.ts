import { InjectionToken, type Signal, signal } from '@angular/core';
import { internationalization } from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

export class IntlayerProvider {
  isCookieEnabled = signal(true);
  private _locale = signal<LocalesValues>(
    internationalization.defaultLocale as LocalesValues
  );

  readonly locale: Signal<LocalesValues> = this._locale.asReadonly();

  setLocale = (locale: LocalesValues) => {
    this._locale.set(locale);
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
  isCookieEnabled = true
): IntlayerProvider => {
  if (instance) return instance;

  instance = new IntlayerProvider();

  if (locale) {
    instance.setLocale(locale);
  }
  instance.isCookieEnabled.set(isCookieEnabled);

  return instance;
};
