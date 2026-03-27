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
  splitInsertionTemplate,
  translationPlugin,
} from '@intlayer/core/interpreter';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type {
  HTMLContent,
  InsertionContent,
  MarkdownContent,
} from '@intlayer/core/transpiler';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { KeyPath } from '@intlayer/types/keyPath';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import { type JSX, lazy, Suspense } from 'solid-js';
import { ContentSelector } from './editor/ContentSelector';
import type { HTMLComponents } from './html/types';
import { type IntlayerNode, renderIntlayerNode } from './IntlayerNode';
import { renderSolidElement } from './solidElement/renderSolidElement';

// solid-js lazy for heavy renderer components — creates separate code-split chunks
const LazyMarkdownMetadataRenderer = lazy(() =>
  import('./markdown/MarkdownRenderer').then((m) => ({
    default: m.MarkdownMetadataRenderer,
  }))
);

const LazyMarkdownRenderer = lazy(() =>
  import('./markdown/MarkdownRenderer').then((m) => ({
    default: m.MarkdownRenderer,
  }))
);

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
      children: isEnabled ? (
        <ContentSelector {...rest}>{rest.children}</ContentSelector>
      ) : (
        rest.children
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
      children: isEnabled ? (
        <ContentSelector {...rest}>
          {typeof Node !== 'undefined' && node instanceof Node
            ? node
            : renderSolidElement(node)}
        </ContentSelector>
      ) : typeof Node !== 'undefined' && node instanceof Node ? (
        node
      ) : (
        renderSolidElement(node)
      ),
    }),
};

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

export type InsertionCond<T, _S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer I;
  fields: readonly (infer F)[];
}
  ? <V extends { [K in Extract<F, string>]: string | number | JSX.Element }>(
      values: V
    ) => I extends string
      ? V[keyof V] extends string | number
        ? IntlayerNode<string>
        : IntlayerNode<JSX.Element>
      : DeepTransformContent<I, L>
  : never;

/**
 * Split insertion string and join with JSX elements
 */
const splitAndJoinInsertion = (
  template: string,
  values: Record<string, string | number | JSX.Element>
): JSX.Element => {
  const result = splitInsertionTemplate(template, values);

  // No JSX elements - use original logic
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
    typeof node === 'object' && node?.nodeType === NodeTypes.INSERTION,
  transform: (node: InsertionContent, props, deepTransformNode) => {
    const newKeyPath: KeyPath[] = [
      ...props.keyPath,
      {
        type: NodeTypes.INSERTION,
      },
    ];

    const children = node[NodeTypes.INSERTION];

    // Return the (values) => wrapper at the Insertion level
    return (values: Record<string, string | number | JSX.Element>) => {
      /** Insertion string plugin. Replaces strings by injecting the values. */
      const insertionStringPlugin: Plugins = {
        id: 'insertion-string-plugin',
        canHandle: (n) => typeof n === 'string',
        transform: (n: string, subProps, deepTransformNode) => {
          const transformedResult = deepTransformNode(n, {
            ...subProps,
            children: n,
            plugins: [
              ...(props.plugins ?? ([] as Plugins[])).filter(
                (plugin) => plugin.id !== 'intlayer-node-plugin'
              ),
            ],
          });

          // Inject the values captured from the parent scope
          const result = splitAndJoinInsertion(transformedResult, values);

          return deepTransformNode(result, {
            ...subProps,
            plugins: props.plugins,
            children: result,
          });
        },
      };

      // Process the child nodes (strings or enumerations) with the string plugin active
      return deepTransformNode(children, {
        ...props,
        children,
        keyPath: newKeyPath,
        plugins: [insertionStringPlugin, ...(props.plugins ?? [])],
      });
    };
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
          children: configuration.editor.enabled ? (
            <ContentSelector {...rest}>
              <Suspense fallback={node}>
                <LazyMarkdownMetadataRenderer
                  {...rest}
                  metadataKeyPath={props.keyPath}
                >
                  {node}
                </LazyMarkdownMetadataRenderer>
              </Suspense>
            </ContentSelector>
          ) : (
            <Suspense fallback={node}>
              <LazyMarkdownMetadataRenderer
                {...rest}
                metadataKeyPath={props.keyPath}
              >
                {node}
              </LazyMarkdownMetadataRenderer>
            </Suspense>
          ),
        }),
    };

    // Transform metadata while keeping the same structure
    const metadataNodes = deepTransformNode(metadata, {
      plugins: [metadataPlugins],
      dictionaryKey: rest.dictionaryKey,
      keyPath: [],
    });

    const render = (components?: HTMLComponents) =>
      renderIntlayerNode({
        ...props,
        value: node,
        children: configuration.editor.enabled ? (
          <ContentSelector {...rest}>
            <Suspense fallback={node}>
              <LazyMarkdownRenderer {...rest} components={components}>
                {node}
              </LazyMarkdownRenderer>
            </Suspense>
          </ContentSelector>
        ) : (
          <Suspense fallback={node}>
            <LazyMarkdownRenderer {...rest} components={components}>
              {node}
            </LazyMarkdownRenderer>
          </Suspense>
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
    });
  },
};

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.MARKDOWN]: infer M;
  metadata?: infer U;
  tags?: infer U;
}
  ? IntlayerNode<
      M,
      {
        use: (components?: HTMLComponents<'permissive', U>) => JSX.Element;
        metadata: DeepTransformContent<U>;
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

const LazyHTMLRenderer = lazy(() =>
  import('./html/HTMLRenderer').then((m) => ({ default: m.HTMLRenderer }))
);

/** ---------------------------------------------
 *  HTML PLUGIN
 *  --------------------------------------------- */

export type HTMLPluginCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.HTML]: infer I;
  tags?: infer U;
}
  ? IntlayerNode<
      I,
      {
        use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<I>;
      }
    >
  : never;

/** HTML plugin. Replaces node with a function that takes components => JSX.Element. */
export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeTypes.HTML,
  transform: (node: HTMLContent<string>, props) => {
    const html = node[NodeTypes.HTML];
    const { plugins, ...rest } = props;

    // Type-safe render function that accepts properly typed components
    const render = (userComponents?: HTMLComponents): any =>
      renderIntlayerNode({
        ...rest,
        value: html,
        children: (
          <Suspense fallback={html}>
            <LazyHTMLRenderer
              {...rest}
              html={html}
              components={userComponents}
            />
          </Suspense>
        ),
      });

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
    });
  },
};

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginSolid<T, S, L extends LocalesValues> {
  solidNode: SolidNodeCond<T>;
  solidIntlayerNode: IntlayerNodeCond<T>;
  solidInsertion: InsertionCond<T, S, L>;
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

/**
 * Get the plugins array for Solid content transformation.
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
  solidNodePlugins,
  insertionPlugin,
  markdownPlugin,
  htmlPlugin,
];
