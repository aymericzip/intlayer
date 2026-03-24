import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    enabled: true,
    applicationURL: 'http://localhost:5173',
    editorURL: 'http://localhost:8000',
  },
  dictionary: {
    importMode: 'dynamic',
  },
};

export default config;
