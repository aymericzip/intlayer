import { getIntlayer } from '@intlayer/core/interpreter';
import {
  type MessageValues,
  navigatePath,
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

export { navigatePath } from '@intlayer/core/messageFormat';

/** Chunk renderer used by `t.rich()` — maps tag children to a React node. */
export type RichChunkRenderer = (chunks: ReactNode) => ReactNode;

/** Chunk renderer used by `t.markup()` — maps tag children to a string. */
export type MarkupChunkRenderer = (chunks: string) => string;

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

  const lookup = (lookupKey: string): unknown =>
    lookupNamespaceKey(locale, dictionaryKey ?? '', keyPrefix, lookupKey);

  return createLookupTranslator(locale, lookup, (key) =>
    namespace ? `${namespace}.${key}` : key
  );
};

/**
 * Key-based lookup used by {@link createNamespaceTranslator}: resolves the
 * dictionary through the runtime registry (`getIntlayer`).
 */
const lookupNamespaceKey = (
  locale: LocalesValues,
  dictionaryKey: string,
  keyPrefix: string,
  key: string
): unknown => {
  let targetDictionaryKey = dictionaryKey;
  let path = keyPrefix ? `${keyPrefix}.${key}` : key;

  const dictionaries = getDictionaries();

  if (!targetDictionaryKey) {
    // Root scope — the first key segment usually designates the dictionary
    const [firstSegment, ...restSegments] = key.split('.');
    targetDictionaryKey = firstSegment ?? key;
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

/**
 * Dictionary-bound translator used by the build-optimized `useDictionary` /
 * `getDictionary` variants: instead of resolving the dictionary by key at
 * runtime, the pre-resolved content is supplied directly (the babel/swc
 * optimize pass imports the dictionary JSON at build time).
 *
 * @param locale - The locale messages are resolved for.
 * @param content - The dictionary content, already resolved for `locale`.
 * @param namespacePrefix - Optional key prefix for nested namespaces
 *   (`useTranslations('about.counter')` → content of `about`, prefix `counter`).
 * @returns A translate function augmented with `has`, `raw`, `rich`, `markup`.
 */
export const createDictionaryTranslator = (
  locale: LocalesValues,
  content: unknown,
  namespacePrefix?: string
) => {
  const resolveKey = (key: string): string =>
    namespacePrefix ? `${namespacePrefix}.${key}` : key;

  return createLookupTranslator(
    locale,
    (key) => navigatePath(content, resolveKey(key)),
    resolveKey
  );
};

/**
 * The untyped runtime translator core shared by every factory above:
 * ICU message resolution plus the `has` / `raw` / `rich` / `markup` helpers.
 *
 * @param locale - The locale messages are resolved for.
 * @param lookup - Reads the raw content value for a message key.
 * @param missingKeyFallback - Builds the echoed key on lookup miss
 *   (use-intl convention: `namespace.key`).
 */
const createLookupTranslator = (
  locale: LocalesValues,
  lookup: (key: string) => unknown,
  missingKeyFallback: (key: string) => string
) => {
  const resolveToString = (
    key: string,
    values: MessageValues = {}
  ): string | undefined => {
    const rawValue = lookup(key);
    if (rawValue === null || rawValue === undefined) return undefined;
    return resolveMessage(rawValue, values, locale, 'icu');
  };

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
