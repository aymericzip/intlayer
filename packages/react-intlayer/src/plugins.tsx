import type { Plugins } from '@intlayer/core';
import { type ReactElement, type ReactNode, createElement } from 'react';
import { type IntlayerNode, renderIntlayerEditor } from './editor';

/** ---------------------------------------------
 *  INTLAYER NODE PLUGIN
 *  --------------------------------------------- */

export type IntlayerNodeCond<T> = T extends number | string
  ? IntlayerNode<T>
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const intlayerNodePlugins: Plugins = {
  canHandle(node) {
    return (
      typeof node === 'bigint' ||
      typeof node === 'string' ||
      typeof node === 'number'
    );
  },
  transform(node) {
    return renderIntlayerEditor(node);
  },
};

/** ---------------------------------------------
 *  REACT NODE PLUGIN
 *  --------------------------------------------- */

export type ReactNodeCond<T> = T extends {
  ref: any;
  props: any;
  key: any;
}
  ? ReactNode
  : never;

// This function recursively creates React elements from a given JSON-like structure
const createReactElement = (element: ReactElement) => {
  if (typeof element === 'string') {
    // If it's a string, simply return it (used for text content)
    return element;
  }

  const convertChildrenAsArray = (
    element: ReactElement<{ children?: ReactNode }>
  ): ReactElement<{ children?: ReactNode }> => {
    if (element?.props && typeof element.props.children === 'object') {
      const childrenResult: ReactNode[] = [];
      const { children } = element.props;

      // Create the children elements recursively, if any
      Object.keys(children ?? {}).forEach((key) => {
        childrenResult.push(
          createReactElement((children ?? {})[key as keyof typeof children])
        );
      });

      return {
        ...element,
        props: { ...element.props, children: childrenResult },
      };
    }

    return {
      ...element,
      props: { ...element.props, children: element.props.children },
    };
  };

  const fixedElement = convertChildrenAsArray(
    element as ReactElement<{ children?: ReactNode }>
  );

  const { type, props } = fixedElement;

  // Create and return the React element
  return createElement(
    type ?? 'div',
    props,
    ...(props.children as ReactNode[])
  );
};

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const reactNodePlugins: Plugins = {
  canHandle(node) {
    return (
      typeof node === 'object' &&
      typeof node.ref !== 'undefined' &&
      typeof node.props !== 'undefined' &&
      typeof node.key !== 'undefined'
    );
  },
  transform(node) {
    return createReactElement(node);
  },
};
