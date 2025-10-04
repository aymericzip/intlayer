import type { Locales, LocalesValues } from '@intlayer/config/client';
import {
  deepTransformNode,
  type NodeProps,
  type Plugins,
} from '../interpreter';
import { type ContentNode, NodeType } from '../types';

const filterTranlationsPlugin = (
  locales: LocalesValues[] | LocalesValues
): Plugins => ({
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

export const getFilteredLocalesContent = (
  node: ContentNode,
  locale: LocalesValues | LocalesValues[],
  nodeProps: NodeProps
) => {
  const plugins: Plugins[] = [
    filterTranlationsPlugin(locale),
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  });
};
