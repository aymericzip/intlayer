import type { CustomIntlayerConfig } from '@intlayer/types/config';
import * as Locales from '@intlayer/types/locales';

/** Configuration used by the unit tests of this package only. */
const config: CustomIntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ['./src'],
  },
  log: {
    mode: 'disabled',
  },
};

export default config;
