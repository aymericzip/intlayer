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
    //   'en-GB': 'showcase.intlayer.org',
    //   fr: 'showcase.intlayer.org',
    //   es: 'showcase.intlayer.org',
    //   de: 'showcase.intlayer.org',
    //   it: 'showcase.intlayer.org',
    //   ru: 'showcase.intlayer.org',
    //   ja: 'showcase.intlayer.org',
    //   ko: 'showcase.intlayer.org',
    //   pt: 'showcase.intlayer.org',
    //   hi: 'showcase.intlayer.org',
    //   tr: 'showcase.intlayer.org',
    //   pl: 'showcase.intlayer.org',
    //   id: 'showcase.intlayer.org',
    //   vi: 'showcase.intlayer.org',
    //   uk: 'showcase.intlayer.org',
    //   ar: 'showcase.intlayer.org',
    //   zh: 'showcase.intlayer.zh',
    // },
  },
  build: {
    optimize: true,
  },
  log: {
    mode: 'verbose',
  },
  compiler: {
    output: ({ fileName }) => `./${fileName}.content.ts`,
  },
};

export default config;
