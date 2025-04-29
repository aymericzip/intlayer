import type { LocalesValues } from '@intlayer/config/client';

export interface IntlayerProvider {
  locale: {
    value: LocalesValues;
  };
  setLocale: (locale: LocalesValues) => void;
}
