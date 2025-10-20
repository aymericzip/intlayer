import { type CustomIntlayerConfig, Locales } from '@intlayer/types';

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: CustomIntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale: Locales.ENGLISH,
    strictMode: 'strict',
  },
};

export default config;
