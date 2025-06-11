import { Injectable, InjectionToken, signal, Signal } from '@angular/core';
import configuration from '@intlayer/config/built';
import type { Locales, LocalesValues } from '@intlayer/config/client';

export const INTLAYER_TOKEN = new InjectionToken<IntlayerProvider>('intlayer');

/**
 * Singleton instance
 */
let instance: IntlayerProvider | null = null;

@Injectable({
  providedIn: 'root',
})
export class IntlayerProvider {
  private _locale = signal<Locales>(
    configuration.internationalization?.defaultLocale as Locales
  );

  readonly locale: Signal<Locales> = this._locale.asReadonly();

  setLocale = (locale: LocalesValues) => {
    this._locale.set(locale as Locales);
  };
}

/**
 * Create and return a single IntlayerProvider instance
 */
export const createIntlayerClient = (
  locale?: LocalesValues
): IntlayerProvider => {
  if (instance) return instance;

  instance = new IntlayerProvider();

  if (locale) {
    instance.setLocale(locale);
  }

  return instance;
};

/**
 * Helper to install the Intlayer provider
 */
export const installIntlayer = (locale?: LocalesValues) => {
  const client = createIntlayerClient(locale);

  // Note: Angular editor installation will be handled differently
  // installIntlayerEditor();

  return client;
};
