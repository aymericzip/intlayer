import { internationalization, editor } from '@intlayer/config/built';
import {
  conditionPlugin,
  type DeepTransformContent as DeepTransformContentCore,
  enumerationPlugin,
  fallbackPlugin,
  filePlugin,
  genderPlugin,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  nestedPlugin,
  type Plugins,
  translationPlugin,
} from '@intlayer/core/interpreter';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type {
  HTMLContent,
  InsertionContent,
  MarkdownContent,
} from '@intlayer/core/transpiler';
import type { KeyPath } from '@intlayer/types/keyPath';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import { Fragment, h, type VNode } from 'preact';
import { lazy, Suspense } from 'preact/compat';
import { ContentSelector } from './editor/ContentSelector';
import type { HTMLComponents } from './html/types';
import { type IntlayerNode, renderIntlayerNode } from './IntlayerNode';
import { renderPreactElement } from './preactElement/renderPreactElement';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the intlayer node type is explicitly disabled at build time.
 */
const TREE_SHAKE_INTLAYER_NODE =
  process.env['INTLAYER_NODE_TYPE_INTLAYER_NODE'] === 'false';

/**
 * True when the preact node type is explicitly disabled at build time.
 */
const TREE_SHAKE_PREACT_NODE =
  process.env['INTLAYER_NODE_TYPE_PREACT_NODE'] === 'false';

/**
 * True when the markdown node type is explicitly disabled at build time.
 */
const TREE_SHAKE_MARKDOWN =
  process.env['INTLAYER_NODE_TYPE_MARKDOWN'] === 'false';

/**
 * True when the HTML node type is explicitly disabled at build time.
 */
const TREE_SHAKE_HTML = process.env['INTLAYER_NODE_TYPE_HTML'] === 'false';

/**
 * True when the insertion node type is explicitly disabled at build time.
 */
const TREE_SHAKE_INSERTION =
  process.env['INTLAYER_NODE_TYPE_INSERTION'] === 'false';

// preact lazy for heavy renderer components — creates separate code-split chunks
const LazyMarkdownMetadataRenderer = lazy(() =>
  import('./markdown/MarkdownRendererPlugin').then((m) => ({
    default: m.MarkdownMetadataRenderer,
  }))
);

const LazyMarkdownRendererPlugin = lazy(() =>
  import('./markdown/MarkdownRendererPlugin').then((m) => ({
    default: m.MarkdownRendererPlugin,
  }))
);

const LazyHTMLRenderer = lazy(() =>
  import('./html/HTMLRenderer').then((m) => ({ default: m.HTMLRenderer }))
);

/** ---------------------------------------------
 * INTLAYER NODE PLUGIN
 * --------------------------------------------- */

export type IntlayerNodeCond<T> = T extends number | string
  ? IntlayerNode<T>
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const intlayerNodePlugins: Plugins = TREE_SHAKE_INTLAYER_NODE
  ? fallbackPlugin
  : {
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
          children: editor.enabled ? (
            <ContentSelector {...rest} key={rest.children}>
              {rest.children}
            </ContentSelector>
          ) : (
            rest.children
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
export const preactNodePlugins: Plugins = TREE_SHAKE_PREACT_NODE
  ? fallbackPlugin
  : {
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
          children: editor.enabled ? (
            <ContentSelector {...rest}>
              {renderPreactElement(node)}
            </ContentSelector>
          ) : (
            renderPreactElement(node)
          ),
        }),
    };

/** ---------------------------------------------
 * INSERTION PLUGIN
 * --------------------------------------------- */

