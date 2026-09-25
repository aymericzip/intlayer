/**
 * Makes the native methods of a node's underlying value (`String.prototype`,
 * `Number.prototype`, `Array.prototype`, …) callable directly on the node,
 * e.g. `content.title.toUpperCase()`.
 *
 * Methods are resolved lazily on access and bound to the current value, so
 * building a node costs a single Proxy instead of one bound function per
 * prototype method. Members already reachable on the node always win.
 *
 * @param node - The framework node to expose the methods on.
 * @param getValue - Returns the node's current underlying value.
 * @returns A proxy of the node that also serves the value's native methods.
 */
export const delegateNativeMethods = <Node extends object>(
  node: Node,
  getValue: () => unknown
): Node => {
  const getNativeMethod = (
    target: Node,
    property: string | symbol
  ): ((...args: unknown[]) => unknown) | undefined => {
    if (
      typeof property !== 'string' ||
      property === 'constructor' ||
      property in target
    ) {
      return undefined;
    }

    const value = getValue();

    if (value === null || value === undefined) return undefined;

    // Boxes primitives (e.g. 50 -> Number object)
    const boxedValue = Object(value);

    if (!Object.hasOwn(Object.getPrototypeOf(boxedValue), property)) {
      return undefined;
    }

    const member: unknown = boxedValue[property];

    return typeof member === 'function' ? member.bind(value) : undefined;
  };

  return new Proxy(node, {
    get: (target, property, receiver) =>
      getNativeMethod(target, property) ??
      Reflect.get(target, property, receiver),
    has: (target, property) =>
      property in target || getNativeMethod(target, property) !== undefined,
  });
};
