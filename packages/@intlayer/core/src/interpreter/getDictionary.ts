import { internationalization } from '@intlayer/config/built';
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
  getDictionarySelectorCacheKey,
  parseDictionarySelector,
  resolveQualifiedDictionary,
} from '../dictionaryManipulator/qualifiedDictionary';
import {
  getDictionaryTransformCacheKey,
  readTransformCache,
  writeTransformCache,
} from './dictionaryTransformCache';
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

  // The base plugins are rebuilt on every call, so they cannot identify
  // themselves — but they are fully determined by the locale, which the key
  // already carries. Only an explicitly passed array needs its own identity.
  const cacheKey = getDictionaryTransformCacheKey(
    locale ?? internationalization.defaultLocale,
    getDictionarySelectorCacheKey(selector),
    plugins
  );

  const cached = readTransformCache<any>(dictionary, cacheKey);
  if (cached.hit) return cached.content;

  const appliedPlugins = plugins ?? getBasePlugins(locale);

  const resolved = resolveQualifiedDictionary(dictionary, selector);

  const transformDictionary = (resolvedDictionary: Dictionary) => {
    const props: NodeProps = {
      dictionaryKey: resolvedDictionary.key,
      dictionaryPath: resolvedDictionary.filePath,
      keyPath: [],
      plugins: appliedPlugins,
      // Attached by the build optimization so `nest()` resolves without the
      // global registry. Undefined in unoptimized builds, where the
      // registry-based resolver is used instead.
      nestedDictionaries: resolvedDictionary.nestedDictionaries,
    };

    return getContent(resolvedDictionary.content, props, appliedPlugins);
  };

  if (resolved === null) return writeTransformCache(dictionary, cacheKey, null);

  if (Array.isArray(resolved)) {
    return writeTransformCache(
      dictionary,
      cacheKey,
      resolved.map(transformDictionary)
    ) as any;
  }

  return writeTransformCache(
    dictionary,
    cacheKey,
    transformDictionary(resolved)
  ) as any;
};
