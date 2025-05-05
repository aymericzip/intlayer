import type { NodeProps } from '@intlayer/core';
import type { VNode, VNodeChild } from 'vue';

export type IntlayerNode<T = NodeProps['children'], AdditionalProps = {}> = {
  value: T;
  render: () => VNode;
  toString: () => T;
} & AdditionalProps;

interface RenderIntlayerNodeProps<T> {
  value: T;
  children: VNodeChild | (() => VNodeChild);
  additionalProps?: Record<string, any>;
}

/**
 * Creates a dual-purpose object that acts both as a Vue component (renders a <span>)
 * and a primitive value (returns the raw value when coerced to a string).
 *
 * This is useful when you want a value that can be used in templates both as:
 * - an interpolated string (e.g. `{{ value }}`)
 * - a component tag (e.g. `<value />`)
 *
 * @template T - The type of the primitive text value (string, number, boolean, null, or undefined).
 * @param {T} text - The value to render and stringify.
 * @returns {{
 *   render: () => import('vue').VNode,
 *   toString: () => T
 * }} An object with `render()` for Vue and `toString()` for string interpolation.
 *
 * @example
 * const title = dual('Hello');
 * // In template:
 * // {{ title }} -> "Hello"
 * // <title />   -> <span>Hello</span>
 */
export const renderIntlayerNode = <
  T extends number | string | boolean | null | undefined,
>(
  props: RenderIntlayerNodeProps<T>
): IntlayerNode<T> => {
  const { children, value, additionalProps = {} } = props;

  return {
    render: () => {
      if (typeof children === 'function') {
        return children() as unknown as VNode;
      }

      return children as unknown as VNode;
    },

    toString: () => value,

    value,

    ...additionalProps,
  };
};
