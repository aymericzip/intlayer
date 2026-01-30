import {
  type DeepTransformContent as DeepTransformContentCore,
  getHTML,
  getMarkdownMetadata,
  HTML_TAGS,
  type HTMLContent,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type InsertionContent,
  type MarkdownContent,
  type Plugins,
  splitInsertionTemplate,
} from '@intlayer/core';
import {
  type DeclaredLocales,
  type KeyPath,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import type { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { ContentSelectorRenderer } from './editor';
import { EditedContentRenderer } from './editor/useEditedContentRenderer';
import type { HTMLComponents } from './html/types';
import { type IntlayerNode, renderIntlayerNode } from './IntlayerNode';
import { MarkdownMetadataRenderer, MarkdownRenderer } from './markdown';
import { renderSolidElement } from './solidElement/renderSolidElement';

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
  ) =>
    renderIntlayerNode({
      ...rest,
      value: rest.children,
      children: (
        <ContentSelectorRenderer {...rest}>
          <EditedContentRenderer {...rest}>
            {rest.children}
          </EditedContentRenderer>
        </ContentSelectorRenderer>
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
export const solidNodePlugins: Plugins = {
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
      children: (
        <ContentSelectorRenderer {...rest}>
          {typeof Node !== 'undefined' && node instanceof Node
            ? node
            : renderSolidElement(node)}
        </ContentSelectorRenderer>
      ),
    }),
};

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

export type InsertionCond<T, _S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Insertion]: string;
  fields: readonly string[];
}
  ? <V extends { [K in T['fields'][number]]: JSX.Element }>(
      values: V
    ) => V[keyof V] extends string | number
      ? IntlayerNode<string>
      : IntlayerNode<JSX.Element>
  : never;

/**
 * Split insertion string and join with JSX elements
 */
const splitAndJoinInsertion = (
  template: string,
  values: Record<string, string | number | JSX.Element>
): JSX.Element => {
  const result = splitInsertionTemplate(template, values);

  if (result.isSimple) {
    // Simple string replacement
    return result.parts as string;
  }

  // Return as JSX array
  return result.parts as any[] as JSX.Element;
};

/** Insertion plugin for Solid. Handles component/element insertion. */
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
            [K in InsertionContent['fields'][number]]:
              | string
              | number
              | JSX.Element;
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
        use: (components?: HTMLComponents<'permissive', {}>) => JSX.Element;
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
          children: (
            <ContentSelectorRenderer {...rest}>
              <MarkdownMetadataRenderer
                {...rest}
                metadataKeyPath={props.keyPath}
              >
                {node}
              </MarkdownMetadataRenderer>
            </ContentSelectorRenderer>
          ),
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
        children: (
          <ContentSelectorRenderer {...rest}>
            <MarkdownRenderer {...rest} {...components}>
              {node}
            </MarkdownRenderer>
          </ContentSelectorRenderer>
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
    }) as any;
  },
};

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: infer M;
  metadata?: infer U;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => JSX.Element;
      metadata: DeepTransformContent<U>;
    }
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
  children?: JSX.Element;
  [key: string]: any;
}) => JSX.Element;

/**
 * Create default HTML tag components using Solid's Dynamic component.
 * Each component renders the corresponding HTML element with its props and children.
 */
const createDefaultHTMLComponents = (): Record<string, HTMLTagComponent> => {
  const components: Record<string, HTMLTagComponent> = {};

  for (const tag of HTML_TAGS) {
    components[tag] = ({ children, ...props }) => (
      <Dynamic component={tag} {...props}>
        {children}
      </Dynamic>
    );
  }

  return components;
};

const defaultHTMLComponents = createDefaultHTMLComponents();

export type HTMLPluginCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.HTML]: infer I;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<I>;
    }
  : never;

/** HTML plugin. Replaces node with a function that takes components => JSX.Element. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.HTML,
  transform: (node: HTMLContent) => {
    const html = node[NodeType.HTML];

    const render = (userComponents?: HTMLComponents): JSX.Element => {
      // Merge default components with user-provided components
      // User components take priority over defaults
      const mergedComponents = {
        ...defaultHTMLComponents,
        ...userComponents,
      };
      return getHTML(html as string, mergedComponents);
    };

    const element = render() as any;
    const target = [element];

    return new Proxy(target as any, {
      get(target, prop, receiver) {
        if (prop === 'value') {
          return html;
        }

        if (prop === 'use') {
          return (userComponents?: HTMLComponents) => render(userComponents);
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as any;
  },
};

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginSolid<T, _S, _L extends LocalesValues> {
  solidNode: SolidNodeCond<T>;
  solidIntlayerNode: IntlayerNodeCond<T>;
  solidInsertion: InsertionCond<T>;
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
