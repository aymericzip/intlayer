import { NESTED } from '@intlayer/types/nodeType';

/**
 * Top-level content fields of a nest target that are referenced through
 * `nest()` nodes.
 *
 * `'all'` means at least one reference targets the whole dictionary
 * (`nest('common')` without a path), so no field of that dictionary may be
 * dropped.
 */
export type NestedFieldReferences = Set<string> | 'all';

/**
 * Compact alias some minified pipelines emit in place of `nodeType: 'nested'`.
 * Matched defensively so the scan keeps working on already-minified content.
 */
const MINIFIED_NESTED_NODE_TYPE = 'n';

type UnknownRecord = Record<string, unknown>;

/**
 * Narrows a value to a traversable object (plain object or array). `null` is
 * excluded even though `typeof null === 'object'`.
 */
const isTraversable = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

/**
 * Records one `nest()` reference, widening the entry to `'all'` as soon as a
 * reference targets the whole dictionary.
 */
const addNestedReference = (
  references: Map<string, NestedFieldReferences>,
  dictionaryKey: string,
  path: string | undefined
): void => {
  const existingReference = references.get(dictionaryKey);

  if (existingReference === 'all') return;

  // `getNesting` returns the whole dictionary when no path is given, and also
  // falls back to it when the path cannot be resolved — both cases require
  // every field to stay available.
  const rootField = path?.split('.')[0];

  if (!rootField) {
    references.set(dictionaryKey, 'all');
    return;
  }

  if (existingReference) {
    existingReference.add(rootField);
    return;
  }

  references.set(dictionaryKey, new Set([rootField]));
};

/**
 * Walks a dictionary tree and collects every dictionary referenced through a
 * `nest()` node, together with the top-level fields those references read.
 *
 * The walk is iterative (no recursion depth limit) and guards against shared
 * or circular references, so it is safe on both compiled JSON and in-memory
 * dictionaries.
 *
 * @param dictionaries - Dictionary objects (or any content subtree) to scan.
 * @returns Map of nest-target dictionary key → referenced top-level fields.
 *
 * @example
 * ```ts
 * // dashboard.content.ts → { period: nest('common', 'period') }
 * getNestedDictionaryReferences([dashboardDictionary]);
 * // Map { 'common' => Set { 'period' } }
 * ```
 */
export const getNestedDictionaryReferences = (
  dictionaries: Iterable<unknown>
): Map<string, NestedFieldReferences> => {
  const references = new Map<string, NestedFieldReferences>();
  const stack: unknown[] = [...dictionaries];
  const visitedNodes = new Set<object>();

  while (stack.length > 0) {
    const node = stack.pop();

    if (!isTraversable(node)) continue;
    if (visitedNodes.has(node)) continue;
    visitedNodes.add(node);

    if (Array.isArray(node)) {
      stack.push(...node);
      continue;
    }

    const { nodeType } = node;

    if (nodeType === NESTED || nodeType === MINIFIED_NESTED_NODE_TYPE) {
      const nestedState = node[nodeType];

      if (isTraversable(nestedState)) {
        const { dictionaryKey, path } = nestedState;

        if (typeof dictionaryKey === 'string') {
          addNestedReference(
            references,
            dictionaryKey,
            typeof path === 'string' ? path : undefined
          );
        }
      }

      // A nested node only carries the reference descriptor — no sub-content.
      continue;
    }

    stack.push(...Object.values(node));
  }

  return references;
};

/**
 * Keys of every dictionary referenced through a `nest()` node.
 *
 * @param dictionaries - Dictionary objects (or any content subtree) to scan.
 * @returns Set of nest-target dictionary keys.
 */
export const getNestedDictionaryKeys = (
  dictionaries: Iterable<unknown>
): Set<string> => new Set(getNestedDictionaryReferences(dictionaries).keys());

/**
 * Expands direct nest edges into their transitive closure, so a consumer that
 * nests a dictionary which itself nests another ends up depending on both.
 *
 * Self-references and cycles are absorbed: a key never appears in its own
 * dependency set, and the walk terminates on cyclic graphs.
 */
const closeOverNestedEdges = (
  directEdges: Map<string, Set<string>>
): Map<string, Set<string>> => {
  const closedEdges = new Map<string, Set<string>>();

  for (const [consumerKey, directTargets] of directEdges) {
    const allTargets = new Set<string>();
    const pending = [...directTargets];

    while (pending.length > 0) {
      const targetKey = pending.pop()!;

      if (targetKey === consumerKey) continue;
      if (allTargets.has(targetKey)) continue;
      allTargets.add(targetKey);

      const transitiveTargets = directEdges.get(targetKey);
      if (transitiveTargets) pending.push(...transitiveTargets);
    }

    closedEdges.set(consumerKey, allTargets);
  }

  return closedEdges;
};

/**
 * Builds the `nest()` dependency graph of a set of dictionaries: for each
 * dictionary key, the keys of every dictionary it needs in order to resolve its
 * nested nodes, transitively.
 *
 * The build optimization uses this to attach the nest targets to the dictionary
 * artifact itself, so `nest()` resolves from a local reference and the target
 * lands in the same chunk (or the same lazy per-locale loader) as the
 * dictionary referencing it.
 *
 * Dictionaries without nested nodes are absent from the result.
 *
 * @param dictionaries - Compiled dictionaries to scan; each must carry its `key`.
 * @returns Map of dictionary key → keys it depends on through `nest()`.
 *
 * @example
 * ```ts
 * // dashboard nests common, common nests labels
 * getNestedDictionaryGraph([dashboard, common]);
 * // Map { 'dashboard' => Set { 'common', 'labels' }, 'common' => Set { 'labels' } }
 * ```
 */
export const getNestedDictionaryGraph = (
  dictionaries: Iterable<unknown>
): Map<string, Set<string>> => {
  const directEdges = new Map<string, Set<string>>();

  for (const dictionary of dictionaries) {
    if (!isTraversable(dictionary)) continue;

    const { key } = dictionary;
    if (typeof key !== 'string') continue;

    const targets = getNestedDictionaryKeys([dictionary]);
    targets.delete(key);

    if (targets.size === 0) continue;

    // Several compiled entries can share a key (qualified groups); merge them.
    const existingTargets = directEdges.get(key);
    if (existingTargets) {
      for (const target of targets) existingTargets.add(target);
      continue;
    }

    directEdges.set(key, targets);
  }

  return closeOverNestedEdges(directEdges);
};
