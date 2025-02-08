/** @ts-nocheck */

import type { LocalesValues } from '@intlayer/config/client';
// @ts-ignore intlayer declared for module augmentation
import type { IConfigLocales } from 'intlayer';
import { NodeType, TypedNodeModel } from '../../types/index';

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

export type TranslationContent<
  Content = unknown,
  RecordContent extends LanguageContent<Content> = LanguageContent<Content>,
> = TypedNodeModel<NodeType.Translation, RecordContent>;
