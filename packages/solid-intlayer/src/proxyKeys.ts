/**
 * String property keys the Intlayer content proxies special-case instead of
 * delegating to the wrapped value. `Symbol.toPrimitive` is also reserved but,
 * being a symbol, is handled inline in each proxy.
 */
export const PROXY_RESERVED_KEYS = {
  // Keep the node reading as an Array rather than the boxed value.
  constructor: 'constructor',
  // Solid's SSR renderer reads `length`/indices and calls `slice()` on
  // renderable arrays; keep these bound to the wrapper `[children]` array.
  length: 'length',
  slice: 'slice',
  // Neutralised so the loadable proxy is never mistaken for a thenable.
  promiseThen: 'then',
  // Coercion hooks: resolve to the raw content value, not the array's defaults.
  toString: 'toString',
  valueOf: 'valueOf',
  // Intlayer convention: exposes the raw underlying content.
  value: 'value',
} as const satisfies Record<string, string>;

/**
 * Returns whether a proxy property is a stringified array index.
 */
export const isArrayIndexProperty = (property: PropertyKey): boolean =>
  typeof property === 'string' && /^\d+$/.test(property);
