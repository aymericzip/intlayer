import type { NodeProps } from '@intlayer/core';
import type { JSX, ParentProps } from 'solid-js';

export type IntlayerNode<
  T = NodeProps['children'],
  AdditionalProps = {},
> = JSX.Element & {
  value: T;
} & AdditionalProps;

type RenderIntlayerNodeProps<T> = ParentProps<{
  value: T;
  children: JSX.Element;
  additionalProps?: { [key: string]: any };
}>;

export const renderIntlayerNode = <
  T extends number | string | boolean | undefined | null,
>({
  children,
  value,
  additionalProps,
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  // In Solid.js, we handle JSX.Element differently than other frameworks
  // We need to ensure we have a valid element or wrap in a fragment
  const element = <>{children}</>;

  // Ensure we have an object to proxy
  // If element is a primitive, we need to wrap it in an object
  const target =
    typeof element === 'object' && element !== null
      ? element
      : { __element: element };

  // Return a Proxy that pretends to be the original element
  // but also has a .value getter.
  return new Proxy(target as any, {
    get(target, prop, receiver) {
      if (prop === 'value') {
        return value;
      }

      if (
        additionalProps &&
        Object.keys(additionalProps).includes(prop as string)
      ) {
        return additionalProps[prop as keyof typeof additionalProps];
      }

      // If we wrapped a primitive, return the primitive for most accesses
      if (
        '__element' in target &&
        prop !== 'value' &&
        !additionalProps?.[prop as string]
      ) {
        return target.__element;
      }

      return Reflect.get(target, prop, receiver);
    },
  }) as IntlayerNode<T>;
};
