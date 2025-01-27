import { Locales } from 'intlayer';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {}

  type ConfigLocales =
    | Locales.ENGLISH
    | Locales.ENGLISH_UNITED_KINGDOM
    | Locales.FRENCH
    | Locales.SPANISH
    | Locales.GERMAN
    | Locales.JAPANESE
    | Locales.KOREAN
    | Locales.CHINESE
    | Locales.ITALIAN
    | Locales.PORTUGUESE
    | Locales.HINDI
    | Locales.ARABIC
    | Locales.RUSSIAN;
  type ExtractedLocales = Extract<Locales, ConfigLocales>;
  type ExcludedLocales = Exclude<Locales, ConfigLocales>;

  interface IConfigLocales<Content> extends Record<ExtractedLocales, Content> {}
}
