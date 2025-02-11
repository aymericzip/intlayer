import {
  type Plugins,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type DeepTransformContent as DeepTransformContentCore,
  type MarkdownContent,
  NodeType,
} from '@intlayer/core';
import type { ReactNode } from 'react';
import { renderIntlayerEditor } from './editor';
import type { IntlayerNode } from './IntlayerNode';
import { renderMarkdown } from './markdown/renderMarkdown';
import { renderReactElement } from './reactElement/renderReactElement';

/** ---------------------------------------------
 *  INTLAYER NODE PLUGIN
 *  --------------------------------------------- */

export type IntlayerNodeCond<T> = T extends number | string
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

export type ReactNodeCond<T> = T extends {
  ref: any;
  props: any;
  key: any;
}
  ? ReactNode
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const reactNodePlugins: Plugins = {
  canHandle: (node) =>
    typeof node === 'object' &&
    typeof node.props !== 'undefined' &&
    typeof node.key !== 'undefined',

  transform: renderReactElement,
};

/**
 * MARKDOWN PLUGIN
 */

export type MarkdownCond<T> = T extends {
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

export interface IInterpreterPluginReact<T> {
  reactNode: ReactNodeCond<T>;
  intlayerNode: IntlayerNodeCond<T>;
  markdown: MarkdownCond<T>;
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
