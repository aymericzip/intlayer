/** @ts-nocheck */

import type { LocalesValues } from '@intlayer/config/client';
// @ts-ignore intlayer declared for module augmentation
import type { IConfigLocales } from 'intlayer';
import type { NodeType } from '../../types/index';

/**
 * If module augmented, it will return the configured locales such as Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH | ...
 * If not, it will return never
 */
export type ConfigLocales = keyof IConfigLocales<unknown>;

/**
 * If module augmented, it will return the configured locales such as Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH | ...
 * If not, it will return all available locales such as Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH | ...
 */
export type CustomLocales = ConfigLocales extends never
  ? LocalesValues
  : ConfigLocales;

/**
 * Record of locales and content
 *
 * const myVar1: LanguageContent<string> = {
 *  "en": "",
 *  "fr": ""
 * }
 *
 * const myVar2: LanguageContent<{age: number, name: string}> = {
 *  "en": {age: 1, name: "test"},
 *  "fr": {age: 1, name: "test"}
 * }
 */
export type TranslationContentState<Content = unknown> = Partial<
  Record<LocalesValues, Content>
>;

/**
 * Valid
 * const test: CustomizableLanguageContent<string, Locales.ENGLISH | Locales.FRENCH> = {
 *  "en": "test",
 *  "fr": "test"
 * }
 *
 * const test: CustomizableLanguageContent<number> = {
 *  "fr": 1,
 *  "en": 1,
 *  ... any other available locale
 * }
 *
 * Invalid
 *
 * const test: CustomizableLanguageContent<string> = {
 * "en": "test",
 * "fr": "test",
 * "sss": "test" // Does not exist in Locales
 * }
 *
 * const test: CustomizableLanguageContent<string, Locales.ENGLISH | Locales.FRENCH> = {
 *  "fr": "test"
 *  // Locales.ENGLISH is missing
 * }
 *
 */
export type LanguageContent<Content = string> = ConfigLocales extends never
  ? IConfigLocales<Content>
  : TranslationContentState<Content>;

export type TranslationContent<Content = unknown> = {
  nodeType: NodeType.Translation;
  [NodeType.Translation]: LanguageContent<Content>;
};
