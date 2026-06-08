import type { HTMLTag, MarkdownRuntime } from '@intlayer/core/markdown';
import { createComponent, Dynamic } from 'solid-js/web';

/**
 * Solid-specific runtime for the markdown processor.
 * Implements the MarkdownRuntime interface using Solid's primitives.
 */
export const solidRuntime: MarkdownRuntime = {
  /**
   * Creates a Solid JSX Element.
   * Uses Solid's Dynamic component for element creation.
   */
  createElement: (
    type: any,
    props: Record<string, any> | null,
    ...children: any[]
  ): any => {
    return createComponent(Dynamic, {
      get component() {
        return type;
      },
      ...props,
      get children() {
        return children.length === 1 ? children[0] : children;
      },
    });
  },

  /**
   * Solid doesn't have a built-in cloneElement like React.
   * In the context of markdown rendering, we usually don't need to deep-clone
   * but rather merge props if we're wrapping a result.
   */
  cloneElement: (element: any, props: Record<string, any>): any => {
    if (typeof element === 'function') {
      return createComponent(element, props);
    }
    // For already rendered JSX (which are DOM nodes in Solid),
    // we can't easily "clone" and add props without manual DOM manipulation.
    // However, the markdown compiler uses this mainly for the wrapper.
    return element;
  },

  /**
   * Solid Fragment equivalent.
   * In Solid, a fragment is just an array or a function returning children.
   */
  Fragment: (props: any) => props.children,

  /**
   * Solid-specific prop normalization.
   * Solid uses 'class' instead of 'className'.
   */
  normalizeProps: (
    _tag: HTMLTag,
    props: Record<string, any>
  ): Record<string, any> => {
    const normalized: Record<string, any> = {};

    for (const [key, value] of Object.entries(props)) {
      if (key === 'className') {
        normalized.class = value;
      } else {
        normalized[key] = value;
      }
    }

    return normalized;
  },
};

export default solidRuntime;
