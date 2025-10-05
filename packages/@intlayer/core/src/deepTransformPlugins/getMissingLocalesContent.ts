import configuration from '@intlayer/config/built';
import type { Locales, LocalesValues } from '@intlayer/config/client';
import { deepTransformNode } from '../interpreter/getContent/deepTransform';
import type {
  DeepTransformContent,
  NodeProps,
  Plugins,
} from '../interpreter/getContent/plugins';
import type { TranslationContent } from '../transpiler';
import { type ContentNode, NodeType } from '../types';

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const checkMissingLocalesPlugin = (
  locales: Locales[],
  onMissingLocale: (locale: Locales) => void
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
  locales: LocalesValues[] = configuration?.internationalization.locales,
  nodeProps: NodeProps
): Locales[] => {
  const missingLocales = new Set<Locales>();

  const plugins: Plugins[] = [
    checkMissingLocalesPlugin(locales as Locales[], (locale) =>
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
