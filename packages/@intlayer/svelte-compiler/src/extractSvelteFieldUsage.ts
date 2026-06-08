/**
 * Extracts intlayer dictionary field usage from a Svelte SFC for a set of
 * plain variable bindings (i.e. `const content = useIntlayer('key')`).
 *
 * Svelte's `useIntlayer` returns a Svelte store.  Inside both the `<script>`
 * block and the `<template>`, stores are consumed via the auto-subscription
 * prefix `$` — so `const bm = useIntlayer('benchmark')` is accessed as
 * `$bm.fieldName`.
 *
 * Because Svelte's `$store` syntax is preprocessed before standard JS tools
 * see the file, static Babel-scope analysis cannot link `$bm` back to `bm`.
 * This module fills that gap by running a targeted regex over the raw source.
 */

/** Escapes special regex characters in a string used as a regex literal. */
const escapeRegExp = (str: string): string =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Input descriptor for a single plain variable binding. */
export type PlainVariableInfo = {
  /** The local variable name in the script (`bm` in `const bm = useIntlayer(…)`). */
  variableName: string;
  /** The intlayer dictionary key passed to `useIntlayer`. */
  dictionaryKey: string;
};

/**
 * Analyzes a Svelte SFC source string and returns the top-level content field
 * names that are statically accessed for each plain intlayer variable binding.
 *
 * Matches the Svelte reactive store access pattern `$varName.fieldName`
 * throughout the entire file (both `<script>` and markup regions).
 *
 * @param code           - Full `.svelte` file source.
 * @param plainVariables - List of plain variable bindings to analyse.
 * @returns Map from dictionary key to the set of accessed top-level field names.
 *          If no fields can be determined for a given key it is omitted from the
 *          map so the caller can fall back to `'all'`.
 */
export const extractSvelteIntlayerFieldUsage = (
  code: string,
  plainVariables: PlainVariableInfo[]
): Map<string, Set<string>> => {
  const result = new Map<string, Set<string>>();

  if (plainVariables.length === 0) return result;

  for (const { variableName, dictionaryKey } of plainVariables) {
    const fields = new Set<string>();
    const esc = escapeRegExp(variableName);

    // Svelte store auto-subscription: $varName.fieldName
    // The `$` must be preceded by a word boundary or the start of the
    // expression (not an identifier character) to avoid false positives such
    // as matching `$$bm.field` or `_$bm.field`.
    const storeRe = new RegExp(`(?<![\\w$])\\$${esc}\\.(\\w+)`, 'g');

    storeRe.lastIndex = 0;
    for (let m = storeRe.exec(code); m !== null; m = storeRe.exec(code)) {
      fields.add(m[1]);
    }

    if (fields.size > 0) {
      result.set(dictionaryKey, fields);
    }
  }

  return result;
};
