import type { NodeProps } from '@intlayer/core/interpreter';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
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
> = ResolvedEditor<T, VNode> & {
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
