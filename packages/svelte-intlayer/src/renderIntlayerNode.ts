// import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
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
    Node = (props: any) => {
      return (IntlayerNodeWrapper as any)(props, {
        Renderer: args.component,
        rendererProps: args.props,
        value: args.value,
      });
    };
  }

  Object.defineProperty(Node, 'value', {
    value: args.value,
    writable: true,
    configurable: true,
  });

  Object.defineProperty(Node, 'toString', {
    value: () => String(args.value ?? ''),
    writable: true,
    configurable: true,
  });

  Object.defineProperty(Node, 'valueOf', {
    value: () => args.value,
    writable: true,
    configurable: true,
  });

  Object.defineProperty(Node, Symbol.toPrimitive, {
    value: () => args.value ?? '',
    writable: true,
    configurable: true,
  });

  if (typeof args.value === 'string' && args.additionalProps === undefined) {
    for (const prop of Object.getOwnPropertyNames(String.prototype)) {
      if (prop === 'constructor' || prop in Node) continue;
      const method = (String.prototype as any)[prop];
      if (typeof method === 'function') {
        Object.defineProperty(Node, prop, {
          value: method.bind(args.value),
          writable: true,
          configurable: true,
        });
      }
    }
  }

  if (args.additionalProps) {
    Object.assign(Node, args.additionalProps);
  }

  return Node;
};
