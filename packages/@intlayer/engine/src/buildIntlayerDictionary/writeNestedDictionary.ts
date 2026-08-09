import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { OUTPUT_FORMAT } from '@intlayer/config/defaultValues';
import { colorizePath } from '@intlayer/config/logger';
import { assertPathWithin } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import { getPathHash } from '../utils/getPathHash';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';

/**
 * Subdirectory of `dictionariesDir` holding the companion modules. Nested under
 * the compiled dictionaries so both stay together and are cleaned as one, and
 * because the `**\/*.json` globs listing compiled dictionaries never match the
 * `.mjs` / `.cjs` files written here.
 */
export const NESTED_DICTIONARIES_SUBDIR = 'nested';

/**
 * Escapes a value interpolated into a single-quoted literal of a generated
 * module, so keys containing `'` or `\` cannot break the emitted JavaScript.
 */
const escapeJsLiteral = (value: string): string =>
  value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/**
 * Path of the companion module carrying the `nest()` targets of a dictionary.
 *
 * Shared with the bundler plugins, which re-point the static import they inject
 * at a `useIntlayer` call site to this module whenever the dictionary has nest
 * targets.
 *
 * @param dictionariesDir - The compiled dictionaries directory.
 * @param key - The dictionary key.
 * @param extension - Module extension, `'mjs'` (default) or `'cjs'`.
 */
export const getNestedDictionaryPath = (
  dictionariesDir: string,
  key: string,
  extension: 'mjs' | 'cjs' = 'mjs'
): string =>
  resolve(dictionariesDir, NESTED_DICTIONARIES_SUBDIR, `${key}.${extension}`);

/**
 * Generates a companion module that re-exports a compiled dictionary with its
 * `nest()` targets attached.
 *
 * The optimizer imports this instead of the raw JSON, so `getNesting` resolves
 * the reference from `nestedDictionaries` rather from the global registry
 * — which lets the registry be stripped, and puts each nest target in the same
 * chunk as the dictionary that references it.
 *
 * @param key - The dictionary key.
 * @param nestedKeys - Keys of the dictionaries it references, transitively.
 * @param format - Output module format.
 *
 * @example
 * ```js
 * import _dictionary from '../dashboard.json' with { type: 'json' };
 * import _1a2b3c from '../common.json' with { type: 'json' };
 *
 * export default { ..._dictionary, nestedDictionaries: { 'common': _1a2b3c } };
 * ```
 */
export const generateNestedDictionaryEntryPoint = (
  key: string,
  nestedKeys: string[],
  format: 'cjs' | 'esm' = 'esm'
): string => {
  const sortedKeys = [...nestedKeys].sort((a, b) => a.localeCompare(b));

  // Hash the key so the generated identifier is a valid one whatever the
  // dictionary key contains (dashes, dots, non-ASCII).
  const identifierOf = (nestedKey: string) => `_${getPathHash(nestedKey)}`;

  const importLines = sortedKeys
    .map((nestedKey) =>
      format === 'esm'
        ? `import ${identifierOf(nestedKey)} from '../${escapeJsLiteral(nestedKey)}.json' with { type: 'json' };`
        : `const ${identifierOf(nestedKey)} = require('../${escapeJsLiteral(nestedKey)}.json');`
    )
    .join('\n');

  const attachedEntries = sortedKeys
    .map(
      (nestedKey) =>
        `  '${escapeJsLiteral(nestedKey)}': ${identifierOf(nestedKey)}`
    )
    .join(',\n');

  const safeKey = escapeJsLiteral(key);

  if (format === 'esm') {
    return (
      `import _dictionary from '../${safeKey}.json' with { type: 'json' };\n` +
      `${importLines}\n\n` +
      `const nestedDictionaries = {\n${attachedEntries}\n};\n\n` +
      `export default { ..._dictionary, nestedDictionaries };\n`
    );
  }

  return (
    `const _dictionary = require('../${safeKey}.json');\n` +
    `${importLines}\n\n` +
    `const nestedDictionaries = {\n${attachedEntries}\n};\n\n` +
    `module.exports = { ..._dictionary, nestedDictionaries };\n`
  );
};

/**
 * Writes one companion module per dictionary holding `nest()` references.
 *
 * @param nestedDictionaryGraph - Dictionary key → keys it nests, transitively.
 * @param configuration - The resolved intlayer configuration.
 * @param formats - Module formats to emit.
 */
export const writeNestedDictionaries = async (
  nestedDictionaryGraph: Map<string, Set<string>>,
  configuration: IntlayerConfig,
  formats: ('cjs' | 'esm')[] = OUTPUT_FORMAT
): Promise<void> => {
  if (nestedDictionaryGraph.size === 0) return;

  const { dictionariesDir } = configuration.system;
  const nestedDir = resolve(dictionariesDir, NESTED_DICTIONARIES_SUBDIR);

  await mkdir(nestedDir, { recursive: true });

  await parallelize(
    [...nestedDictionaryGraph.entries()].sort(([a], [b]) => a.localeCompare(b)),
    async ([key, nestedKeys]) => {
      await parallelize(formats, async (format) => {
        const extension = format === 'cjs' ? 'cjs' : 'mjs';
        const content = generateNestedDictionaryEntryPoint(
          key,
          [...nestedKeys],
          format
        );

        const entryPath = getNestedDictionaryPath(
          dictionariesDir,
          key,
          extension
        );
        assertPathWithin(entryPath, nestedDir);

        await writeFileIfChanged(entryPath, content).catch((error) => {
          console.error(
            `Error creating nested ${colorizePath(entryPath)}:`,
            error
          );
        });
      });
    }
  );
};
