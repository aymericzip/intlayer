import configuration from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/types';
import {
  type ContentNode,
  type Locale,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import type { DeepTransformContent, NodeProps, Plugins } from '../interpreter';
import { deepTransformNode } from '../interpreter/getContent/deepTransform';
import type { TranslationContent } from '../transpiler';

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const checkMissingLocalesPlugin = (
  locales: Locale[],
  onMissingLocale: (locale: Locale) => void
): Plugins => ({
  id: 'check-missing-locales-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Translation,
  transform: (node: TranslationContent, props, deepTransformNode) => {
    for (const locale of locales) {
      if (
        !node[NodeType.Translation][
          locale as keyof (typeof node)[NodeType.Translation]
        ]
      ) {
        onMissingLocale(locale);
      }
    }

    // Continue traversal inside the translation values, but avoid re-applying this plugin on the same node
    const translations = node[NodeType.Translation] as Record<string, any>;
    for (const key in translations) {
      const child = translations[key];
      deepTransformNode(child, {
        ...props,
        children: child,
      });
    }

    // Return the original node; the return value is ignored by the caller
    return node;
  },
});

/**
 * Return the content of a node with only the translation plugin.
 *
 * @param node The node to transform.
 * @param locales The locales to check for missing translations.
 */
export const getMissingLocalesContent = <T extends ContentNode>(
  node: T,
  locales: LocalesValues[] = configuration?.internationalization?.locales,
  nodeProps: NodeProps
): Locale[] => {
  const missingLocales = new Set<Locale>();

  const plugins: Plugins[] = [
    checkMissingLocalesPlugin(locales as Locale[], (locale) =>
      missingLocales.add(locale)
    ),
    ...(nodeProps.plugins ?? []),
  ];

  deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T>;

  return Array.from(missingLocales);
};

export const getMissingLocalesContentFromDictionary = (
  dictionary: Dictionary,
  locales: LocalesValues[] = configuration?.internationalization?.locales
) =>
  getMissingLocalesContent(dictionary.content, locales, {
    dictionaryKey: dictionary.key,
    keyPath: [],
  });
