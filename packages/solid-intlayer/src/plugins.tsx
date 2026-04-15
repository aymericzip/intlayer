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
import { type JSX, lazy, Suspense } from 'solid-js';
import { ContentSelector } from './editor/ContentSelector';
import type { HTMLComponents } from './html/types';
import { type IntlayerNode, renderIntlayerNode } from './IntlayerNode';
import { renderSolidElement } from './solidElement/renderSolidElement';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the intlayer node type is explicitly disabled at build time.
 */
const TREE_SHAKE_INTLAYER_NODE =
  process.env['INTLAYER_NODE_TYPE_INTLAYER_NODE'] === 'false';

/**
 * True when the solid node type is explicitly disabled at build time.
 */
const TREE_SHAKE_SOLID_NODE =
  process.env['INTLAYER_NODE_TYPE_SOLID_NODE'] === 'false';

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

/**
 * True when the editor is explicitly disabled at build time.
 */
const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

// solid-js lazy for heavy renderer components — creates separate code-split chunks.
// Guarded by tree-shake constants so bundlers can eliminate the dynamic import()
// entirely when the feature is disabled at build time.
const LazyMarkdownMetadataRenderer = (
  TREE_SHAKE_MARKDOWN
    ? null
    : lazy(() =>
        import('./markdown/MarkdownRenderer').then((m) => ({
          default: m.MarkdownMetadataRenderer,
        }))
      )
)!;

const LazyMarkdownRenderer = (
  TREE_SHAKE_MARKDOWN
    ? null
    : lazy(() =>
        import('./markdown/MarkdownRenderer').then((m) => ({
          default: m.MarkdownRenderer,
        }))
      )
)!;

const LazyHTMLRenderer = (
  TREE_SHAKE_HTML
    ? null
    : lazy(() =>
        import('./html/HTMLRenderer').then((m) => ({ default: m.HTMLRenderer }))
      )
)!;

/** ---------------------------------------------
 *  INTLAYER NODE PLUGIN
 *  --------------------------------------------- */

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
          children:
            !TREE_SHAKE_EDITOR && editor.enabled ? (
              <ContentSelector {...rest}>{rest.children}</ContentSelector>
            ) : (
              rest.children
            ),
        }),
    };

/** ---------------------------------------------
 *  SOLID NODE PLUGIN
 *  --------------------------------------------- */

export type SolidNodeCond<T> = T extends {
  props: any;
  key?: any;
}
  ? JSX.Element
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const solidNodePlugins: Plugins = TREE_SHAKE_SOLID_NODE
  ? fallbackPlugin
  : {
      id: 'solid-node-plugin',
      canHandle: (node) =>
        (typeof node === 'object' && node?.props !== undefined) ||
        (typeof Node !== 'undefined' && node instanceof Node),

      transform: (
        node,
        {
          plugins, // Removed to avoid next error - Functions cannot be passed directly to Client Components
          ...rest
        }
      ) =>
        renderIntlayerNode({
          ...rest,
          value: '[[solid-element]]',
          children:
            !TREE_SHAKE_EDITOR && editor.enabled ? (
              <ContentSelector {...rest}>
                {typeof Node !== 'undefined' && node instanceof Node
                  ? node
                  : renderSolidElement(node)}
              </ContentSelector>
            ) : typeof Node !== 'undefined' && node instanceof Node ? (
              node
            ) : (
              renderSolidElement(node)
            ),
        }),
    };

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

export type InsertionCond<T, _S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer I;
  fields: readonly (infer F)[];
}
  ? <V extends { [K in Extract<F, string>]: string | number | JSX.Element }>(
      values: V
    ) => I extends string
      ? V[keyof V] extends string | number
        ? IntlayerNode<string>
        : IntlayerNode<JSX.Element>
      : DeepTransformContent<I, L>
  : never;

/**
 * Split insertion string and join with JSX elements
 */
const splitAndJoinInsertion = (
  template: string,
  values: Record<string, string | number | JSX.Element>
): JSX.Element => {
  const result = splitInsertionTemplate(template, values);

  // No JSX elements - use original logic
  if (result.isSimple) {
    // Simple string replacement
    return result.parts as string;
  }

  // Return as JSX array
  return result.parts as any[] as JSX.Element;
};

