import { signal, untracked } from '@angular/core';
import { editor, internationalization } from '@intlayer/config/built';
import {
  bindInsertedValues,
  conditionPlugin,
  type DeepTransformContent as DeepTransformContentCore,
  enumerationPlugin,
  fallbackPlugin,
  filePlugin,
  genderPlugin,
  getInsertion,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  isInterpolableWrapperNode,
  nestedPlugin,
  type Plugins,
  pluralPlugin,
  selectPlugin,
  transformInterpolableNode,
  translationPlugin,
} from '@intlayer/core/interpreter';
import type { MarkdownContent } from '@intlayer/core/markdown';
import { compile, getMarkdownMetadata } from '@intlayer/core/markdown';
import type { HTMLContent, InsertionContent } from '@intlayer/core/transpiler';
import type { KeyPath } from '@intlayer/types/keyPath';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import { reportExposure } from './analytics/exposureSink';
import { ContentSelectorWrapperComponent } from './editor/ContentSelector.component';
import { renderIntlayerNode } from './renderIntlayerNode';

type MarkdownRendererModule = Pick<
  typeof import('./markdown/installIntlayerMarkdown'),
  'htmlRuntime' | 'useMarkdown'
>;

/**
 * Code-split markdown renderer, held in a signal.
 *
 * The chunk loads asynchronously, so the first dictionary evaluation may run
 * before it lands. `getPlugins` reads this signal inside the `computed` of
 * `useIntlayer`/`useDictionary`, which makes that computed depend on it: nodes
 * stringify to their raw source until the module resolves, then the signal
 * flip re-evaluates the dictionary and every binding re-renders with compiled
 * HTML. This is the Angular counterpart of the `Suspense` boundary the React
 * and Solid packages wrap their markdown renderer in.
 */
const markdownRendererModule = signal<MarkdownRendererModule | null>(null);

if (
  process.env.INTLAYER_NODE_TYPE_MARKDOWN !== 'false' ||
  process.env.INTLAYER_NODE_TYPE_HTML !== 'false'
) {
  void import('./markdown/installIntlayerMarkdown')
    .then((module) => markdownRendererModule.set(module))
    .catch(() => {});
}

/** ---------------------------------------------
 *  UTILS
 *  --------------------------------------------- */

const createRuntimeWithOverides = (baseRuntime: any, overrides: any) => ({
  ...baseRuntime,
  createElement: (tag: string, props: any, ...children: any[]) => {
    const override = overrides?.[tag];

    if (override) {
      const newProps = { ...props, ...override };

      // Merge class attributes intelligently
      const originalClass = props?.class || props?.className;
      const overrideClass = override.class || override.className;

      if (originalClass && overrideClass) {
        newProps.class = `${originalClass} ${overrideClass}`;
        newProps.className = undefined;
      }

      return baseRuntime.createElement(tag, newProps, ...children);
    }

    return baseRuntime.createElement(tag, props, ...children);
  },
});

/**
 * Compiles a markdown/HTML source to an HTML string with the code-split
 * runtime, or returns the raw source while the renderer chunk is still
 * loading. Runs at stringify time, so a node kept outside any reactive
 * context still picks the renderer up once it has landed.
 */
const compileToHtml = (
  source: string,
  components?: Record<string, unknown>
): string => {
  const rendererModule = untracked(markdownRendererModule);

  if (!rendererModule) return source;

  const runtime = components
    ? createRuntimeWithOverides(rendererModule.htmlRuntime, components)
    : rendererModule.htmlRuntime;

  return compile(source, { runtime }) as string;
};

/** ---------------------------------------------
 *  INTLAYER NODE PLUGIN
 *  --------------------------------------------- */

export type IntlayerNodeCond<T> = T extends number | string
  ? IntlayerNode<T>
  : never;

