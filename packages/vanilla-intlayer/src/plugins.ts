import { editor, internationalization } from '@intlayer/config/built';
import {
  conditionPlugin,
  type DeepTransformContent as DeepTransformContentCore,
  enumerationPlugin,
  fallbackPlugin,
  filePlugin,
  genderPlugin,
  getHTML,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  nestedPlugin,
  type Plugins,
  splitInsertionTemplate,
  translationPlugin,
} from '@intlayer/core/interpreter';
import {
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
import type { HTMLComponents } from './html/types';
import {
  type IntlayerNode as IntlayerNodeCore,
  renderIntlayerNode,
} from './renderIntlayerNode';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the intlayer node type is explicitly disabled at build time.
 */
const TREE_SHAKE_INTLAYER_NODE =
  process.env['INTLAYER_NODE_TYPE_INTLAYER_NODE'] === 'false';

/**
 * True when the markdown node type is explicitly disabled at build time.
 */
const TREE_SHAKE_MARKDOWN =
  process.env['INTLAYER_NODE_TYPE_MARKDOWN'] === 'false';

/**
 * True when the HTML node type is explicitly disabled at build time.
 */
const TREE_SHAKE_HTML = process.env['INTLAYER_NODE_TYPE_HTML'] === 'false';

/**
 * True when the insertion node type is explicitly disabled at build time.
 */
const TREE_SHAKE_INSERTION =
  process.env['INTLAYER_NODE_TYPE_INSERTION'] === 'false';

/**
 * True when the editor is explicitly disabled at build time.
 */
const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

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

export const intlayerNodePlugins: Plugins = TREE_SHAKE_INTLAYER_NODE
  ? fallbackPlugin
  : {
      id: 'intlayer-node-plugin',
      canHandle: (node) =>
        typeof node === 'bigint' ||
        typeof node === 'string' ||
        typeof node === 'number',
      transform: (_node, { children, keyPath, dictionaryKey, ...rest }) => {
        if (!TREE_SHAKE_EDITOR && editor.enabled) {
          const rawStr = String(children ?? '');
          const keyPathJson = JSON.stringify(keyPath ?? []);
          const dictKey = String(dictionaryKey ?? '');

          /**
           * In editor mode, string coercion returns the wrapper HTML so that
           * `element.innerHTML = content.title` automatically inserts the
           * `<intlayer-content-selector-wrapper>` into the DOM.
           */
          const htmlStr = `<intlayer-content-selector-wrapper key-path="${escapeHtmlAttr(keyPathJson)}" dictionary-key="${escapeHtmlAttr(dictKey)}">${escapeHtmlText(rawStr)}</intlayer-content-selector-wrapper>`;

          return renderIntlayerNode({
            ...rest,
            value: children as string,
            children: htmlStr,
            keyPath,
            dictionaryKey,
            additionalProps: {
              toElement: (): HTMLElement => {
                const wrapper = document.createElement(
                  'intlayer-content-selector-wrapper'
                );
                wrapper.setAttribute('key-path', keyPathJson);
                wrapper.setAttribute('dictionary-key', dictKey);
                wrapper.textContent = rawStr;
                return wrapper;
              },
            },
          });
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

export const insertionPlugin: Plugins = TREE_SHAKE_INSERTION
  ? fallbackPlugin
  : {
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
              values: {
                [K in InsertionContent['fields'][number]]: string | number;
              }
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

        if (
          typeof children === 'object' &&
          children !== null &&
          'nodeType' in children &&
          ([NodeTypes.ENUMERATION, NodeTypes.CONDITION] as NodeType[]).includes(
            children.nodeType as NodeType
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

const vanillaRuntime = {
  createElement: (tag: string, props: any, ...children: any[]) => {
    const attrs = Object.entries(props || {})
      .filter(
        ([key]) => key !== 'children' && key !== 'key' && key !== '_innerHTML'
      )
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    const innerHTML = props?._innerHTML;
    const childrenStr =
      innerHTML !== undefined ? innerHTML : children.flat(Infinity).join('');
    return `<${tag}${attrs ? ` ${attrs}` : ''}>${childrenStr}</${tag}>`;
  },
  normalizeProps: (_tag: string, props: Record<string, any>) => {
    const normalized: Record<string, any> = {};
    for (const [key, value] of Object.entries(props)) {
      if (key === 'className') {
        normalized.class = value;
      } else if (key === 'htmlFor') {
        normalized.for = value;
      } else if (key === 'dangerouslySetInnerHTML' && (value as any)?.__html) {
        normalized._innerHTML = (value as any).__html;
      } else {
        normalized[key] = value;
      }
    }
    return normalized;
  },
};

export type MarkdownStringCond<T> = T extends string
  ? IntlayerNode<
      string,
      {
        metadata: DeepTransformContent<string>;
        /** Returns the rendered markdown; render with .use(). */
        use: (components?: HTMLComponents<'permissive', {}>) => string;
      }
    >
  : never;

export const markdownStringPlugin: Plugins = TREE_SHAKE_MARKDOWN
  ? fallbackPlugin
  : {
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

        const compile = (components: any = {}) =>
          compileWithOptions(
            node,
            {
              ...vanillaRuntime,
              createElement: (tag: any, props: any, ...children: any[]) => {
                const override = components[tag];
                if (typeof override === 'function') {
                  return override({ ...props, children: children.join('') });
                }
                return vanillaRuntime.createElement(tag, props, ...children);
              },
            },
            {}
          ) as any;

        const value = compile();
        let children = node;

        if (!TREE_SHAKE_EDITOR && editor.enabled) {
          const keyPathJson = JSON.stringify(props.keyPath ?? []);
          const dictKey = String(props.dictionaryKey ?? '');
          children = `<intlayer-content-selector-wrapper key-path="${escapeHtmlAttr(keyPathJson)}" dictionary-key="${escapeHtmlAttr(dictKey)}">${escapeHtmlText(value)}</intlayer-content-selector-wrapper>`;
        }

        return renderIntlayerNode({
          ...props,
          value,
          children,
          additionalProps: {
            metadata: metadataNodes,
            use: (components?: any) => compile(components),
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

export const markdownPlugin: Plugins = TREE_SHAKE_MARKDOWN
  ? fallbackPlugin
  : {
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
      use: (components?: HTMLComponents<'permissive', U>) => IntlayerNode<I>;
    }
  : never;

export const htmlPlugin: Plugins = TREE_SHAKE_HTML
  ? fallbackPlugin
  : {
      id: 'html-plugin',
      canHandle: (node) =>
        typeof node === 'object' && node?.nodeType === NodeTypes.HTML,
      transform: (node: HTMLContent<string>, props) => {
        const htmlStr = node[NodeTypes.HTML];

        const use = (components: Record<string, any> = {}) => {
          const wrappedComponents = new Proxy(components, {
            get(target, prop) {
              if (typeof prop === 'string' && prop in target) {
                const Component = target[prop];
                return (props: any) => {
                  const children = Array.isArray(props.children)
                    ? props.children.join('')
                    : props.children;
                  return Component({ ...props, children });
                };
              }
              if (typeof prop === 'string' && /^[a-z][a-z0-9]*$/.test(prop)) {
                return (props: any) => {
                  const attrs = Object.entries(props)
                    .filter(([key]) => key !== 'children' && key !== 'key')
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(' ');
                  const children = Array.isArray(props.children)
                    ? props.children.join('')
                    : props.children;
                  return `<${prop}${attrs ? ` ${attrs}` : ''}>${children}</${prop}>`;
                };
              }
              return undefined;
            },
          });

          const result = getHTML(htmlStr, wrappedComponents as any);
          return Array.isArray(result) ? result.join('') : result;
        };

        const value = use();
        let children = htmlStr;

        if (!TREE_SHAKE_EDITOR && editor.enabled) {
          const keyPathJson = JSON.stringify(props.keyPath ?? []);
          const dictKey = String(props.dictionaryKey ?? '');
          children = `<intlayer-content-selector-wrapper key-path="${escapeHtmlAttr(keyPathJson)}" dictionary-key="${escapeHtmlAttr(dictKey)}">${escapeHtmlText(value)}</intlayer-content-selector-wrapper>`;
        }

        return renderIntlayerNode({
          ...props,
          value,
          children,
          additionalProps: {
            use: (components?: any) => use(components),
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

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the `vanilla-intlayer` plugins will override the types of `intlayer` functions.
 * Use `getIntlayer` from `vanilla-intlayer` (not from `intlayer`) to get properly typed
 * `IntlayerNode` wrappers with `.value` access on string/number content.
 */
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

/**
 * Get the plugins array for Vanilla content transformation.
 * This function is used by both getIntlayer and getDictionary to ensure consistent plugin configuration.
 */
export const getPlugins = (
  locale?: LocalesValues,
  fallback = true
): Plugins[] =>
  [
    translationPlugin(
      locale ?? internationalization.defaultLocale,
      fallback ? internationalization.defaultLocale : undefined
    ),
    enumerationPlugin,
    conditionPlugin,
    nestedPlugin(locale ?? internationalization.defaultLocale),
    filePlugin,
    genderPlugin,
    intlayerNodePlugins,
    insertionPlugin,
    markdownPlugin,
    htmlPlugin,
  ].filter(Boolean) as Plugins[];
