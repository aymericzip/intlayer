import type { NodeProps } from '@intlayer/core/interpreter';
import { getIntlayerNodePrototype } from '@intlayer/core/utils';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import {
  type ComponentChildren,
  Fragment,
  h,
  isValidElement,
  type VNode,
} from 'preact';

/**
 * Content node returned by `useIntlayer`.
 *
 * Without the editor it is typed as its value (`"Hello" & { value: "Hello" }`)
 * so it can go straight into string props (`aria-label={content.title}`).
 * With the editor, it is a vnode wrapping the editable selector, so
 * string props must use `.value`.
 */
export type IntlayerNode<
  T = NodeProps['children'],
  AdditionalProps = unknown,
> = ResolvedEditor<
  T & { value: T } & AdditionalProps,
  VNode & { value: T } & AdditionalProps
>;

type RenderIntlayerNodeProps<T> = {
  value: T;
  children: ComponentChildren;
  additionalProps?: { [key: string]: any };
};

/**
 * Renders content as a Preact vnode that also behaves like its value
 * (`node.value`, `${node}`, `node.toUpperCase()`).
 *
 * The node is a copy of the vnode built on a shared prototype serving the
 * value's members, rather than a Proxy, so the renderer reads plain fields.
 *
 * @param props - The value, the rendered children and extra node members.
 * @returns The renderable node.
 */
export const renderIntlayerNode = <
  T, // Broadened to support arrays, numbers, objects, etc.
>({
  children,
  value,
  additionalProps,
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> =>
  // Fields first, prototype last: set the other way round, each field would
  // first look for a setter along the prototype chain, through its Proxy
  Object.setPrototypeOf(
    {
      ...(isValidElement(children) ? children : h(Fragment, {}, children)),
      value,
      ...additionalProps,
    },
    getIntlayerNodePrototype(value)
  );
