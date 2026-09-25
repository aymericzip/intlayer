/**
 * String property keys the dynamic-loading stand-in proxy special-cases instead
 * of delegating to the loaded value. `Symbol.toPrimitive` is also reserved but,
 * being a symbol, is handled inline.
 */
export const PROXY_RESERVED_KEYS = {
  // Neutralised so the loadable proxy is never mistaken for a thenable.
  promiseThen: 'then',
  // Coercion hooks: resolve to the raw content value, not the array's defaults.
  toString: 'toString',
  valueOf: 'valueOf',
  // Intlayer convention: exposes the raw underlying content.
  value: 'value',
} as const satisfies Record<string, string>;
