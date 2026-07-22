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
} & AdditionalProps &
  T;

type RenderIntlayerNodeProps<T> = PropsWithChildren<{
  value: T;
  children: ReactNode;
  additionalProps?: { [key: string]: any };
}>;

export const renderIntlayerNode = <
  T, // Broadened to support arrays, numbers, objects, etc.
>({
  children,
  value,
  additionalProps,
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  const element: ReactElement<any> = isValidElement(children) ? (
    children
  ) : (
    <>{children}</>
  );

  return new Proxy(element as ReactElement, {
    get(target, prop, receiver) {
      if (prop === 'value') return value;
      if (prop === Symbol.toPrimitive) return () => value ?? '';
      if (prop === 'toString') return () => String(value ?? '');
      if (prop === 'valueOf') return () => value;

      // Additional Props take precedence. Own keys only: `in` would also match
      // inherited `Object.prototype` members such as `constructor`, which are
      // never meant to be served as additional props.
      if (additionalProps && Object.hasOwn(additionalProps, prop)) {
        return additionalProps[prop as keyof typeof additionalProps];
      }

      // Delegate native methods/properties to the underlying value
      if (
        value !== null &&
        value !== undefined &&
        typeof prop === 'string' &&
        prop !== 'constructor' &&
        !(prop in target) // Prevents overwriting React internals (type, props, key)
      ) {
        const valObj = Object(value); // Safely boxes primitives (e.g., 50 -> Number object)

        if (prop in valObj) {
          const valProp = valObj[prop];
          return typeof valProp === 'function' ? valProp.bind(value) : valProp;
        }
      }

      // Fallback to React Element
      return Reflect.get(target, prop, receiver);
    },
  }) as unknown as IntlayerNode<T>;
};
