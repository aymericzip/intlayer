import {
  compile,
  type DeepTransformContent as DeepTransformContentCore,
  getHTML,
  getMarkdownMetadata,
  HTML_TAGS,
  type HTMLCond,
  type HTMLContent,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type MarkdownContent,
  type Plugins,
} from '@intlayer/core';
import {
  type DeclaredLocales,
  type KeyPath,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import { ContentSelectorWrapper } from './editor';
import MarkdownMetadataWithSelector from './markdown/MarkdownMetadataWithSelector.svelte';
import MarkdownWithSelector from './markdown/MarkdownWithSelector.svelte';
import { svelteHtmlRuntime } from './markdown/runtime';
import { type IntlayerNode, renderIntlayerNode } from './renderIntlayerNode';

/**
 * Interface for Svelte-specific plugin functionality
 * This interface can be augmented to add more Svelte-specific transformations
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  /** Any Svelte-specific properties can be added here */
  intlayerNode: true;
  markdown: true;
  html: true;
};

/**
 * Type that represents the deep transformation of content for Svelte
 * This applies Svelte-specific transformations recursively to all content
 */
export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;

/**
 * Basic Intlayer node plugins for content handling
 * These handle the core content transformation logic
 */
export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (node, { children, ...rest }) =>
    renderIntlayerNode({
      value: children ?? node,
      component: ContentSelectorWrapper,
      props: rest,
    }),
};

/**
 * Svelte-specific node plugins for handling basic content types
 * These plugins handle strings, numbers, and bigints in Svelte applications
 */
export const svelteNodePlugins: Plugins = intlayerNodePlugins;

export type MarkdownStringCond<T> = T extends string
  ? IntlayerNode<string>
  : never;

/** Markdown string plugin. Replaces string node with a component that render the markdown. */
export const markdownStringPlugin: Plugins = {
  id: 'markdown-string-plugin',
  canHandle: (node) => typeof node === 'string',
  transform: (node: string, props, deepTransformNode) => {
    const { ...rest } = props;

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
          value: metadataNode,
          component: MarkdownMetadataWithSelector,
          props: {
            ...rest,
            value: node, // The full markdown string
            metadataKeyPath: props.keyPath,
          },
        }),
    };

    // Transform metadata while keeping the same structure
    const metadataNodes =
      deepTransformNode(metadata, {
        plugins: [metadataPlugins],
        dictionaryKey: rest.dictionaryKey,
        keyPath: [],
      }) ?? {};

    const render = (components?: any) => {
      const nodeResult = renderIntlayerNode({
        value: node,
        component: MarkdownWithSelector,
        props: {
          ...rest,
          value: node,
          ...components,
        },
        additionalProps: {
          metadata: metadataNodes,
        },
      });

      return new Proxy(nodeResult as any, {
        get(target, prop, receiver) {
          if (prop === 'value') {
            return node;
          }
          if (prop === 'metadata') {
            return metadataNodes;
          }

          if (prop === 'use') {
            return (newComponents?: any) => render(newComponents);
          }

          if (prop === 'toString') {
            return () =>
              compile(
                node,
                { runtime: svelteHtmlRuntime, components: components },
                {}
              );
          }

          return Reflect.get(target, prop, receiver);
        },
      });
    };

    return render();
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

type HTMLTagComponent = (props: {
  children?: (string | HTMLElement)[];
  [key: string]: any;
}) => HTMLElement;

/**
 * Create default HTML tag components using DOM API.
 * Each component creates the corresponding HTML element with its props and children.
 * Note: This approach works in browser environments.
 */
const createDefaultHTMLComponents = (): Record<string, HTMLTagComponent> => {
  const components: Record<string, HTMLTagComponent> = {};

  for (const tag of HTML_TAGS) {
    components[tag] = ({ children = [], ...props }) => {
      const element = document.createElement(tag);

      // Apply props as attributes
      for (const [key, value] of Object.entries(props)) {
        if (key.startsWith('on') && typeof value === 'function') {
          // Handle event listeners
          const eventName = key.slice(2).toLowerCase();
          element.addEventListener(eventName, value as EventListener);
        } else if (value !== undefined && value !== null) {
          element.setAttribute(key, String(value));
        }
      }

      // Append children
      for (const child of children) {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          element.appendChild(child);
        }
      }

      return element;
    };
  }

  return components;
};

let defaultHTMLComponents: Record<string, HTMLTagComponent> | null = null;

const getDefaultHTMLComponents = (): Record<string, HTMLTagComponent> => {
  if (typeof document === 'undefined') {
    // SSR fallback: return empty object, user must provide all components
    return {};
  }
  if (!defaultHTMLComponents) {
    defaultHTMLComponents = createDefaultHTMLComponents();
  }
  return defaultHTMLComponents;
};

export type HTMLPluginCond<T, S, L> = HTMLCond<T, S, L>;

/** HTML plugin. Replaces node with a function that takes components => HTMLElement[]. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.HTML,
  transform: (node: HTMLContent) => {
    const htmlString = node[NodeType.HTML];

    const render = (userComponents?: Record<string, any>): any => {
      const mergedComponents = {
        ...getDefaultHTMLComponents(),
        ...userComponents,
      };
      const result = getHTML(htmlString, mergedComponents);

      const toString = () => {
        if (Array.isArray(result)) {
          return result
            .map((item) =>
              typeof item === 'string'
                ? item
                : (item as any).outerHTML || String(item)
            )
            .join('');
        }
        return typeof result === 'string'
          ? result
          : (result as any).outerHTML || String(result);
      };

      const target =
        typeof result === 'object' && result !== null ? result : {};

      return new Proxy(target, {
        get(t, prop) {
          if (prop === 'toString') return toString;
          if (prop === 'use')
            return (userComponents?: Record<string, any>) =>
              render(userComponents);
          if (prop === 'value') return htmlString;

          return (t as any)[prop] ?? (result as any)[prop];
        },
      });
    };

    return render();
  },
};

export interface IInterpreterPluginSvelte<T, S, L extends LocalesValues> {
  intlayerNode: T extends string | number ? IntlayerNode<T> : never;
  markdown: MarkdownCond<T, S, L>;
  html: HTMLPluginCond<T, S, L>;
}
