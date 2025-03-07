import { type Locales, type LocalesValues } from '@intlayer/config/client';
import configuration from '@intlayer/config/built';

import type { ContentNode } from '../../types';
import { deepTransformNode } from './deepTransform';
import {
  translationPlugin,
  enumerationPlugin,
  conditionPlugin,
  nestedPlugin,
  type DeepTransformContent,
  type NodeProps,
  type Plugins,
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
  locale: L = configuration.internationalization.defaultLocale as L
) => {
  const plugins: Plugins[] = [
    translationPlugin(locale),
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
