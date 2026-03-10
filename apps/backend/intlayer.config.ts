import type { CustomIntlayerConfig } from '@intlayer/types/config';
import type { Locale } from '@intlayer/types/allLocales';
import * as Locales from '@intlayer/types/locales';

export const locales: Locale[] = [
  Locales.ENGLISH,
  Locales.FRENCH,
  Locales.SPANISH,
];

const config: CustomIntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale: Locales.ENGLISH,
    strictMode: 'strict',
  },
};

export default config;
