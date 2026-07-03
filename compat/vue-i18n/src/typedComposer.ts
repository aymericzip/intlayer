import type { GetNestingResult } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';
import type { WritableComputedRef } from 'vue';

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
 * The dot-paths of dictionary `N` relative to the namespace prefix `Prefix`
 * (`useI18n({ namespace: 'about.counter' })` → paths under `about.counter`).
 */
export type ScopedDotPaths<N extends DictionaryKeys, Prefix extends string> =
  ValidDotPathsFor<N> extends infer AllPaths
    ? AllPaths extends `${Prefix}.${infer RelativePath}`
      ? RelativePath
      : never
    : never;

/** Non-translation members shared by every composer shape. */
type ComposerBase = {
  locale: WritableComputedRef<string>;
  availableLocales: string[];
  rt: (message: unknown, ...args: unknown[]) => string;
  d: (
    value: Date | number | string,
    formatOrOptions?: string | Intl.DateTimeFormatOptions
  ) => string;
  n: (
    value: number,
    formatOrOptions?: string | Intl.NumberFormatOptions
  ) => string;
};

/**
 * Composer returned when the namespace is a bare dictionary key: `t`/`tc`/
 * `te`/`tm` keys are the dictionary's dot-paths and return types are resolved
 * from the content at that path.
 */
export type TypedComposer<N extends DictionaryKeys> = ComposerBase & {
  t: <P extends ValidDotPathsFor<N>>(
    key: P,
    ...args: unknown[]
  ) => TranslatedValue<N, P>;
  tc: <P extends ValidDotPathsFor<N>>(
    key: P,
    ...args: unknown[]
  ) => TranslatedValue<N, P>;
  te: <P extends ValidDotPathsFor<N>>(key: P) => boolean;
  tm: <P extends ValidDotPathsFor<N>>(key: P) => ContentAtPath<N, P>;
};

/**
 * Composer returned when a key prefix scopes the dictionary `N`: keys are
 * relative dot-paths under `Prefix`, and return types are resolved against
 * the absolute path in the dictionary.
 */
export type ScopedComposer<
  N extends DictionaryKeys,
  Prefix extends string,
> = ComposerBase & {
  t: <P extends ScopedDotPaths<N, Prefix>>(
    key: P,
    ...args: unknown[]
  ) => TranslatedValue<N, `${Prefix}.${P}`>;
  tc: <P extends ScopedDotPaths<N, Prefix>>(
    key: P,
    ...args: unknown[]
  ) => TranslatedValue<N, `${Prefix}.${P}`>;
  te: <P extends ScopedDotPaths<N, Prefix>>(key: P) => boolean;
  tm: <P extends ScopedDotPaths<N, Prefix>>(
    key: P
  ) => ContentAtPath<N, `${Prefix}.${P}`>;
};

/**
 * Loosely-typed composer returned for the root scope (no namespace): the
 * first segment of each key designates the dictionary (`t('about.title')`).
 */
export type LooseComposer = ComposerBase & {
  t: (key: string, ...args: unknown[]) => string;
  tc: (key: string, ...args: unknown[]) => string;
  te: (key: string) => boolean;
  tm: (key: string) => unknown;
};
