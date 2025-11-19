import {
  type DeepTransformContent as DeepTransformContentCore,
  getMarkdownMetadata,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type MarkdownContent,
  type Plugins,
} from '@intlayer/core';
import {
  type DeclaredLocales,
  type KeyPath,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import { ContentSelectorWrapper } from './editor';
import MarkdownMetadataWithSelector from './markdown/MarkdownMetadataWithSelector.svelte';
import MarkdownWithSelector from './markdown/MarkdownWithSelector.svelte';
import { type IntlayerNode, renderIntlayerNode } from './renderIntlayerNode';

/**
 * Interface for Svelte-specific plugin functionality
 * This interface can be augmented to add more Svelte-specific transformations
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  /** Any Svelte-specific properties can be added here */
  intlayerNode: true;
  markdown: true;
};

/**
 * Type that represents the deep transformation of content for Svelte
 * This applies Svelte-specific transformations recursively to all content
 */
export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;

/**
 * Basic Intlayer node plugins for content handling
 * These handle the core content transformation logic
 */
export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (node, { children, ...rest }) =>
    renderIntlayerNode({
      value: children ?? node,
      component: ContentSelectorWrapper,
      props: rest,
    }),
};

/**
 * Svelte-specific node plugins for handling basic content types
 * These plugins handle strings, numbers, and bigints in Svelte applications
 */
export const svelteNodePlugins: Plugins = intlayerNodePlugins;

export type MarkdownStringCond<T> = T extends string
  ? IntlayerNode<string>
  : never;

/** Markdown string plugin. Replaces string node with a component that render the markdown. */
export const markdownStringPlugin: Plugins = {
  id: 'markdown-string-plugin',
  canHandle: (node) => typeof node === 'string',
  transform: (node: string, props, deepTransformNode) => {
    const { ...rest } = props;

    const metadata = getMarkdownMetadata(node) ?? {};

    const metadataPlugins: Plugins = {
      id: 'markdown-metadata-plugin',
      canHandle: (metadataNode) =>
        typeof metadataNode === 'string' ||
        typeof metadataNode === 'number' ||
        typeof metadataNode === 'boolean' ||
        !metadataNode,
      transform: (metadataNode, props) =>
        renderIntlayerNode({
          value: metadataNode,
          component: MarkdownMetadataWithSelector,
          props: {
            ...rest,
            value: node, // The full markdown string
            metadataKeyPath: props.keyPath,
          },
        }),
    };

    // Transform metadata while keeping the same structure
    const metadataNodes =
      deepTransformNode(metadata, {
        plugins: [metadataPlugins],
        dictionaryKey: rest.dictionaryKey,
        keyPath: [],
      }) ?? {};

    return renderIntlayerNode({
      value: node,
      component: MarkdownWithSelector,
      props: {
        ...rest,
        value: node,
      },
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

export interface IInterpreterPluginSvelte<T> {
  intlayerNode: T extends string | number ? IntlayerNode<T> : never;
  markdown: MarkdownCond<T>;
}
