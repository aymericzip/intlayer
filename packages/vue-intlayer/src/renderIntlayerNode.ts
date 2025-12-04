import { markRaw, ref, type VNode, type VNodeChild } from 'vue';

export type IntlayerNode<T = string> = {
  raw: T; // primitive value (reactive)
  render: () => VNode; // component renderer
  toString: () => T; // string interpolation
  value: T; // <content.title.value />
  __update: (next: IntlayerNode<T>) => void; // invoked by useIntlayer
};

export const renderIntlayerNode = <
  T extends string | number | boolean | null | undefined,
>({
  value,
  children,
  additionalProps = {},
}: {
  value: T;
  children: VNodeChild | (() => VNodeChild);
  additionalProps?: Record<string, unknown>;
}): IntlayerNode<T> => {
  /* ------------------------------------------------------------------ */
  /* 1.  A reactive ref keeps the primitive value                       */
  /* ------------------------------------------------------------------ */
  const rawRef = ref(value) as { value: T };

  /* 2.  We keep a *mutable* “currentRender” function.                  */
  /*     When the dictionary/locale changes, useIntlayer swaps it.      */
  let currentRender: () => VNode =
    typeof children === 'function'
      ? () => (children as () => VNode)()
      : () => children as unknown as VNode;

  /* 3.  The component's `render` method uses both:                     */
  /*     – it *touches* `rawRef.value` so Vue tracks reactivity         */
  /*     – it delegates the actual markup to `currentRender()`          */
  const renderFn = () => {
    /* touch rawRef so the component updates when the value changes */
    void rawRef.value;
    return currentRender();
  };

  /* ------------------------------------------------------------------ */
  /* 4.  Assemble the stable component object                           */
  /*     We purposefully create the object with String.prototype in     */
  /*     its prototype chain so that `instanceof String` === true.      */
  /*     Vue's runtime prop validator for `String` types accepts        */
  /*     values that satisfy `val instanceof String`, therefore this    */
  /*     silences the "Invalid prop: type check failed" warning while   */
  /*     keeping full object capabilities.                              */
  /* ------------------------------------------------------------------ */

  const node: IntlayerNode<T> = Object.create(String.prototype);

  Object.assign(node, {
    /* component renderer */
    render: renderFn,

    /* string interpolation */
    toString: () => rawRef.value,

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

    /* circular ref for the ".value" trick */
    value: undefined as never,

    /* called by useIntlayer when the dictionary entry changes */
    __update(next: IntlayerNode<T>) {
      /* swap in the new renderer (locale-specific markup) */
      currentRender = next.render;
      /* update the primitive value – this *triggers* reactivity */
      (this as any).raw = next.raw;
    },

    ...additionalProps,
  });

  /* finish the circular reference */
  (node as any).value = node;

  /* make sure Vue never tries to proxy the component object itself */
  return markRaw(node);
};
