import { getIntlayerNodePrototype } from '@intlayer/core/utils';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';

export type IntlayerNode<T = string, AdditionalProps = {}> = ResolvedEditor<
  T,
  any
> & {
  value: T;
} & AdditionalProps &
  T;

type RenderIntlayerNodeProps<T> = {
  value: T;
  children: any;
  additionalProps?: { [key: string]: any };
};

/**
 * Builds a node that renders its content and also behaves like its value
 * (`node.value`, `${node}`, `node.toUpperCase()`), through a shared prototype
 * rather than a Proxy.
 *
 * @param props - The value, the rendered content and extra node members.
 * @returns The node.
 */
export const renderIntlayerNode = <
  T, // Broadened to support arrays, numbers, objects, etc.
>({
  children,
  value,
  additionalProps = {},
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  // Callable content (renderers built by the plugins) stays callable; any other
  // content becomes a plain object node
  if (typeof children !== 'function') {
    return Object.setPrototypeOf(
      {
        ...(typeof children === 'object' ? children : {}),
        ...additionalProps,
        value,
      },
      getIntlayerNodePrototype(value)
    );
  }

  Object.assign(children, additionalProps, { value });

  // Serves the value's members, after the assignments above so they never
  // walk a Proxy in the prototype chain
  return Object.setPrototypeOf(
    children,
    getIntlayerNodePrototype(value, Function.prototype)
  );
};
