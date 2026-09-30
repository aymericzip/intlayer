/**
 * Utility to resolve Intlayer nodes (Translation, Markdown, HTML, Insertion,
 * Enumeration, Condition, Gender, Plural, Nested, …) into plain JS values
 * (strings, arrays, objects) for the provided locale.
 *
 * The result keeps the shape declared in the content file: branch nodes stay
 * objects keyed by their branch, arrays stay arrays, and insertion
 * placeholders (`{{name}}`) stay in the text — a preview has no runtime
 * arguments to interpolate them with.
 */

/** Nodes whose payload lives under a key named after the node type. */
const WRAPPER_NODE_TYPES = new Set([
  'markdown',
  'html',
  'insertion',
  'file',
  'content',
]);

/** Nodes holding a map of branches selected by a runtime argument. */
const BRANCH_NODE_TYPES = new Set([
  'enumeration',
  'plural',
  'condition',
  'gender',
]);

/** Framework accessors that read a node's value rather than a field. */
const ACCESSOR_NAMES = new Set(['use', 'value', 'raw']);

/**
 * Drop a trailing framework accessor (`content.title.value`).
 *
 * @returns The field path, and whether an accessor was dropped.
 */
export const stripAccessorSuffix = (
  fieldPath: string[]
): { fieldPath: string[]; hasAccessor: boolean } => {
  const hasAccessor = ACCESSOR_NAMES.has(fieldPath.at(-1) ?? '');

  return {
    fieldPath: hasAccessor ? fieldPath.slice(0, -1) : fieldPath,
    hasAccessor,
  };
};

/** Guard against cyclic nest() references. */
const MAX_RESOLUTION_DEPTH = 12;

/**
 * Reads the content of another dictionary, for `nest()` nodes. Synchronous:
 * callers preload the dictionaries they need (see `collectNestedDictionaryKeys`).
 */
export type NestedDictionaryResolver = (dictionaryKey: string) => any | null;

/** Whether `value` is a (serialised) React element. */
export const isReactElementLike = (value: any): boolean =>
  typeof value === 'object' &&
  value !== null &&
  ('$$typeof' in value || 'props' in value);

const resolveNode = (
  node: any,
  locale: string,
  resolveNested: NestedDictionaryResolver | undefined,
  depth: number
): any => {
  if (!node || typeof node !== 'object') {
    return node;
  }

  if (depth > MAX_RESOLUTION_DEPTH) {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((child) =>
      resolveNode(child, locale, resolveNested, depth + 1)
    );
  }

  const nodeType = node.nodeType as string | undefined;

  if (!nodeType) {
    // React elements are handed to the caller untouched — they are rendered
    // by walking their children, not by mapping their keys.
    if (isReactElementLike(node)) {
      return node;
    }

    const resolved: Record<string, any> = {};

    for (const [key, value] of Object.entries(node)) {
      resolved[key] = resolveNode(value, locale, resolveNested, depth + 1);
    }

    return resolved;
  }

  // Multilingual node → the default locale (then English, then whatever exists)
  if (nodeType === 'translation' && node.translation) {
    const localizedValue =
      node.translation[locale] ??
      node.translation.en ??
      Object.values(node.translation)[0];

    return resolveNode(localizedValue, locale, resolveNested, depth + 1);
  }

  // nest('otherDictionary', 'path.in.it')
  if (nodeType === 'nested' && node.nested) {
    const { dictionaryKey, path } = node.nested as {
      dictionaryKey: string;
      path?: string;
    };
    const nestedContent = resolveNested?.(dictionaryKey);
    const label = path ? `${dictionaryKey}.${path}` : dictionaryKey;

    if (!nestedContent) {
      // Dictionary not loaded (or not built): show the reference itself.
      return label;
    }

    const target = getValueFromPath(
      nestedContent,
      path ? path.split('.') : [],
      locale,
      false
    );

    if (target === null || target === undefined) {
      return label;
    }

    return resolveNode(target, locale, resolveNested, depth + 1);
  }

  // enu / plural / cond / gender → the branch map, each branch resolved
  if (BRANCH_NODE_TYPES.has(nodeType) && node[nodeType]) {
    const branches: Record<string, any> = {};

    for (const [branchKey, branchValue] of Object.entries(node[nodeType])) {
      branches[branchKey] = resolveNode(
        branchValue,
        locale,
        resolveNested,
        depth + 1
      );
    }

    return branches;
  }

  // md / html / insert / file wrappers → their payload
  if (WRAPPER_NODE_TYPES.has(nodeType) && node[nodeType] !== undefined) {
    return resolveNode(node[nodeType], locale, resolveNested, depth + 1);
  }

  // Unknown node type declaring its own payload key.
  if (node[nodeType] !== undefined) {
    return resolveNode(node[nodeType], locale, resolveNested, depth + 1);
  }

  return node;
};

export const resolveIntlayerNode = (
  node: any,
  locale: string,
  resolveNested?: NestedDictionaryResolver
): any => resolveNode(node, locale, resolveNested, 0);

/**
 * Every dictionary key referenced by a `nest()` node inside `node`. Callers
 * preload these before resolving, so `nest()` previews show the target content
 * instead of the reference.
 */
export const collectNestedDictionaryKeys = (node: any): string[] => {
  const keys = new Set<string>();

  const walk = (current: any, depth: number): void => {
    if (!current || typeof current !== 'object') return;

    if (depth > MAX_RESOLUTION_DEPTH) return;

    if (Array.isArray(current)) {
      for (const child of current) walk(child, depth + 1);

      return;
    }

    if (current.nodeType === 'nested' && current.nested?.dictionaryKey) {
      keys.add(current.nested.dictionaryKey);
    }

    for (const value of Object.values(current)) walk(value, depth + 1);
  };

  walk(node, 0);

  return [...keys];
};

/**
 * Traverses a dictionary content object using a path of keys.
 * Automatically skips framework-specific methods like .use, .value, .raw.
 */
export const getValueFromPath = (
  content: any,
  path: string[],
  locale: string,
  resolve = true,
  resolveNested?: NestedDictionaryResolver
): any => {
  let current = content;
  let consumedKeys = 0;

  for (const key of path) {
    // Skip framework-specific accessors that might be in the path
    if (ACCESSOR_NAMES.has(key)) {
      continue;
    }

    // Own properties only: `content.list.map(…)` must not resolve `map` to
    // `Array.prototype.map`.
    if (current && typeof current === 'object' && Object.hasOwn(current, key)) {
      current = current[key];
      consumedKeys++;
      continue;
    }

    // A segment that is not part of the content (a method call on the value,
    // e.g. `.map(…).join(…)`) ends the traversal: preview what was reached.
    if (consumedKeys > 0) break;

    return null;
  }

  return resolve
    ? resolveIntlayerNode(current, locale, resolveNested)
    : current;
};
