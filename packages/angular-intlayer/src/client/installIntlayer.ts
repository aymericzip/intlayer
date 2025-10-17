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
