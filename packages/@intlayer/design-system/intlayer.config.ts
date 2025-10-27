import {
  type CustomIntlayerConfig,
  type Locale,
  Locales,
} from '@intlayer/types';

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
];
export const defaultLocale: Locale = Locales.ENGLISH;

const config: CustomIntlayerConfig = {
  internationalization: {
    locales,
    requiredLocales: [Locales.ENGLISH],
    defaultLocale,
    strictMode: 'strict',
  },
  build: {
    optimize: false,
    importMode: 'static',
  },
  log: {
    mode: 'verbose',
  },
};

export default config;
