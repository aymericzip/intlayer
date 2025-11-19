import IntlayerNodeWrapper from './IntlayerNodeWrapper.svelte';

type IntlayerNodeProps = {
  value: any;
  component: any;
  props: Record<string, any>;
  additionalProps?: Record<string, any>;
};

export type IntlayerNode<T = any, P = Record<string, any>> = {
  new (...args: any[]): any;
  (anchor: any, props: any): any;
  value: T;
} & P;

export const renderIntlayerNode = <T = any, P = Record<string, any>>(
  args: IntlayerNodeProps
): IntlayerNode<T, P> => {
  const isClassComponent = Boolean(IntlayerNodeWrapper.prototype?.$destroy);

  let Node: any;

  if (isClassComponent) {
    Node = class extends (IntlayerNodeWrapper as any) {
      constructor(options: any) {
        super({
          ...options,
          props: {
            ...options.props,
            Renderer: args.component,
            rendererProps: args.props,
            value: args.value,
          },
        });
      }
    };
  } else {
    // Functional component (Svelte 5)
    Node = (anchor: any, props: any) => {
      const mergedProps = {
        ...props,
        Renderer: args.component,
        rendererProps: args.props,
        value: args.value,
      };

      return IntlayerNodeWrapper(anchor, mergedProps);
    };
  }

  Object.defineProperty(Node, 'value', {
    value: args.value,
    writable: false,
  });

  Object.defineProperty(Node, 'toString', {
    value: () => args.value?.toString() ?? '',
    writable: false,
  });

  if (args.additionalProps) {
    Object.assign(Node, args.additionalProps);
  }

  return Node;
};
