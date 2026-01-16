/**
 * Vue-specific MarkdownRuntime implementation.
 *
 * This provides the Vue-specific createElement (h), cloneVNode, and Fragment
 * implementations for the framework-agnostic markdown processor.
 *
 * This is part of the Solution F (Hybrid AST + Callback Pattern) implementation
 * for GitHub Issue #289: Adapt markdown parser in custom packages
 *
 * IMPORTANT: Vue's h() function has different behavior for native tags vs components:
 * - Native HTML tags (strings): children can be passed directly
 * - Components: children MUST be passed as slot functions
 *
 * @see https://vuejs.org/guide/extras/render-function.html#passing-slots
 */

import type { HTMLTag, MarkdownRuntime } from '@intlayer/core';
import {
  type Component,
  cloneVNode,
  Fragment,
  h,
  type VNode,
  type VNodeChild,
} from 'vue';

/**
 * Checks if a type is a Vue component (vs a native HTML tag string).
 */
const isComponent = (type: unknown): type is Component => {
  return typeof type !== 'string';
};

/**
 * Vue-specific runtime for the markdown processor.
 * Implements the MarkdownRuntime interface using Vue's primitives.
 */
export const vueRuntime: MarkdownRuntime = {
  /**
   * Creates a Vue VNode.
   * Uses Vue's h() function for element creation.
   *
   * Per Vue docs: "When creating component vnodes, children must be passed
   * as slot functions." This is critical for component overrides to work.
   *
   * @see https://vuejs.org/guide/extras/render-function.html#passing-slots
   */
  createElement: (
    type: string | Component,
    props: Record<string, any> | null,
    ...children: any[]
  ): VNodeChild => {
    // No children case - simple for both tags and components
    if (children.length === 0) {
      return h(type as any, props);
    }

    // For components, children MUST be passed as slot functions
    // This is required by Vue's render function API
    if (isComponent(type)) {
      const slots = {
        default: () => children,
      };
      return h(type as any, props, slots);
    }

    // For native HTML tags, pass children directly
    if (children.length === 1) {
      return h(type as any, props, children[0]);
    }
    return h(type as any, props, children);
  },

  /**
   * Clones a Vue VNode with new props.
   *
   * IMPORTANT: Vue's cloneVNode only accepts (vnode, extraProps).
   * It does NOT support replacing children - children from the original
   * vnode are preserved. This matches the intended use case of merging
   * override props without modifying content.
   *
   * @see https://vuejs.org/api/render-function.html#clonevnode
   */
  cloneElement: (
    element: unknown,
    props: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ..._children: any[]
  ): VNodeChild => {
    // Note: cloneVNode does not accept children parameter
    // Children from the original vnode are preserved
    return cloneVNode(element as VNode, props);
  },

  /**
   * Vue Fragment component.
   */
  Fragment,

  /**
   * Vue-specific prop normalization.
   * Vue uses 'class' instead of 'className', 'for' instead of 'htmlFor'.
   * This reverses what the core library does for React.
   */
  normalizeProps: (
    _tag: HTMLTag,
    props: Record<string, any>
  ): Record<string, any> => {
    const normalized: Record<string, any> = {};

    for (const [key, value] of Object.entries(props)) {
      // Convert React-style props to Vue-style
      if (key === 'className') {
        normalized.class = value;
      } else if (key === 'htmlFor') {
        normalized.for = value;
      } else if (key === 'dangerouslySetInnerHTML' && value?.__html) {
        // Vue uses innerHTML directly via v-html directive
        // For h() calls, we can use innerHTML prop
        normalized.innerHTML = value.__html;
      } else {
        normalized[key] = value;
      }
    }

    return normalized;
  },
};

/**
 * Creates a Vue runtime with custom createElement for advanced use cases.
 * Useful for wrapping elements or adding middleware.
 */
export const createVueRuntime = (
  options: {
    onCreateElement?: (
      type: string | Component,
      props: Record<string, any> | null,
      children: any[]
    ) => VNodeChild;
  } = {}
): MarkdownRuntime => {
  const { onCreateElement } = options;

  if (onCreateElement) {
    return {
      ...vueRuntime,
      createElement: (
        type: string | any,
        props: Record<string, any> | null,
        ...children: any[]
      ): VNodeChild => {
        return onCreateElement(type, props, children);
      },
    };
  }

  return vueRuntime;
};

export default vueRuntime;
