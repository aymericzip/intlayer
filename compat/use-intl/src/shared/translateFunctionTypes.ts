import type { GetNestingResult } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';
import type { ReactNode } from 'react';
import type {
  MarkupChunkRenderer,
  RichChunkRenderer,
} from './namespaceTranslator';

/**
 * The interpreter-resolved content type at dot-path `P` of dictionary `N` —
 * the same type strength as the base `useIntlayer` hook.
 */
export type ContentAtPath<N extends DictionaryKeys, P> = GetNestingResult<N, P>;

/**
 * The value returned by `t()` for key `P` of dictionary `N`: string literals
 * declared in the dictionary keep their literal type (matching the strength of
 * `useIntlayer`), every other node resolves to `string` at runtime.
 */
export type TranslatedValue<N extends DictionaryKeys, P> =
  ContentAtPath<N, P> extends string ? ContentAtPath<N, P> : string;

/**
 * The dot-paths of dictionary `D` relative to the nested namespace scope
 * `Prefix` (`useTranslations('about.counter')` → paths under `about.counter`).
 */
export type ScopedDotPaths<D extends DictionaryKeys, Prefix extends string> =
  ValidDotPathsFor<D> extends infer AllPaths
    ? AllPaths extends `${Prefix}.${infer RelativePath}`
      ? RelativePath
      : never
    : never;

/**
 * The translation function returned for a bare dictionary key namespace.
 *
 * `key` is validated against the dictionary's dot-paths. Beyond the call
 * signature, the function exposes:
 * - `has(key)` — returns `true` when the key exists in the namespace.
 * - `raw(key)` — returns the unprocessed content value.
 * - `rich(key, values)` — resolves `<tag>chunks</tag>` markup to React nodes.
 * - `markup(key, values)` — resolves `<tag>chunks</tag>` markup to a string.
 */
export type TranslateFunction<N extends DictionaryKeys> = {
  /** Translate a key to a string, with optional ICU interpolation params. */
  <P extends ValidDotPathsFor<N>>(
    key: P,
    params?: Record<string, unknown>
  ): TranslatedValue<N, P>;
  /** Returns `true` if the given key exists in the namespace. */
  has<P extends ValidDotPathsFor<N>>(key: P): boolean;
  /** Returns the raw unprocessed content for the given key. */
  raw<P extends ValidDotPathsFor<N>>(key: P): ContentAtPath<N, P>;
  /** Resolves rich-text markup, mapping tags through React renderers. */
  rich<P extends ValidDotPathsFor<N>>(
    key: P,
    values?: Record<string, RichChunkRenderer | ReactNode>
  ): ReactNode;
  /** Resolves rich-text markup, mapping tags through string renderers. */
  markup<P extends ValidDotPathsFor<N>>(
    key: P,
    values?: Record<string, MarkupChunkRenderer | string | number>
  ): string;
};

/**
 * The translation function returned for a nested `'dictionary.scope'`
 * namespace: keys are relative dot-paths under the scope, and return types are
 * resolved against the absolute path in the dictionary.
 */
export type ScopedTranslateFunction<
  D extends DictionaryKeys,
  Prefix extends string,
> = {
  /** Translate a scoped key to a string, with optional ICU interpolation params. */
  <P extends ScopedDotPaths<D, Prefix>>(
    key: P,
    params?: Record<string, unknown>
  ): TranslatedValue<D, `${Prefix}.${P}`>;
  /** Returns `true` if the given key exists in the scoped namespace. */
  has<P extends ScopedDotPaths<D, Prefix>>(key: P): boolean;
  /** Returns the raw unprocessed content for the given scoped key. */
  raw<P extends ScopedDotPaths<D, Prefix>>(
    key: P
  ): ContentAtPath<D, `${Prefix}.${P}`>;
  /** Resolves rich-text markup, mapping tags through React renderers. */
  rich<P extends ScopedDotPaths<D, Prefix>>(
    key: P,
    values?: Record<string, RichChunkRenderer | ReactNode>
  ): ReactNode;
  /** Resolves rich-text markup, mapping tags through string renderers. */
  markup<P extends ScopedDotPaths<D, Prefix>>(
    key: P,
    values?: Record<string, MarkupChunkRenderer | string | number>
  ): string;
};

/**
 * Resolves the translation function type for a namespace argument: a bare
 * dictionary key keeps the fully-typed dot-paths, a nested
 * `'dictionary.scope'` namespace is split at the first dot and typed
 * relative to the scope, anything else falls back to loose typing.
 */
export type TranslateFunctionForNamespace<N extends string> =
  N extends DictionaryKeys
    ? TranslateFunction<N>
    : N extends `${infer D extends DictionaryKeys & string}.${infer Prefix}`
      ? ScopedTranslateFunction<D, Prefix>
      : LooseTranslateFunction;

/** Loosely-typed function returned for untyped namespaces (root scope). */
export type LooseTranslateFunction = {
  (key: string, params?: Record<string, unknown>): string;
  has(key: string): boolean;
  raw(key: string): unknown;
  rich(
    key: string,
    values?: Record<string, RichChunkRenderer | ReactNode>
  ): ReactNode;
  markup(
    key: string,
    values?: Record<string, MarkupChunkRenderer | string | number>
  ): string;
};
