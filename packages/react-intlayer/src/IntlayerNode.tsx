import type { NodeProps } from '@intlayer/core';
import {
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';

export type IntlayerNode<
  T = NodeProps['children'],
  AdditionalProps = {},
> = ReactNode & {
  value: T;
} & AdditionalProps;

type RenderIntlayerNodeProps<T> = PropsWithChildren<{
  value: T;
  children: ReactNode;
  additionalProps?: { [key: string]: any };
}>;

export const renderIntlayerNode = <
  T extends number | string | boolean | undefined | null,
>({
  children,
  value,
  additionalProps,
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  // If children is not a valid ReactElement, wrap it in a fragment
  const element: ReactElement<any> = isValidElement(children) ? (
    children
  ) : (
    <>{children}</>
  );

  // Return a Proxy that pretends to be the original element
  // but also has a .value getter.
  return new Proxy(element as ReactElement, {
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
