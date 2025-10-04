import type { Locales, LocalesValues } from '@intlayer/config/client';
import { deepTransformNode } from '../interpreter/getContent/deepTransform';
import {
  translationPlugin,
  type DeepTransformContent,
  type NodeProps,
  type Plugins,
} from '../interpreter/getContent/plugins';
import type { ContentNode } from '../types';

/**
 * Transforms a node in a single pass, applying each plugin as needed.
 * In comparison to `getContent`, this function will only apply the translation plugin.
 * It will not transform enumerations, insertions, or other content types.
 *
 * @param node The node to transform.
 * @param locale The locale to use if your transformers need it (e.g. for translations).
 */
export const getLocalisedContent = <
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
