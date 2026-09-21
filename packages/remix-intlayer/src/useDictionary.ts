import {
  parseDictionarySelector,
  resolveDictionaryArgument,
} from '@intlayer/core/dictionaryManipulator';
import { getDictionary } from '@intlayer/core/interpreter';
import type {
  Dictionary,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
  ResolveQualifiedDictionaryContent,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { type DeepTransformContent, getPlugins } from './plugins';
import { getRequestLocale } from './requestStorage';

/**
 * Transforms an imported dictionary (or qualified dictionary group) and returns
 * its content for the locale of the request being handled.
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, optionally with `locale`); it takes precedence
 * over the request locale.
 *
 * `md()` and `html()` nodes render to HTML strings: read `.value`, or call
 * `.use(components)` to override tags, and inject the result with `html.raw`
 * or `innerHTML`.
 *
 * @example
 * ```ts
 * import homeContent from './home.content';
 *
 * router.get('/', () => {
 *   const { title } = useDictionary(homeContent);
 *   return new Response(title);
 * });
 * ```
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  ExtractSelectorLocale<A>
> => {
  const argument = resolveDictionaryArgument({
    localeOrSelector,
    contextLocale: getRequestLocale(),
    dictionaryKey: dictionary.key,
  });
  const { locale } = parseDictionarySelector(argument);

  return getDictionary<T, A>(
    dictionary,
    argument as A,
    getPlugins(locale)
  ) as DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >;
};
