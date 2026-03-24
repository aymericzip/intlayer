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
import type { KeyPath } from '@intlayer/types/keyPath';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import type { HTMLComponents } from './html/types';
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

export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (_node, { children, ...rest }) =>
    renderIntlayerNode({
      ...rest,
      value: children as string,
      children,
    }),
};

/** ---------------------------------------------
 * INSERTION PLUGIN
 * --------------------------------------------- */

export type InsertionCond<T, _S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: string;
  fields: readonly string[];
}
  ? <V extends { [K in T['fields'][number]]: string | number }>(
      values: V
    ) => IntlayerNode<string>
  : never;

export const insertionPlugin: Plugins = {
  id: 'insertion-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeTypes.INSERTION,
  transform: (node: InsertionContent, props, deepTransformNode) => {
    const newKeyPath: KeyPath[] = [
      ...props.keyPath,
      { type: NodeTypes.INSERTION },
    ];

    const children = node[NodeTypes.INSERTION];

    const insertionStringPlugin: Plugins = {
      id: 'insertion-string-plugin',
      canHandle: (node) => typeof node === 'string',
      transform: (node: string, subProps, deepTransformNode) => {
        const transformedResult = deepTransformNode(node, {
          ...subProps,
          children: node,
          plugins: (props.plugins ?? ([] as Plugins[])).filter(
            (plugin) => plugin.id !== 'intlayer-node-plugin'
          ),
        });

        return (
          values: { [K in InsertionContent['fields'][number]]: string | number }
        ) => {
          const result = splitInsertionTemplate(transformedResult, values);
          const resultStr = result.isSimple
            ? (result.parts as string)
            : (result.parts as string[]).join('');

          return deepTransformNode(resultStr, {
            ...subProps,
            plugins: props.plugins,
            children: resultStr,
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

/** ---------------------------------------------
 * MARKDOWN PLUGIN
 * --------------------------------------------- */

export type MarkdownStringCond<T> = T extends string
  ? IntlayerNode<
      string,
      {
        metadata: DeepTransformContent<string>;
        /** Returns the raw markdown string; render with compileMarkdown(). */
        use: (components?: HTMLComponents<'permissive', {}>) => string;
      }
    >
  : never;

export const markdownStringPlugin: Plugins = {
  id: 'markdown-string-plugin',
  canHandle: (node) => typeof node === 'string',
  transform: (node: string, props, deepTransformNode) => {
    const { plugins: _plugins, ...rest } = props;

    const metadata = getMarkdownMetadata(node) ?? {};

    const metadataPlugins: Plugins = {
      id: 'markdown-metadata-plugin',
      canHandle: (metadataNode) =>
        typeof metadataNode === 'string' ||
        typeof metadataNode === 'number' ||
        typeof metadataNode === 'boolean' ||
        !metadataNode,
      transform: (metadataNode, subProps) =>
        renderIntlayerNode({
          ...subProps,
          value: metadataNode,
          children: node,
        }),
    };

    const metadataNodes = deepTransformNode(metadata, {
      plugins: [metadataPlugins],
      dictionaryKey: rest.dictionaryKey,
      keyPath: [],
    });

    return renderIntlayerNode({
      ...props,
      value: node,
      children: node,
      additionalProps: {
        metadata: metadataNodes,
        use: (_components?: any) => node,
      },
    }) as any;
  },
};

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.MARKDOWN]: infer M;
  metadata?: infer U;
  tags?: infer U;
}
  ? {
      use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<M>;
      metadata: DeepTransformContent<U>;
    }
  : never;

export const markdownPlugin: Plugins = {
  id: 'markdown-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeTypes.MARKDOWN,
  transform: (node: MarkdownContent, props, deepTransformNode) => {
    const newKeyPath: KeyPath[] = [
      ...props.keyPath,
      { type: NodeTypes.MARKDOWN },
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

export type HTMLPluginCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.HTML]: infer I;
  tags?: infer U;
}
  ? {
      /** Returns the raw HTML string. */
      use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<I>;
    }
  : never;

export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeTypes.HTML,
  transform: (node: HTMLContent<string>, props) => {
    const html = node[NodeTypes.HTML];

    return renderIntlayerNode({
      ...props,
      value: html,
      children: html,
      additionalProps: {
        use: (_components?: any) => html,
      },
    });
  },
};

/** ---------------------------------------------
 * PLUGINS RESULT
 * --------------------------------------------- */

export interface IInterpreterPluginVanilla<T, S, L extends LocalesValues> {
  vanillaIntlayerNode: IntlayerNodeCond<T>;
  vanillaInsertion: InsertionCond<T, S, L>;
  vanillaMarkdown: MarkdownCond<T>;
  vanillaHtml: HTMLPluginCond<T>;
}

export type IInterpreterPluginState = Omit<
  IInterpreterPluginStateCore,
  'insertion'
> & {
  vanillaIntlayerNode: true;
  vanillaInsertion: true;
  vanillaMarkdown: true;
  vanillaHtml: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;

export const getPlugins = (
  locale?: LocalesValues,
  fallback = true
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
  insertionPlugin,
  markdownPlugin,
  htmlPlugin,
];
