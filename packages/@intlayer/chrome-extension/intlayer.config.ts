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

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH],
    strictMode: 'strict',
  },
  routing: {
    // The popup has no URL to carry the locale: persist the choice only.
    mode: 'no-prefix',
    storage: 'localStorage',
  },
  content: {
    // Pulls the design-system dictionaries (locale switcher labels…).
    contentDir: ['./src', '@intlayer/design-system'],
    codeDir: ['./src', '@intlayer/design-system'],
  },
  editor: {
    enabled: false,
  },
};

export default config;
