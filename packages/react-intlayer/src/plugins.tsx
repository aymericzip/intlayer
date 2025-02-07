/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type Plugins,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type DeepTransformContent as DeepTransformContentCore,
  type MarkdownContent,
  NodeType,
} from '@intlayer/core';
import { type ReactElement, type ReactNode, createElement } from 'react';
import { renderIntlayerEditor } from './editor';
import type { IntlayerNode } from './IntlayerNode';
import { renderMarkdown } from './markdown/renderMarkdown';

/** ---------------------------------------------
 *  INTLAYER NODE PLUGIN
 *  --------------------------------------------- */

export type IntlayerNodeCond<T, _S> = T extends number | string
  ? IntlayerNode<T>
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const intlayerNodePlugins: Plugins = {
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (
    _node,
    {
      plugins, // Removed to avoid next error - Functions cannot be passed directly to Client Components
      ...rest
    }
  ) => renderIntlayerEditor(rest),
};

/** ---------------------------------------------
 *  REACT NODE PLUGIN
 *  --------------------------------------------- */

export type ReactNodeCond<T, _S> = T extends {
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
  canHandle: (node) =>
    typeof node === 'object' &&
    typeof node.ref !== 'undefined' &&
    typeof node.props !== 'undefined' &&
    typeof node.key !== 'undefined',

  transform: createReactElement,
};

/**
 * MARKDOWN PLUGIN
 */

export type MarkdownCond<T, _S> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: string;
}
  ? IntlayerNode<string>
  : never;

/** Markdown plugin. Replaces node with a function that takes quantity => string. */
export const markdownPlugin: Plugins = {
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Markdown,
  transform: (node: MarkdownContent) => renderMarkdown(node[NodeType.Markdown]),
};

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginReact<T, _S> {
  reactNode: ReactNodeCond<T, _S>;
  intlayerNode: IntlayerNodeCond<T, _S>;
  markdown: MarkdownCond<T, _S>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `react-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  reactNode: true;
  intlayerNode: true;
  markdown: true;
};

export type DeepTransformContent<T> = DeepTransformContentCore<
  T,
  IInterpreterPluginState
>;
