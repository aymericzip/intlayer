import type {
  ContentNode,
  DeclaredLocales,
  Dictionary,
  LocalesValues,
} from '@intlayer/types';
import {
  type DeepTransformContent,
  type NodeProps,
  type Plugins,
  translationPlugin,
} from '../interpreter';
import { deepTransformNode } from '../interpreter/getContent/deepTransform';

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
  L extends LocalesValues = DeclaredLocales,
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
  L extends LocalesValues,
>(
  dictionary: T,
  locale: L,
  fallback?: LocalesValues
): Dictionary => ({
  ...dictionary,
  locale,
  content: getLocalizedContent(
    dictionary.content,
    locale,
    {
      dictionaryKey: dictionary.key,
      keyPath: [],
      plugins: [],
    },
    fallback
  ),
});
