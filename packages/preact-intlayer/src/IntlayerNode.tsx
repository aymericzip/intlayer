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
} & AdditionalProps &
  T;

type RenderIntlayerNodeProps<T> = {
  value: T;
  children: ComponentChildren;
  additionalProps?: { [key: string]: any };
};

export const renderIntlayerNode = <
  T, // Broadened to support arrays, numbers, objects, etc.
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

      // Additional Props take precedence. Own keys only: `in` would also match
      // inherited `Object.prototype` members, and serving `constructor` from
      // there makes Preact stop recognising this proxy as a VNode — it detects
      // them by `constructor === undefined` — so the node renders as nothing.
      if (additionalProps && Object.hasOwn(additionalProps, prop)) {
        return additionalProps[prop as keyof typeof additionalProps];
      }

      // Delegate native methods/properties to the underlying value
      if (
        value !== null &&
        value !== undefined &&
        typeof prop === 'string' &&
        prop !== 'constructor' &&
        !(prop in target) // Prevents overwriting VNode internals (type, props, key)
      ) {
        const valObj = Object(value); // Safely boxes primitives (e.g., 50 -> Number object)
        if (prop in valObj) {
          const valProp = valObj[prop];
          return typeof valProp === 'function' ? valProp.bind(value) : valProp;
        }
      }

      return Reflect.get(target, prop, receiver);
    },
    // The proxy impersonates a VNode while also exposing the node's own value
    // and additional props, so the two types never structurally overlap.
  }) as unknown as IntlayerNode<T>;
};
