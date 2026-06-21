import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';
import type { ReactNode } from 'react';
import type {
  MarkupChunkRenderer,
  RichChunkRenderer,
} from './namespaceTranslator';

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
  ): string;
  /** Returns `true` if the given key exists in the namespace. */
  has<P extends ValidDotPathsFor<N>>(key: P): boolean;
  /** Returns the raw unprocessed content for the given key. */
  raw<P extends ValidDotPathsFor<N>>(key: P): unknown;
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

/** Loosely-typed function returned for nested `'dict.scope'` namespaces. */
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