export type InsertionCond<T, _S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer I; // Accept strings OR nested nodes like enumerations
  fields: readonly (infer F)[]; // Infer the exact string literals in the array
}
  ? <V extends { [K in Extract<F, string>]: string | number | VNode }>(
      values: V
    ) => I extends string
      ? V[keyof V] extends string | number
        ? IntlayerNode<string>
        : IntlayerNode<VNode>
      : DeepTransformContent<I, L> // Delegate nested nodes (like enumerations) back to the core
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
export const insertionPlugin: Plugins = TREE_SHAKE_INSERTION
  ? fallbackPlugin
  : {
      id: 'insertion-plugin',
      canHandle: (node) =>
        typeof node === 'object' && node?.nodeType === NodeTypes.INSERTION,
      transform: (node: InsertionContent, props, deepTransformNode) => {
        const newKeyPath: KeyPath[] = [
          ...props.keyPath,
          {
            type: NodeTypes.INSERTION,
          },
        ];

        const children = node[NodeTypes.INSERTION];

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
                  | VNode;
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
          [NodeTypes.ENUMERATION, NodeTypes.CONDITION].includes(
            children.nodeType as
              | typeof NodeTypes.ENUMERATION
              | typeof NodeTypes.CONDITION
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
        use: (components?: HTMLComponents<'permissive', {}>) => VNode;
      }
    >
  : never;

/** Markdown string plugin. Replaces string node with a component that render the markdown. */
export const markdownStringPlugin: Plugins = TREE_SHAKE_MARKDOWN
  ? fallbackPlugin
  : {
      id: 'markdown-string-plugin',
      canHandle: (node) => typeof node === 'string',
      transform: (node: string, props, deepTransformNode) => {
        const {
          plugins, // Removed to avoid next error - Functions cannot be passed directly to Client Components
          ...rest
        } = props;

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
              ...props,
              value: metadataNode,
              children: editor.enabled ? (
                <ContentSelector {...rest}>
                  <Suspense fallback={node}>
                    <LazyMarkdownMetadataRenderer
                      {...rest}
                      metadataKeyPath={props.keyPath}
                    >
                      {node}
                    </LazyMarkdownMetadataRenderer>
                  </Suspense>
                </ContentSelector>
              ) : (
                <Suspense fallback={node}>
                  <LazyMarkdownMetadataRenderer
                    {...rest}
                    metadataKeyPath={props.keyPath}
                  >
                    {node}
                  </LazyMarkdownMetadataRenderer>
                </Suspense>
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
            children: editor.enabled ? (
              <ContentSelector {...rest}>
                <Suspense fallback={node}>
                  <LazyMarkdownRendererPlugin {...rest} components={components}>
                    {node}
                  </LazyMarkdownRendererPlugin>
                </Suspense>
              </ContentSelector>
            ) : (
              <Suspense fallback={node}>
                <LazyMarkdownRendererPlugin {...rest} components={components}>
                  {node}
                </LazyMarkdownRendererPlugin>
              </Suspense>
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
  [NodeTypes.MARKDOWN]: infer _M;
  metadata?: infer U;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => VNode;
      metadata: DeepTransformContent<U>;
    }
  : never;

export const markdownPlugin: Plugins = TREE_SHAKE_MARKDOWN
  ? fallbackPlugin
  : {
      id: 'markdown-plugin',
      canHandle: (node) =>
        typeof node === 'object' && node?.nodeType === NodeTypes.MARKDOWN,
      transform: (node: MarkdownContent, props, deepTransformNode) => {
        const newKeyPath: KeyPath[] = [
          ...props.keyPath,
          {
            type: NodeTypes.MARKDOWN,
          },
        ];

        const children = node[NodeTypes.MARKDOWN];

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
  [NodeTypes.HTML]: infer I;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<I>;
    }
  : never;

/** HTML plugin. Replaces node with a function that takes components => VNode. */
export const htmlPlugin: Plugins = TREE_SHAKE_HTML
  ? fallbackPlugin
  : {
      id: 'html-plugin',
      canHandle: (node) =>
        typeof node === 'object' && node?.nodeType === NodeTypes.HTML,
      transform: (node: HTMLContent<string>, props) => {
        const html = node[NodeTypes.HTML];
        const _tags = node.tags ?? [];
        const { plugins, ...rest } = props;

        // Type-safe render function that accepts properly typed components
        const render = (userComponents?: HTMLComponents): VNode =>
          renderIntlayerNode({
            ...rest,
            value: html,
            children: h(
              Suspense as any,
              { fallback: html },
              h(LazyHTMLRenderer as any, {
                ...rest,
                html,
                userComponents,
              })
            ),
          }) as any;

        const element = render() as any;

        const proxy = new Proxy(element, {
          get(target, prop) {
            if (prop === 'value') {
              return html;
            }

            if (prop === 'use') {
              return (userComponents?: HTMLComponents) =>
                render(userComponents);
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

/**
 * Get the plugins array for Preact content transformation.
 * This function is used by both getIntlayer and getDictionary to ensure consistent plugin configuration.
 */
export const getPlugins = (
  locale?: LocalesValues,
  fallback: boolean = true
): Plugins[] =>
  [
    translationPlugin(
      locale ?? internationalization.defaultLocale,
      fallback ? internationalization.defaultLocale : undefined
    ),
    enumerationPlugin,
    conditionPlugin,
    nestedPlugin(locale ?? internationalization.defaultLocale),
    filePlugin,
    genderPlugin,
    // Always include: handle plain strings/numbers and React elements
    intlayerNodePlugins,
    preactNodePlugins,
    insertionPlugin,
    markdownPlugin,
    htmlPlugin,
  ].filter(Boolean) as Plugins[];
