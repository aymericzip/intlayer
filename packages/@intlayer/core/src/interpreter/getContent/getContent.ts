import configuration from '@intlayer/config/built';
import type { Locales, LocalesValues } from '@intlayer/config/client';
import type { ContentNode } from '../../types';
import { deepTransformNode } from './deepTransform';
import {
  conditionPlugin,
  type DeepTransformContent,
  enumerationPlugin,
  filePlugin,
  insertionPlugin,
  type NodeProps,
  nestedPlugin,
  type Plugins,
  translationPlugin,
} from './plugins';

/**
 * Transforms a node in a single pass, applying each plugin as needed.
 *
 * @param node The node to transform.
 * @param locale The locale to use if your transformers need it (e.g. for translations).
 */
export const getContent = <
  T extends ContentNode,
  L extends LocalesValues = Locales,
>(
  node: T,
  nodeProps: NodeProps,
  locale: L = configuration?.internationalization.defaultLocale as L
) => {
  const plugins: Plugins[] = [
    insertionPlugin,
    translationPlugin(locale),
    enumerationPlugin,
    conditionPlugin,
    nestedPlugin,
    filePlugin,
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T>;
};
