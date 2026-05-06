import type { NodeProps } from '@intlayer/core/interpreter';
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
  additionalProps?: { [key: string]: any };
}>;

export const renderIntlayerNode = <
  T, // Broadened to support arrays, numbers, objects, etc.
>({
  children,
  value,
  additionalProps,
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  // In Solid.js, we must return something that Solid can render.
  // Arrays are renderable. We can attach metadata to the array object itself.
  const target = [children] as any;

  // Attach metadata
  target.value = value;

  if (additionalProps) {
    for (const key in additionalProps) {
      target[key] = additionalProps[key];
    }
  }

  // We still use a Proxy to ensure that accessing properties like 'toString'
  // or others behaves nicely, and to maintain compatibility with the type.
  // But we target the array directly.
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop === 'value') {
        return value;
      }

      if (prop === Symbol.toPrimitive)
        return (hint: string) => {
          if (hint === 'number') return Number(value);
          return value ?? '';
        };
      if (prop === 'toString') return () => String(value ?? '');
      if (prop === 'valueOf') return () => value;

      // Delegate native methods/properties to the underlying value.
      // Guard numeric indices and 'length' so Solid's array renderer keeps
      // access to the wrapper [children] array intact.
      if (
        value !== null &&
        value !== undefined &&
        typeof prop === 'string' &&
        prop !== 'constructor' &&
        prop !== 'length' &&
        !/^\d+$/.test(prop)
      ) {
        const valObj = Object(value); // Safely boxes primitives (e.g., 50 -> Number object)
        if (prop in valObj) {
          const valProp = valObj[prop];
          return typeof valProp === 'function' ? valProp.bind(value) : valProp;
        }
      }

      return Reflect.get(target, prop, receiver);
    },
  }) as IntlayerNode<T>;
};
