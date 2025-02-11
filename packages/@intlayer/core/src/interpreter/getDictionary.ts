import type { Locales, LocalesValues } from '@intlayer/config/client';
import type { Dictionary } from '../types';
import type { Plugins, NodeProps, DeepTransformContent } from './getContent';
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
  L extends LocalesValues = Locales,
>(
  dictionary: T,
  locale?: L,
  plugins?: Plugins[]
) => {
  const props: NodeProps = {
    dictionaryKey: dictionary.key,
    dictionaryPath: dictionary.filePath,
    keyPath: [],
    plugins,
  };

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  return getContent(
    dictionary.content,
    props,
    locale
  ) as any as DeepTransformContent<T['content']>;
};
