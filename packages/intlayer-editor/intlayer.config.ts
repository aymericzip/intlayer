import { Locales, type IntlayerConfig } from 'intlayer';

export const locales = [
  Locales.ENGLISH,
  Locales.ENGLISH_UNITED_KINGDOM,
  Locales.FRENCH,
  Locales.SPANISH,
  Locales.GERMAN,
  Locales.JAPANESE,
  Locales.KOREAN,
  Locales.CHINESE,
  Locales.ITALIAN,
  Locales.PORTUGUESE,
  Locales.HINDI,
  Locales.ARABIC,
  Locales.RUSSIAN,
];
export const defaultLocale = Locales.ENGLISH;

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
    strictMode: 'strict',
  },
  content: {
    contentDir: ['./src', '../@intlayer/design-system/src'],
  },
  editor: {
    applicationURL: 'http://localhost:5173/',
  },
};

export default config;
