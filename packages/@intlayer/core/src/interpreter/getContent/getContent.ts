import { getConfiguration, type Locales } from '@intlayer/config/client';
import type { ContentNode } from '../../types';
import {
  type DeepTransformContent,
  type NodeProps,
  type Plugins,
  deepTransformNode,
} from './deepTransform';
import {
  translationPlugin,
  enumerationPlugin,
  conditionPlugin,
  nestedPlugin,
} from './plugins';

/**
 * Transforms a node in a single pass, applying each plugin as needed.
 *
 * @param node The node to transform.
 * @param locale The locale to use if your transformers need it (e.g. for translations).
 */
export const getContent = <
  T extends ContentNode,
  L extends Locales | `${Locales}` = Locales,
>(
  node: T,
  nodeProps: NodeProps,
  locale?: L
) => {
  const plugins: Plugins[] = [
    translationPlugin(
      locale ?? getConfiguration().internationalization.defaultLocale
    ),
    enumerationPlugin,
    conditionPlugin,
    nestedPlugin,
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T>;
};
