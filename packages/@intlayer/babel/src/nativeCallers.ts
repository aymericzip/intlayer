/**
 * The intlayer getters the build pipeline recognises without any adapter, and
 * the runtime methods their result carries.
 *
 * Kept apart from the compat registry (`@intlayer/config/callers`) so the
 * native passes never have to reason about adapter descriptors.
 */

/** Canonical intlayer caller names that trigger usage analysis. */
export const INTLAYER_CALLER_NAMES = [
  'useIntlayer',
  'getIntlayer',
  'getIntlayerAsync',
] as const;

export type IntlayerCallerName = (typeof INTLAYER_CALLER_NAMES)[number];

/**
 * {@link INTLAYER_CALLER_NAMES} as a set — the import scan tests every
 * specifier of every file against it, so membership must not be a linear scan.
 */
export const NATIVE_CALLER_NAME_SET: ReadonlySet<string> = new Set(
  INTLAYER_CALLER_NAMES
);

/**
 * Methods the runtime attaches to a resolved content object rather than fields
 * declared in a `.content` file.
 *
 * `vanilla-intlayer`'s `useIntlayer` / `useDictionary` assign `onChange` onto
 * the content they return, so `useIntlayer('app').onChange(cb)` is a
 * subscription — not a read of a field named `onChange`. Without this list the
 * analyser records `onChange` as the only consumed field and the purge pass
 * strips every real field from the compiled dictionary.
 *
 * The analyser looks *through* these calls: the callback parameter is analysed
 * as a fresh content root, and the call result is analysed again because the
 * helpers return the content object for chaining.
 */
export const CHAINABLE_RUNTIME_METHOD_NAMES = new Set(['onChange']);