/** Insertion plugin for Solid. Handles component/element insertion. */
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

        // Return the (values) => wrapper at the Insertion level
        return (values: Record<string, string | number | JSX.Element>) => {
          /** Insertion string plugin. Replaces strings by injecting the values. */
          const insertionStringPlugin: Plugins = {
            id: 'insertion-string-plugin',
            canHandle: (n) => typeof n === 'string',
            transform: (n: string, subProps, deepTransformNode) => {
              const transformedResult = deepTransformNode(n, {
                ...subProps,
                children: n,
                plugins: [
                  ...(props.plugins ?? ([] as Plugins[])).filter(
                    (plugin) => plugin.id !== 'intlayer-node-plugin'
                  ),
                ],
              });

              // Inject the values captured from the parent scope
              const result = splitAndJoinInsertion(transformedResult, values);

              return deepTransformNode(result, {
                ...subProps,
                plugins: props.plugins,
                children: result,
              });
            },
          };

          // Process the child nodes (strings or enumerations) with the string plugin active
          return deepTransformNode(children, {
            ...props,
            children,
            keyPath: newKeyPath,
            plugins: [insertionStringPlugin, ...(props.plugins ?? [])],
          });
        };
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
        use: (components?: HTMLComponents<'permissive', {}>) => JSX.Element;
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
              children:
                !TREE_SHAKE_EDITOR && editor.enabled ? (
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

        const render = (components?: HTMLComponents) =>
          renderIntlayerNode({
            ...props,
            value: node,
            children:
              !TREE_SHAKE_EDITOR && editor.enabled ? (
                <ContentSelector {...rest}>
                  <Suspense fallback={node}>
                    <LazyMarkdownRenderer {...rest} components={components}>
                      {node}
                    </LazyMarkdownRenderer>
                  </Suspense>
                </ContentSelector>
              ) : (
                <Suspense fallback={node}>
                  <LazyMarkdownRenderer {...rest} components={components}>
                    {node}
                  </LazyMarkdownRenderer>
                </Suspense>
              ),
            additionalProps: {
              metadata: metadataNodes,
            },
          });

        const element = render() as any;

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
        });
      },
    };

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.MARKDOWN]: infer M;
  metadata?: infer U;
  tags?: infer U;
}
  ? IntlayerNode<
      M,
      {
        use: (components?: HTMLComponents<'permissive', U>) => JSX.Element;
        metadata: DeepTransformContent<U>;
      }
    >
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
 *  HTML PLUGIN
 *  --------------------------------------------- */

export type HTMLPluginCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.HTML]: infer I;
  tags?: infer U;
}
  ? IntlayerNode<
      I,
      {
        use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<I>;
      }
    >
  : never;

/** HTML plugin. Replaces node with a function that takes components => JSX.Element. */
export const htmlPlugin: Plugins = TREE_SHAKE_HTML
  ? fallbackPlugin
  : {
      id: 'html-plugin',
      canHandle: (node) =>
        typeof node === 'object' && node?.nodeType === NodeTypes.HTML,
      transform: (node: HTMLContent<string>, props) => {
        const html = node[NodeTypes.HTML];
        const { plugins, ...rest } = props;

        // Type-safe render function that accepts properly typed components
        const render = (userComponents?: HTMLComponents): any =>
          renderIntlayerNode({
            ...rest,
            value: html,
            children:
              !TREE_SHAKE_EDITOR && editor.enabled ? (
                <ContentSelector {...rest}>
                  <Suspense fallback={html}>
                    <LazyHTMLRenderer
                      {...rest}
                      html={html}
                      components={userComponents}
                    />
                  </Suspense>
                </ContentSelector>
              ) : (
                <Suspense fallback={html}>
                  <LazyHTMLRenderer
                    {...rest}
                    html={html}
                    components={userComponents}
                  />
                </Suspense>
              ),
          });

        const element = render() as any;
        const target = [element];

        return new Proxy(target as any, {
          get(target, prop, receiver) {
            if (prop === 'value') {
              return html;
            }

            if (prop === 'use') {
              return (userComponents?: HTMLComponents) =>
                render(userComponents);
            }

            return Reflect.get(target, prop, receiver);
          },
        });
      },
    };

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginSolid<T, S, L extends LocalesValues> {
  solidNode: SolidNodeCond<T>;
  solidIntlayerNode: IntlayerNodeCond<T>;
  solidInsertion: InsertionCond<T, S, L>;
  solidMarkdown: MarkdownCond<T>;
  solidHtml: HTMLPluginCond<T>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `solid-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = Omit<
  IInterpreterPluginStateCore,
  'insertion' // Remove insertion type from core package
> & {
  solidNode: true;
  solidIntlayerNode: true;
  solidInsertion: true;
  solidMarkdown: true;
  solidHtml: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;

/**
 * Get the plugins array for Solid content transformation.
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
    solidNodePlugins,
    insertionPlugin,
    markdownPlugin,
    htmlPlugin,
  ].filter(Boolean) as Plugins[];
