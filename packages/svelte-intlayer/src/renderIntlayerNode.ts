// import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import { delegateNativeMethods } from '@intlayer/core/utils';
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

  if (args.additionalProps) {
    Object.assign(Node, args.additionalProps);
  }

  return delegateNativeMethods(Node, () => args.value);
};
