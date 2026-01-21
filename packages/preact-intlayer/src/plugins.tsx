import {
  type DeepTransformContent as DeepTransformContentCore,
  getMarkdownMetadata,
  type HTMLCond,
  type HTMLContent,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type MarkdownContent,
  type Plugins,
} from '@intlayer/core';
import type { DeclaredLocales, KeyPath, LocalesValues } from '@intlayer/types';
import { NodeType } from '@intlayer/types';
import { h, type VNode } from 'preact';
import { ContentSelectorRenderer } from './editor';
import { EditedContentRenderer } from './editor/useEditedContentRenderer';
import { HTMLRenderer } from './html/HTMLRenderer';
import { type IntlayerNode, renderIntlayerNode } from './IntlayerNode';
import { MarkdownMetadataRenderer, MarkdownRenderer } from './markdown';
import { renderPreactElement } from './preactElement/renderPreactElement';

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
        <ContentSelectorRenderer {...rest} key={rest.children}>
          <EditedContentRenderer {...rest}>
            {rest.children}
          </EditedContentRenderer>
        </ContentSelectorRenderer>
      ),
    }),
};

/** ---------------------------------------------
 *  PREACT NODE PLUGIN
 *  --------------------------------------------- */

export type PreactNodeCond<T> = T extends {
  props: any;
  key: any;
}
  ? VNode
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const preactNodePlugins: Plugins = {
  id: 'preact-node-plugin',
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
      value: '[[preact-element]]',
      children: (
        <ContentSelectorRenderer {...rest}>
          {renderPreactElement(node)}
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
            <MarkdownRenderer {...rest} {...components}>
              {node}
            </MarkdownRenderer>
          </ContentSelectorRenderer>
        ),
        additionalProps: {
          metadata: metadataNodes,
        },
      });

    const element = render() as any;

    return new Proxy(element, {
      get(target, prop) {
        if (prop === 'value') {
          return node;
        }
        if (prop === 'metadata') {
          return metadataNodes;
        }

        if (prop === 'use') {
          return (components?: any) => render(components);
        }

        return Reflect.get(target, prop);
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
 *  HTML PLUGIN
 *  --------------------------------------------- */

export type HTMLPluginCond<T, S, L> = HTMLCond<T, S, L>;

/** HTML plugin. Replaces node with a function that takes components => VNode. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.HTML,
  transform: (node: HTMLContent, props) => {
    const html = node[NodeType.HTML];
    const { plugins, ...rest } = props;

    const render = (userComponents?: Record<string, any>): VNode =>
      h(HTMLRenderer as any, { ...rest, html, userComponents } as any);

    const element = render() as any;

    const proxy = new Proxy(element, {
      get(target, prop) {
        if (prop === 'value') {
          return html;
        }

        if (prop === 'use') {
          return (userComponents?: Record<string, any>) =>
            render(userComponents);
        }

        return Reflect.get(target, prop);
      },
    });

    return proxy;
  },
};

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginPreact<T, S, L extends LocalesValues> {
  preactNode: PreactNodeCond<T>;
  intlayerNode: IntlayerNodeCond<T>;
  markdown: MarkdownCond<T, S, L>;
  html: HTMLPluginCond<T, S, L>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `preact-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  preactNode: true;
  intlayerNode: true;
  markdown: true;
  html: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;
