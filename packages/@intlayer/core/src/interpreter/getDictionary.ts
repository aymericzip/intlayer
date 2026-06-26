import type {
  Dictionary,
  DictionarySelector,
  QualifiedDictionaryGroup,
  ResolveQualifiedDictionaryContent,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import {
  parseDictionarySelector,
  resolveQualifiedDictionary,
} from '../dictionaryManipulator/qualifiedDictionary';
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  NodeProps,
  Plugins,
} from './getContent';
import { getBasePlugins, getContent } from './getContent/getContent';

/**
 * Transforms a dictionary in a single pass, applying each plugin as needed.
 *
 * Also accepts a `QualifiedDictionaryGroup` (collections, variants) together
 * with a selector as second argument — the group is resolved to a single entry
 * (or an ordered array of entries for collections without an `item` selector)
 * before transformation.
 *
 * @param dictionary The dictionary (or qualified dictionary group) to transform.
 * @param localeOrSelector The locale, or a selector object (`{ item }`,
 *                         `{ variant }`, optionally with `locale`).
 * @param plugins An array of NodeTransformer that define how to transform recognized nodes.
 *                If omitted, we’ll use a default set of plugins.
 */
export const getDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
> => {
  const { locale, selector } = parseDictionarySelector(localeOrSelector);
  const appliedPlugins = plugins ?? getBasePlugins(locale);

  const resolved = resolveQualifiedDictionary(dictionary, selector);

  const transformDictionary = (resolvedDictionary: Dictionary) => {
    const props: NodeProps = {
      dictionaryKey: resolvedDictionary.key,
      dictionaryPath: resolvedDictionary.filePath,
      keyPath: [],
      plugins: appliedPlugins,
    };

    return getContent(resolvedDictionary.content, props, appliedPlugins);
  };

  if (resolved === null) return null as any;

  if (Array.isArray(resolved)) {
    return resolved.map(transformDictionary) as any;
  }

  return transformDictionary(resolved) as any;
};
