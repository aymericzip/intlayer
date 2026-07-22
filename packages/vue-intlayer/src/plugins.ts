import { editor, internationalization } from '@intlayer/config/built';
import {
  conditionPlugin,
  type DeepTransformContent as DeepTransformContentCore,
  enumerationPlugin,
  fallbackPlugin,
  filePlugin,
  genderPlugin,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  isInterpolableWrapperNode,
  nestedPlugin,
  type Plugins,
  pluralPlugin,
  splitInsertionTemplate,
  transformInterpolableNode,
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
  type Component,
  defineAsyncComponent,
  Fragment,
  h,
  markRaw,
  type VNode,
  type VNodeChild,
} from 'vue';
import { reportExposure } from './analytics/exposureSink';
import { renderHTML } from './html/HTMLRenderer';
import type { HTMLComponents } from './html/types';
import { useMarkdown } from './markdown/installIntlayerMarkdown';
import {
  type IntlayerNode as IntlayerNodeCore,
  renderIntlayerNode,
} from './renderIntlayerNode';

// Vue async component for the editor selector — only loaded when editor is enabled.
// Guarded by INTLAYER_EDITOR_ENABLED so bundlers can eliminate the dynamic import() entirely
// when the editor is disabled at build time.
const LazyContentSelector = (
  process.env.INTLAYER_EDITOR_ENABLED === 'false'
    ? null
    : defineAsyncComponent(
        () =>
          import('./editor/ContentSelector.vue') as Promise<{
            default: Component;
          }>
      )
)!;

/** ---------------------------------------------
 * INTLAYER NODE PLUGIN
 * --------------------------------------------- */

export type IntlayerNodeCond<T> = T extends number | string
  ? IntlayerNode<T>
  : never;

export type IntlayerNode<T, P = {}> = IntlayerNodeCore<T> & P;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (_node, { children, ...rest }) => {
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

    const render = (children: any) =>
      renderIntlayerNode({
        ...rest,
        value: children,
        children:
          process.env.INTLAYER_EDITOR_ENABLED !== 'false' && editor.enabled
            ? () =>
                h(
                  // EditorSelectorRenderer, // Maximum stack size exceeded
                  LazyContentSelector,
                  {
                    dictionaryKey: rest.dictionaryKey,
                    keyPath: rest.keyPath,
                  },
                  {
                    default: () =>
                      typeof children === 'function' ? children() : children,
                  }
                )
            : children,
      });

    const element = render(children) as any;

    if (typeof children !== 'function') {
      return element;
    }

    const fn = (...args: any[]) => {
      const result = children(...args);
      return render(result);
    };

    // Copy properties from element to fn
    Object.setPrototypeOf(fn, Object.getPrototypeOf(element));
    for (const key of Object.getOwnPropertyNames(element)) {
      const desc = Object.getOwnPropertyDescriptor(element, key);
      if (desc) Object.defineProperty(fn, key, desc);
    }
    // and symbols
    for (const sym of Object.getOwnPropertySymbols(element)) {
      const desc = Object.getOwnPropertyDescriptor(element, sym);
      if (desc) Object.defineProperty(fn, sym, desc);
    }

    return markRaw(fn);
  },
};

/** ---------------------------------------------
 * INSERTION PLUGIN
 * --------------------------------------------- */

export type InsertionCond<T, _S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer I;
  fields: readonly string[];
}
  ? <V extends { [K in T['fields'][number]]: VNode | string | number }>(
      values: V
    ) => I extends string
      ? V[keyof V] extends string | number
        ? IntlayerNode<string>
        : IntlayerNode<VNode | VNode[]>
      : DeepTransformContent<I, L>
  : never;

/**
 * Split insertion string and join with Vue VNodes using shared core logic
 */
const splitAndJoinInsertion = (
  template: string,
  values: Record<string, string | number | VNode>
): VNode | VNode[] => {
  // Separate VNode values from primitives
  const vNodeMap = new Map<string, VNode>();
  const primitiveValues: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(values)) {
    if (typeof value === 'string' || typeof value === 'number') {
      primitiveValues[key] = value;
    } else {
      // Store VNode for later reconstruction
      vNodeMap.set(key, value);
      // Use a placeholder string for template processing
      primitiveValues[key] = `__VNODE_${key}__`;
    }
  }

  const result = splitInsertionTemplate(template, primitiveValues);

  // If there are VNodes, we need to process them
  if (vNodeMap.size > 0) {
    const parts: any[] = [];

    if (result.isSimple) {
      // Simple string replacement
      const str = result.parts as string;
      let lastIndex = 0;

      for (const [key] of vNodeMap) {
        const placeholder = `__VNODE_${key}__`;
        const index = str.indexOf(placeholder);

        if (index !== -1) {
          if (index > lastIndex) {
            parts.push(str.substring(lastIndex, index));
          }
          parts.push(vNodeMap.get(key)!);
          lastIndex = index + placeholder.length;
        }
      }

      if (lastIndex < str.length) {
        parts.push(str.substring(lastIndex));
      }

      return h(Fragment, null, ...parts);
    } else {
      // Complex case with multiple parts
      (result.parts as any[]).forEach((part) => {
        if (typeof part === 'string') {
          let remaining = part;

          for (const [key] of vNodeMap) {
            const placeholder = `__VNODE_${key}__`;
            const idx = remaining.indexOf(placeholder);

            if (idx !== -1) {
              if (idx > 0) {
                parts.push(remaining.substring(0, idx));
              }
              parts.push(vNodeMap.get(key)!);
              remaining = remaining.substring(idx + placeholder.length);
            }
          }

          if (remaining.length > 0) {
            parts.push(remaining);
          }
        } else {
          parts.push(part);
        }
      });

      return h(Fragment, null, ...parts);
    }
  }

  // No VNodes - use original logic
  if (result.isSimple) {
    return result.parts as any;
  }

  return h(Fragment, null, result.parts as any);
};

