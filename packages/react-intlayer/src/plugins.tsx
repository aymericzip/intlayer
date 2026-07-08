import { editor, internationalization } from '@intlayer/config/built';
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
  pluralPlugin,
  splitInsertionTemplate,
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
import {
  createElement,
  type FC,
  Fragment,
  type ReactElement,
  type ReactNode,
} from 'react';
import { reportExposure } from './analytics/exposureSink';
import { useLoadDynamic } from './client/useLoadDynamic';
import { ContentSelector } from './editor/ContentSelector';
import type { HTMLComponents } from './html/HTMLComponentTypes';
import { type IntlayerNode, renderIntlayerNode } from './IntlayerNode';
import { renderReactElement } from './reactElement/renderReactElement';

const markdownRendererModulePromise =
  process.env.INTLAYER_NODE_TYPE_MARKDOWN !== 'false'
    ? import('./markdown/MarkdownRendererPlugin').then(
        (m) => m.MarkdownRendererPlugin
      )
    : null;

const htmlRendererModulePromise =
  process.env.INTLAYER_NODE_TYPE_HTML !== 'false'
    ? import('./html/HTMLRendererPlugin').then((m) => m.HTMLRendererPlugin)
    : null;

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
  ) => {
    // Node-level analytics: record which content is resolved for display.
    // No-op (and dead-code-eliminated) when analytics is disabled.
    if (process.env.INTLAYER_ANALYTICS_ENABLED !== 'false') {
      reportExposure({
        dictionaryKey: rest.dictionaryKey,
        keyPath: rest.keyPath,
        locale: rest.locale,
        nodeType: 'text',
      });
    }

    return renderIntlayerNode({
      ...rest,
      value: rest.children,
      children:
        process.env.INTLAYER_EDITOR_ENABLED !== 'false' && editor.enabled ? (
          <ContentSelector {...rest}>{rest.children}</ContentSelector>
        ) : (
          rest.children
        ),
    });
  },
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
export const reactNodePlugins: Plugins =
  process.env.INTLAYER_NODE_TYPE_REACT_NODE === 'false'
    ? fallbackPlugin
    : {
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
        ) => {
          if (process.env.INTLAYER_ANALYTICS_ENABLED !== 'false') {
            reportExposure({
              dictionaryKey: rest.dictionaryKey,
              keyPath: rest.keyPath,
              locale: rest.locale,
              nodeType: 'react-node',
            });
          }

          return renderIntlayerNode({
            ...rest,
            value: '[[react-element]]',
            children:
              process.env.INTLAYER_EDITOR_ENABLED !== 'false' &&
              editor.enabled ? (
                <ContentSelector {...rest}>
                  {renderReactElement(node)}
                </ContentSelector>
              ) : (
                renderReactElement(node)
              ),
          });
        },
      };

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

export type InsertionCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer I;
  fields: readonly string[];
}
  ? <V extends { [K in T['fields'][number]]: ReactNode }>(
      values: V
    ) => I extends string
      ? V[keyof V] extends string | number
        ? IntlayerNode<string>
        : IntlayerNode<ReactNode>
      : DeepTransformContent<I>
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
export const insertionPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_INSERTION === 'false'
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
        use: (components: HTMLComponents<'permissive', {}>) => ReactNode;
      }
    >
  : never;

const MarkdownSuspenseRenderer: FC<Record<string, any>> = ({
  children,
  ...props
}) => {
  const MarkdownRendererPlugin = useLoadDynamic(
    'markdown-renderer-plugin',
    markdownRendererModulePromise!
  );
  return createElement(MarkdownRendererPlugin as any, { ...props, children });
};

