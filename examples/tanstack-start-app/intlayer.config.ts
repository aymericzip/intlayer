import type { IntlayerConfig } from 'intlayer';

import { Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
  },
};

export default config;
