import type { Locales, LocalesValues } from '@intlayer/config/client';
import { deepTransformNode } from '../interpreter/getContent/deepTransform';
import {
  type DeepTransformContent,
  type NodeProps,
  type Plugins,
  translationPlugin,
} from '../interpreter/getContent/plugins';
import type { ContentNode, Dictionary } from '../types';

/**
 * Transforms a node in a single pass, applying each plugin as needed.
 * In comparison to `getContent`, this function will only apply the translation plugin.
 * It will not transform enumerations, insertions, or other content types.
 *
 * @param node The node to transform.
 * @param locale The locale to use if your transformers need it (e.g. for translations).
 */
export const getLocalizedContent = <
  T extends ContentNode,
  L extends LocalesValues = Locales,
>(
  node: T,
  locale: L,
  nodeProps: NodeProps,
  fallback?: LocalesValues // fallback mean that if field is not translated, it will use the default locale
) => {
  const plugins: Plugins[] = [
    translationPlugin(locale, fallback),
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T>;
};

export const getPerLocaleDictionary = <
  T extends Dictionary,
  L extends LocalesValues = Locales,
>(
  dictionary: T,
  locale: L,
  fallback?: LocalesValues
) => ({
  ...dictionary,
  locale,
  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  content: getLocalizedContent(
    dictionary.content,
    locale,
    {
      dictionaryKey: dictionary.key,
      keyPath: [],
      plugins: [],
    },
    fallback
  ) as any as DeepTransformContent<T['content']>,
});
