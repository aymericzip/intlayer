import type { ResolvedEditor } from '@intlayer/types/module_augmentation';

export type IntlayerNode<T = string> = ResolvedEditor<
  T & {
    raw: T;
    value: T;
    toString: () => string;
    valueOf: () => T;
    toJSON: () => T;
    __update: (next: IntlayerNode<T>) => void;
  },
  {
    raw: T;
    value: T;
    toString: () => string;
    valueOf: () => T;
    toJSON: () => T;
    __update: (next: IntlayerNode<T>) => void;
  }
> &
  T;

export const renderIntlayerNode = <
  T, // Broadened to support arrays, numbers, objects, etc.
>({
  value,
  children,
  additionalProps = {},
}: {
  value: T;
  children?: any;
  additionalProps?: Record<string, unknown>;
  [key: string]: unknown;
}): IntlayerNode<T> => {
  let _value = value;

  // When children is a string that differs from value, it acts as a display
  // override (e.g. editor HTML wrapper). Otherwise toString/toPrimitive reflect
  // the live _value so that __update propagates.
  const displayOverride =
    typeof children === 'string' && children !== String(value ?? '')
      ? children
      : null;

  const node = {
    toString: () => displayOverride ?? String(_value ?? ''),
    valueOf: () => _value,
    [Symbol.toPrimitive]: () => displayOverride ?? _value,
    toJSON: () => _value,

    get raw() {
      return _value;
    },
    set raw(value: T) {
      _value = value;
    },

    get value() {
      return _value;
    },

    __update(next: any) {
      _value = next?.raw ?? next?.value ?? next;
    },

    ...additionalProps,
  };

  // Delegate native methods from the underlying value (any type) to node.
  if (_value !== null && _value !== undefined) {
    const valObj = Object(_value); // Safely boxes primitives (e.g., 50 -> Number object)
    const proto = Object.getPrototypeOf(valObj);
    for (const prop of Object.getOwnPropertyNames(proto)) {
      if (prop === 'constructor' || prop in node) continue;
      const valProp = valObj[prop]; // read from instance so length/index values are correct
      if (typeof valProp === 'function') {
        Object.defineProperty(node, prop, {
          value: valProp.bind(_value),
          writable: true,
          configurable: true,
        });
      }
    }
  }

  return node as unknown as IntlayerNode<T>;
};
