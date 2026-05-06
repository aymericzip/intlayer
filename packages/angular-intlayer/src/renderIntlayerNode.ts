import type { ResolvedEditor } from '@intlayer/types/module_augmentation';

export type IntlayerNode<T = string, AdditionalProps = {}> = ResolvedEditor<
  T,
  any
> & {
  value: T;
} & AdditionalProps &
  T;

type RenderIntlayerNodeProps<T> = {
  value: T;
  children: any;
  additionalProps?: { [key: string]: any };
};

export const renderIntlayerNode = <
  T, // Broadened to support arrays, numbers, objects, etc.
>({
  children,
  value,
  additionalProps = {},
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  // If children is null or undefined, return a simple object with the value
  if (children == null) {
    return new Proxy({} as any, {
      get(target, prop, receiver) {
        if (prop === 'value') return value;
        if (prop === Symbol.toPrimitive) return () => value ?? '';
        if (prop === 'toString') return () => String(value ?? '');
        if (prop === 'valueOf') return () => value;

        // Additional Props take precedence
        if (additionalProps && prop in additionalProps) {
          return additionalProps[prop as keyof typeof additionalProps];
        }

        // Delegate native methods/properties to the underlying value
        if (
          value !== null &&
          value !== undefined &&
          typeof prop === 'string' &&
          prop !== 'constructor' &&
          !(prop in target)
        ) {
          const valObj = Object(value); // Safely boxes primitives (e.g., 50 -> Number object)
          if (prop in valObj) {
            const valProp = valObj[prop];
            return typeof valProp === 'function'
              ? valProp.bind(value)
              : valProp;
          }
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as IntlayerNode<T>;
  }

  // Proxy target must be an object or function; wrap primitives
  const target =
    typeof children === 'object' || typeof children === 'function'
      ? children
      : ({} as any);

  // Return a Proxy that pretends to be the original content
  // but also has a .value getter and additional props.
  return new Proxy(target, {
    apply(target, thisArg, argumentsList) {
      if (typeof value === 'function') {
        return Reflect.apply(value as Function, thisArg, argumentsList);
      }
      return Reflect.apply(target as Function, thisArg, argumentsList);
    },
    get(target, prop, receiver) {
      if (prop === 'value') return value;
      if (prop === Symbol.toPrimitive) return () => value ?? '';
      if (prop === 'toString') return () => String(value ?? '');
      if (prop === 'valueOf') return () => value;

      // Additional Props take precedence
      if (additionalProps && prop in additionalProps) {
        return additionalProps[prop as keyof typeof additionalProps];
      }

      // Delegate native methods/properties to the underlying value
      if (
        value !== null &&
        value !== undefined &&
        typeof prop === 'string' &&
        prop !== 'constructor' &&
        !(prop in target)
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
