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
  routing: {
    mode: 'prefix-no-default',
  },
  log: {
    mode: 'verbose',
  },
};

export default config;
