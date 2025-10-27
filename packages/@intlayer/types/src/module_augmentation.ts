import type {
  __DeclaredLocalesRegistry,
  __DictionaryRegistry,
  __RequiredLocalesRegistry,
  __StrictModeRegistry,
} from 'intlayer';
import type { StrictMode } from './config';
import type { Dictionary } from './dictionary';
import type { Locale } from './locales';

export type DictionaryKeys = keyof __DictionaryRegistry extends never
  ? string
  : keyof __DictionaryRegistry;

// --- Dictionaries ---
export type DictionaryRegistry =
  __DictionaryRegistry[keyof __DictionaryRegistry] extends never
    ? Record<string, Dictionary>
    : __DictionaryRegistry;

export type DictionaryRegistryElement<T extends DictionaryKeys> = [
  string,
] extends [T]
  ? Dictionary
  : __DictionaryRegistry[T] extends Dictionary
    ? __DictionaryRegistry[T]
    : Dictionary;

export type DictionaryRegistryContent<T extends PropertyKey> = [T] extends [
  keyof __DictionaryRegistry,
]
  ? __DictionaryRegistry[T] extends { content: infer C }
    ? C
    : any
  : any;

// --- Derived unions from registries ---

type NarrowStringKeys<T> = string extends keyof T
  ? never
  : Extract<keyof T, string>;

export type DeclaredLocales = [
  NarrowStringKeys<__DeclaredLocalesRegistry>,
] extends [never]
  ? Locale
  : NarrowStringKeys<__DeclaredLocalesRegistry>;

export type RequiredLocales = [
  NarrowStringKeys<__RequiredLocalesRegistry>,
] extends [never]
  ? never
  : NarrowStringKeys<__RequiredLocalesRegistry>;

/** Define MyType using the ValueOf utility type on Locales */
export type LocalesValues = DeclaredLocales | (string & {});

// --- Strict mode selection from registry (default 'loose') ---
type ResolvedStrictMode = __StrictModeRegistry extends { mode: infer M }
  ? M
  : 'inclusive';

// --- Config shape (type alias; interfaces can’t extend conditional types) ---
export type StrictModeLocaleMap<
  Content = unknown,
  Mode extends StrictMode = ResolvedStrictMode,
> = RequiredLocales extends never
  ? Partial<Record<Locale, Content>>
  : Mode extends 'strict'
    ? Required<Record<RequiredLocales, Content>> &
        Partial<Record<DeclaredLocales, Content>>
    : Mode extends 'inclusive'
      ? Required<Record<RequiredLocales, Content>> &
          Partial<Record<Locale, Content>>
      : Partial<Record<Locale, Content>>; // Fallback, all locales are optional
