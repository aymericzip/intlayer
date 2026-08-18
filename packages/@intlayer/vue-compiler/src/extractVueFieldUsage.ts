/**
 * Extracts intlayer dictionary field usage from a Vue SFC for a set of
 * plain variable bindings (i.e. `const content = useIntlayer('key')`).
 *
 * Three access patterns are recognised:
 *
 *   1. `varName.fieldName` in script blocks
 *      `useIntlayer` returns a deep reactive proxy, so content fields are read
 *      directly on the variable (`content.title`, `content.count(2)`), the
 *      `.value` unwrapping happening on the leaf node instead.
 *
 *   2. `varName.value.fieldName` in script blocks
 *      Legacy `Ref<Content>` accessor indirection, where fields live one level
 *      deeper than the variable.
 *
 *   3. `varName.fieldName` in the template block
 *      Inside `<template>`, Vue automatically unwraps top-level refs, so
 *      fields are accessed directly without `.value`.
 *
 * The template block is extracted via `@vue/compiler-sfc` so that nested
 * `<template v-for>` / `<template v-if>` tags do not confuse the parser.
 * Falls back to a greedy regex when the package is unavailable.
 */

import vueSfc from '@vue/compiler-sfc';

/** Escapes special regex characters in a string used as a regex literal. */
const escapeRegExp = (str: string): string =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Runs `fieldRegex` over `source` and adds every captured field name to
 * `fields`, skipping the `value` accessor of an intlayer node (it addresses the
 * node wrapper, not a content field).
 *
 * Over-approximating is safe here: an extra name only keeps a field that could
 * have been pruned, while a missing name removes content the app reads.
 */
const collectFieldNames = (
  source: string,
  fieldRegex: RegExp,
  fields: Set<string>
): void => {
  fieldRegex.lastIndex = 0;

  for (
    let match = fieldRegex.exec(source);
    match !== null;
    match = fieldRegex.exec(source)
  ) {
    const field = match[1];
    if (field && field !== 'value') fields.add(field);
  }
};

/** Input descriptor for a single plain variable binding. */
export type PlainVariableInfo = {
  /** The local variable name in the script (`content` in `const content = useIntlayer(…)`). */
  variableName: string;
  /** The intlayer dictionary key passed to `useIntlayer`. */
  dictionaryKey: string;
};

/**
 * Splits a Vue SFC source string into its script and template regions.
 *
 * Uses `@vue/compiler-sfc` to get exact character offsets so that nested
 * `<template>` tags (used by Vue directives like `v-for` / `v-if`) never
 * cause the template region to be mis-identified.
 */
const splitVueSfc = (
  code: string
): { scriptSource: string; templateSource: string } => {
  try {
    const { descriptor } = (
      vueSfc.parse as (src: string) => { descriptor: any }
    )(code);

    const templateSource: string = descriptor.template?.content ?? '';

    const scriptParts: string[] = [];
    if (descriptor.script?.content) scriptParts.push(descriptor.script.content);
    if (descriptor.scriptSetup?.content)
      scriptParts.push(descriptor.scriptSetup.content);
    const scriptSource = scriptParts.join('\n');

    return { scriptSource, templateSource };
  } catch {
    // @vue/compiler-sfc not available or parse failed.
    // Fall back: use a greedy regex to capture everything between the
    // outermost <template> tags (robust against nested tags unlike the
    // non-greedy variant).
    const templateMatch = /<template(?:[^>]*)>([\s\S]*)<\/template>/i.exec(
      code
    );
    const templateSource = templateMatch ? templateMatch[1] : '';
    const scriptSource = code.replace(/<template[\s\S]*<\/template>/gi, '');
    return { scriptSource, templateSource };
  }
};

/**
 * Analyzes a Vue SFC source string and returns the top-level content field
 * names that are statically accessed for each plain intlayer variable binding.
 *
 * @param code           - Full `.vue` file source.
 * @param plainVariables - List of plain variable bindings to analyse.
 * @returns Map from dictionary key to the set of accessed top-level field names.
 *          If no fields can be determined for a given key it is omitted from the
 *          map so the caller can fall back to `'all'`.
 */
export const extractVueIntlayerFieldUsage = (
  code: string,
  plainVariables: PlainVariableInfo[]
): Map<string, Set<string>> => {
  const result = new Map<string, Set<string>>();

  if (plainVariables.length === 0) return result;

  const { scriptSource, templateSource } = splitVueSfc(code);

  for (const { variableName, dictionaryKey } of plainVariables) {
    const fields = new Set<string>();
    const esc = escapeRegExp(variableName);

    // ── 1. Script pattern: varName.fieldName ───────────────────────────────
    // The proxy returned by `useIntlayer` exposes content fields directly, so
    // scripts read them without any indirection. `.value` is the leaf-node
    // accessor, never a content field — the deeper name is picked up by the
    // `.value.` pattern below.
    collectFieldNames(
      scriptSource,
      new RegExp(`\\b${esc}\\.(\\w+)`, 'g'),
      fields
    );

    // ── 2. Script pattern: varName.value.fieldName ─────────────────────────
    // Legacy reactive ref accessor; the actual content fields live one level
    // deeper than the variable itself.
    collectFieldNames(
      scriptSource,
      new RegExp(`\\b${esc}\\.value\\.(\\w+)`, 'g'),
      fields
    );

    // ── 3. Template pattern: varName.fieldName ─────────────────────────────
    // Inside `<template>` Vue auto-unwraps refs, so content is accessed
    // directly without `.value`.
    if (templateSource) {
      collectFieldNames(
        templateSource,
        new RegExp(`\\b${esc}\\.(\\w+)`, 'g'),
        fields
      );
    }

    if (fields.size > 0) {
      result.set(dictionaryKey, fields);
    }
  }

  return result;
};
