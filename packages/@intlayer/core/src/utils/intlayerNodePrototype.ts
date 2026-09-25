/** A node exposing its underlying value, as every framework's node does. */
type ValueNode = { value: unknown };

/**
 * Built prototypes, per base prototype, then per value type (`'string'`…) or,
 * for objects, per value prototype.
 */
const prototypeCache = new Map<object, Map<unknown, object>>();

/**
 * Creates the prototype of every node sharing a base and a value type.
 *
 * Its own members answer the conversions. Any other member missing from the
 * node reaches a Proxy at the end of the chain: the base prototype wins, then
 * the value's members (`title.toUpperCase()`, `title.length`, `price.toFixed`)
 * are served from `node.value`. Reads of the node's own fields never go through
 * the Proxy, which is what keeps framework renderers on their fast path.
 */
const createIntlayerNodePrototype = (
  basePrototype: object,
  valuePrototype: object | null
): object =>
  Object.create(
    new Proxy(basePrototype, {
      get: (target, property, receiver: ValueNode) => {
        if (
          typeof property !== 'string' ||
          property === 'constructor' ||
          property in target
        ) {
          return Reflect.get(target, property, receiver);
        }

        const { value } = receiver;

        if (value === null || value === undefined) return undefined;

        const member = Object(value)[property];

        return typeof member === 'function' ? member.bind(value) : member;
      },
      has: (target, property) =>
        property in target ||
        (typeof property === 'string' &&
          property !== 'constructor' &&
          valuePrototype !== null &&
          property in valuePrototype),
    }),
    {
      toString: {
        value(this: ValueNode) {
          return String(this.value ?? '');
        },
      },
      valueOf: {
        value(this: ValueNode) {
          return this.value;
        },
      },
      [Symbol.toPrimitive]: {
        value(this: ValueNode) {
          return this.value ?? '';
        },
      },
    }
  );

/**
 * Returns the prototype an Intlayer node is built on, so the node behaves like
 * its `value` (`${node}`, `node.toUpperCase()`, `'trim' in node`) while staying
 * a plain framework object.
 *
 * @param value - The node value; its type decides which members are served.
 * @param basePrototype - The prototype the node would have had, kept ahead of
 *                        the value's members (e.g. `Function.prototype` for a
 *                        callable node).
 * @returns The shared prototype to create the node with.
 */
export const getIntlayerNodePrototype = (
  value: unknown,
  basePrototype: object = Object.prototype
): object => {
  // Primitives are keyed by type, so a leaf never boxes its value
  const valueType = typeof value;
  const valueKey =
    value === null || value === undefined
      ? null
      : valueType === 'object' || valueType === 'function'
        ? Object.getPrototypeOf(value)
        : valueType;

  let prototypes = prototypeCache.get(basePrototype);

  if (!prototypes) {
    prototypes = new Map();
    prototypeCache.set(basePrototype, prototypes);
  }

  let prototype = prototypes.get(valueKey);

  if (!prototype) {
    prototype = createIntlayerNodePrototype(
      basePrototype,
      valueKey === null ? null : Object.getPrototypeOf(Object(value))
    );
    prototypes.set(valueKey, prototype);
  }

  return prototype;
};
