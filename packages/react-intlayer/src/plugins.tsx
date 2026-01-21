import {
  type DeepTransformContent as DeepTransformContentCore,
  getMarkdownMetadata,
  type HTMLCond,
  type HTMLContent,
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
import { createElement, type ReactElement, type ReactNode } from 'react';
import { ContentSelectorRenderer } from './editor';
import { EditedContentRenderer } from './editor/useEditedContentRenderer';
import { HTMLRendererPlugin } from './html';
import { type IntlayerNode, renderIntlayerNode } from './IntlayerNode';
import { MarkdownMetadataRenderer, MarkdownRendererPlugin } from './markdown';
import { renderReactElement } from './reactElement/renderReactElement';

/** ---------------------------------------------
 *  INTLAYER NODE PLUGIN
 *  --------------------------------------------- */

export type IntlayerNodeCond<T> = T extends number | string
  ? IntlayerNode<T>
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
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
        <EditedContentRenderer {...rest}>{rest.children}</EditedContentRenderer>
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
  id: 'react-node-plugin',
  canHandle: (node) =>
    typeof node === 'object' &&
    typeof node?.props !== 'undefined' &&
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
          {renderReactElement(node)}
        </ContentSelectorRenderer>
      ),
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
          children: (
            <ContentSelectorRenderer {...rest}>
              <MarkdownMetadataRenderer
                {...rest}
                metadataKeyPath={props.keyPath}
              >
                {node}
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

    const render = (components?: any) =>
      renderIntlayerNode({
        ...props,
        value: node,
        children: (
          <ContentSelectorRenderer {...rest}>
            <MarkdownRendererPlugin {...rest} {...components}>
              {node}
            </MarkdownRendererPlugin>
          </ContentSelectorRenderer>
        ),
        additionalProps: {
          metadata: metadataNodes,
        },
      });

    const element = render() as ReactElement;

    return new Proxy(element, {
      get(target, prop, receiver) {
        if (prop === 'value') {
          return node;
        }
        if (prop === 'metadata') {
          return metadataNodes;
        }

        if (prop === 'use') {
          return (components?: any) => render(components);
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as any;
  },
};

export type MarkdownCond<T, S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: infer M;
  metadata?: infer U;
}
  ? {
      use: (components: any) => any;
      metadata: DeepTransformContent<U, L>;
    } & any
  : never;

export const markdownPlugin: Plugins = {
  id: 'markdown-plugin',
  canHandle: (node) =>
    typeof node === 'object' &&
    (node?.nodeType === NodeType.Markdown || node?.nodeType === 'markdown'),
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
 *  HTML PLUGIN
 *  --------------------------------------------- */

export type HTMLPluginCond<T, S, L> = HTMLCond<T, S, L>;

/** HTML plugin. Replaces node with a function that takes components => ReactNode. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' &&
    (node?.nodeType === NodeType.HTML || node?.nodeType === 'html'),

  transform: (node: HTMLContent, props) => {
    const html = node[NodeType.HTML];
    const { plugins, ...rest } = props;

    const render = (userComponents?: Record<string, any>): ReactNode =>
      createElement(HTMLRendererPlugin, { ...rest, html, userComponents });

    const element = render() as ReactElement;

    return new Proxy(element, {
      get(target, prop, receiver) {
        if (prop === 'value') {
          return html;
        }

        if (prop === 'use') {
          return (userComponents?: Record<string, any>) =>
            render(userComponents);
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as any;
  },
};

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginReact<T, S, L extends LocalesValues> {
  reactNode: ReactNodeCond<T>;
  intlayerNode: IntlayerNodeCond<T>;
  markdown: MarkdownCond<T, S, L>;
  html: HTMLPluginCond<T, S, L>;
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
  html: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;
