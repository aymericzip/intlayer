import { internationalization } from '@intlayer/config/built';
import type { ContentNode } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { deepTransformNode } from './deepTransform';
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  NodeProps,
  Plugins,
} from './plugins';

/**
 * Transforms a node in a single pass, applying each plugin as needed.
 *
 * @param node The node to transform.
 * @param locale The locale to use if your transformers need it (e.g. for translations).
 */
export const getContent = <
  const T extends ContentNode,
  const L extends LocalesValues = DeclaredLocales,
>(
  node: T,
  nodeProps: NodeProps,
  plugins: Plugins[] = []
) =>
  deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T, IInterpreterPluginState, L>;
