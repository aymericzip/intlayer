import { getIntlayerNodePrototype } from '@intlayer/core/utils';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';

type IntlayerNodeMembers<T> = {
  raw: T;
  value: T;
  toString: () => string;
  valueOf: () => T;
  toJSON: () => T;
  __update: (next: IntlayerNode<T>) => void;
};

/**
 * Content node returned by `useIntlayer`.
 *
 * Without the editor it is typed as its value plus the node members, so it
 * can be used wherever a string is expected. With the editor, string coercion returns the editor wrapper HTML,
 * so string usages must go through `.value`.
 */
export type IntlayerNode<T = string> = ResolvedEditor<
  T & IntlayerNodeMembers<T>,
  IntlayerNodeMembers<T>
>;

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
    // Serves the value's members: `node.toUpperCase()`, `'trim' in node`
    __proto__: getIntlayerNodePrototype(value),

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

  return node as unknown as IntlayerNode<T>;
};
