/* eslint-disable */
import 'intlayer';
import { Locales } from '@intlayer/config'
import type { LangSwitcherContent as _YkjbEelveUG9JBa9yVBA } from '../.intlayer/types/lang-switcher.d.ts';
import type { AppContent as _YuiiN4uGEtPTSmA72xqT } from '../.intlayer/types/app.d.ts';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    "lang-switcher": _YkjbEelveUG9JBa9yVBA;
    "app": _YuiiN4uGEtPTSmA72xqT;
  }

  enum ConfigLocales {
    ENGLISH = 'en',
    FRENCH = 'fr',
    SPANISH = 'es'
  };

  interface IConfigLocales<Content> extends Record<ConfigLocales, Content> {}
};