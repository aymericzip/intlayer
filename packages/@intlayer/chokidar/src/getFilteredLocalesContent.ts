import type { Locales, LocalesValues } from '@intlayer/config/client';
import {
  ContentNode,
  deepTransformNode,
  NodeType,
  type NodeProps,
  type Plugins,
} from '@intlayer/core';

const filterTranlationsPlugin = (
  locales: LocalesValues[] | LocalesValues,
  fallback: LocalesValues | undefined = undefined // fallback mean that if field is not translated, it will use the default locale,
): Plugins => ({
  id: 'filter-translations-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Translation,
  transform: (node, props, deepTransformNode) => {
    const translationMap = node.translation as Record<Locales, string>;

    const localesArray = Array.isArray(locales) ? locales : [locales];
    const isSingleLocale = localesArray.length === 1;

    if (isSingleLocale) {
      let content = translationMap[localesArray[0] as Locales];

      if (typeof content === 'undefined' && fallback) {
        content = translationMap[fallback as Locales];
      }

      return deepTransformNode(content, props);
    }

    const filteredTranslationMap = Object.fromEntries(
      Object.entries(translationMap).filter(([key]) =>
        locales.includes(key as Locales)
      )
    );

    return {
      ...node,
      translation: deepTransformNode(filteredTranslationMap, {
        ...props,
        keyPath: [
          ...props.keyPath,
          { type: NodeType.Object, key: NodeType.Translation },
        ],
      }),
    };
  },
});

export const getFilteredLocalesContent = (
  node: ContentNode,
  locale: LocalesValues | LocalesValues[],
  nodeProps: NodeProps,
  fallback?: LocalesValues // fallback mean that if field is not translated, it will use the default locale,
) => {
  const plugins: Plugins[] = [
    filterTranlationsPlugin(locale, fallback),
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  });
};
