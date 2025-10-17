import {
  type ContentNode,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import {
  deepTransformNode,
  type NodeProps,
  type Plugins,
} from '../interpreter';

const filterTranslationsPlugin = (
  locales: LocalesValues[] | LocalesValues
): Plugins => ({
  id: 'filter-translations-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Translation,
  transform: (node, props, deepTransformNode) => {
    const translationMap = node.translation as Record<LocalesValues, string>;

    const filteredTranslationMap = Object.fromEntries(
      Object.entries(translationMap).filter(([key]) =>
        locales.includes(key as LocalesValues)
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
    filterTranslationsPlugin(locale),
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  });
};
