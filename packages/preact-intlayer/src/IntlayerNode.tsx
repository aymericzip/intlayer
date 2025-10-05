import type { NodeProps } from '@intlayer/core';
import {
  type ComponentChildren,
  Fragment,
  h,
  isValidElement,
  type VNode,
} from 'preact';

export type IntlayerNode<
  T = NodeProps['children'],
  AdditionalProps = {},
> = VNode & {
  value: T;
} & AdditionalProps;

type RenderIntlayerNodeProps<T> = {
  value: T;
  children: ComponentChildren;
  additionalProps?: { [key: string]: any };
};

export const renderIntlayerNode = <
  T extends number | string | boolean | undefined | null,
>({
  children,
  value,
  additionalProps,
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  // If children is not a valid VNode, wrap it in a fragment
  const element: VNode<any> = isValidElement(children)
    ? children
    : h(Fragment, {}, children);

  // Return a Proxy that pretends to be the original element
  // but also has a .value getter.
  return new Proxy(element as VNode, {
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

      return Reflect.get(target, prop, receiver);
    },
  }) as IntlayerNode<T>;
};
