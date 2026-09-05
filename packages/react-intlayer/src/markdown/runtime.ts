import type { HTMLTag, MarkdownRuntime } from '@intlayer/core/markdown';
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
let REACT_ELEMENT_TYPE: symbol;
try {
  const sample = createElement('div');
  REACT_ELEMENT_TYPE =
    sample &&
    typeof sample === 'object' &&
    '$$typeof' in sample &&
    typeof sample.$$typeof === 'symbol'
      ? (sample.$$typeof as symbol)
      : Symbol.for('react.transitional.element');
} catch {
  REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element');
}

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
    let key: string | null = null;
    const finalProps: any = props || {};

    if (props && props.key != null) {
      key = String(props.key);
      finalProps.key = undefined;
    }

    const childCount = children.length;
    if (childCount === 1) {
      finalProps.children = children[0];
    } else if (childCount > 1) {
      finalProps.children = children;
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: null,
      props: finalProps,
      _owner: null,
      _store: {},
      _debugStack: null,
      _debugTask: null,
    } as unknown as ReactNode;
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
