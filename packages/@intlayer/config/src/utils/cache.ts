type CacheKey = unknown;

// Stable stringify that supports primitives, arrays, objects, Maps, Sets, Dates,
// RegExps, and functions. Objects have their keys sorted to ensure structural
// equality generates the same key string regardless of key insertion order.
const stableStringify = (
  value: unknown,
  stack = new WeakSet<object>()
): string => {
  const type = typeof value;

  if (value === null) {
    return 'null';
  }

  if (type === 'undefined') {
    return 'undefined';
  }

  if (type === 'number' || type === 'bigint' || type === 'boolean') {
    return String(value);
  }

  if (type === 'string') {
    return `"${value}"`;
  }

  if (type === 'function') {
    // Use function name and length as a stable identifier; avoid source as it
    // may differ across builds.
    const fn = value as Function;
    return `function(${fn.name}|${fn.length})`;
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item, stack)).join(',')}]`;
  }

  if (value instanceof Date) {
    return `date(${value.toISOString()})`;
  }

  if (value instanceof RegExp) {
    return `regexp(${value.source}|${value.flags})`;
  }

  if (value instanceof Set) {
    // Normalize by sorting items' stringified forms
    const items = Array.from(value)
      .map((v) => stableStringify(v, stack))
      .sort();
    return `set(${items.join(',')})`;
  }

  if (value instanceof Map) {
    // Normalize by sorting entries by stringified key
    const entries = Array.from(value.entries()).map(
      ([k, v]) =>
        [stableStringify(k, stack), stableStringify(v, stack)] as const
    );
    entries.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    return `map(${entries.map(([k, v]) => `${k}:${v}`).join(',')})`;
  }

  if (type === 'object') {
    const obj = value as Record<string | number | symbol, unknown>;
    if (stack.has(obj as object)) {
      return '[Circular]';
    }
    stack.add(obj as object);

    // Only enumerable own keys, sort to normalize
    const keys = Object.keys(obj as object).sort();
    const entries = keys.map(
      (k) => `${k}:${stableStringify((obj as any)[k], stack)}`
    );
    stack.delete(obj as object);
    return `{${entries.join(',')}}`;
  }

  // Fallback
  try {
    return JSON.stringify(value as any);
  } catch {
    return String(value);
  }
};

const keyToId = (key: CacheKey): string => stableStringify(key);

const cacheMap = new Map<string, any>();

export const getCache = <T>(...key: CacheKey[]): T | undefined => {
  return cacheMap.get(keyToId(key));
};

type CacheSetArgs<T> = [...keys: CacheKey[], value: T];

export const setCache = <T>(...args: CacheSetArgs<T>): void => {
  const value = args[args.length - 1] as T;
  const key = args.slice(0, -1) as CacheKey[];
  cacheMap.set(keyToId(key), value);
};

export const clearCache = (): void => {
  cacheMap.clear();
};

export const cache = {
  get: getCache,
  set: setCache,
  clear: clearCache,
};
