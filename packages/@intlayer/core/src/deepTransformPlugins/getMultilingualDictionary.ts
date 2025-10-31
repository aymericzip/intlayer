import type { Dictionary, KeyPath, NodeType, TypedNode } from '@intlayer/types';
import {
  deepTransformNode,
  type NodeProps,
  type Plugins,
} from '../interpreter';
import { t } from '../transpiler';

/**
 * Transform a per-locale dictionary into a multilingual dictionary.
 *
 * Example:
 * ```json
 * {
 *   "key": "about-page",
 *   "locale": "en",
 *   "content": {
 *     "myContent": "English content"
 *   }
 * }
 * ```
 *
 * ```json
 * {
 *   "key": "about-page",
 *   "content": {
 *     "myContent": t({
 *       "en": "English content",
 *     })
 *   }
 * }
 * ```
 */
export const getMultilingualDictionary = (
  dictionary: Dictionary
): Dictionary => {
  if (!dictionary.locale) {
    return dictionary;
  }

  const locale = dictionary.locale;

  const wrapPrimitiveInTranslationPlugin: Plugins = {
    id: 'wrap-primitive-in-translation',
    canHandle: (node) =>
      typeof node === 'string' ||
      typeof node === 'number' ||
      typeof node === 'boolean',
    transform: (node) => t({ [locale]: node } as Record<string, unknown>),
  };

  const traverseTypedNodePlugin: Plugins = {
    id: 'traverse-typed-node-plugin',
    canHandle: (node) =>
      typeof node === 'object' && typeof (node as any)?.nodeType === 'string',
    transform: (node: TypedNode, props, transformFn) => {
      const nodeType = (node as any).nodeType as NodeType;
      const inner = structuredClone(
        (node as any)[nodeType as unknown as keyof TypedNode] as any
      );

      if (typeof inner !== 'object' || inner === null) {
        const transformed = transformFn(inner, {
          ...props,
          children: inner,
          keyPath: [
            ...props.keyPath,
            { type: nodeType, key: nodeType } as KeyPath,
          ],
        });
        return {
          ...node,
          [nodeType as unknown as keyof TypedNode]: transformed,
        };
      }

      for (const key in inner) {
        const childProps: NodeProps = {
          ...props,
          children: inner[key as unknown as keyof typeof inner],
          keyPath: [...props.keyPath, { type: nodeType, key } as KeyPath],
        };
        inner[key as unknown as keyof typeof inner] = transformFn(
          inner[key as unknown as keyof typeof inner],
          childProps
        );
      }

      return { ...node, [nodeType as unknown as keyof TypedNode]: inner };
    },
  };

  const transformedContent = deepTransformNode(
    JSON.parse(JSON.stringify(dictionary.content)),
    {
      dictionaryKey: dictionary.key,
      keyPath: [],
      plugins: [traverseTypedNodePlugin, wrapPrimitiveInTranslationPlugin],
    }
  );

  const { locale: _omitLocale, ...rest } = dictionary as any;
  return {
    ...rest,
    content: transformedContent,
  } as Dictionary;
};
