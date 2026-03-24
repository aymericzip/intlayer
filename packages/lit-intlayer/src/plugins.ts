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
import {
  type CompileOptions,
  compileWithOptions,
  getMarkdownMetadata,
} from '@intlayer/core/markdown';
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
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { HTMLComponents } from './html/types';
import { litRuntime } from './markdown/runtime';
import {
  type IntlayerNode as IntlayerNodeCore,
  renderIntlayerNode,
} from './renderIntlayerNode';

/**
 * Compile markdown to an HTML string using the Lit runtime.
 * Inline here to avoid a cross-entry circular import with markdown/compiler.
 */
const compileMarkdown = (markdown = '', options: CompileOptions = {}): string =>
  compileWithOptions(markdown, litRuntime, options) as string;

/**
 * Creates a Lit-renderable node for raw HTML/compiled markdown.
 *
 * The returned object is a Proxy over an `unsafeHTML` DirectiveResult so that
 * Lit's template engine renders it as HTML (not escaped text), while string
 * coercion (`.toString()`, `String(node)`) still returns the raw source string
 * for editor tooling and serialization.
 */
const createLitHTMLNode = (
  htmlStr: string,
  rawStr: string = htmlStr,
  additionalProps: Record<string, unknown> = {}
): any => {
  const directive = unsafeHTML(htmlStr);

  return new Proxy(directive as any, {
    get(target, prop, receiver) {
      if (prop === 'value' || prop === 'raw') return rawStr;
      if (prop === 'toString') return () => rawStr;
      if (prop === Symbol.toPrimitive) return () => rawStr;
      if (prop === Symbol.iterator) return undefined;
      if (prop === '__update') return () => {};
      if (Object.hasOwn(additionalProps, prop as string))
        return additionalProps[prop as string];
      return Reflect.get(target, prop, receiver);
    },
  });
};

/** ---------------------------------------------
 * INTLAYER NODE PLUGIN
 * --------------------------------------------- */

export type IntlayerNodeCond<T> = T extends number | string
  ? IntlayerNode<T>
  : never;

export type IntlayerNode<T, P = {}> = IntlayerNodeCore<T> & P;

const escapeHtmlAttr = (str: string): string =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const escapeHtmlText = (str: string): string =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Wraps string/number leaf values in an IntlayerNode so they carry
 * `.value`, `.raw`, `toString()`, and `__update()`.
 * When the editor is enabled, wraps the content with
 * `<intlayer-content-selector-wrapper>` so the visual editor can highlight it.
 */
export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (_node, { children, keyPath, dictionaryKey, ...rest }) => {
    if (configuration?.editor.enabled) {
      const rawStr = String(children ?? '');
      const htmlStr = `<intlayer-content-selector-wrapper key-path="${escapeHtmlAttr(JSON.stringify(keyPath ?? []))}" dictionary-key="${escapeHtmlAttr(String(dictionaryKey ?? ''))}">${escapeHtmlText(rawStr)}</intlayer-content-selector-wrapper>`;
      return createLitHTMLNode(htmlStr, rawStr);
    }
    return renderIntlayerNode({
      ...rest,
      value: children as string,
      children,
    });
  },
};

/** ---------------------------------------------
 * INSERTION PLUGIN
 * --------------------------------------------- */

export type InsertionCond<T, _S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer I;
  fields: readonly (infer F)[];
}
  ? <V extends { [K in Extract<F, string>]: string | number }>(
      values: V
    ) => I extends string ? IntlayerNode<string> : DeepTransformContent<I, L>
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

    const transformed = deepTransformNode(children, {
      ...props,
      children,
      keyPath: newKeyPath,
      plugins: [insertionStringPlugin, ...(props.plugins ?? [])],
    });

    // When children is an enumeration/condition, deepTransformNode returns a
    // function (arg) => insertionWrapper. Mirror React's convention:
    // return (values) => (arg) => result so the caller does fn(values)(count).
    if (
      typeof children === 'object' &&
      children !== null &&
      'nodeType' in children &&
      [NodeTypes.ENUMERATION, NodeTypes.CONDITION].includes(
        children.nodeType as
          | typeof NodeTypes.ENUMERATION
          | typeof NodeTypes.CONDITION
      )
    ) {
      return (values: any) => (arg: any) => {
        const inner = (transformed as (a: any) => any)(arg);
        return typeof inner === 'function' ? inner(values) : inner;
      };
    }

    return transformed;
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
        /** Returns the raw markdown string; render with compileMarkdown() or <intlayer-markdown>. */
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

    const compiled = compileMarkdown(node);

    return createLitHTMLNode(compiled, node, {
      metadata: metadataNodes,
      use: (_components?: any) => compiled,
    });
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
      /** Returns the raw HTML string; render with unsafeHTML() or <intlayer-html>. */
      use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<I>;
    }
  : never;

export const htmlPlugin: Plugins = {
  id: 'html-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeTypes.HTML,
  transform: (node: HTMLContent<string>) => {
    const htmlStr = node[NodeTypes.HTML];

    return createLitHTMLNode(htmlStr, htmlStr, {
      use: (_components?: any) => htmlStr,
    });
  },
};

/** ---------------------------------------------
 * PLUGINS RESULT
 * --------------------------------------------- */

export interface IInterpreterPluginLit<T, S, L extends LocalesValues> {
  litIntlayerNode: IntlayerNodeCond<T>;
  litInsertion: InsertionCond<T, S, L>;
  litMarkdown: MarkdownCond<T>;
  litHtml: HTMLPluginCond<T>;
}

export type IInterpreterPluginState = Omit<
  IInterpreterPluginStateCore,
  'insertion'
> & {
  litIntlayerNode: true;
  litInsertion: true;
  litMarkdown: true;
  litHtml: true;
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
