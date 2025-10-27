import {
  type ContentNode,
  type Dictionary,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import {
  deepTransformNode,
  type NodeProps,
  type Plugins,
} from '../interpreter';

const filterTranslationsPlugin = (locales: LocalesValues[]): Plugins => ({
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
  locales: LocalesValues | LocalesValues[],
  nodeProps: NodeProps
) => {
  const localesArray = Array.isArray(locales) ? locales : [locales];

  const plugins: Plugins[] = [
    filterTranslationsPlugin(localesArray),
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  });
};

/*
 * Remove all unneeded translation from translation node
 *
 * locale: fr
 * t({ ar: 'Hello', en: 'Hello', fr: 'Bonjour' }) -> t({ fr: 'Bonjour' })
 *
 * locales: [fr, en]
 * t({ ar: 'Hello', en: 'Hello', fr: 'Bonjour' }) -> t({ en: 'Hello', fr: 'Bonjour' })
 */
export const getFilteredLocalesDictionary = (
  dictionary: Dictionary,
  locale: LocalesValues | LocalesValues[]
) => {
  const localesArray = Array.isArray(locale) ? locale : [locale];

  return {
    ...dictionary,
    content: getFilteredLocalesContent(dictionary.content, localesArray, {
      dictionaryKey: dictionary.key,
      keyPath: [],
    }),
  };
};
