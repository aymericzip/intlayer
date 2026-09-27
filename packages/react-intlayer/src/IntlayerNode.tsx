import type { NodeProps } from '@intlayer/core/interpreter';
import { getIntlayerNodePrototype } from '@intlayer/core/utils';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import { isValidElement, type PropsWithChildren, type ReactNode } from 'react';

/**
 * Content node returned by `useIntlayer`.
 *
 * Without the editor it is typed as its value (`"Hello" & { value: "Hello" }`)
 * so it can go straight into string props (`aria-label={content.title}`).
 * With the editor, it is a React node wrapping the editable selector, so
 * string props must use `.value`.
 */
export type IntlayerNode<
  T = NodeProps['children'],
  AdditionalProps = unknown,
> = ResolvedEditor<
  T & { value: T } & AdditionalProps,
  ReactNode & { value: T } & AdditionalProps
>;

type RenderIntlayerNodeProps<T> = PropsWithChildren<{
  value: T;
  children: ReactNode;
  additionalProps?: { [key: string]: any };
}>;

/**
 * Renders content as a React element that also behaves like its value
 * (`node.value`, `${node}`, `node.toUpperCase()`).
 *
 * The node is a copy of the element built on a shared prototype serving the
 * value's members, rather than a Proxy: React reads an element's fields many
 * times while reconciling, and a Proxy trap makes each read several times
 * slower.
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
      ...(isValidElement(children) ? children : <>{children}</>),
      value,
      ...additionalProps,
    },
    getIntlayerNodePrototype(value)
  );
