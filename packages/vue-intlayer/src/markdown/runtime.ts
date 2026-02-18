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

import type { HTMLTag, MarkdownRuntime } from '@intlayer/core/markdown';
import {
  type Component,
  cloneVNode,
  Fragment,
  h,
  type VNode,
  type VNodeChild,
} from 'vue';

/**
 * Checks if a type is a user-defined Vue component that needs slot-based children.
 *
 * IMPORTANT: This must NOT return true for:
 * - Strings (native HTML tags like 'div', 'span')
 * - Vue's Fragment symbol (expects children directly, not slots)
 * - Vue's Teleport, Suspense, etc. (internal components)
 *
 * Only user-defined components (objects with render/setup, or functional components)
 * need children passed as slot functions.
 */
const isUserComponent = (type: unknown): boolean => {
  // Strings are native HTML tags
  if (typeof type === 'string') return false;

  // Symbols are Vue internal types (Fragment, Teleport, Suspense, etc.)
  // These expect children directly, not as slots
  if (typeof type === 'symbol') return false;

  // Functions and objects are user-defined components
  // These need children as slot functions per Vue docs
  return typeof type === 'function' || typeof type === 'object';
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
   * HOWEVER: Vue's internal types (Fragment, Teleport, Suspense) are symbols
   * and expect children directly as arrays, NOT as slot functions.
   *
   * @see https://vuejs.org/guide/extras/render-function.html#passing-slots
   */
  createElement: (
    type: string | Component,
    props: Record<string, any> | null,
    ...children: any[]
  ): VNodeChild => {
    // No children case - simple for all types
    if (children.length === 0) {
      return h(type as any, props);
    }

    // For user-defined components, children MUST be passed as slot functions
    // This is required by Vue's render function API
    // BUT NOT for Fragment/Teleport/Suspense (which are symbols)
    if (isUserComponent(type)) {
      const slots = {
        default: () => children,
      };
      return h(type as any, props, slots);
    }

    // For native HTML tags AND Vue internal types (Fragment, etc.),
    // pass children directly
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
