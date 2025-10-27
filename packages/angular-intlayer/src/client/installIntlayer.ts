import { Injectable, InjectionToken, type Signal, signal } from '@angular/core';
import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';

export const INTLAYER_TOKEN = new InjectionToken<IntlayerProvider>('intlayer');

/**
 * Singleton instance
 */
let instance: IntlayerProvider | null = null;

@Injectable({
  providedIn: 'root',
})
export class IntlayerProvider {
  isCookieEnabled = signal(true);
  private _locale = signal<LocalesValues>(
    configuration.internationalization?.defaultLocale as LocalesValues
  );

  readonly locale: Signal<LocalesValues> = this._locale.asReadonly();

  setLocale = (locale: LocalesValues) => {
    this._locale.set(locale);
  };
}

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

/**
 * Helper to install the Intlayer provider
 */
export const installIntlayer = (
  locale?: LocalesValues,
  isCookieEnabled = true
) => {
  const client = createIntlayerClient(locale, isCookieEnabled);

  // Note: Angular editor installation will be handled differently
  // installIntlayerEditor();

  return client;
};
