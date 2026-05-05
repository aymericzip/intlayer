import type { NodeProps } from '@intlayer/core/interpreter';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import {
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';

export type IntlayerNode<
  T = NodeProps['children'],
  AdditionalProps = Record<string, never>,
> = ResolvedEditor<T, ReactNode> & {
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
      if (prop === 'value') return value;
      if (prop === Symbol.toPrimitive) return () => value ?? '';
      if (prop === 'toString') return () => String(value ?? '');
      if (prop === 'valueOf') return () => value;
      if (
        typeof value === 'string' &&
        typeof prop === 'string' &&
        prop !== 'constructor'
      ) {
        const method = (String.prototype as any)[prop];
        if (typeof method === 'function') return method.bind(value);
      }

      if (additionalProps && prop in additionalProps) {
        return additionalProps[prop as keyof typeof additionalProps];
      }

      return Reflect.get(target, prop, receiver);
    },
  }) as unknown as IntlayerNode<T>;
};