/** Insertion plugin for Vue. Handles component/node insertion. */
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
            canHandle: (node) =>
              typeof node === 'string' || isInterpolableWrapperNode(node),
            transform: (node, subProps, deepTransformNode) => {
              // `html()`/`markdown()` nodes carry their `{{ … }}` placeholders
              // inside a raw string. Interpolate into that string, then re-run
              // the transform so the html/markdown renderer applies afterwards.
              // VNodes cannot be injected into a raw markup string, so string
              // interpolation (not `splitAndJoinInsertion`) is used here.
              if (isInterpolableWrapperNode(node)) {
                return (
                  values: {
                    [K in InsertionContent['fields'][number]]: string | number;
                  }
                ) =>
                  transformInterpolableNode(
                    node,
                    values,
                    subProps,
                    props.plugins,
                    deepTransformNode
                  );
              }

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
                  children: result,
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
        use: (components?: HTMLComponents<'permissive', {}>) => VNode | VNode[];
      }
    >
  : never;

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
                children: node,
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
              children: () => {
                const { renderMarkdown, components: contextComponents } =
                  useMarkdown();

                const content = renderMarkdown(node, undefined, {
                  ...(contextComponents ?? {}),
                  ...(components ?? {}),
                });

                if (
                  process.env.INTLAYER_EDITOR_ENABLED !== 'false' &&
                  editor.enabled
                ) {
                  return h(
                    LazyContentSelector,
                    {
                      dictionaryKey: rest.dictionaryKey,
                      keyPath: rest.keyPath,
                    },
                    {
                      default: () => content as VNodeChild,
                    }
                  );
                }

                return content as VNodeChild;
              },
              additionalProps: {
                metadata: metadataNodes,
                use: (components?: any) => render(components),
              },
            });

          return render();
        },
      };

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.MARKDOWN]: infer M;
  metadata?: infer U;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<M>;
      metadata: DeepTransformContent<U>;
    }
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
export const htmlPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_HTML === 'false'
    ? fallbackPlugin
    : {
        id: 'html-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.HTML,
        transform: (node: HTMLContent<string>, props) => {
          const html = node[NodeTypes.HTML];
          const _tags = node.tags ?? [];

          // Type-safe render function that accepts properly typed components
          const render = (userComponents: HTMLComponents = {}): any => {
            const element = renderHTML(html, { components: userComponents });
            return renderIntlayerNode({
              ...props,
              value: html,
              children:
                process.env.INTLAYER_EDITOR_ENABLED !== 'false' &&
                editor.enabled
                  ? () =>
                      h(
                        LazyContentSelector,
                        {
                          dictionaryKey: props.dictionaryKey,
                          keyPath: props.keyPath,
                          ...userComponents,
                        },
                        {
                          default: () => element,
                        }
                      )
                  : element,
              additionalProps: {
                use: (components?: any) => render(components),
              },
            });
          };

          return render();
        },
      };

/** ---------------------------------------------
 * PLUGINS RESULT
 * --------------------------------------------- */

export interface IInterpreterPluginVue<T, S, L extends LocalesValues> {
  vueIntlayerNode: IntlayerNodeCond<T>;
  vueInsertion: InsertionCond<T, S, L>;
  vueMarkdown: MarkdownCond<T>;
  vueHtml: HTMLPluginCond<T>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `vue-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = Omit<
  IInterpreterPluginStateCore,
  'insertion' // Remove insertion type from core package
> & {
  vueIntlayerNode: true;
  vueInsertion: true;
  vueMarkdown: true;
  vueHtml: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;

const pluginsCache = new Map<string, Plugins[]>();

/**
 * Get the plugins array for Vue content transformation.
 * This function is used by both getIntlayer and getDictionary to ensure consistent plugin
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
    intlayerNodePlugins,
    insertionPlugin,
    markdownPlugin,
    htmlPlugin,
  ] as Plugins[];

  pluginsCache.set(cacheKey, plugins);

  return plugins;
};
