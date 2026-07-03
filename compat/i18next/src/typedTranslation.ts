import type { GetNestingResult } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';

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
 * The dot-paths of dictionary `N` relative to the key prefix `Prefix`
 * (`getFixedT(null, 'about', 'counter')` → paths under `about.counter`).
 */
export type ScopedDotPaths<N extends DictionaryKeys, Prefix extends string> =
  ValidDotPathsFor<N> extends infer AllPaths
    ? AllPaths extends `${Prefix}.${infer RelativePath}`
      ? RelativePath
      : never
    : never;

/**
 * Fully-typed i18next `t()` bound to the dictionary namespace `N`.
 *
 * Keys are validated against the dictionary's dot-paths; the return type is
 * resolved from the content at that path. With `returnObjects: true` the raw
 * content subtree is returned instead of a string.
 */
export type TypedTFunction<N extends DictionaryKeys> = {
  /** Returns the raw content subtree at `key` (i18next `returnObjects`). */
  <P extends ValidDotPathsFor<N>>(
    key: P | P[],
    options: TOptions & { returnObjects: true }
  ): ContentAtPath<N, P>;
  /** Translate a key, with optional default value and interpolation options. */
  <P extends ValidDotPathsFor<N>>(
    key: P | P[],
    optionsOrDefaultValue?: TOptions | string,
    extraOptions?: TOptions
  ): TranslatedValue<N, P>;
};

/**
 * Fully-typed i18next `t()` bound to the dictionary namespace `N` and the key
 * prefix `Prefix`: keys are relative dot-paths under the prefix, and return
 * types are resolved against the absolute path in the dictionary.
 */
export type ScopedTFunction<N extends DictionaryKeys, Prefix extends string> = {
  /** Returns the raw content subtree at `key` (i18next `returnObjects`). */
  <P extends ScopedDotPaths<N, Prefix>>(
    key: P | P[],
    options: TOptions & { returnObjects: true }
  ): ContentAtPath<N, `${Prefix}.${P}`>;
  /** Translate a scoped key, with optional default value and options. */
  <P extends ScopedDotPaths<N, Prefix>>(
    key: P | P[],
    optionsOrDefaultValue?: TOptions | string,
    extraOptions?: TOptions
  ): TranslatedValue<N, `${Prefix}.${P}`>;
};

/**
 * Typed variant of i18next's `getFixedT`, scoped to an intlayer dictionary
 * namespace. With a `keyPrefix`, keys become relative dot-paths under it.
 */
export type TypedGetFixedT = {
  <N extends DictionaryKeys, Prefix extends string>(
    lng: string | readonly string[] | null,
    ns: N | null | undefined,
    keyPrefix: Prefix
  ): ScopedTFunction<N, Prefix>;
  <N extends DictionaryKeys>(
    lng: string | readonly string[] | null,
    ns?: N | null
  ): TypedTFunction<N>;
};
