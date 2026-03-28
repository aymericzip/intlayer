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
>;

export const renderIntlayerNode = <
  T extends string | number | boolean | null | undefined,
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

  Object.setPrototypeOf(node, String.prototype);

  return node as unknown as IntlayerNode<T>;
};
