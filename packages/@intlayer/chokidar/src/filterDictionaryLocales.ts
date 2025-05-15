import type { Locales } from '@intlayer/config/client';
import {
  deepTransformNode,
  Dictionary,
  NodeType,
  Plugins,
} from '@intlayer/core';

const filterTranlationsPlugin = (locales: Locales[]): Plugins => ({
  id: 'filter-translations-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Translation,
  transform: (node, props, deepTransformNode) => {
    const translationMap = node.translation as Record<Locales, string>;

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

export const filterDictionaryLocales = (
  dictionary: Dictionary,
  locales: Locales[]
) => {
  return deepTransformNode(dictionary, {
    plugins: [filterTranlationsPlugin(locales)],
    dictionaryKey: dictionary.key,
    keyPath: [],
  });
};
