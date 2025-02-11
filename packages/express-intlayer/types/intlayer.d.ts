// /* eslint-disable */
import 'intlayer';

export {};

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {}

  enum ConfigLocales {
    ENGLISH = 'en',
    FRENCH = 'fr',
    SPANISH = 'es',
  }

  interface IConfigLocales<Content> extends Record<ConfigLocales, Content> {}
}
