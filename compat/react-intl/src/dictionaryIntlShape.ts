import type { GetNestingResult } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';
import type { ReactNode } from 'react';
import type { IntlShape, MessageDescriptor, PrimitiveType } from 'react-intl';

/**
 * The interpreter-resolved content type at dot-path `P` of dictionary `N` —
 * the same type strength as the base `useIntlayer` hook.
 */
type ContentAtPath<N extends DictionaryKeys, P> = GetNestingResult<N, P>;

/**
 * The value returned by `formatMessage` for the path `P` of dictionary `N`:
 * string literals declared in the dictionary keep their literal type, every
 * other node resolves to `string` at runtime.
 */
type TranslatedValue<N extends DictionaryKeys, P> =
  ContentAtPath<N, P> extends string ? ContentAtPath<N, P> : string;

/**
 * Ids accepted by a dictionary-bound intl object: the dictionary's dot-paths,
 * either relative (`'title'`) or absolute (`'home.title'`).
 */
export type DictionaryMessageIds<N extends DictionaryKeys> =
  | ValidDotPathsFor<N>
  | `${N & string}.${ValidDotPathsFor<N> & string}`;

/**
 * Resolves the translated value type for an id: the absolute form strips the
 * leading `<dictionaryKey>.` first, matching the runtime lookup.
 */
export type MessageValueForId<
  N extends DictionaryKeys,
  Id extends string,
> = Id extends `${N & string}.${infer RelativePath}`
  ? TranslatedValue<N, RelativePath>
  : TranslatedValue<N, Id>;

/**
 * `formatMessage` bound to dictionary `N`: ids are validated against the
 * dictionary's dot-paths and the return type is resolved from the content at
 * that path. With rich-text render functions in `values`, React nodes are
 * returned.
 */
export type TypedFormatMessage<N extends DictionaryKeys> = {
  <Id extends DictionaryMessageIds<N> & string>(
    descriptor: Omit<MessageDescriptor, 'id'> & { id: Id },
    values?: Record<string, PrimitiveType>
  ): MessageValueForId<N, Id>;
  <Id extends DictionaryMessageIds<N> & string>(
    descriptor: Omit<MessageDescriptor, 'id'> & { id: Id },
    values?: Record<
      string,
      ReactNode | PrimitiveType | ((chunks: ReactNode) => ReactNode)
    >
  ): string | ReactNode[];
};

/**
 * `IntlShape` whose `formatMessage` / `$t` are typed against the dictionary
 * `N`. Returned by the dictionary-bound `useDictionary` /
 * `useDictionaryDynamic` variants.
 */
export type DictionaryIntlShape<N extends DictionaryKeys> = Omit<
  IntlShape,
  'formatMessage' | '$t'
> & {
  formatMessage: TypedFormatMessage<N>;
  $t: TypedFormatMessage<N>;
};
