// import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import { getIntlayerNodePrototype } from '@intlayer/core/utils';
import IntlayerNodeWrapper from './IntlayerNodeWrapper.svelte';

type IntlayerNodeProps = {
  value: any;
  component: any;
  props: Record<string, any>;
  additionalProps?: Record<string, any>;
};

export type IntlayerNode<T, AdditionalProps = Record<string, any>> = {
  new (...args: any[]): any;
  (anchor: any, props: any): any;
  value: T;
} & AdditionalProps &
  T;

export const renderIntlayerNode = <T, AdditionalProps = Record<string, any>>(
  args: IntlayerNodeProps
): IntlayerNode<T, AdditionalProps> => {
  const isClassComponent = Boolean(IntlayerNodeWrapper.prototype?.$destroy);

  let Node: any;

  if (isClassComponent) {
    // A constructor function returning the instance rather than a subclass:
    // `super()` resolves through the constructor's prototype, which is
    // replaced below
    Node = function IntlayerNode(options: any) {
      return new (IntlayerNodeWrapper as any)({
        ...options,
        props: {
          ...options.props,
          Renderer: args.component,
          rendererProps: args.props,
          value: args.value,
        },
      });
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

  if (args.additionalProps) {
    Object.assign(Node, args.additionalProps);
  }

  // Serves the value's members (`node.toUpperCase()`), after the assignments
  // above so they never walk a Proxy in the prototype chain
  Object.setPrototypeOf(
    Node,
    getIntlayerNodePrototype(args.value, Function.prototype)
  );

  return Node;
};
