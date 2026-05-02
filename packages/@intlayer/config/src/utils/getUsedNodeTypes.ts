import type { Dictionary } from '@intlayer/types/dictionary';
import {
  PLUGIN_NODE_TYPES,
  PREACT_NODE,
  REACT_NODE,
  SOLID_NODE,
} from '@intlayer/types/nodeType';

export type PluginNodeType = (typeof PLUGIN_NODE_TYPES)[number];

/**
 * Detect whether a plain object looks like a serialized React element.
 * React serializes JSX as: { key, props, _owner, _store }.
 * Preact serializes VNodes similarly with a `_store` field.
 */
const isReactLikeElement = (obj: Record<string, unknown>): boolean =>
  typeof obj.props !== 'undefined' &&
  'key' in obj &&
  typeof obj._store !== 'undefined';

/**
 * Detect whether a plain object looks like a serialized Solid element.
 * Solid JSX is serialized as: { type, props } without the React-specific
 * `_store` / `_owner` internal fields.
 */
const isSolidLikeElement = (obj: Record<string, unknown>): boolean =>
  typeof obj.props !== 'undefined' &&
  typeof obj._store === 'undefined' &&
  typeof obj.nodeType === 'undefined' &&
  'type' in obj;

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
  } else if (isReactLikeElement(obj)) {
    // Serialized React / Preact JSX element — both use { key, props, _store }
    result.add(REACT_NODE);
    result.add(PREACT_NODE);
  } else if (isSolidLikeElement(obj)) {
    result.add(SOLID_NODE);
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
  const dictionariesArray = Array.isArray(dictionaries)
    ? dictionaries
    : Object.values(dictionaries);

  const results = await Promise.all(
    dictionariesArray.map(async (dictionary) => {
      const result = new Set<PluginNodeType>();

      collectNodeTypes(dictionary.content, result as Set<string>);

      return result;
    })
  );

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
