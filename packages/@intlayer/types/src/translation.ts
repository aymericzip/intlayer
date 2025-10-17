import type { IConfigLocales, LocalesValues } from './module_augmentation';

/**
 * If module augmented, it will return the configured locales such as Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH | ...
 * If not, it will return never
 */
export type ConfigLocales = keyof IConfigLocales<unknown>;

/**
 * Record of locales and content
 *
 * const myVar1: TranslationContentState<string> = {
 *  "en": "",
 *  "fr": ""
 * }
 *
 * const myVar2: TranslationContentState<{age: number, name: string}> = {
 *  "en": {age: 1, name: "test"},
 *  "fr": {age: 1, name: "test"}
 * }
 */
export type TranslationContentState<Content = unknown> = {
  [locale in LocalesValues]?: Content;
};

export type LanguageContent<Content = unknown> =
  keyof IConfigLocales<unknown> extends never
    ? TranslationContentState<Content> // Fall including all locales as optional
    : IConfigLocales<Content>;
