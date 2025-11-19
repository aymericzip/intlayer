import IntlayerNodeWrapper from './IntlayerNodeWrapper.svelte';

type IntlayerNodeProps = {
  value: any;
  component: any;
  props: Record<string, any>;
};

export const renderIntlayerNode = (args: IntlayerNodeProps) => {
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

  return Node;
};
