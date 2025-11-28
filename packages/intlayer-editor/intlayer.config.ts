import { dirname } from 'node:path';
import { type IntlayerConfig, Locales } from 'intlayer';

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
  build: {
    optimize: true,
    traversePattern: [
      'client/src/**/*.{ts,tsx,mjs}',
      `${dirname(require.resolve('@intlayer/design-system'))}/**/*`,
    ],
  },
  content: {
    contentDir: ['./client/src', '../@intlayer/design-system/src'],
  },
};

console.log(config);

export default config;
