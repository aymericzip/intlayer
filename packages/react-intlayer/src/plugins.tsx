import {
  type DeepTransformContent as DeepTransformContentCore,
  getMarkdownMetadata,
  type HTMLContent,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type InsertionContent,
  type MarkdownContent,
  type Plugins,
  splitInsertionTemplate,
} from '@intlayer/core';
import {
  type DeclaredLocales,
  type KeyPath,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import {
  createElement,
  Fragment,
  type ReactElement,
  type ReactNode,
} from 'react';
import { ContentSelectorRenderer } from './editor';
import { EditedContentRenderer } from './editor/useEditedContentRenderer';
import { HTMLRendererPlugin } from './html';
import type { HTMLComponents } from './html/HTMLComponentTypes';
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

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

export type InsertionCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Insertion]: string;
  fields: readonly string[];
}
  ? (
      values: {
        [K in T['fields'][number]]: ReactNode;
      }
    ) => ReactNode
  : never;

/**
 * Split insertion string and join with React nodes using shared core logic
 */
const splitAndJoinInsertion = (
  template: string,
  values: Record<string, string | number | ReactNode>
): ReactNode => {
  const result = splitInsertionTemplate(template, values);

  if (result.isSimple) {
    // Simple string replacement
    return result.parts as string;
  }

  // Return as Fragment with proper keys
  return createElement(
    Fragment,
    null,
    ...(result.parts as any[]).map((part, index) =>
      createElement(Fragment, { key: index }, part)
    )
  );
};

/** Insertion plugin for React. Handles component/node insertion. */
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
            [K in InsertionContent['fields'][number]]:
              | string
              | number
              | ReactNode;
          }
        ) => {
          const result = splitAndJoinInsertion(transformedResult, values);

          return deepTransformNode(result, {
            ...subProps,
            plugins: props.plugins,
            children: result,
          });
        };
      },
    };

    const result = deepTransformNode(children, {
      ...props,
      children,
      keyPath: newKeyPath,
      plugins: [insertionStringPlugin, ...(props.plugins ?? [])],
    });

    if (
      typeof children === 'object' &&
      children !== null &&
      'nodeType' in children &&
      [NodeType.Enumeration, NodeType.Condition].includes(
        children.nodeType as NodeType
      )
    ) {
      return (values: any) => (arg: any) => {
        const func = result as Function;
        const inner = func(arg);

        if (typeof inner === 'function') {
          return inner(values);
        }
        return inner;
      };
    }

    return result;
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
        use: (components: HTMLComponents<'permissive', {}>) => ReactNode;
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

    const render = (components?: HTMLComponents) =>
      renderIntlayerNode({
        ...props,
        value: node,
        children: (
          <ContentSelectorRenderer {...rest}>
            <MarkdownRendererPlugin {...rest} {...(components ?? {})}>
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
          return (components?: HTMLComponents) => render(components);
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as any;
  },
};

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: infer M;
  tags?: infer U;
  metadata?: infer V;
}
  ? IntlayerNode<
      M,
      {
        use: (components?: HTMLComponents<'permissive', U>) => ReactNode;
        metadata: DeepTransformContent<V>;
      }
    >
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

/**
 * HTML conditional type that enforces:
 * - All components (Standard or Custom) are OPTIONAL in the `use()` method.
 * - Custom components props are strictly inferred from the dictionary definition.
 *
 * This ensures type safety:
 * - `html('<div>Hello <CustomComponent /></div>').use({ CustomComponent: ... })` - optional but typed
 */
export type HTMLPluginCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.HTML]: infer I;
  tags?: infer U;
}
  ? IntlayerNode<
      I,
      {
        use: (components?: HTMLComponents<'permissive', U>) => ReactNode;
      }
    >
  : never;

/** HTML plugin. Replaces node with a function that takes components => ReactNode. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.HTML,

  transform: (node: HTMLContent<string>, props) => {
    const html = node[NodeType.HTML];
    const { plugins, ...rest } = props;

    // Type-safe render function that accepts properly typed components
    const render = (userComponents?: HTMLComponents): ReactNode =>
      createElement(HTMLRendererPlugin, { ...rest, html, userComponents });

    const element = render() as ReactElement;

    return new Proxy(element, {
      get(target, prop, receiver) {
        if (prop === 'value') {
          return html;
        }

        if (prop === 'use') {
          // Return a properly typed function based on custom components
          return (userComponents?: HTMLComponents) => render(userComponents);
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as any;
  },
};

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export type IInterpreterPluginReact<T, _S, _L extends LocalesValues> = {
  reactNode: ReactNodeCond<T>;
  reactIntlayerNode: IntlayerNodeCond<T>;
  reactInsertion: InsertionCond<T>;
  reactMarkdown: MarkdownCond<T>;
  reactHtml: HTMLPluginCond<T>;
};

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `react-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = Omit<
  IInterpreterPluginStateCore,
  'insertion' // Remove insertion type from core package
> & {
  reactNode: true;
  reactIntlayerNode: true;
  reactMarkdown: true;
  reactHtml: true;
  reactInsertion: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;
