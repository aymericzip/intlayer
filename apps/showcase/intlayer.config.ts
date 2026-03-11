import { type IntlayerConfig, type Locale, Locales } from 'intlayer';

export const locales: Locale[] = [
  Locales.ENGLISH,
  Locales.RUSSIAN,
  Locales.JAPANESE,
  Locales.FRENCH,
  Locales.KOREAN,
  Locales.CHINESE,
  Locales.SPANISH,
  Locales.GERMAN,
  Locales.ARABIC,
  Locales.ITALIAN,
  Locales.ENGLISH_UNITED_KINGDOM,
  Locales.PORTUGUESE,
  Locales.HINDI,
  Locales.TURKISH,
  Locales.POLISH,
  Locales.INDONESIAN,
  Locales.VIETNAMESE,
  Locales.UKRAINIAN,
];
export const defaultLocale = Locales.ENGLISH;

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
    strictMode: 'strict',
  },

  content: {
    contentDir: ['./src', '@intlayer/design-system'],
    codeDir: ['src', '@intlayer/design-system'],
  },
  dictionary: {
    importMode: 'dynamic',
  },
  editor: {
    enabled: true,
    liveSync: false,
    dictionaryPriorityStrategy: 'local_first',
    applicationURL: process.env.VITE_SITE_URL,
    // backendURL: process.env.VITE_BACKEND_URL,
    // clientId: process.env.INTLAYER_CLIENT_ID,
    // clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  routing: {
    mode: 'prefix-no-default',
  },
  log: {
    mode: 'verbose',
  },
};

export default config;
