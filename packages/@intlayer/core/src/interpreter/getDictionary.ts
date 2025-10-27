import type {
  DeclaredLocales,
  Dictionary,
  LocalesValues,
} from '@intlayer/types';
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  NodeProps,
  Plugins,
} from './getContent';
import { getContent } from './getContent/getContent';

/**
 * Transforms a dictionary in a single pass, applying each plugin as needed.
 *
 * @param dictionary The dictionary to transform.
 * @param locale The locale to use if your transformers need it (e.g. for translations).
 * @param additionalPlugins An array of NodeTransformer that define how to transform recognized nodes.
 *                      If omitted, we’ll use a default set of plugins.
 */
export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L,
  plugins?: Plugins[]
): DeepTransformContent<T['content'], IInterpreterPluginState, L> => {
  const props: NodeProps = {
    dictionaryKey: dictionary.key,
    dictionaryPath: dictionary.filePath,
    keyPath: [],
    plugins,
  };

  return getContent(dictionary.content, props, locale);
};
