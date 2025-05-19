import { Locales, type IntlayerConfig } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Add any other locales you need
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ['.'], // Check content files in the whole application
  },
};

export default config;
