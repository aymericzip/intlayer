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

      if (prop === 'toString') {
        return () => String(value);
      }

      if (prop === Symbol.toPrimitive) {
        return (hint: string) => {
          if (hint === 'string') return String(value);
          if (hint === 'number') return Number(value);
          return value;
        };
      }

      return Reflect.get(target, prop, receiver);
    },
  }) as IntlayerNode<T>;
};
