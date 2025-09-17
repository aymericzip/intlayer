// /* eslint-disable */
import { Locales } from 'intlayer';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {}

  enum ConfigLocales {
    ENGLISH = 'en',
    FRENCH = 'fr',
    SPANISH = 'es',
  }

  type DeclaredLocales = Locales.ENGLISH;

  type RequiredLocales = Locales.ENGLISH;
  type ExtractedLocales = Extract<Locales, RequiredLocales>;
  type ExcludedLocales = Exclude<Locales, RequiredLocales>;
  interface IConfigLocales<Content> extends Record<DeclaredLocales, Content> {}
}
