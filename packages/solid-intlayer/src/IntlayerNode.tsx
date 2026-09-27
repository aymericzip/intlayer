import type { NodeProps } from '@intlayer/core/interpreter';
import { getIntlayerNodePrototype } from '@intlayer/core/utils';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import type { JSX, ParentProps } from 'solid-js';

/**
 * Content node returned by `useIntlayer`.
 *
 * Without the editor it is typed as its value (`"Hello" & { value: "Hello" }`)
 * so it can go straight into string props (`aria-label={content.title}`).
 * With the editor, it is a JSX element wrapping the editable selector, so
 * string props must use `.value`.
 */
export type IntlayerNode<
  T = NodeProps['children'],
  AdditionalProps = unknown,
> = ResolvedEditor<
  T & { value: T } & AdditionalProps,
  JSX.Element & { value: T } & AdditionalProps
>;

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
