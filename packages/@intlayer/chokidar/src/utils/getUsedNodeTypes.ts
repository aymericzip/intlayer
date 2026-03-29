import type { Dictionary } from '@intlayer/types/dictionary';

/**
 * NodeType strings that correspond to plugins that can be conditionally
 * removed from the bundle when unused.
 */
export const PLUGIN_NODE_TYPES = [
  'translation',
  'enumeration',
  'condition',
  'insertion',
  'gender',
  'nested',
  'file',
  'markdown',
  'html',
] as const;

export type PluginNodeType = (typeof PLUGIN_NODE_TYPES)[number];

/** Recursively collect every `nodeType` string found in a value. */
const collectNodeTypes = (value: unknown, result: Set<string>): void => {
  if (!value || typeof value !== 'object') return;

  if (Array.isArray(value)) {
    for (const item of value) collectNodeTypes(item, result);
    return;
  }

  const obj = value as Record<string, unknown>;

  if (typeof obj.nodeType === 'string') {
    result.add(obj.nodeType);
  }

  for (const key of Object.keys(obj)) {
    collectNodeTypes(obj[key], result);
  }
};

/**
 * Returns the set of NodeType strings actually used across the given
 * built dictionaries.
 *
 * @example
 * const used = getUsedNodeTypes(getDictionaries(config));
 * // Set { 'translation', 'enumeration' }
 */
export const getUsedNodeTypes = (
  dictionaries: Record<string, Dictionary> | Dictionary[]
): Set<string> => {
  const result = new Set<string>();
  const dicts = Array.isArray(dictionaries)
    ? dictionaries
    : Object.values(dictionaries);

  for (const dict of dicts) {
    collectNodeTypes(dict.content, result);
  }

  return result;
};

/**
 * Converts a NodeType key to its corresponding env-var name.
 *
 * @example
 * nodeTypeToEnvVar('enumeration') // 'INTLAYER_NODE_TYPE_ENUMERATION'
 */
export const nodeTypeToEnvVar = (nodeType: string): string =>
  `INTLAYER_NODE_TYPE_${nodeType.toUpperCase()}`;

/**
 * Returns a record mapping each **unused** NodeType to `'false'` so build
 * plugins can dead-code-eliminate the corresponding plugin from the bundle.
 *
 * Keys are bare env-var names (`INTLAYER_NODE_TYPE_*`).
 * Build plugins that need `process.env.*` keys (Vite `define`, webpack
 * `DefinePlugin`, Lynx `source.define`) should prefix them and wrap values
 * with `JSON.stringify`; Next.js `env:` can use the record directly.
 *
 * Only NodeTypes that are confirmed absent from all dictionaries get the
 * `'false'` value; used (or unknown) types are omitted so they default to
 * `true` inside `getPlugins` / `getBasePlugins`.
 *
 * @param usedNodeTypes - Set returned by `getUsedNodeTypes`.
 * @returns Record keyed by `INTLAYER_NODE_TYPE_*` → `'false'`.
 *
 * @example
 * // When only 'translation' is used:
 * getNodeTypeDefineVars(new Set(['translation']))
 * // {
 * //   INTLAYER_NODE_TYPE_ENUMERATION: 'false',
 * //   INTLAYER_NODE_TYPE_CONDITION: 'false',
 * //   ...
 * // }
 */
export const getNodeTypeDefineVars = (
  usedNodeTypes: Set<string>
): Record<string, string> => {
  // No dictionaries found yet → safe default: keep all plugins
  if (usedNodeTypes.size === 0) return {};

  const result: Record<string, string> = {};

  for (const nodeType of PLUGIN_NODE_TYPES) {
    if (!usedNodeTypes.has(nodeType)) {
      result[nodeTypeToEnvVar(nodeType)] = 'false';
    }
  }

  return result;
};
