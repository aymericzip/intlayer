import {
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
import type { DeclaredLocales, KeyPath, LocalesValues } from '@intlayer/types';
import { NodeType } from '@intlayer/types';
import { h, markRaw, type VNode } from 'vue';
import { ContentSelectorWrapper } from './editor';
import { useMarkdown } from './markdown/installIntlayerMarkdown';
import {
  type IntlayerNode as IntlayerNodeCore,
  renderIntlayerNode,
} from './renderIntlayerNode';

/** ---------------------------------------------
 *  INTLAYER NODE PLUGIN
 *  --------------------------------------------- */

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
  transform: (node, { children, ...rest }) => {
    const render = (children: any) =>
      renderIntlayerNode({
        ...rest,
        value: children,
        children: () =>
          h(
            // EditorSelectorRenderer, // Maximum stack size exceeded
            ContentSelectorWrapper,
            {
              dictionaryKey: rest.dictionaryKey,
              keyPath: rest.keyPath,
            },
            {
              default: () =>
                typeof children === 'function' ? children() : children,
            }
          ),
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

    const render = (overrides?: any) =>
      renderIntlayerNode({
        ...props,
        value: node,
        children: () =>
          h(
            // EditorSelectorRenderer, // Maximum stack size exceeded
            ContentSelectorWrapper,
            {
              dictionaryKey: rest.dictionaryKey,
              keyPath: rest.keyPath,
            },
            {
              default: () => {
                const { renderMarkdown } = useMarkdown();
                return renderMarkdown(node, overrides);
              },
            }
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
          return (overrides?: any) => render(overrides);
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as any;
  },
};

export type MarkdownCond<T, S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: infer M;
  metadata?: infer U;
}
  ? {
      use: (overrides: any) => any;
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
  children?: VNode[];
  [key: string]: any;
}) => VNode;

/**
 * Create default HTML tag components using Vue's h function.
 * Each component renders the corresponding HTML element with its props and children.
 */
const createDefaultHTMLComponents = (): Record<string, HTMLTagComponent> => {
  const components: Record<string, HTMLTagComponent> = {};

  for (const tag of HTML_TAGS) {
    components[tag] = ({ children, ...props }) => h(tag, props, children);
  }

  return components;
};

const defaultHTMLComponents = createDefaultHTMLComponents();

export type HTMLPluginCond<T, S, L> = HTMLCond<T, S, L>;

/** HTML plugin. Replaces node with a function that takes components => VNode. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.HTML,
  transform: (node: HTMLContent) => {
    const html = node[NodeType.HTML];

    const render = (userComponents?: Record<string, any>): VNode | VNode[] => {
      // Merge default components with user-provided components
      // User components take priority over defaults
      const mergedComponents = {
        ...defaultHTMLComponents,
        ...userComponents,
      };
      return getHTML(html, mergedComponents);
    };

    const element = render() as any;

    return new Proxy(element, {
      get(target, prop, receiver) {
        if (prop === 'value') {
          return html;
        }

        if (prop === 'use') {
          return (userComponents?: Record<string, any>) =>
            render(userComponents);
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as any;
  },
};

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginVue<T, S, L extends LocalesValues> {
  intlayerNode: IntlayerNodeCond<T>;
  markdown: MarkdownCond<T, S, L>;
  html: HTMLPluginCond<T, S, L>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `vue-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  intlayerNode: true;
  markdown: true;
  html: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;
