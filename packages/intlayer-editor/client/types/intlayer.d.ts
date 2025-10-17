import type { Locales } from 'intlayer';
import type { DictionaryEditionDrawerContent as _qBBua9xjcMgNI6rAYznh } from '../.intlayer/types/dictionary-edition-drawer.d.ts';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    'dictionary-edition-drawer': _qBBua9xjcMgNI6rAYznh;
  }

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
