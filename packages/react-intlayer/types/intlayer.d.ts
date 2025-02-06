import { Locales } from 'intlayer';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    eee: {
      key: 'eee';
      content: {
        title: string;
      };
    };
  }

  type ConfigLocales = Locales.ENGLISH;
  type ExtractedLocales = Extract<Locales, ConfigLocales>;
  type ExcludedLocales = Exclude<Locales, ConfigLocales>;

  interface IConfigLocales<Content>
    extends Record<ExtractedLocales, Content>,
      Partial<Record<ExcludedLocales, Content>> {}
}
