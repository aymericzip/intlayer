import type { NodeProps } from '@intlayer/core/interpreter';
import { getIntlayerNodePrototype } from '@intlayer/core/utils';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import type { JSX, ParentProps } from 'solid-js';

export type IntlayerNode<
  T = NodeProps['children'],
  AdditionalProps = Record<string, never>,
> = ResolvedEditor<T, JSX.Element> & {
  value: T;
} & AdditionalProps &
  T;

type RenderIntlayerNodeProps<T> = ParentProps<{
  value: T;
  children: JSX.Element;
  additionalProps?: Record<string, unknown>;
}>;

type IntlayerNodeTarget<T> = JSX.Element[] & {
  value: T;
  [key: string]: unknown;
};

export const renderIntlayerNode = <T,>({
  children,
  value,
  additionalProps,
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  // Solid renders arrays, so wrap children in one and hang metadata off it.
  const target = [children] as IntlayerNodeTarget<T>;

  target.value = value;

  if (additionalProps) {
    for (const key in additionalProps) {
      target[key] = additionalProps[key];
    }
  }

  // Serves the value's members (`node.toUpperCase()`, `${node}`) while the
  // node stays a renderable array: array members come first
  Object.setPrototypeOf(
    target,
    getIntlayerNodePrototype(value, Array.prototype)
  );

  return target as unknown as IntlayerNode<T>;
};
