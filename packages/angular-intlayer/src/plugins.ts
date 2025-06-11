import {
  getMarkdownMetadata,
  KeyPath,
  MarkdownContent,
  NodeType,
  type DeepTransformContent as DeepTransformContentCore,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type Plugins,
} from '@intlayer/core';
import { ContentSelectorWrapperComponent } from './editor';
import { useMarkdown } from './markdown/installIntlayerMarkdown';
import { renderIntlayerNode } from './renderIntlayerNode';

/** ---------------------------------------------
 *  INTLAYER NODE PLUGIN
 *  --------------------------------------------- */

export type IntlayerNodeCond<T> = T extends number | string
  ? IntlayerNode<T>
  : never;

export interface IntlayerNode<T, P = {}> {
  value: T;
  children?: any;
  additionalProps?: P;
}

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (_node, { children, ...rest }) =>
    renderIntlayerNode({
      ...rest,
      value: children,
      children: () => ({
        component: ContentSelectorWrapperComponent,
        props: {
          dictionaryKey: rest.dictionaryKey,
          keyPath: rest.keyPath,
        },
        children: children,
      }),
    }),
};

/**
 * MARKDOWN PLUGIN
 */

export type MarkdownStringCond<T> = T extends string
  ? IntlayerNode<string, { metadata: DeepTransformContent<string> }>
  : never;

/** Markdown string plugin. Replaces string node with a component that render the markdown. */
export const markdownStringPlugin: Plugins = {
  id: 'markdown-string-plugin',
  canHandle: (node) => typeof node === 'string',
  transform: (node: string, props, deepTransformNode) => {
    const {
      plugins, // Removed to avoid next error - Functions cannot be passed directly to Client Components
      ...rest
    } = props;

    const metadata = getMarkdownMetadata(node);

    const metadataPlugins: Plugins = {
      id: 'markdown-metadata-plugin',
      canHandle: (metadataNode) =>
        typeof metadataNode === 'string' ||
        typeof metadataNode === 'number' ||
        typeof metadataNode === 'boolean' ||
        !metadataNode,
      transform: (metadataNode, props) =>
        renderIntlayerNode({
          ...props,
          value: metadataNode,
          children: node,
        }),
    };

    // Transform metadata while keeping the same structure
    const metadataNodes = deepTransformNode(metadata, {
      plugins: [metadataPlugins],
      dictionaryKey: rest.dictionaryKey,
      keyPath: [],
    });

    return renderIntlayerNode({
      ...props,
      value: node,
      children: () => ({
        component: ContentSelectorWrapperComponent,
        props: {
          dictionaryKey: rest.dictionaryKey,
          keyPath: rest.keyPath,
        },
        children: () => {
          const { renderMarkdown } = useMarkdown();
          return renderMarkdown(node);
        },
      }),
      additionalProps: {
        metadata: metadataNodes,
      },
    });
  },
};

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: infer M;
  metadata?: infer U;
}
  ? IntlayerNode<DeepTransformContent<M>, { metadata: DeepTransformContent<U> }>
  : never;

export const markdownPlugin: Plugins = {
  id: 'markdown-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Markdown,
  transform: (node: MarkdownContent, props, deepTransformNode) => {
    const newKeyPath: KeyPath[] = [
      ...props.keyPath,
      {
        type: NodeType.Markdown,
      },
    ];

    const children = node[NodeType.Markdown];

    return deepTransformNode(children, {
      ...props,
      children,
      keyPath: newKeyPath,
      plugins: [markdownStringPlugin, ...(props.plugins ?? [])],
    });
  },
};

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginAngular<T> {
  intlayerNode: IntlayerNodeCond<T>;
  markdown: MarkdownCond<T>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `angular-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  intlayerNode: true;
  markdown: true;
};

export type DeepTransformContent<T> = DeepTransformContentCore<
  T,
  IInterpreterPluginState
>;
