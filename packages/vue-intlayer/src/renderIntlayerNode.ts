import type { ResolvedEditor } from '@intlayer/types/module_augmentation';
import { markRaw, ref, type VNodeChild } from 'vue';

export type IntlayerNode<T = string> = ResolvedEditor<
  T & {
    raw: T; // primitive value (reactive)
    render: (props?: any) => VNodeChild; // component renderer
    value: T;
  },
  VNodeChild & {
    raw: T; // primitive value (reactive)
    render: (props?: any) => VNodeChild; // component renderer
    toString: () => string; // string interpolation
    value: T;
    use: (props?: any) => IntlayerNode<T>;
    __update: (next: IntlayerNode<T>) => void; // invoked by useIntlayer
  }
>;

export const renderIntlayerNode = <
  T, // Broadened to support arrays, numbers, objects, etc.
>({
  value,
  children,
  additionalProps = {},
}: {
  value: T;
  children: VNodeChild | ((props?: any) => VNodeChild);
  additionalProps?: Record<string, unknown>;
}): IntlayerNode<T> => {
  const rawRef = ref(value) as { value: T };

  /* We keep a *mutable* “currentRender” function.                  */
  /*     When the dictionary/locale changes, useIntlayer swaps it.      */
  let currentRender: (props?: any) => VNodeChild =
    typeof children === 'function'
      ? (props?: any) => (children as (props?: any) => VNodeChild)(props)
      : () => children;

  /* The component's `render` method uses both:                     */
  /*     – it *touches* `rawRef.value` so Vue tracks reactivity         */
  /*     – it delegates the actual markup to `currentRender()`          */
  const renderFn = (props?: any) => {
    /* touch rawRef so the component updates when the value changes */
    void rawRef.value;
    return currentRender(props);
  };

  // Create the node as a function (functional component)
  // This allows it to be used directly in templates as <node />
  const node = ((props: any) => renderFn(props)) as unknown as IntlayerNode<T>;

  Object.assign(node, {
    /* component renderer */
    render: renderFn,

    /* string interpolation */
    toString: () => String(rawRef.value ?? ''),

    /* primitive coercion helpers */
    valueOf: () => rawRef.value,
    [Symbol.toPrimitive]: () => rawRef.value,

    /* JSON serialization - prevents circular reference errors */
    toJSON: () => rawRef.value,

    /* reactive getter/setter for the primitive value */
    get raw() {
      return rawRef.value;
    },
    set raw(val: T) {
      rawRef.value = val;
    },

    /* .value returns the primitive value */
    get value() {
      return rawRef.value;
    },

    /* .use returns a new node with customized renderer */
    use(props?: any) {
      return renderIntlayerNode({
        value: rawRef.value,
        children: () => currentRender(props),
        additionalProps,
      });
    },

    /* called by useIntlayer when the dictionary entry changes */
    __update(next: IntlayerNode<T>) {
      /* swap in the new renderer (locale-specific markup) */
      currentRender = next.render;
      /* update the primitive value – this *triggers* reactivity */
      (this as any).raw = next.raw;
    },

    ...additionalProps,
  });

  // Delegate native methods from the underlying value (any type) to node.
  if (value !== null && value !== undefined) {
    const valObj = Object(value); // Safely boxes primitives (e.g., 50 -> Number object)
    const proto = Object.getPrototypeOf(valObj);
    for (const prop of Object.getOwnPropertyNames(proto)) {
      if (prop === 'constructor' || prop in node) continue;
      const valProp = valObj[prop]; // read from instance so index/length values are correct
      if (typeof valProp === 'function') {
        Object.defineProperty(node, prop, {
          value: valProp.bind(value),
          writable: true,
          configurable: true,
        });
      }
    }
  }

  /* make sure Vue never tries to proxy the component object itself */
  return markRaw(node);
};
