/* eslint-disable */
import { Locales } from 'intlayer'
import type { ThemeSwitcherContent as _dLioemSqDAn6h5rxkXEm } from '../.intlayer/types/theme-switcher.d.ts';
import type { FooterContent as _tBu3wcC3fX7PIel1y04O } from '../.intlayer/types/footer.d.ts';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    "theme-switcher": _dLioemSqDAn6h5rxkXEm;
    "footer": _tBu3wcC3fX7PIel1y04O;
  }

  type ConfigLocales = Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH;
  type ExtractedLocales = Extract<Locales, ConfigLocales>;
  type ExcludedLocales = Exclude<Locales, ConfigLocales>;

  interface IConfigLocales<Content> extends Record<ExtractedLocales, Content> {}
}