export interface IntlayerNode<T, P = {}> {
  value: T;
  children?: any;
  additionalProps?: P;
}

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (_node, props) => {
    const { children, dictionaryKey, keyPath } = props;

    // Node-level analytics: record which content is resolved for display.
    // No-op (and dead-code-eliminated) when analytics is disabled.
    if (process.env.INTLAYER_ANALYTICS_ENABLED !== 'false') {
      reportExposure({
        dictionaryKey,
        keyPath,
        locale: props.locale,
        nodeType: 'text',
      });
    }

    return renderIntlayerNode({
      value: children,
      children: () => ({
        component:
          process.env.INTLAYER_EDITOR_ENABLED === 'false' || !editor.enabled
            ? children
            : ContentSelectorWrapperComponent,
        props: { dictionaryKey, keyPath },
        children: children,
      }),
    });
  },
};

/**
 * MARKDOWN PLUGIN
 */

export type MarkdownStringCond<T> = T extends string
  ? IntlayerNode<string, { metadata: DeepTransformContent<string> }>
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

          const renderMarkdown = (components?: any) =>
            untracked(markdownRendererModule)
              ?.useMarkdown()
              .renderMarkdown(node, components) ?? node;

          const render = (components?: any): any => {
            const toHtml = () => compileToHtml(node, components);

            return renderIntlayerNode({
              ...rest,
              value: node,
              children:
                process.env.INTLAYER_EDITOR_ENABLED === 'false' ||
                !editor.enabled
                  ? () => renderMarkdown(components)
                  : () => ({
                      component: ContentSelectorWrapperComponent,
                      props: {
                        dictionaryKey: rest.dictionaryKey,
                        keyPath: rest.keyPath,
                        ...components,
                      },
                      children: () => renderMarkdown(components),
                    }),
              additionalProps: {
                metadata: metadataNodes,
                toString: toHtml,
                [Symbol.toPrimitive]: toHtml,
                use: (newComponents?: any) =>
                  render({ ...components, ...newComponents }),
              },
            });
          };

          return render();
        },
      };

export type MarkdownCond<T, _S, _L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.MARKDOWN]: infer M;
  tags?: infer U;
  metadata?: infer V;
}
  ? IntlayerNode<
      M,
      {
        use: (components?: Record<keyof U, any>) => any;
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
 * HTML conditional type.
 *
 * This ensures type safety:
 * - `html('<div>Hello <CustomComponent /></div>').use({ CustomComponent: ... })` - optional but typed
 */
export type HTMLPluginCond<T, _S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.HTML]: infer I;
  tags?: infer U;
}
  ? IntlayerNode<
      I,
      {
        use: (components?: Record<keyof U, any>) => any;
      }
    >
  : never;

/** HTML plugin. Replaces node with a function that takes components => IntlayerNode. */
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
          const render = (userComponents?: any): any => {
            // Without component overrides the source is already HTML
            const toHtml = () =>
              !userComponents || Object.keys(userComponents).length === 0
                ? String(html)
                : compileToHtml(String(html), userComponents);

            return renderIntlayerNode({
              ...rest,
              value: html,
              children:
                process.env.INTLAYER_EDITOR_ENABLED === 'false' ||
                !editor.enabled
                  ? html
                  : () => ({
                      component: ContentSelectorWrapperComponent,
                      props: {
                        dictionaryKey: rest.dictionaryKey,
                        keyPath: rest.keyPath,
                        ...userComponents,
                      },
                      children: html,
                    }),
              additionalProps: {
                toString: toHtml,
                [Symbol.toPrimitive]: toHtml,
                use: (newComponents?: any) =>
                  render({ ...userComponents, ...newComponents }),
              },
            });
          };

          return render();
        },
      };

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

/**
 * Insertion conditional type.
 */
export type InsertionPluginCond<T, S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer Content;
}
  ? (
      args: Record<string, string | number>
    ) => Content extends string
      ? string
      : DeepTransformContentCore<Content, S, L>
  : never;

