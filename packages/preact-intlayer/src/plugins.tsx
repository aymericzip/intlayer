import {
  type DeepTransformContent as DeepTransformContentCore,
  getMarkdownMetadata,
  type HTMLContent,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type InsertionContent,
  type MarkdownContent,
  type Plugins,
} from '@intlayer/core';
import type { DeclaredLocales, KeyPath, LocalesValues } from '@intlayer/types';
import { NodeType } from '@intlayer/types';
import { type ComponentType, Fragment, h, type VNode } from 'preact';
import { ContentSelectorRenderer } from './editor';
import { EditedContentRenderer } from './editor/useEditedContentRenderer';
import { HTMLRenderer } from './html/HTMLRenderer';
import type { HTMLComponents } from './html/types';
import { type IntlayerNode, renderIntlayerNode } from './IntlayerNode';
import { MarkdownMetadataRenderer, MarkdownRenderer } from './markdown';
import { renderPreactElement } from './preactElement/renderPreactElement';

/** ---------------------------------------------
 * INTLAYER NODE PLUGIN
 * --------------------------------------------- */

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
 * PREACT NODE PLUGIN
 * --------------------------------------------- */

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

/** ---------------------------------------------
 * INSERTION PLUGIN
 * --------------------------------------------- */

export type InsertionCond<T, S, L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Insertion]: string;
  fields: readonly string[];
}
  ? (
      values: {
        [K in T['fields'][number]]: string | number | VNode;
      }
    ) => VNode
  : never;

/**
 * Check if a value is a Preact VNode
 */
const isVNode = (value: any): value is VNode => {
  return (
    value !== null &&
    value !== undefined &&
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    typeof value !== 'boolean'
  );
};

/**
 * Split insertion string and join with Preact VNodes
 */
const splitAndJoinInsertion = (
  template: string,
  values: Record<string, string | number | VNode>
): VNode => {
  // Check if any value is a VNode
  const hasVNode = Object.values(values).some(isVNode);

  if (!hasVNode) {
    // Simple string replacement
    return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, key) => {
      const trimmedKey = key.trim();
      return (values[trimmedKey] ?? '').toString();
    }) as any;
  }

  // Split the template by placeholders while keeping the structure
  const parts: (string | VNode)[] = [];
  let lastIndex = 0;
  const regex = /\{\{\s*(.*?)\s*\}\}/g;
  let match: RegExpExecArray | null = regex.exec(template);

  while (match !== null) {
    // Add text before the placeholder
    if (match.index > lastIndex) {
      parts.push(template.substring(lastIndex, match.index));
    }

    // Add the replaced value
    const key = match[1].trim();
    const value = values[key];
    if (value !== undefined && value !== null) {
      parts.push(typeof value === 'number' ? String(value) : value);
    }

    lastIndex = match.index + match[0].length;
    match = regex.exec(template);
  }

  // Add remaining text
  if (lastIndex < template.length) {
    parts.push(template.substring(lastIndex));
  }

  // Return as Fragment
  return h(
    Fragment,
    null,
    ...parts.map((part, index) => h(Fragment, { key: index }, part))
  );
};

/** Insertion plugin for Preact. Handles component/node insertion. */
export const insertionPlugin: Plugins = {
  id: 'insertion-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Insertion,
  transform: (node: InsertionContent, props, deepTransformNode) => {
    const newKeyPath: KeyPath[] = [
      ...props.keyPath,
      {
        type: NodeType.Insertion,
      },
    ];

    const children = node[NodeType.Insertion];

    /** Insertion string plugin. Replaces string node with a component that render the insertion. */
    const insertionStringPlugin: Plugins = {
      id: 'insertion-string-plugin',
      canHandle: (node) => typeof node === 'string',
      transform: (node: string, subProps, deepTransformNode) => {
        const transformedResult = deepTransformNode(node, {
          ...subProps,
          children: node,
          plugins: [
            ...(props.plugins ?? ([] as Plugins[])).filter(
              (plugin) => plugin.id !== 'intlayer-node-plugin'
            ),
          ],
        });

        return (
          values: {
            [K in InsertionContent['fields'][number]]: string | number | VNode;
          }
        ) => {
          const result = splitAndJoinInsertion(transformedResult, values);

          return deepTransformNode(result, {
            ...subProps,
            plugins: props.plugins,
            children: result as any,
          });
        };
      },
    };

    return deepTransformNode(children, {
      ...props,
      children,
      keyPath: newKeyPath,
      plugins: [insertionStringPlugin, ...(props.plugins ?? [])],
    });
  },
};

/**
 * MARKDOWN PLUGIN
 */

export type MarkdownStringCond<T> = T extends string
  ? IntlayerNode<
      string,
      {
        metadata: DeepTransformContent<string>;
        use: (components?: HTMLComponents<'permissive', {}>) => VNode;
      }
    >
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

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: infer M;
  metadata?: infer U;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => VNode;
      metadata: DeepTransformContent<U>;
    }
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
 * HTML PLUGIN
 * --------------------------------------------- */

export type HTMLPluginCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.HTML]: infer I;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<I>;
    }
  : never;

/** HTML plugin. Replaces node with a function that takes components => VNode. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.HTML,
  transform: (node: HTMLContent<string>, props) => {
    const html = node[NodeType.HTML];
    const tags = node.tags ?? [];
    const { plugins, ...rest } = props;

    // Type-safe render function that accepts properly typed components
    const render = (userComponents?: HTMLComponents): VNode =>
      h(HTMLRenderer as any, { ...rest, html, userComponents } as any);

    const element = render() as any;

    const proxy = new Proxy(element, {
      get(target, prop) {
        if (prop === 'value') {
          return html;
        }

        if (prop === 'use') {
          return (userComponents?: HTMLComponents) => render(userComponents);
        }

        return Reflect.get(target, prop);
      },
    });

    return proxy;
  },
};

/** ---------------------------------------------
 * PLUGINS RESULT
 * --------------------------------------------- */

export interface IInterpreterPluginPreact<T, S, L extends LocalesValues> {
  preactNode: PreactNodeCond<T>;
  preactIntlayerNode: IntlayerNodeCond<T>;
  preactInsertion: InsertionCond<T, S, L>;
  preactMarkdown: MarkdownCond<T>;
  preactHtml: HTMLPluginCond<T>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `preact-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = Omit<
  IInterpreterPluginStateCore,
  'insertion' // Remove insertion type from core package
> & {
  preactNode: true;
  preactIntlayerNode: true;
  preactInsertion: true;
  preactMarkdown: true;
  preactHtml: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;
