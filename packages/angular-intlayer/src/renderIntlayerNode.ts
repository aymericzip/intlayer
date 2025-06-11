export type IntlayerNode<T = string, AdditionalProps = {}> = any & {
  value: T;
} & AdditionalProps;

type RenderIntlayerNodeProps<T> = {
  value: T;
  children: any;
  additionalProps?: { [key: string]: any };
};

export const renderIntlayerNode = <
  T extends number | string | boolean | undefined | null,
>({
  children,
  value,
  additionalProps = {},
}: RenderIntlayerNodeProps<T>): IntlayerNode<T> => {
  // If children is null or undefined, return a simple object with the value
  if (children == null) {
    return new Proxy({} as any, {
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
  }

  // Return a Proxy that pretends to be the original content
  // but also has a .value getter and additional props.
  return new Proxy(children, {
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
