import type { NodeProps } from '@intlayer/core/interpreter';
import { getIntlayerNodePrototype } from '@intlayer/core/utils';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import { isValidElement, type PropsWithChildren, type ReactNode } from 'react';

export type IntlayerNode<
  T = NodeProps['children'],
  AdditionalProps = Record<string, never>,
> = ResolvedEditor<T, ReactNode> & {
  value: T;
} & AdditionalProps &
  T;

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
  // A literal defines its fields directly: assignments would first look for
  // setters along the prototype chain, through its Proxy
  ({
    __proto__: getIntlayerNodePrototype(value),
    ...(isValidElement(children) ? children : <>{children}</>),
    value,
    ...additionalProps,
  }) as unknown as IntlayerNode<T>;
