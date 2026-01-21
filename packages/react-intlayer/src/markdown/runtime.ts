/**
 * React-specific MarkdownRuntime implementation.
 *
 * This provides the React-specific createElement, cloneElement, and Fragment
 * implementations for the framework-agnostic markdown processor.
 *
 * This is part of the Solution F (Hybrid AST + Callback Pattern) implementation
 * for GitHub Issue #289: Adapt markdown parser in custom packages
 */

import type { HTMLTag, MarkdownRuntime } from '@intlayer/core';
import {
  cloneElement,
  createElement,
  Fragment,
  type ReactElement,
  type ReactNode,
} from 'react';

/**
 * React-specific runtime for the markdown processor.
 * Implements the MarkdownRuntime interface using React's primitives.
 */
export const reactRuntime: MarkdownRuntime = {
  /**
   * Creates a React element.
   * Handles the conversion of props and children to React format.
   */
  createElement: (
    type: string | any,
    props: Record<string, any> | null,
    ...children: any[]
  ): ReactNode => {
    // React accepts children as rest args or as a single array
    // If there's only one child, pass it directly to avoid unnecessary array
    if (children.length === 0) {
      return createElement(type, props);
    }
    if (children.length === 1) {
      return createElement(type, props, children[0]);
    }
    return createElement(type, props, ...children);
  },

  /**
   * Clones a React element with new props.
   */
  cloneElement: (
    element: unknown,
    props: Record<string, any>,
    ...children: any[]
  ): ReactNode => {
    if (children.length === 0) {
      return cloneElement(element as ReactElement, props);
    }
    return cloneElement(element as ReactElement, props, ...children);
  },

  /**
   * React Fragment component.
   */
  Fragment,

  /**
   * React-specific prop normalization.
   * React uses className instead of class, htmlFor instead of for, etc.
   * The core processor already handles ATTRIBUTE_TO_NODE_PROP_MAP,
   * so this is mostly a no-op but can be used for additional React-specific transforms.
   */
  normalizeProps: (
    _tag: HTMLTag,
    props: Record<string, any>
  ): Record<string, any> => {
    // The core already handles class -> className and for -> htmlFor
    // via ATTRIBUTE_TO_NODE_PROP_MAP in the attrStringToMap function.
    // This hook is available for any additional React-specific transforms.
    return props;
  },
};

/**
 * Creates a React runtime with custom createElement for advanced use cases.
 * Useful for wrapping elements or adding middleware.
 */
export const createReactRuntime = (
  options: {
    onCreateElement?: (
      type: string | any,
      props: Record<string, any> | null,
      children: any[]
    ) => ReactNode;
  } = {}
): MarkdownRuntime => {
  const { onCreateElement } = options;

  if (onCreateElement) {
    return {
      ...reactRuntime,
      createElement: (
        type: string | any,
        props: Record<string, any> | null,
        ...children: any[]
      ): ReactNode => {
        return onCreateElement(type, props, children);
      },
    };
  }

  return reactRuntime;
};

export default reactRuntime;
