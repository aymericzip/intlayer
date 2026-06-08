/**
 * Extracts intlayer dictionary field usage from a Vue SFC for a set of
 * plain variable bindings (i.e. `const content = useIntlayer('key')`).
 *
 * Two access patterns are recognised:
 *
 *   1. `varName.value.fieldName` in script blocks
 *      Vue's `useIntlayer` returns a reactive `Ref<Content>`, so fields are
 *      accessed one level deeper via `.value`.
 *
 *   2. `varName.fieldName` in the template block
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

    // ── 1. Script pattern: varName.value.fieldName ─────────────────────────
    // Vue's reactive ref accessor; the actual content fields live one level
    // deeper than the variable itself.
    const scriptRe = new RegExp(`\\b${esc}\\.value\\.(\\w+)`, 'g');
    scriptRe.lastIndex = 0;
    for (
      let m = scriptRe.exec(scriptSource);
      m !== null;
      m = scriptRe.exec(scriptSource)
    ) {
      const field = m[1];
      // Skip chained `.value.value` artefacts
      if (field !== 'value') fields.add(field);
    }

    // ── 2. Template pattern: varName.fieldName ─────────────────────────────
    // Inside `<template>` Vue auto-unwraps refs, so content is accessed
    // directly without `.value`.
    if (templateSource) {
      const templateRe = new RegExp(`\\b${esc}\\.(\\w+)`, 'g');

      templateRe.lastIndex = 0;
      for (
        let m = templateRe.exec(templateSource);
        m !== null;
        m = templateRe.exec(templateSource)
      ) {
        fields.add(m[1]);
      }
    }

    if (fields.size > 0) {
      result.set(dictionaryKey, fields);
    }
  }

  return result;
};
