import configuration from '@intlayer/config/built';
import type { Locales, LocalesValues } from '@intlayer/config/client';
import { getTranslation } from '../interpreter';
import { deepTransformNode } from '../interpreter/getContent/deepTransform';
import type {
  DeepTransformContent,
  NodeProps,
  Plugins,
} from '../interpreter/getContent/plugins';
import type { TranslationContent } from '../transpiler';
import { type ContentNode, type KeyPath, NodeType } from '../types';

/**
 * Helper function to check if a node or its children contain translation nodes
 */
const hasTranslationNodes = (node: any): boolean => {
  if (typeof node !== 'object' || node === null) {
    return false;
  }

  if (node?.nodeType === NodeType.Translation) {
    return true;
  }

  if (Array.isArray(node)) {
    return node.some(hasTranslationNodes);
  }

  return Object.values(node).some(hasTranslationNodes);
};

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const filterTranslationsOnlyPlugin = (
  locale: LocalesValues,
  fallback?: LocalesValues
): Plugins => ({
  id: 'filter-translations-only-plugin',
  canHandle: (node: ContentNode) => {
    // Only handle objects and arrays, not primitives
    return typeof node === 'object' && node !== null;
  },
  transform: (node: ContentNode, props, deepTransformNode) => {
    if (typeof node === 'object' && node?.nodeType === NodeType.Translation) {
      const result = structuredClone(
        (node as TranslationContent)[NodeType.Translation]
      );

      for (const key in result) {
        const childProps = {
          ...props,
          children: result[key as unknown as keyof typeof result],
          keyPath: [
            ...props.keyPath,
            { type: NodeType.Translation, key } as KeyPath,
          ],
        };
        result[key as unknown as keyof typeof result] = deepTransformNode(
          result[key as unknown as keyof typeof result],
          {
            ...childProps,
            plugins: [
              ...(props.plugins ?? ([] as Plugins[])).filter(
                (plugin) => plugin.id !== 'filter-translations-only-plugin'
              ),
            ],
          }
        );
      }
      return getTranslation(result, locale, fallback);
    } else if (
      typeof node === 'object' &&
      node !== null &&
      !Array.isArray(node) &&
      !node?.nodeType
    ) {
      // For regular objects, filter out properties that don't contain translations
      const result: Record<string, any> = {};
      for (const key in node as any) {
        if (hasTranslationNodes(node[key])) {
          const childProps = {
            ...props,
            children: node[key],
            keyPath: [
              ...props.keyPath,
              { type: NodeType.Object, key } as KeyPath,
            ],
          };
          result[key] = deepTransformNode(node[key], childProps);
        }
      }
      return result;
    } else if (Array.isArray(node)) {
      // For arrays, keep all items but transform them
      return node.map((child, index) => {
        const childProps = {
          ...props,
          children: child,
          keyPath: [
            ...props.keyPath,
            { type: NodeType.Array, key: index } as KeyPath,
          ],
        };
        return deepTransformNode(child, childProps);
      });
    }

    return 'to remove from the object';
  },
});

/**
 * Return the content of a node with only the translation plugin.
 *
 * @param node The node to transform.
 * @param locale The locale to use if your transformers need it (e.g. for translations).
 */
export const getFilterTranslationsOnlyContent = <
  T extends ContentNode,
  L extends LocalesValues = Locales,
>(
  node: T,
  locale: L = configuration?.internationalization.defaultLocale as L,
  nodeProps: NodeProps,
  fallback?: LocalesValues
) => {
  const plugins: Plugins[] = [
    filterTranslationsOnlyPlugin(locale, fallback),
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T>;
};
