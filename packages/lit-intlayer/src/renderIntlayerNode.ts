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
  additionalProps = {},
}: {
  value: T;
  children?: any; // unused in Lit — kept for interface compatibility
  additionalProps?: Record<string, unknown>;
  [key: string]: unknown;
}): IntlayerNode<T> => {
  let _value = value;

  const node = {
    toString: () => String(_value ?? ''),
    valueOf: () => _value,
    [Symbol.toPrimitive]: () => _value,
    toJSON: () => _value,

    get raw() {
      return _value;
    },
    set raw(val: T) {
      _value = val;
    },

    get value() {
      return _value;
    },

    __update(next: any) {
      _value = next?.raw ?? next?.value ?? next;
    },

    ...additionalProps,
  };

  // Set prototype to String.prototype so the node can be used in string contexts
  Object.setPrototypeOf(node, String.prototype);

  return node as unknown as IntlayerNode<T>;
};
