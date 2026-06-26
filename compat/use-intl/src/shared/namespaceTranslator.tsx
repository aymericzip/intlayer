import { getIntlayer } from '@intlayer/core/interpreter';
import {
  type MessageValues,
  parseTaggedMessage,
  resolveMessage,
  type TaggedMessageToken,
} from '@intlayer/core/messageFormat';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { Fragment, type ReactNode } from 'react';

/** Chunk renderer used by `t.rich()` — maps tag children to a React node. */
export type RichChunkRenderer = (chunks: ReactNode) => ReactNode;

/** Chunk renderer used by `t.markup()` — maps tag children to a string. */
export type MarkupChunkRenderer = (chunks: string) => string;

/**
 * Reads a dotted `path` (e.g. `counter.label`) out of a nested object value.
 *
 * @param objectValue - The object to read from.
 * @param path - Dot-separated path. An empty path returns `objectValue`.
 * @returns The value found at `path`, or `undefined` when any segment is absent.
 */
export const navigatePath = (objectValue: unknown, path: string): unknown => {
  if (!path) return objectValue;

  // Try the full key as a flat property first (supports flat JSON files
  // that use dotted keys like "section.title": "value").
  if (
    path.includes('.') &&
    objectValue !== null &&
    objectValue !== undefined &&
    typeof objectValue === 'object'
  ) {
    const flatValue = (objectValue as Record<string, unknown>)[path];
    if (flatValue !== undefined) {
      return flatValue;
    }
  }

  const parts = path.split('.');
  let current: unknown = objectValue;
  for (const part of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};

/** Splits rich values into scalar interpolation values and tag renderers. */
const splitRichValues = (
  values: Record<string, unknown> = {}
): { scalarValues: MessageValues; renderers: Record<string, unknown> } => {
  const scalarValues: MessageValues = {};
  const renderers: Record<string, unknown> = {};

  for (const [valueKey, value] of Object.entries(values)) {
    if (typeof value === 'function') renderers[valueKey] = value;
    else scalarValues[valueKey] = value;
  }

  return { scalarValues, renderers };
};

const renderRichTokens = (
  tokens: TaggedMessageToken[],
  renderers: Record<string, unknown>
): ReactNode[] =>
  tokens.map((token, tokenIndex) => {
    if (typeof token === 'string') return token;

    const children = renderRichTokens(token.children, renderers);
    const renderer = renderers[token.tag];

    if (typeof renderer === 'function') {
      return (
        <Fragment key={tokenIndex}>
          {(renderer as RichChunkRenderer)(children)}
        </Fragment>
      );
    }

    // No renderer provided for the tag — render its children unwrapped
    return <Fragment key={tokenIndex}>{children}</Fragment>;
  });

const renderMarkupTokens = (
  tokens: TaggedMessageToken[],
  renderers: Record<string, unknown>
): string =>
  tokens
    .map((token) => {
      if (typeof token === 'string') return token;

      const children = renderMarkupTokens(token.children, renderers);
      const renderer = renderers[token.tag];

      if (typeof renderer === 'function') {
        return (renderer as MarkupChunkRenderer)(children);
      }

      return children;
    })
    .join('');

/**
 * The untyped runtime translator shared by `useTranslations` (React hook) and
 * `createTranslator` (non-React core).
 *
 * Behaviour matches use-intl / next-intl:
 * - namespace `'about'` → keys resolved inside the `about` dictionary
 * - namespace `'about.counter'` → dictionary `about`, key prefix `counter`
 * - no namespace → the first segment of each key is the dictionary key
 * - messages support ICU syntax (plural, select, `#`, formatted arguments)
 * - `t.rich` / `t.markup` map `<tag>chunks</tag>` through the provided
 *   renderers; `t.raw` returns the raw value; `t.has` checks existence
 *
 * @param locale - The locale dictionaries are resolved for.
 * @param namespace - Optional dictionary key, optionally with a nested scope.
 * @returns A translate function augmented with `has`, `raw`, `rich`, `markup`.
 */
export const createNamespaceTranslator = (
  locale: LocalesValues,
  namespace?: string
) => {
  const [dictionaryKey, ...prefixSegments] = (namespace ?? '').split('.');
  const keyPrefix = prefixSegments.join('.');

  const lookup = (key: string): unknown => {
    let targetDictionaryKey = dictionaryKey;
    let path = keyPrefix ? `${keyPrefix}.${key}` : key;

    const dictionaries = getDictionaries();

    if (!targetDictionaryKey) {
      // Root scope — the first key segment usually designates the dictionary
      const [firstSegment, ...restSegments] = key.split('.');
      targetDictionaryKey = firstSegment;
      path = restSegments.join('.');

      // If the assumed dictionary doesn't exist, we must fall back to searching all dictionaries.
      // This supports apps migrating from standard next-intl where all messages were grouped together.
      if (!dictionaries[targetDictionaryKey as DictionaryKeys]) {
        for (const dictKey of Object.keys(dictionaries)) {
          try {
            const dictionary = getIntlayer(dictKey as DictionaryKeys, locale);
            const result = navigatePath(dictionary, key);
            if (result !== undefined) {
              return result;
            }
          } catch {
            // Ignore if getIntlayer throws
          }
        }
      }
    }

    try {
      const dictionary = getIntlayer(
        targetDictionaryKey as DictionaryKeys,
        locale
      );
      return navigatePath(dictionary, path);
    } catch {
      return undefined;
    }
  };

  const resolveToString = (
    key: string,
    values: MessageValues = {}
  ): string | undefined => {
    const rawValue = lookup(key);
    if (rawValue === null || rawValue === undefined) return undefined;
    return resolveMessage(rawValue, values, locale, 'icu');
  };

  const missingKeyFallback = (key: string): string =>
    namespace ? `${namespace}.${key}` : key;

  const translate = (key: string, values?: MessageValues): string =>
    resolveToString(key, values) ?? missingKeyFallback(key);

  return Object.assign(translate, {
    /** Returns `true` if the given key exists in the namespace. */
    has: (key: string): boolean => lookup(key) !== undefined,

    /** Returns the raw unprocessed content for the given key. */
    raw: (key: string): unknown => lookup(key),

    /**
     * Resolves a message containing `<tag>chunks</tag>` markup, mapping each
     * tag through the matching renderer in `values`.
     */
    rich: (key: string, values?: Record<string, unknown>): ReactNode => {
      const { scalarValues, renderers } = splitRichValues(values);
      const message = resolveToString(key, scalarValues);
      if (message === undefined) return missingKeyFallback(key);
      return <>{renderRichTokens(parseTaggedMessage(message), renderers)}</>;
    },

    /**
     * Resolves a message containing `<tag>chunks</tag>` markup into a string,
     * mapping each tag through the matching string renderer in `values`.
     */
    markup: (key: string, values?: Record<string, unknown>): string => {
      const { scalarValues, renderers } = splitRichValues(values);
      const message = resolveToString(key, scalarValues);
      if (message === undefined) return missingKeyFallback(key);
      return renderMarkupTokens(parseTaggedMessage(message), renderers);
    },
  });
};

export type CompatTranslator = ReturnType<typeof createNamespaceTranslator>;
