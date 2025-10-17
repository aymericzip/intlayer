/** biome-ignore-all lint/suspicious/noEmptyInterface: Interface is used to augment the module */
import type { StrictMode } from './config';
import type { Dictionary } from './dictionary';
import type { Locales } from './locales';

// --- Registries to be augmented by the generator ---
export interface __DictionaryRegistry {} // id -> typeof Dictionary
export interface __DeclaredLocalesRegistry {} // 'fr': 1, 'en': 1, ...
export interface __RequiredLocalesRegistry {} // 'en': 1, ...
export interface __StrictModeRegistry {} // one of: { strict: true } | { inclusive: true } | { loose: true }

/**
 * Provides a fallback to string type if the generic type T is undefined,
 * otherwise returns T. This is useful for handling cases where no keys are found.
 * Example: StringFallback<undefined> -> string; StringFallback<'key'> -> 'key'
 */
export type StringFallback<T> = T extends never ? string : T; // If no keys are found, return string to disable error, and accept any string as dictionary key

export type DictionaryKeys = keyof __DictionaryRegistry extends never
  ? string
  : keyof __DictionaryRegistry;

// --- Dictionaries ---
export type DictionaryRegistry =
  __DictionaryRegistry[keyof __DictionaryRegistry] extends never
    ? Record<string, Dictionary<any>>
    : __DictionaryRegistry;

export type DictionaryRegistryElement<T extends DictionaryKeys> =
  T extends keyof __DictionaryRegistry
    ? __DictionaryRegistry[T]
    : Dictionary<any>;

export type DictionaryRegistryContent<T extends DictionaryKeys> =
  T extends keyof __DictionaryRegistry
    ? __DictionaryRegistry[T] extends { content: infer C }
      ? C
      : any
    : any;

// --- Derived unions from registries ---
export type DeclaredLocales = keyof __DeclaredLocalesRegistry; // 'en' | 'fr' | ...
export type RequiredLocales = keyof __RequiredLocalesRegistry;

/** Define MyType using the ValueOf utility type on Locales */
export type LocalesValues = keyof __DeclaredLocalesRegistry extends never
  ? (Locales | `${Locales}`) | (string & {})
  : (DeclaredLocales | `${DeclaredLocales}`) | (string & {});

// --- Helpers ---
export type ExtractedLocales = Extract<Locales, RequiredLocales>;
export type ExcludedLocales = Exclude<Locales, RequiredLocales>;

// --- Strict mode selection from registry (default 'loose') ---
type __ModeFromRegistry = keyof __StrictModeRegistry;
type ResolvedStrictMode = [__ModeFromRegistry] extends [never]
  ? 'loose'
  : __ModeFromRegistry & StrictMode;

// --- Config shape (type alias; interfaces can’t extend conditional types) ---
export type IConfigLocales<
  Content,
  Mode extends StrictMode = ResolvedStrictMode,
> = Mode extends 'strict'
  ? Record<DeclaredLocales, Content>
  : Mode extends 'inclusive'
    ? Record<ExtractedLocales, Content> &
        Partial<Record<ExcludedLocales, Content>>
    : Partial<Record<Locales, Content>>;
