import {
  type Plugins,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type DeepTransformContent as DeepTransformContentCore,
  type MarkdownContent,
  NodeType,
  KeyPath,
  getMarkdownMetadata,
  deepTransformNode,
} from '@intlayer/core';
import type { ReactNode } from 'react';
import { renderIntlayerNode, type IntlayerNode } from './IntlayerNode';
import { EditedContentRenderer } from './editor/useEditedContentRenderer';
import { ContentSelectorRenderer } from './editor';
import { MarkdownMetadataRenderer, MarkdownRenderer } from './markdown';

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
  ) =>
    renderIntlayerNode({
      ...rest,
      value: rest.children,
      children: (
        <ContentSelectorRenderer {...rest}>
          <EditedContentRenderer {...rest}>
            {rest.children}
          </EditedContentRenderer>
        </ContentSelectorRenderer>
      ),
    }),
};

/** ---------------------------------------------
 *  REACT NODE PLUGIN
 *  --------------------------------------------- */

export type ReactNodeCond<T> = T extends {
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

  transform: (
    node,
    {
      plugins, // Removed to avoid next error - Functions cannot be passed directly to Client Components
      ...rest
    }
  ) =>
    renderIntlayerNode({
      ...rest,
      value: '[[react-element]]',
      children: (
        <ContentSelectorRenderer {...rest}>
          renderReactElement(node)
        </ContentSelectorRenderer>
      ),
    }),
};

/**
 * MARKDOWN PLUGIN
 */

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: string;
  metadata?: infer U;
}
  ? IntlayerNode<string, { metadata: DeepTransformContent<U> }>
  : never;

/** Markdown plugin. Replaces node with a function that takes quantity => string. */
export const markdownPlugin: Plugins = {
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Markdown,
  transform: (node: MarkdownContent, props) => {
    const {
      plugins, // Removed to avoid next error - Functions cannot be passed directly to Client Components
      ...rest
    } = props;

    const newKeyPath: KeyPath[] = [
      ...props.keyPath,
      {
        type: NodeType.Markdown,
      },
    ];

    const content = node[NodeType.Markdown];
    const metadata = getMarkdownMetadata(content);

    const metadataPlugins: Plugins = {
      canHandle: (node) =>
        typeof node === 'string' ||
        typeof node === 'number' ||
        typeof node === 'boolean' ||
        !node,
      transform: (node, props) =>
        renderIntlayerNode({
          ...props,
          value: node,
          children: (
            <ContentSelectorRenderer {...rest} keyPath={newKeyPath}>
              <MarkdownMetadataRenderer
                {...rest}
                keyPath={newKeyPath}
                metadataKeyPath={props.keyPath}
              >
                {content}
              </MarkdownMetadataRenderer>
            </ContentSelectorRenderer>
          ),
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
      value: content,
      children: (
        <ContentSelectorRenderer {...rest} keyPath={newKeyPath}>
          <MarkdownRenderer {...rest} keyPath={newKeyPath}>
            {content}
          </MarkdownRenderer>
        </ContentSelectorRenderer>
      ),
      additionalProps: {
        metadata: metadataNodes,
      },
    });
  },
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