export const insertionPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_INSERTION === 'false'
    ? fallbackPlugin
    : {
        id: 'insertion-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.INSERTION,
        transform: (node: InsertionContent, props, deepTransformNode) => {
          const { plugins, ...rest } = props;
          const content = node[NodeTypes.INSERTION];

          const newKeyPath: KeyPath[] = [
            ...props.keyPath,
            {
              type: NodeTypes.INSERTION,
            },
          ];

          // `html()`/`markdown()` nodes carry their `{{ … }}` placeholders
          // inside a raw string. Interpolate into that string, then re-run the
          // transform so the html/markdown renderer applies afterwards.
          if (isInterpolableWrapperNode(content)) {
            return (args: Record<string, string | number> = {}) =>
              transformInterpolableNode(
                content,
                args,
                { ...props, keyPath: newKeyPath },
                props.plugins,
                deepTransformNode
              );
          }

          // Container content (`insert(enu(…))`, `insert(plural(…))`, …):
          // interpolate every branch string, then bind the values to the
          // selector so the call reads `(values) => (selector) => content`.
          if (typeof content === 'object' && content !== null) {
            return (args: Record<string, string | number> = {}) => {
              const insertionStringPlugin: Plugins = {
                id: 'insertion-string-plugin',
                canHandle: (branch) =>
                  typeof branch === 'string' ||
                  isInterpolableWrapperNode(branch),
                transform: (branch, subProps, deepTransformBranch) => {
                  if (isInterpolableWrapperNode(branch)) {
                    return transformInterpolableNode(
                      branch,
                      args,
                      subProps,
                      plugins,
                      deepTransformBranch
                    );
                  }

                  const interpolated = getInsertion(branch, args);

                  return deepTransformBranch(interpolated, {
                    ...subProps,
                    children: interpolated,
                    plugins,
                  });
                },
              };

              const result = deepTransformNode(content, {
                ...props,
                children: content,
                keyPath: [...props.keyPath, { type: NodeTypes.INSERTION }],
                plugins: [insertionStringPlugin, ...(plugins ?? [])],
              });

              return bindInsertedValues(content, result, args, true);
            };
          }

          // Return a function that performs the interpolation
          const render = (args: Record<string, string | number> = {}) => {
            let text = content as string;
            if (args) {
              Object.entries(args).forEach(([key, value]) => {
                text = text.replace(
                  new RegExp(`{{\\s*${key}\\s*}}`, 'g'),
                  String(value)
                );
              });
            }
            return text;
          };

          return renderIntlayerNode({
            ...rest,
            value: render as any,
            children: render,
          });
        },
      };

export interface IInterpreterPluginAngular<T, S, L extends LocalesValues> {
  angularIntlayerNode: IntlayerNodeCond<T>;
  angularMarkdown: MarkdownCond<T, S, L>;
  angularHtml: HTMLPluginCond<T, S, L>;
  angularInsertion: InsertionPluginCond<T, S, L>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `angular-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = Omit<
  IInterpreterPluginStateCore,
  'insertion' // Remove insertion type from core package
> & {
  angularIntlayerNode: true;
  angularMarkdown: true;
  angularHtml: true;
  angularInsertion: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;

const pluginsCache = new Map<string, Plugins[]>();

/**
 * Get the plugins array for Angular content transformation.
 * This function is used by both getIntlayer and getDictionary to ensure consistent plugin configuration.
 */
export const getPlugins = (
  locale?: LocalesValues,
  fallback: boolean = true
): Plugins[] => {
  const currentLocale = locale ?? internationalization.defaultLocale;
  // Tracked read: called inside the dictionary `computed` of the hooks, so the
  // computed re-evaluates once the renderer chunk lands. The core interpreter
  // memoizes transformed content per plugin-array identity, and the transform
  // itself is lazy (property getters resolved from the template), so handing
  // out a fresh array is what discards the proxies built while pending and
  // gives every binding a new value to re-render.
  const isRendererLoaded = markdownRendererModule() !== null;
  const cacheKey = `${currentLocale}_${fallback}_${isRendererLoaded}`;

  if (pluginsCache.has(cacheKey)) {
    return pluginsCache.get(cacheKey)!;
  }

  const plugins = [
    // First: most nodes are plain strings, which every other plugin rejects
    intlayerNodePlugins,
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
    selectPlugin,
    markdownPlugin,
    htmlPlugin,
    insertionPlugin,
  ] as Plugins[];

  // Plugins disabled at build time never match: skip them on every node
  const enabledPlugins = plugins.filter((plugin) => plugin !== fallbackPlugin);

  pluginsCache.set(cacheKey, enabledPlugins);

  return enabledPlugins;
};
