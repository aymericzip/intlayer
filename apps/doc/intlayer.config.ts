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
    enabled: false,
    liveSync: false,
    dictionaryPriorityStrategy: 'local_first',
    applicationURL: process.env.VITE_SITE_URL,
    backendURL: process.env.VITE_BACKEND_URL,
    // clientId: process.env.INTLAYER_CLIENT_ID,
    // clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  routing: {
    mode: 'prefix-no-default',
    // domains: {
    //   'en-GB': 'docs.intlayer.org',
    //   fr: 'docs.intlayer.org',
    //   es: 'docs.intlayer.org',
    //   de: 'docs.intlayer.org',
    //   it: 'docs.intlayer.org',
    //   ru: 'docs.intlayer.org',
    //   ja: 'docs.intlayer.org',
    //   ko: 'docs.intlayer.org',
    //   pt: 'docs.intlayer.org',
    //   hi: 'docs.intlayer.org',
    //   tr: 'docs.intlayer.org',
    //   pl: 'docs.intlayer.org',
    //   id: 'docs.intlayer.org',
    //   vi: 'docs.intlayer.org',
    //   uk: 'docs.intlayer.org',
    //   ar: 'docs.intlayer.org',
    //   zh: 'docs.intlayer.zh',
    // },
  },
  build: { outputFormat: ['esm'] },
  log: {
    mode: 'verbose',
  },
};

export default config;
