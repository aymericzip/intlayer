import configuration from '@intlayer/config/built';
import type { ContentNode } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { deepTransformNode } from './deepTransform';
import {
  conditionPlugin,
  type DeepTransformContent,
  enumerationPlugin,
  filePlugin,
  genderPlugin,
  type IInterpreterPluginState,
  insertionPlugin,
  type NodeProps,
  nestedPlugin,
  type Plugins,
  translationPlugin,
} from './plugins';

export const getBasePlugins = (
  locale?: LocalesValues,
  fallback: boolean = true
): Plugins[] =>
  [
    process.env.INTLAYER_NODE_TYPE_TRANSLATION !== 'false' &&
      translationPlugin(
        locale ?? configuration.internationalization.defaultLocale,
        fallback ? configuration.internationalization.defaultLocale : undefined
      ),
    process.env.INTLAYER_NODE_TYPE_ENUMERATION !== 'false' && enumerationPlugin,
    process.env.INTLAYER_NODE_TYPE_CONDITION !== 'false' && conditionPlugin,
    process.env.INTLAYER_NODE_TYPE_INSERTION !== 'false' && insertionPlugin,
    process.env.INTLAYER_NODE_TYPE_NESTED !== 'false' &&
      nestedPlugin(locale ?? configuration.internationalization.defaultLocale),
    process.env.INTLAYER_NODE_TYPE_FILE !== 'false' && filePlugin,
    process.env.INTLAYER_NODE_TYPE_GENDER !== 'false' && genderPlugin,
  ].filter(Boolean) as Plugins[];

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
  plugins: Plugins[] = []
) =>
  deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T, IInterpreterPluginState, L>;
