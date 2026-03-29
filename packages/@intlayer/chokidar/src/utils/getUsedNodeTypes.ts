import type { Dictionary } from '@intlayer/types/dictionary';
import { PLUGIN_NODE_TYPES } from '@intlayer/types/nodeType';
import { parallelize } from './parallelize';

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
): PluginNodeType[] => {
  const result = new Set<PluginNodeType>();
  const dicts = Array.isArray(dictionaries)
    ? dictionaries
    : Object.values(dictionaries);

  for (const dict of dicts) {
    collectNodeTypes(dict.content, result);
  }

  return [...result];
};

export const getUnusedNodeTypes = (
  dictionaries: Record<string, Dictionary> | Dictionary[]
): PluginNodeType[] => {
  const usedNodeTypes = getUsedNodeTypes(dictionaries);

  return PLUGIN_NODE_TYPES.filter(
    (nodeType) => !usedNodeTypes.includes(nodeType)
  );
};

export const getUsedNodeTypesAsync = async (
  dictionaries: Record<string, Dictionary> | Dictionary[]
): Promise<PluginNodeType[]> => {
  const dicts = Array.isArray(dictionaries)
    ? dictionaries
    : Object.values(dictionaries);

  const results = await parallelize(dicts, async (dictionary) => {
    const result = new Set<PluginNodeType>();

    collectNodeTypes(dictionary.content, result as Set<string>);

    return result;
  });

  const finalResult = new Set<PluginNodeType>();

  for (const res of results) {
    for (const val of res) {
      finalResult.add(val);
    }
  }

  return [...finalResult];
};

export const getUnusedNodeTypesAsync = async (
  dictionaries: Record<string, Dictionary> | Dictionary[]
): Promise<PluginNodeType[]> => {
  const usedNodeTypes = await getUsedNodeTypesAsync(dictionaries);

  return PLUGIN_NODE_TYPES.filter(
    (nodeType) => !usedNodeTypes.includes(nodeType)
  );
};

/**
 * Converts a NodeType key to its corresponding env-var name.
 *
 * @example
 * formatNodeTypeToEnvVar(['enumeration']) // { 'INTLAYER_NODE_TYPE_ENUMERATION': 'false' }
 * formatNodeTypeToEnvVar(['enumeration'], true) // { 'process.env.INTLAYER_NODE_TYPE_ENUMERATION': 'false' }
 */
export const formatNodeTypeToEnvVar = (
  nodeTypes: string[],
  addProcessEnv: boolean = false
): Record<string, string> =>
  nodeTypes.reduce(
    (acc, nodeType) => {
      acc[
        addProcessEnv
          ? `process.env.INTLAYER_NODE_TYPE_${nodeType.toUpperCase()}`
          : `INTLAYER_NODE_TYPE_${nodeType.toUpperCase()}`
      ] = '"false"';
      return acc;
    },
    {} as Record<string, string>
  );
