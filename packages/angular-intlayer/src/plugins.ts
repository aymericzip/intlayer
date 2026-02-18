import type {
  DeepTransformContent as DeepTransformContentCore,
  IInterpreterPluginState as IInterpreterPluginStateCore,
  Plugins,
} from '@intlayer/core/interpreter';
import {
  compile,
  getMarkdownMetadata,
  type MarkdownContent,
} from '@intlayer/core/markdown';
import type { HTMLContent, InsertionContent } from '@intlayer/core/transpiler';
import {
  type DeclaredLocales,
  type KeyPath,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import { ContentSelectorWrapperComponent } from './editor';
import { htmlRuntime, useMarkdown } from './markdown/installIntlayerMarkdown';
import { renderIntlayerNode } from './renderIntlayerNode';

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
        component: ContentSelectorWrapperComponent,
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
        children: () => ({
          component: ContentSelectorWrapperComponent,
          props: {
            dictionaryKey: rest.dictionaryKey,
            keyPath: rest.keyPath,
            ...components,
          },
          children: () => {
            const { renderMarkdown } = useMarkdown();
            return renderMarkdown(node, components);
          },
        }),
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
              const runtime = components
                ? createRuntimeWithOverides(htmlRuntime, components)
                : htmlRuntime;
              return compile(node, {
                runtime,
              }) as string;
            };
          }

          if (prop === Symbol.toPrimitive) {
            return () => {
              const runtime = components
                ? createRuntimeWithOverides(htmlRuntime, components)
                : htmlRuntime;
              return compile(node, {
                runtime,
              }) as string;
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
  [NodeType.Markdown]: infer M;
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
 * HTML conditional type.
 *
 * This ensures type safety:
 * - `html('<div>Hello <CustomComponent /></div>').use({ CustomComponent: ... })` - optional but typed
 */
export type HTMLPluginCond<T, _S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeType.HTML]: infer I;
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
    typeof node === 'object' && node?.nodeType === NodeType.HTML,

  transform: (node: HTMLContent<string>, props) => {
    const html = node[NodeType.HTML];
    const { plugins, ...rest } = props;

    // Type-safe render function that accepts properly typed components
    const render = (userComponents?: any) =>
      renderIntlayerNode({
        ...rest,
        value: html,
        children: () => ({
          component: ContentSelectorWrapperComponent,
          props: {
            dictionaryKey: rest.dictionaryKey,
            keyPath: rest.keyPath,
            ...userComponents,
          },
          children: html,
        }),
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
              const runtime = createRuntimeWithOverides(
                htmlRuntime,
                components
              );
              return compile(html, {
                runtime,
              }) as string;
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
              const runtime = createRuntimeWithOverides(
                htmlRuntime,
                components
              );
              return compile(html, {
                runtime,
              }) as string;
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
  [NodeType.Insertion]: infer _I;
}
  ? (args: Record<string, string | number>) => string
  : never;

export const insertionPlugin: Plugins = {
  id: 'insertion-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Insertion,
  transform: (node: InsertionContent, props) => {
    const { plugins, ...rest } = props;

    // Return a function that performs the interpolation
    const render = (args: Record<string, string | number> = {}) => {
      let text = node.insertion as string;
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
