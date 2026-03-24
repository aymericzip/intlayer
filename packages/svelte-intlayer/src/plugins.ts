import configuration from '@intlayer/config/built';
import {
  conditionPlugin,
  type DeepTransformContent as DeepTransformContentCore,
  enumerationPlugin,
  filePlugin,
  genderPlugin,
  getHTML,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  nestedPlugin,
  type Plugins,
  translationPlugin,
} from '@intlayer/core/interpreter';
import {
  HTML_TAGS,
  type HTMLContent,
  type InsertionContent,
  type MarkdownContent,
} from '@intlayer/core/transpiler';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { KeyPath } from '@intlayer/types/keyPath';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import { default as ContentSelector } from './editor/ContentSelector.svelte';
import type { HTMLComponents } from './html/types';
import { type IntlayerNode, renderIntlayerNode } from './renderIntlayerNode';

// Lazy pre-load heavy modules — creates separate code-split chunks
let _getMarkdownMetadata: ((s: string) => any) | null = null;
let _compile: ((s: string, opts: any, ctx?: any) => any) | null = null;
void import('@intlayer/core/markdown').then((m) => {
  _getMarkdownMetadata = m.getMarkdownMetadata;
  _compile = m.compile;
});

let _MarkdownMetadataRenderer: any = null;
let _MarkdownMetadataWithSelector: any = null;
let _MarkdownRenderer: any = null;
let _MarkdownWithSelector: any = null;
let _svelteHtmlRuntime: any = null;
void Promise.all([
  import('./markdown/MarkdownMetadataRenderer.svelte').then(
    (m) => (_MarkdownMetadataRenderer = m.default)
  ),
  import('./markdown/MarkdownMetadataWithSelector.svelte').then(
    (m) => (_MarkdownMetadataWithSelector = m.default)
  ),
  import('./markdown/MarkdownRenderer.svelte').then(
    (m) => (_MarkdownRenderer = m.default)
  ),
  import('./markdown/MarkdownWithSelector.svelte').then(
    (m) => (_MarkdownWithSelector = m.default)
  ),
  import('./markdown/runtime').then(
    (m) => (_svelteHtmlRuntime = m.svelteHtmlRuntime)
  ),
]);

/**
 * Interface for Svelte-specific plugin functionality
 * This interface can be augmented to add more Svelte-specific transformations
 */
export type IInterpreterPluginState = Omit<
  IInterpreterPluginStateCore,
  'insertion' // Remove insertion type from core package
> & {
  svelteIntlayerNode: true;
  svelteInsertion: true;
  svelteMarkdown: true;
  svelteHtml: true;
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
      component: isEnabled ? ContentSelector : (children ?? node),
      props: rest,
    }),
};

/**
 * Svelte-specific node plugins for handling basic content types
 * These plugins handle strings, numbers, and bigints in Svelte applications
 */
export const svelteNodePlugins: Plugins = intlayerNodePlugins;

/** ---------------------------------------------
 * INSERTION PLUGIN
 * --------------------------------------------- */

export type InsertionCond<T, _S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: string;
  fields: readonly string[];
}
  ? <V extends { [K in T['fields'][number]]: any }>(
      values: V
    ) => V[keyof V] extends string | number
      ? IntlayerNode<string>
      : IntlayerNode<any>
  : never;

/**
 * Check if a value is a Svelte component or object (not a primitive)
 */
const isSvelteComponent = (value: any): boolean => {
  return (
    value !== null &&
    value !== undefined &&
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    typeof value !== 'boolean'
  );
};

/**
 * Split insertion string and join with Svelte components
 */
