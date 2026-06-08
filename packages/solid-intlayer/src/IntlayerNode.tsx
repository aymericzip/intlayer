import type { NodeProps } from '@intlayer/core/interpreter';
import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import type { JSX, ParentProps } from 'solid-js';
import { isArrayIndexProperty, PROXY_RESERVED_KEYS } from './proxyKeys';

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
  additionalProps?: Record<string, unknown>;
}>;

type IntlayerNodeTarget<T> = JSX.Element[] & {
  value: T;
  [key: string]: unknown;
};

export const renderIntlayerNode = <T,>({
  children,
  value,
  additionalProps,
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  // Solid renders arrays, so wrap children in one and hang metadata off it.
  const target = [children] as IntlayerNodeTarget<T>;

  target.value = value;

  if (additionalProps) {
    for (const key in additionalProps) {
      target[key] = additionalProps[key];
    }
  }

  // Proxy so `.value`, coercion hooks, etc. resolve to the content while the
  // target stays a renderable array.
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop === PROXY_RESERVED_KEYS.value) {
        return value;
      }

      if (prop === Symbol.toPrimitive)
        return (hint: string) => {
          if (hint === 'number') return Number(value);
          return value ?? '';
        };
      if (prop === PROXY_RESERVED_KEYS.toString)
        return () => String(value ?? '');
      if (prop === PROXY_RESERVED_KEYS.valueOf) return () => value;

      // Solid's server renderer calls Array#slice on renderable arrays. Keep
      // that operation bound to the wrapper [children] array.
      if (prop === PROXY_RESERVED_KEYS.slice) {
        return Reflect.get(target, prop, receiver);
      }

      if (
        value !== null &&
        value !== undefined &&
        typeof prop === 'string' &&
        prop !== PROXY_RESERVED_KEYS.constructor &&
        prop !== PROXY_RESERVED_KEYS.length &&
        !isArrayIndexProperty(prop)
      ) {
        const valObj = Object(value);
        if (prop in valObj) {
          const valProp = Reflect.get(valObj, prop);
          return typeof valProp === 'function' ? valProp.bind(value) : valProp;
        }
      }

      return Reflect.get(target, prop, receiver);
    },
  }) as unknown as IntlayerNode<T>;
};
