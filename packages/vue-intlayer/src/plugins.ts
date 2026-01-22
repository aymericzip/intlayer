import {
  type DeepTransformContent as DeepTransformContentCore,
  getHTML,
  getMarkdownMetadata,
  HTML_TAGS,
  type HTMLCond,
  type HTMLContent,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type InsertionContent,
  type MarkdownContent,
  type Plugins,
  splitInsertionTemplate,
} from '@intlayer/core';
import type { DeclaredLocales, KeyPath, LocalesValues } from '@intlayer/types';
import { NodeType } from '@intlayer/types';
import { type Component, Fragment, h, markRaw, type VNode } from 'vue';
import { ContentSelectorWrapper } from './editor';
import type {
  VueComponentProps,
  VueHTMLComponent,
  VueHTMLComponentMap,
} from './html/types';
import { useMarkdown } from './markdown/installIntlayerMarkdown';
import {
  type IntlayerNode as IntlayerNodeCore,
  renderIntlayerNode,
} from './renderIntlayerNode';

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

/** ---------------------------------------------
 * INSERTION PLUGIN
 * --------------------------------------------- */

export type InsertionCond<T, _S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Insertion]: string;
  fields: readonly string[];
}
  ? (
      values: {
        [K in T['fields'][number]]: string | number | VNode;
      }
    ) => VNode | VNode[]
  : never;

/**
 * Split insertion string and join with Vue VNodes using shared core logic
 */
const splitAndJoinInsertion = (
  template: string,
  values: Record<string, string | number | VNode>
): VNode | VNode[] => {
  const result = splitInsertionTemplate(template, values);

  if (result.isSimple) {
    // Simple string replacement
    return result.parts as any;
  }

  // Return as Fragment
  return h(Fragment, null, result.parts as any);
};

/** Insertion plugin for Vue. Handles component/node insertion. */
export const insertionPlugin: Plugins = {
  id: 'insertion-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Insertion,
  transform: (node: InsertionContent, props, deepTransformNode) => {
    const newKeyPath: KeyPath[] = [
      ...props.keyPath,
      {
        type: NodeType.Insertion,
      },
    ];

    const children = node[NodeType.Insertion];

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
            [K in InsertionContent['fields'][number]]: string | number | VNode;
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

type MarkdownComponentMap = Record<string, Component | string>;

export type MarkdownStringCond<T> = T extends string
  ? IntlayerNode<
      string,
      {
        metadata: DeepTransformContent<string>;
        use: (components?: MarkdownComponentMap) => VNode | VNode[];
      }
    >
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
                return renderMarkdown(node, components);
              },
            }
          ),
        additionalProps: {
          metadata: metadataNodes,
        },
      });

    return render() as any;
  },
};

export type MarkdownCond<T, S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: infer M;
  metadata?: infer U;
}
  ? {
      use: (components?: MarkdownComponentMap) => VNode | VNode[];
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
 * HTML PLUGIN
 * --------------------------------------------- */

/**
 * Create default HTML tag components using Vue's h function.
 * Each component renders the corresponding HTML element with its props and children.
 */
const createDefaultHTMLComponents = (): Record<string, VueHTMLComponent> => {
  const components: Record<string, VueHTMLComponent> = {};

  for (const tag of HTML_TAGS) {
    components[tag] = ({ children, ...props }: VueComponentProps) =>
      h(tag, props, children);
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
  transform: (node: HTMLContent<string>, props) => {
    const html = node[NodeType.HTML];
    const tags = node.tags ?? [];

    // Type-safe render function that accepts properly typed components
    const render = <
      T = typeof tags extends readonly (infer U extends string)[]
        ? U
        : typeof tags,
    >(
      userComponents?: VueHTMLComponentMap<T>
    ): VNode | VNode[] => {
      // Merge default components with user-provided components
      // User components take priority over defaults
      const mergedComponents = {
        ...defaultHTMLComponents,
        ...userComponents,
      };
      return getHTML(html, mergedComponents as any);
    };

    return renderIntlayerNode({
      ...props,
      value: html,
      children: (userComponents?: any) => render(userComponents),
    });
  },
};

/** ---------------------------------------------
 * PLUGINS RESULT
 * --------------------------------------------- */

export interface IInterpreterPluginVue<T, S, L extends LocalesValues> {
  vueIntlayerNode: IntlayerNodeCond<T>;
  vueInsertion: InsertionCond<T, S, L>;
  vueMarkdown: MarkdownCond<T, S, L>;
  vueHtml: HTMLPluginCond<T, S, L>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `vue-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  vueIntlayerNode: true;
  vueInsertion: true;
  vueMarkdown: true;
  vueHtml: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;
