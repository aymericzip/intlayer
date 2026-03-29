import configuration from '@intlayer/config/built';
import {
  conditionPlugin,
  type DeepTransformContent as DeepTransformContentCore,
  enumerationPlugin,
  filePlugin,
  genderPlugin,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  nestedPlugin,
  type Plugins,
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
import { ContentSelectorWrapperComponent } from './editor/ContentSelector.component';
import { renderIntlayerNode } from './renderIntlayerNode';

let _markdownInstall: {
  htmlRuntime: any;
  useMarkdown: () => { renderMarkdown: (s: string, components?: any) => any };
} | null = null;
void import('./markdown/installIntlayerMarkdown').then((m) => {
  _markdownInstall = m as any;
});

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
  transform: (_node, { children, ...rest }) =>
    renderIntlayerNode({
      ...rest,
      value: children,
      children: () => ({
        component: configuration.editor.enabled
          ? ContentSelectorWrapperComponent
          : children,
        props: {
          dictionaryKey: rest.dictionaryKey,
          keyPath: rest.keyPath,
        },
        children: children,
      }),
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
        ...rest,
        value: node,
        children: configuration.editor.enabled
          ? () => ({
              component: ContentSelectorWrapperComponent,
              props: {
                dictionaryKey: rest.dictionaryKey,
                keyPath: rest.keyPath,
                ...components,
              },
              children: () => {
                const { renderMarkdown } = _markdownInstall?.useMarkdown() ?? {
                  renderMarkdown: () => node,
                };
                return renderMarkdown(node, components);
              },
            })
          : () => {
              const { renderMarkdown } = _markdownInstall?.useMarkdown() ?? {
                renderMarkdown: () => node,
              };
              return renderMarkdown(node, components);
            },
        additionalProps: {
          metadata: metadataNodes,
        },
      });

    const createProxy = (element: any, components?: any) =>
      new Proxy(element, {
        get(target, prop, receiver) {
          if (prop === 'value') {
            return node;
          }
          if (prop === 'metadata') {
            return metadataNodes;
          }

          if (prop === 'toString') {
            return () => {
              const htmlRuntime = _markdownInstall?.htmlRuntime;
              if (!htmlRuntime || !compile) return node;
              const runtime = components
                ? createRuntimeWithOverides(htmlRuntime, components)
                : htmlRuntime;
              return compile(node, { runtime }) as string;
            };
          }

          if (prop === Symbol.toPrimitive) {
            return () => {
              const htmlRuntime = _markdownInstall?.htmlRuntime;
              if (!htmlRuntime || !compile) return node;
              const runtime = components
                ? createRuntimeWithOverides(htmlRuntime, components)
                : htmlRuntime;
              return compile(node, { runtime }) as string;
            };
          }

          if (prop === 'use') {
            return (newComponents?: any) => {
              const mergedComponents = { ...components, ...newComponents };
              return createProxy(render(mergedComponents), mergedComponents);
            };
          }

          return Reflect.get(target, prop, receiver);
        },
      }) as any;

    return createProxy(render() as any);
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

export const markdownPlugin: Plugins = {
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
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeTypes.HTML,

  transform: (node: HTMLContent<string>, props) => {
    const html = node[NodeTypes.HTML];
    const { plugins, ...rest } = props;

    // Type-safe render function that accepts properly typed components
    const render = (userComponents?: any) =>
      renderIntlayerNode({
        ...rest,
        value: html,
        children: configuration.editor.enabled
          ? () => ({
              component: ContentSelectorWrapperComponent,
              props: {
                dictionaryKey: rest.dictionaryKey,
                keyPath: rest.keyPath,
                ...userComponents,
              },
              children: html,
            })
          : html,
      });

    const createProxy = (element: any, components?: any) =>
      new Proxy(element, {
        get(target, prop, receiver) {
          if (prop === 'value') {
            return html;
          }

          if (prop === 'toString') {
            return () => {
              if (
                !components ||
                (typeof components === 'object' &&
                  Object.keys(components).length === 0)
              ) {
                return String(html);
              }
              const htmlRuntime = _markdownInstall?.htmlRuntime;
              if (!htmlRuntime || !compile) return String(html);
              const runtime = createRuntimeWithOverides(
                htmlRuntime,
                components
              );
              return compile(html, { runtime }) as string;
            };
          }

          if (prop === Symbol.toPrimitive) {
            return () => {
              if (
                !components ||
                (typeof components === 'object' &&
                  Object.keys(components).length === 0)
              ) {
                return String(html);
              }
              const htmlRuntime = _markdownInstall?.htmlRuntime;
              if (!htmlRuntime || !compile) return String(html);
              const runtime = createRuntimeWithOverides(
                htmlRuntime,
                components
              );
              return compile(html, { runtime }) as string;
            };
          }

          if (prop === 'use') {
            // Return a properly typed function based on custom components
            return (userComponents?: any) => {
              const mergedComponents = { ...components, ...userComponents };
              return createProxy(render(mergedComponents), mergedComponents);
            };
          }

          return Reflect.get(target, prop, receiver);
        },
      }) as any;

    return createProxy(render() as any);
  },
};

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

/**
 * Insertion conditional type.
 */
export type InsertionPluginCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer _I;
}
  ? (args: Record<string, string | number>) => string
  : never;

export const insertionPlugin: Plugins = {
  id: 'insertion-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeTypes.INSERTION,
  transform: (node: InsertionContent, props) => {
    const { plugins, ...rest } = props;

    // Return a function that performs the interpolation
    const render = (args: Record<string, string | number> = {}) => {
      let text = node[NodeTypes.INSERTION] as string;
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
  angularInsertion: InsertionPluginCond<T>;
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

/**
 * Get the plugins array for Angular content transformation.
 * This function is used by both getIntlayer and getDictionary to ensure consistent plugin configuration.
 */
export const getPlugins = (
  locale?: LocalesValues,
  fallback: boolean = true
): Plugins[] =>
  [
    // Env var allows the bundler to to remove the plugin if not used to make the bundle smaller
    process.env['INTLAYER_NODE_TYPE_TRANSLATION'] !== 'false' &&
      translationPlugin(
        locale ?? configuration.internationalization.defaultLocale,
        fallback ? configuration.internationalization.defaultLocale : undefined
      ),
    process.env['INTLAYER_NODE_TYPE_ENUMERATION'] !== 'false' &&
      enumerationPlugin,
    process.env['INTLAYER_NODE_TYPE_CONDITION'] !== 'false' && conditionPlugin,
    process.env['INTLAYER_NODE_TYPE_NESTED'] !== 'false' &&
      nestedPlugin(locale ?? configuration.internationalization.defaultLocale),
    process.env['INTLAYER_NODE_TYPE_FILE'] !== 'false' && filePlugin,
    process.env['INTLAYER_NODE_TYPE_GENDER'] !== 'false' && genderPlugin,
    intlayerNodePlugins,
    process.env['INTLAYER_NODE_TYPE_MARKDOWN'] !== 'false' && markdownPlugin,
    process.env['INTLAYER_NODE_TYPE_HTML'] !== 'false' && htmlPlugin,
    process.env['INTLAYER_NODE_TYPE_INSERTION'] !== 'false' && insertionPlugin,
  ].filter(Boolean) as Plugins[];
