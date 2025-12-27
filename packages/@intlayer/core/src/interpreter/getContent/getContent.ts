import configuration from '@intlayer/config/built';
import type {
  ContentNode,
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types';
import { deepTransformNode } from './deepTransform';
import {
  conditionPlugin,
  type DeepTransformContent,
  enumerationPlugin,
  filePlugin,
  type IInterpreterPluginState,
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
  L extends LocalesValues = DeclaredLocales,
>(
  node: T,
  nodeProps: NodeProps,
  locale?: L
) => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  const plugins: Plugins[] = [
    insertionPlugin,
    translationPlugin(locale ?? defaultLocale, defaultLocale),
    enumerationPlugin,
    conditionPlugin,
    nestedPlugin(locale ?? defaultLocale),
    filePlugin,
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T, IInterpreterPluginState, L>;
};