/** Markdown string plugin. Replaces string node with a component that render the markdown. */
export const markdownStringPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_MARKDOWN === 'false'
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
                children:
                  process.env.INTLAYER_EDITOR_ENABLED !== 'false' &&
                  editor.enabled ? (
                    <ContentSelector {...rest}>{node}</ContentSelector>
                  ) : (
                    node
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
              children:
                process.env.INTLAYER_EDITOR_ENABLED !== 'false' &&
                editor.enabled ? (
                  <ContentSelector {...rest}>
                    <MarkdownSuspenseRenderer {...rest} components={components}>
                      {node}
                    </MarkdownSuspenseRenderer>
                  </ContentSelector>
                ) : (
                  <MarkdownSuspenseRenderer {...rest} components={components}>
                    {node}
                  </MarkdownSuspenseRenderer>
                ),
              additionalProps: {
                metadata: metadataNodes,
              },
            });

          const element = render() as unknown as ReactElement;

          return new Proxy(element, {
            get(target, prop, receiver) {
              if (prop === 'value') return node;
              if (prop === Symbol.toPrimitive) return () => node;
              if (prop === 'toString') return () => node;
              if (prop === 'valueOf') return () => node;
              if (typeof prop === 'string' && prop !== 'constructor') {
                const method = (String.prototype as any)[prop];
                if (typeof method === 'function') return method.bind(node);
              }
              if (prop === 'metadata') return metadataNodes;
              if (prop === 'use')
                return (components?: HTMLComponents) => render(components);
              return Reflect.get(target, prop, receiver);
            },
          }) as any;
        },
      };

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.MARKDOWN]: infer M;
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

export const markdownPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_MARKDOWN === 'false'
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
  [NodeTypes.HTML]: infer I;
  tags?: infer U;
}
  ? IntlayerNode<
      I,
      {
        use: (components?: HTMLComponents<'permissive', U>) => ReactNode;
      }
    >
  : never;

const HTMLSuspenseRenderer: FC<Record<string, any>> = (props) => {
  const HTMLRendererPlugin = useLoadDynamic(
    'html-renderer-plugin',
    htmlRendererModulePromise!
  );
  return createElement(HTMLRendererPlugin as any, props);
};

/** HTML plugin. Replaces node with a function that takes components => ReactNode. */
export const htmlPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_HTML === 'false'
    ? fallbackPlugin
    : {
        id: 'html-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.HTML,

        transform: (node: HTMLContent<string>, props) => {
          const html = node[NodeTypes.HTML];
          const { plugins, ...rest } = props;

          // Type-safe render function that accepts properly typed components
          const render = (userComponents?: HTMLComponents): ReactNode =>
            renderIntlayerNode({
              ...rest,
              value: html,
              children:
                process.env.INTLAYER_EDITOR_ENABLED !== 'false' &&
                editor.enabled ? (
                  <ContentSelector {...rest}>
                    <HTMLSuspenseRenderer
                      {...rest}
                      html={html}
                      userComponents={userComponents}
                    />
                  </ContentSelector>
                ) : (
                  <HTMLSuspenseRenderer
                    {...rest}
                    html={html}
                    userComponents={userComponents}
                  />
                ),
            });

          const element = render() as unknown as ReactElement;

          return new Proxy(element, {
            get(target, prop, receiver) {
              if (prop === 'value') return html;
              if (prop === Symbol.toPrimitive) return () => html;
              if (prop === 'toString') return () => html;
              if (prop === 'valueOf') return () => html;
              if (typeof prop === 'string' && prop !== 'constructor') {
                const method = (String.prototype as any)[prop];
                if (typeof method === 'function') return method.bind(html);
              }
              if (prop === 'use')
                return (userComponents?: HTMLComponents) =>
                  render(userComponents);
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

const pluginsCache = new Map<string, Plugins[]>();

/**
 * Get the plugins array for React content transformation.
 * This function is used by both getIntlayer and getDictionary to ensure consistent plugin configuration.
 */
export const getPlugins = (
  locale?: LocalesValues,
  fallback: boolean = true
): Plugins[] => {
  const currentLocale = locale ?? internationalization.defaultLocale;
  const cacheKey = `${currentLocale}_${fallback}`;

  if (pluginsCache.has(cacheKey)) {
    return pluginsCache.get(cacheKey)!;
  }

  const plugins = [
    // Env var allows the bundler to to remove the plugin if not used to make the bundle smaller
    translationPlugin(
      locale ?? internationalization.defaultLocale,
      fallback ? internationalization.defaultLocale : undefined
    ),
    enumerationPlugin,
    pluralPlugin(locale ?? internationalization.defaultLocale),
    conditionPlugin,
    nestedPlugin(locale ?? internationalization.defaultLocale),

    filePlugin,
    genderPlugin,
    // Always include: handle plain strings/numbers and React elements
    intlayerNodePlugins,
    reactNodePlugins,
    insertionPlugin,
    markdownPlugin,
    htmlPlugin,
  ] as Plugins[];

  pluginsCache.set(cacheKey, plugins);

  return plugins;
};
