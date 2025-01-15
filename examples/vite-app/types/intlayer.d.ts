/* eslint-disable */
import { Locales } from 'intlayer';
import type { AppContent as _YuiiN4uGEtPTSmA72xqT } from '../.intlayer/types/app.d.ts';
import type { LangSwitcherContent as _YkjbEelveUG9JBa9yVBA } from '../.intlayer/types/lang-switcher.d.ts';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    "app": _YuiiN4uGEtPTSmA72xqT;
    "lang-switcher": _YkjbEelveUG9JBa9yVBA;
  }

  type ConfigLocales = Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH;
  type ExtractedLocales = Extract<Locales, ConfigLocales>;
  type ExcludedLocales = Exclude<Locales, ConfigLocales>;

  interface IConfigLocales<Content> extends Record<ExtractedLocales, Content>, Partial<Record<ExcludedLocales, Content>> {}
}