const splitAndJoinInsertion = (
  template: string,
  values: Record<string, string | number | any>
): any => {
  // Check if any value is a Svelte component
  const hasComponent = Object.values(values).some(isSvelteComponent);

  if (!hasComponent) {
    // Simple string replacement
    return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, key) => {
      const trimmedKey = key.trim();
      return (values[trimmedKey] ?? '').toString();
    });
  }

  // Split the template by placeholders while keeping the structure
  const parts: any[] = [];
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
      parts.push(value);
    }

    lastIndex = match.index + match[0].length;
    match = regex.exec(template);
  }

  // Add remaining text
  if (lastIndex < template.length) {
    parts.push(template.substring(lastIndex));
  }

  // Return array of parts
  return parts;
};

/** Insertion plugin for Svelte. Handles component insertion. */
export const insertionPlugin: Plugins = {
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
            [K in InsertionContent['fields'][number]]: string | number | any;
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
        use: (components?: HTMLComponents<'permissive', {}>) => any;
      }
    >
  : never;

/** Markdown string plugin. Replaces string node with a component that render the markdown. */
export const markdownStringPlugin: Plugins = {
  id: 'markdown-string-plugin',
  canHandle: (node) => typeof node === 'string',
  transform: (node: string, props, deepTransformNode) => {
    const { ...rest } = props;

    const metadata = _getMarkdownMetadata?.(node) ?? {};

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
          component: isEnabled
            ? (_MarkdownMetadataWithSelector ?? _MarkdownMetadataRenderer)
            : _MarkdownMetadataRenderer,
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
        component: isEnabled
          ? (_MarkdownWithSelector ?? _MarkdownRenderer)
          : _MarkdownRenderer,
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
              _compile?.(
                node,
                { runtime: _svelteHtmlRuntime, components: components },
                {}
              ) ?? node;
          }

          return Reflect.get(target, prop, receiver);
        },
      });
    };

    return render();
  },
};

export type MarkdownCond<T, _S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.MARKDOWN]: infer _M;
  metadata?: infer U;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => any;
      metadata: DeepTransformContent<U, L>;
    } & any
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
 * HTML PLUGIN
 * --------------------------------------------- */

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

// Svelte generic component map

export type HTMLPluginCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.HTML]: infer I;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<I>;
    }
  : never;

/** HTML plugin. Replaces node with a function that takes components => HTMLElement[]. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeTypes.HTML,
  transform: (node: HTMLContent<string>) => {
    const htmlString = node[NodeTypes.HTML];
    const _tags = node.tags ?? [];

    const render = (userComponents?: HTMLComponents): any => {
      const mergedComponents = {
        ...getDefaultHTMLComponents(),
        ...userComponents,
      };
      const result = getHTML(htmlString, mergedComponents as any);

      const toStringFn = () => {
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
          if (prop === 'toString') return toStringFn;
          if (prop === 'use')
            return (userComponents?: HTMLComponents) => render(userComponents);
          if (prop === 'value') return htmlString;

          return (t as any)[prop] ?? (result as any)[prop];
        },
      });
    };

    return render();
  },
};

export interface IInterpreterPluginSvelte<T, S, L extends LocalesValues> {
  svelteIntlayerNode: T extends string | number ? IntlayerNode<T> : never;
  svelteInsertion: InsertionCond<T, S, L>;
  svelteMarkdown: MarkdownCond<T, S, L>;
  svelteHtml: HTMLPluginCond<T>;
}

/**
 * Get the plugins array for Svelte content transformation.
 * This function is used by both getIntlayer and getDictionary to ensure consistent plugin configuration.
 */
export const getPlugins = (
  locale?: LocalesValues,
  fallback: boolean = true
): Plugins[] => [
  translationPlugin(
    locale ?? configuration.internationalization.defaultLocale,
    fallback ? configuration.internationalization.defaultLocale : undefined
  ),
  enumerationPlugin,
  conditionPlugin,
  nestedPlugin(locale ?? configuration.internationalization.defaultLocale),
  filePlugin,
  genderPlugin,
  intlayerNodePlugins,
  svelteNodePlugins,
  insertionPlugin,
  markdownPlugin,
  htmlPlugin,
];
