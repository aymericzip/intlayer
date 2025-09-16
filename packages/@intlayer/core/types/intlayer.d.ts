// /* eslint-disable */
import 'intlayer';

export {};

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {}
  interface LanguageContent {}
  interface LocalesValues {}

  enum ConfigLocales {
    ENGLISH = 'en',
    FRENCH = 'fr',
    SPANISH = 'es',
  }

  interface IConfigLocales<Content> extends Record<ConfigLocales, Content> {}
}
