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
 * @param additionalPlugins An array of NodeTransformer that define how to transform recognized nodes.
 *                      If omitted, we’ll use a default set of plugins.
 */
export const getContent = <
  T extends ContentNode,
  L extends Locales | `${Locales}` = Locales,
>(
  node: T,
  nodeProps: NodeProps,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    translationPlugin(
      locale ?? getConfiguration().internationalization.defaultLocale
    ),
    enumerationPlugin,
    conditionPlugin,
    nestedPlugin,
    ...(additionalPlugins ?? []),
  ];

  return deepTransformNode(node, nodeProps, plugins) as DeepTransformContent<T>;
};
