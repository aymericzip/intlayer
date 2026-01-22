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
    typeof node === 'object' && typeof node.props !== 'undefined',

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
          {renderSolidElement(node)}
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
  ? (
      values: {
        [K in T['fields'][number]]: string | number | JSX.Element;
      }
    ) => JSX.Element
  : never;

/**
 * Check if a value is a JSX element
 */
const isJSXElement = (value: any): value is JSX.Element => {
  return (
    value !== null &&
    value !== undefined &&
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    typeof value !== 'boolean'
  );
};

/**
 * Split insertion string and join with JSX elements
 */
const splitAndJoinInsertion = (
  template: string,
  values: Record<string, string | number | JSX.Element>
): JSX.Element => {
  // Check if any value is a JSX element
  const hasJSXElement = Object.values(values).some(isJSXElement);

  if (!hasJSXElement) {
    // Simple string replacement
    return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, key) => {
      const trimmedKey = key.trim();
      return (values[trimmedKey] ?? '').toString();
    }) as any;
  }

  // Split the template by placeholders while keeping the structure
  const parts: (string | JSX.Element)[] = [];
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

  // Return as JSX array
  return (<>{parts}</>) as JSX.Element;
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
          return (components?: any) => render(components);
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

export type HTMLPluginCond<T, S, L> = HTMLCond<T, S, L>;

/** HTML plugin. Replaces node with a function that takes components => JSX.Element. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.HTML,
  transform: (node: HTMLContent) => {
    const html = node[NodeType.HTML];

    const render = (userComponents?: Record<string, any>): JSX.Element => {
      // Merge default components with user-provided components
      // User components take priority over defaults
      const mergedComponents = {
        ...defaultHTMLComponents,
        ...userComponents,
      };
      return getHTML(html as string, mergedComponents);
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

export interface IInterpreterPluginSolid<T, S, L extends LocalesValues> {
  solidNode: SolidNodeCond<T>;
  solidIntlayerNode: IntlayerNodeCond<T>;
  solidInsertion: InsertionCond<T, S, L>;
  solidMarkdown: MarkdownCond<T, S, L>;
  solidHtml: HTMLPluginCond<T, S, L>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `solid-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
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
 * Default enabled state for the plugins. Those are necessary for the rendering on client side.
 */
export const interpreterPluginsEnabledState: IInterpreterPluginState = {
  translation: true,
  enumeration: true,
  condition: true,
  insertion: true,
  nested: true,
  html: true,
  solidNode: true,
  solidIntlayerNode: true,
  solidInsertion: true,
  solidMarkdown: true,
  solidHtml: true,
};
