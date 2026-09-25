import { delegateNativeMethods } from '@intlayer/core/utils';
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
    // Shadow String.prototype[Symbol.iterator] so Lit's isIterable() check
    // returns false. Without this, Lit would iterate the node character-by-
    // character (each char as a separate text node) instead of calling
    // _commitText(node.toString()). undefined makes it fall through to the
    // string-conversion fallback path.
    [Symbol.iterator]: undefined,
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

    isJSX: true,

    ...additionalProps,
  };

  return delegateNativeMethods(
    node,
    () => _value
  ) as unknown as IntlayerNode<T>;
};
